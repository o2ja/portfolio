/**
 * Types mirroring the FastAPI response schemas.
 *
 * Money arrives as a decimal *string* ("8.50"), never a number — JSON numbers
 * are IEEE doubles and would reintroduce the rounding errors the backend's
 * NUMERIC columns exist to avoid. Format it; never do arithmetic on it.
 */

export type Money = string;

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELLED";

export type OrderType = "PICKUP" | "DELIVERY" | "DINE_IN";
export type PaymentMethod = "CASH" | "CARD" | "ONLINE";
export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";
export type StoreStatus = "OPEN" | "CLOSED" | "TEMPORARILY_PAUSED";
export type ModifierType =
  | "SIZE"
  | "MILK"
  | "TOPPING"
  | "EXTRA"
  | "PREPARATION"
  | "OTHER";
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "SEASONAL";

/* --- store ---------------------------------------------------------------- */

export interface StoreStatusPublic {
  status: StoreStatus;
  accepts_orders: boolean;
  reopening_message: string | null;
  store_name: string;
  tagline: string | null;
  currency: string;
  tax_rate: Money;
  delivery_fee: Money;
  free_delivery_threshold: Money | null;
  minimum_order_value: Money;
  delivery_enabled: boolean;
  pickup_enabled: boolean;
  dine_in_enabled: boolean;
}

export interface StoreLocation {
  store_name: string;
  phone: string | null;
  email: string | null;
  address_line: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  latitude: string | null;
  longitude: string | null;
  maps_url: string | null;
  opening_hours: string | null;
}

/* --- catalogue ------------------------------------------------------------ */

export interface Modifier {
  id: string;
  name: string;
  type: ModifierType;
  price_delta: Money;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: Money;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  preparation_time_minutes: number;
  category_id: string | null;
}

export interface ProductDetail extends ProductSummary {
  modifiers: Modifier[];
  category: Category | null;
}

export interface MenuSection {
  category: Category;
  products: ProductSummary[];
}

export interface MenuResponse {
  sections: MenuSection[];
}

export interface ProductDetailResponse {
  product: ProductDetail;
  related: ProductSummary[];
}

export interface Offer {
  id: string;
  name: string;
  description: string | null;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: Money;
  minimum_order_value: Money;
  ends_at: string | null;
}

/* --- orders --------------------------------------------------------------- */

export interface CartLineInput {
  product_id: string;
  quantity: number;
  modifier_ids?: string[];
  notes?: string | null;
}

export interface QuoteLine {
  product_id: string;
  name: string;
  slug: string;
  quantity: number;
  unit_price: Money;
  modifiers_total: Money;
  line_total: Money;
  modifiers: Array<{ id: string; name: string; type: string; price_delta: Money }>;
  notes: string | null;
}

export interface Quote {
  lines: QuoteLine[];
  subtotal: Money;
  discount_amount: Money;
  tax_amount: Money;
  delivery_fee: Money;
  total: Money;
  currency: string;
  offer_applied: string | null;
  expected_preparation_minutes: number;
  notices: string[];
}

export interface OrderItem {
  id: string;
  product_id: string | null;
  product_name_snapshot: string;
  unit_price_snapshot: Money;
  modifiers_total_snapshot: Money;
  quantity: number;
  line_total: Money;
  notes: string | null;
  modifier_snapshot: Array<{ id: string; name: string; price_delta: Money }>;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  order_type: OrderType;
  status: OrderStatus;
  delivery_address: string | null;
  subtotal: Money;
  discount_amount: Money;
  tax_amount: Money;
  delivery_fee: Money;
  total: Money;
  currency: string;
  offer_code_snapshot: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  notes: string | null;
  expected_preparation_minutes: number;
  created_at: string;
  confirmed_at: string | null;
  preparing_at: string | null;
  ready_at: string | null;
  out_for_delivery_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  items: OrderItem[];
}

export interface TimelineStep {
  status: OrderStatus;
  at: string | null;
}

export interface OrderTracking {
  order: Order;
  timeline: TimelineStep[];
}

export interface OrderCreateRequest {
  items: CartLineInput[];
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  order_type: OrderType;
  delivery_address?: string | null;
  notes?: string | null;
  offer_code?: string | null;
  payment_method?: PaymentMethod;
  idempotency_key?: string;
}

/* --- careers, reviews, contact -------------------------------------------- */

export interface JobSummary {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employment_type: EmploymentType;
  salary_range: string | null;
  created_at: string;
}

export interface JobDetail extends JobSummary {
  description: string;
  requirements: string | null;
  benefits: string | null;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string | null;
  created_at: string;
}

export interface ReviewSummary {
  total: number;
  average: number | null;
  distribution: Record<string, number>;
}

export interface ReviewListResponse {
  items: Review[];
  total: number;
  summary: ReviewSummary;
}

export interface SubmissionReceipt {
  id: string;
  message: string;
  moderated: boolean;
}

/* --- errors --------------------------------------------------------------- */

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }> | unknown;
    request_id?: string;
  };
}
