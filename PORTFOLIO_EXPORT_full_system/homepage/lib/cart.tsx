"use client";

/**
 * Cart state.
 *
 * The cart stores *intent only* — which product, how many, which options, what
 * note. It deliberately holds no prices and computes no totals: every figure
 * shown to the customer comes from POST /orders/quote, so a tampered
 * localStorage can change what is ordered but never what it costs.
 *
 * Persisted to localStorage so a refresh or a return visit keeps the basket.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import type { OrderType } from "./types";

const STORAGE_KEY = "rp.cart.v1";
const MAX_LINES = 40;
const MAX_QUANTITY = 50;

export interface CartLine {
  /** Stable key: a product with different options is a different line. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  quantity: number;
  modifierIds: string[];
  modifierNames: string[];
  notes: string | null;
}

interface CartState {
  lines: CartLine[];
  orderType: OrderType;
  offerCode: string | null;
  hydrated: boolean;
}

type CartAction =
  | { type: "hydrate"; state: Partial<CartState> }
  | { type: "add"; line: Omit<CartLine, "key">; }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "setNotes"; key: string; notes: string }
  | { type: "setOrderType"; orderType: OrderType }
  | { type: "setOfferCode"; code: string | null }
  | { type: "clear" };

const INITIAL: CartState = {
  lines: [],
  orderType: "PICKUP",
  offerCode: null,
  hydrated: false,
};

function lineKey(productId: string, modifierIds: string[]): string {
  return [productId, ...[...modifierIds].sort()].join("|");
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.state, hydrated: true };

    case "add": {
      const key = lineKey(action.line.productId, action.line.modifierIds);
      const existing = state.lines.find((line) => line.key === key);

      if (existing) {
        // Same product, same options -> bump quantity instead of a second row.
        return {
          ...state,
          lines: state.lines.map((line) =>
            line.key === key
              ? {
                  ...line,
                  quantity: Math.min(MAX_QUANTITY, line.quantity + action.line.quantity),
                  notes: action.line.notes ?? line.notes,
                }
              : line,
          ),
        };
      }

      if (state.lines.length >= MAX_LINES) return state;
      return { ...state, lines: [...state.lines, { ...action.line, key }] };
    }

    case "setQuantity": {
      const quantity = Math.max(0, Math.min(MAX_QUANTITY, Math.trunc(action.quantity)));
      if (quantity === 0) {
        return { ...state, lines: state.lines.filter((line) => line.key !== action.key) };
      }
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.key === action.key ? { ...line, quantity } : line,
        ),
      };
    }

    case "remove":
      return { ...state, lines: state.lines.filter((line) => line.key !== action.key) };

    case "setNotes":
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.key === action.key ? { ...line, notes: action.notes.slice(0, 500) || null } : line,
        ),
      };

    case "setOrderType":
      return { ...state, orderType: action.orderType };

    case "setOfferCode":
      return { ...state, offerCode: action.code?.trim().toUpperCase() || null };

    case "clear":
      return { ...state, lines: [], offerCode: null };

    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  itemCount: number;
  isEmpty: boolean;
  /** Increments whenever a line is added — drives the header cart nudge. */
  addPulse: number;
  add: (line: Omit<CartLine, "key">) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  setNotes: (key: string, notes: string) => void;
  setOrderType: (orderType: OrderType) => void;
  setOfferCode: (code: string | null) => void;
  clear: () => void;
  /** The exact shape POST /orders/quote and POST /orders expect. */
  toApiItems: () => Array<{
    product_id: string;
    quantity: number;
    modifier_ids: string[];
    notes: string | null;
  }>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [addPulse, setAddPulse] = useState(0);
  const hydrated = useRef(false);

  // Read persisted state once, after mount, so server and client render the
  // same empty cart on the first pass (no hydration mismatch).
  useEffect(() => {
    let restored: Partial<CartState> = {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CartState>;
        restored = {
          lines: Array.isArray(parsed.lines) ? parsed.lines.slice(0, MAX_LINES) : [],
          orderType: parsed.orderType ?? "PICKUP",
          offerCode: parsed.offerCode ?? null,
        };
      }
    } catch {
      // Corrupt or blocked storage is not an error worth showing anyone.
    }
    dispatch({ type: "hydrate", state: restored });
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          lines: state.lines,
          orderType: state.orderType,
          offerCode: state.offerCode,
        }),
      );
    } catch {
      // Private mode / full quota: the cart still works for this session.
    }
  }, [state.lines, state.orderType, state.offerCode]);

  const add = useCallback((line: Omit<CartLine, "key">) => {
    dispatch({ type: "add", line });
    setAddPulse((n) => n + 1);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      addPulse,
      itemCount: state.lines.reduce((sum, line) => sum + line.quantity, 0),
      isEmpty: state.lines.length === 0,
      add,
      setQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
      remove: (key) => dispatch({ type: "remove", key }),
      setNotes: (key, notes) => dispatch({ type: "setNotes", key, notes }),
      setOrderType: (orderType) => dispatch({ type: "setOrderType", orderType }),
      setOfferCode: (code) => dispatch({ type: "setOfferCode", code }),
      clear: () => dispatch({ type: "clear" }),
      toApiItems: () =>
        state.lines.map((line) => ({
          product_id: line.productId,
          quantity: line.quantity,
          modifier_ids: line.modifierIds,
          notes: line.notes,
        })),
    }),
    [state, addPulse, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
