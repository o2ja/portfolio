/**
 * Presentation helpers.
 *
 * `formatMoney` takes the backend's decimal string and formats it — it never
 * adds, multiplies or rounds. All money arithmetic happens server-side.
 */

import type { OrderStatus } from "./types";

export function formatMoney(amount: string | null | undefined, currency = "USD"): string {
  if (amount == null) return "—";
  const value = Number(amount);
  if (!Number.isFinite(value)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  return `${formatDate(iso)}, ${formatTime(iso)}`;
}

/** "3 minutes ago" — for activity feeds and order timelines. */
export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "—";
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  const steps: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["second", 60],
    ["minute", 60],
    ["hour", 24],
    ["day", 7],
    ["week", 4.348],
    ["month", 12],
  ];

  let value = seconds;
  for (const [unit, size] of steps) {
    if (Math.abs(value) < size) return rtf.format(-Math.round(value), unit);
    value /= size;
  }
  return rtf.format(-Math.round(value), "year");
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Order received",
  CONFIRMED: "Confirmed",
  PREPARING: "Being prepared",
  READY: "Ready",
  OUT_FOR_DELIVERY: "Out for delivery",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

/**
 * Status tone. Every use is paired with a text label, so colour is never the
 * only carrier of meaning.
 */
export const ORDER_STATUS_TONE: Record<OrderStatus, "neutral" | "info" | "positive" | "critical"> = {
  PENDING: "neutral",
  CONFIRMED: "info",
  PREPARING: "info",
  READY: "positive",
  OUT_FOR_DELIVERY: "info",
  COMPLETED: "positive",
  CANCELLED: "critical",
};

export const EMPLOYMENT_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  SEASONAL: "Seasonal",
};

export const ORDER_TYPE_LABEL: Record<string, string> = {
  PICKUP: "Pickup",
  DELIVERY: "Delivery",
  DINE_IN: "Dine in",
};

/** Joins class names, dropping falsy values. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * A stable hue per slug, so an image-less product still gets a consistent,
 * deliberate placeholder instead of a grey box.
 */
export function hueFromString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  // Constrained to the blue-through-warm-neutral arc that fits the palette.
  return 185 + (Math.abs(hash) % 40);
}
