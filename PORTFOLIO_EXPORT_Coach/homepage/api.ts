/**
 * The single place the app talks to the backend.
 *
 * - `publicApi.*` runs on the server for public pages (cached, revalidated).
 * - `adminApi.*` runs in the browser with the session cookie + CSRF header.
 */

import type {
  AdminMe,
  Analytics,
  ApplicationInput,
  CoachProfile,
  Dashboard,
  LeadDetail,
  LeadListItem,
  LeadNote,
  LeadStatus,
  Offer,
  Page,
  Post,
  Result,
  Service,
  SocialLink,
} from "./types";

const SERVER_BASE = process.env.API_URL ?? "http://127.0.0.1:8000";
export const BROWSER_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  fields: Record<string, string>;

  constructor(status: number, message: string, fields: Record<string, string> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

async function toApiError(res: Response): Promise<ApiError> {
  let detail = "Something went wrong. Please try again.";
  let fields: Record<string, string> = {};
  try {
    const body = await res.json();
    if (typeof body?.detail === "string") detail = body.detail;
    if (body?.fields && typeof body.fields === "object") fields = body.fields;
  } catch {
    /* non-JSON error body: keep the generic message */
  }
  return new ApiError(res.status, detail, fields);
}

/** Server-side GET for public content. Revalidates so admin edits appear without a redeploy. */
async function serverGet<T>(path: string, revalidate = 30): Promise<T> {
  const res = await fetch(`${SERVER_BASE}${path}`, { next: { revalidate } });
  if (!res.ok) throw await toApiError(res);
  return res.json() as Promise<T>;
}

/** Returns `fallback` instead of throwing, so one cold endpoint cannot blank the whole page. */
async function safeGet<T>(path: string, fallback: T, revalidate = 30): Promise<T> {
  try {
    return await serverGet<T>(path, revalidate);
  } catch {
    return fallback;
  }
}

export const publicApi = {
  profile: () => safeGet<CoachProfile | null>("/api/public/profile", null),
  socialLinks: () => safeGet<SocialLink[]>("/api/public/social-links", []),
  services: () => safeGet<Service[]>("/api/public/services", []),
  service: (slug: string) => serverGet<Service>(`/api/public/services/${slug}`),
  results: (limit = 24) => safeGet<Result[]>(`/api/public/results?limit=${limit}`, []),
  posts: (params: { limit?: number; type?: string } = {}) => {
    const q = new URLSearchParams();
    if (params.limit) q.set("limit", String(params.limit));
    if (params.type) q.set("type", params.type);
    return safeGet<Post[]>(`/api/public/posts?${q}`, []);
  },
  post: (slug: string) => serverGet<Post>(`/api/public/posts/${slug}`),
  offers: () => safeGet<Offer[]>("/api/public/offers", []),
};

/** Public form submission, from the browser. */
export async function submitApplication(input: ApplicationInput): Promise<{ message: string }> {
  const res = await fetch(`${BROWSER_BASE}/api/public/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      preferred_contact_method: input.preferred_contact_method || null,
    }),
  });
  if (!res.ok) throw await toApiError(res);
  return res.json();
}

// --- admin -------------------------------------------------------------------
let csrfToken: string | null = null;

export function setCsrfToken(token: string | null) {
  csrfToken = token;
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super(401, "Your session has expired. Please sign in again.");
    this.name = "UnauthorizedError";
  }
}

async function adminFetch<T>(
  path: string,
  { method = "GET", body }: { method?: string; body?: unknown } = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (method !== "GET" && csrfToken) headers["X-CSRF-Token"] = csrfToken;

  const res = await fetch(`${BROWSER_BASE}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) throw await toApiError(res);
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function query(params: Record<string, string | number | undefined | null>) {
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") q.set(key, String(value));
  }
  const s = q.toString();
  return s ? `?${s}` : "";
}

export type LeadQuery = {
  page?: number;
  page_size?: number;
  search?: string;
  status?: LeadStatus | "";
  coaching_type?: string;
  goal?: string;
  date_from?: string;
  date_to?: string;
};

export const adminApi = {
  login: (email: string, password: string) =>
    adminFetch<AdminMe>("/api/admin/login", { method: "POST", body: { email, password } }),
  logout: () => adminFetch<void>("/api/admin/logout", { method: "POST" }),
  me: () => adminFetch<AdminMe>("/api/admin/me"),

  dashboard: (days = 30) => adminFetch<Dashboard>(`/api/admin/dashboard${query({ days })}`),
  analytics: (params: { days?: number; date_from?: string; date_to?: string }) =>
    adminFetch<Analytics>(`/api/admin/analytics${query(params)}`),

  leads: (params: LeadQuery) =>
    adminFetch<Page<LeadListItem>>(`/api/admin/leads${query(params)}`),
  lead: (id: string) => adminFetch<LeadDetail>(`/api/admin/leads/${id}`),
  setLeadStatus: (id: string, status: LeadStatus, note = "") =>
    adminFetch<LeadDetail>(`/api/admin/leads/${id}/status`, {
      method: "PATCH",
      body: { status, note },
    }),
  archiveLead: (id: string) =>
    adminFetch<LeadDetail>(`/api/admin/leads/${id}/archive`, { method: "POST" }),
  addLeadNote: (id: string, body: string) =>
    adminFetch<LeadNote>(`/api/admin/leads/${id}/notes`, { method: "POST", body: { body } }),

  list: <T>(resource: string) => adminFetch<T[]>(`/api/admin/${resource}`),
  create: <T>(resource: string, body: unknown) =>
    adminFetch<T>(`/api/admin/${resource}`, { method: "POST", body }),
  update: <T>(resource: string, id: string, body: unknown) =>
    adminFetch<T>(`/api/admin/${resource}/${id}`, { method: "PATCH", body }),
  remove: (resource: string, id: string) =>
    adminFetch<void>(`/api/admin/${resource}/${id}`, { method: "DELETE" }),

  reorderServices: (ids: string[]) =>
    adminFetch<Service[]>("/api/admin/services/reorder", { method: "POST", body: { ids } }),

  profile: () => adminFetch<CoachProfile>("/api/admin/profile"),
  updateProfile: (body: Partial<CoachProfile>) =>
    adminFetch<CoachProfile>("/api/admin/profile", { method: "PATCH", body }),

  socialLinks: () => adminFetch<SocialLink[]>("/api/admin/social-links"),
  posts: () => adminFetch<Post[]>("/api/admin/posts"),
  offers: () => adminFetch<Offer[]>("/api/admin/offers"),
  results: () => adminFetch<Result[]>("/api/admin/results"),
  services: () => adminFetch<Service[]>("/api/admin/services"),
};

/**
 * Cookie note: the session cookie is SameSite=Lax, so the browser only sends it
 * when the API shares a site with the frontend. In development that means
 * `localhost:3000` talking to `localhost:8000` (not `127.0.0.1`), and in
 * production an API on the same registrable domain, e.g. api.example.com.
 */
