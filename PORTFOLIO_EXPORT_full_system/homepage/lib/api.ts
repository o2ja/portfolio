/**
 * The single place this app talks to the backend.
 *
 * Two call paths, one function:
 *  - on the server (RSC, route handlers) we hit BACKEND_URL directly, skipping
 *    the rewrite hop;
 *  - in the browser we use the relative /api path, which next.config rewrites,
 *    so requests stay same-origin and the SameSite=Lax session cookie applies.
 *
 * No component should ever call fetch() against the API itself.
 */

import type {
  ApiErrorBody,
  Category,
  JobDetail,
  JobSummary,
  MenuResponse,
  Offer,
  Order,
  OrderCreateRequest,
  OrderTracking,
  ProductDetailResponse,
  ProductSummary,
  Quote,
  ReviewListResponse,
  StoreLocation,
  StoreStatusPublic,
  SubmissionReceipt,
} from "./types";

const SERVER_BASE = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";
const isServer = typeof window === "undefined";

/** Thrown for every non-2xx response, carrying the backend's own error code. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors: Record<string, string>;
  readonly requestId?: string;

  constructor(
    status: number,
    code: string,
    message: string,
    fieldErrors: Record<string, string> = {},
    requestId?: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.requestId = requestId;
  }

  /** True when the store refused the order because it is not open. */
  get isStoreClosed() {
    return this.code === "STORE_CLOSED";
  }
}

/** Network failure, DNS, or the backend being down — distinct from a 4xx. */
export class NetworkError extends Error {
  constructor(message = "We could not reach the kitchen. Please check your connection.") {
    super(message);
    this.name = "NetworkError";
  }
}

function toFieldErrors(details: unknown): Record<string, string> {
  if (!Array.isArray(details)) return {};
  const map: Record<string, string> = {};
  for (const entry of details) {
    if (
      entry &&
      typeof entry === "object" &&
      "field" in entry &&
      "message" in entry &&
      typeof entry.field === "string"
    ) {
      map[entry.field] = String(entry.message);
    }
  }
  return map;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Seconds to cache a GET on the server. 0 disables caching. */
  revalidate?: number;
  /** Aborts the request after this many ms. Defaults to 15s. */
  timeoutMs?: number;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, revalidate, timeoutMs = 15_000, headers, signal, ...rest } = options;
  const base = isServer ? `${SERVER_BASE}/api/v1` : "/api/v1";

  // Caller-supplied signals are honoured alongside our own timeout.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener("abort", () => controller.abort(), { once: true });

  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      // Send the session cookie on browser calls; harmless server-side.
      credentials: "same-origin",
      ...(isServer
        ? revalidate === undefined || revalidate === 0
          ? { cache: "no-store" as const }
          : { next: { revalidate } }
        : {}),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new NetworkError("That took too long. Please try again.");
    }
    throw new NetworkError();
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  if (!response.ok) {
    const envelope = parsed as ApiErrorBody | null;
    const err = envelope?.error;
    throw new ApiError(
      response.status,
      err?.code ?? "UNKNOWN_ERROR",
      err?.message ?? "Something went wrong. Please try again.",
      toFieldErrors(err?.details),
      err?.request_id,
    );
  }

  return parsed as T;
}

const get = <T>(path: string, revalidate?: number) => request<T>(path, { revalidate });
const post = <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body });

/* ===========================================================================
   Public endpoints.
   `revalidate` values reflect how often each thing actually changes: store
   status is near-live, the menu tolerates a minute, static copy longer.
   ======================================================================== */

export const api = {
  store: {
    status: () => get<StoreStatusPublic>("/store/status", 15),
    location: () => get<StoreLocation>("/store/location", 300),
  },

  menu: {
    full: () => get<MenuResponse>("/menu", 60),
    categories: () => get<Category[]>("/categories", 300),
    products: (params: {
      category?: string;
      search?: string;
      featured?: boolean;
      limit?: number;
    } = {}) => {
      const query = new URLSearchParams();
      if (params.category) query.set("category", params.category);
      if (params.search) query.set("search", params.search);
      if (params.featured) query.set("featured", "true");
      if (params.limit) query.set("limit", String(params.limit));
      const suffix = query.size ? `?${query}` : "";
      return get<ProductSummary[]>(`/products${suffix}`, 60);
    },
    product: (slug: string) =>
      get<ProductDetailResponse>(`/products/${encodeURIComponent(slug)}`, 60),
  },

  offers: {
    active: () => get<Offer[]>("/offers/active", 60),
  },

  orders: {
    /** Authoritative cart totals. The UI never adds money up itself. */
    quote: (body: {
      items: Array<{ product_id: string; quantity: number; modifier_ids?: string[]; notes?: string | null }>;
      order_type: string;
      offer_code?: string | null;
    }) => post<Quote>("/orders/quote", body),

    create: (body: OrderCreateRequest) => post<Order>("/orders", body),

    track: (id: string, phone?: string) => {
      const suffix = phone ? `?phone=${encodeURIComponent(phone)}` : "";
      return get<OrderTracking>(`/orders/${encodeURIComponent(id)}${suffix}`);
    },
  },

  careers: {
    list: () => get<JobSummary[]>("/jobs", 120),
    detail: (slugOrId: string) => get<JobDetail>(`/jobs/${encodeURIComponent(slugOrId)}`, 120),
    apply: (
      slugOrId: string,
      body: { applicant_name: string; email: string; phone?: string | null; cover_message?: string | null },
    ) => post<SubmissionReceipt>(`/jobs/${encodeURIComponent(slugOrId)}/applications`, body),
  },

  reviews: {
    list: (limit = 24, offset = 0) =>
      get<ReviewListResponse>(`/reviews?limit=${limit}&offset=${offset}`, 60),
    submit: (body: {
      customer_name: string;
      rating: number;
      review_text?: string | null;
      customer_email?: string | null;
    }) => post<SubmissionReceipt>("/reviews", body),
  },

  contact: {
    send: (body: {
      name: string;
      email: string;
      phone?: string | null;
      subject: string;
      message: string;
    }) => post<SubmissionReceipt>("/messages", body),
  },
};

/**
 * For Server Components that must render even when the backend is down.
 * A dead API should degrade a section, never blank the whole page.
 */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[api] falling back:", (error as Error).message);
    }
    return fallback;
  }
}
