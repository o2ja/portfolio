/**
 * Replaces `@/lib/api` for the preview. The collection is built from the owner's cutout
 * photos; display helpers are the project's own.
 * Homepage CMS copy is left empty so the page shows its built-in default text.
 * No inquiry can be sent from a preview.
 */
import type { ProductSummary, SiteSettings, SocialLink } from "../../PORTFOLIO_EXPORT_obaidi_time/homepage/types";

export { formatMoney, isSold, modelName, priceLabel } from "../../PORTFOLIO_EXPORT_obaidi_time/homepage/api";

// The owner's current cutouts (PORTFOLIO_EXPORT_obaidi_time/assets/products). No prices or
// sold status were supplied for these pieces, so every one shows "Price on request".
const WATCHES: Array<[brand: string, model: string, price: string | null, sold: boolean, cutout: string]> = [
  ["Patek Philippe", "Aquanaut Travel Time", null, false, "patek-philippe-aquanaut-travel-time"],
  ["Patek Philippe", "Grand Complications Chronograph", null, false, "patek-philippe-grand-complications-chronograph"],
  ["Patek Philippe", "Grand Complications Minute Repeater", null, false, "patek-philippe-grand-complications-minute-repeater"],
  ["Vacheron Constantin", "Skeleton Perpetual Calendar", null, false, "vacheron-constantin-skeleton-perpetual-calendar"],
  ["Cartier", "Tortue Perpetual Calendar", null, false, "cartier-tortue-perpetual-calendar"],
  ["Arnold & Son", "Hand-Painted Ship", null, false, "arnold-son-hand-painted-ship"],
  ["Rolex", "Datejust Silver Dial", null, false, "rolex-datejust-silver-dial"],
  ["Breitling", "Premier B01 Chronograph", null, false, "breitling-premier-b01-chronograph"],
  ["Omega x Swatch", "MoonSwatch Moonphase", null, false, "omega-swatch-moonswatch-moonphase"],
];

const products: ProductSummary[] = WATCHES.map(([brand, model, price, sold, cutout], i) => ({
  id: i + 1,
  name: `${brand} ${model}`,
  slug: cutout,
  short_description: null,
  brand: { id: i + 1, name: brand, slug: brand.toLowerCase().replace(/[^a-z]+/g, "-"), description: null, logo_url: null },
  primary_image: null,
  pricing: {
    currency: "USD",
    price,
    compare_at_price: null,
    estimated_market_price: null,
    discount_amount: "0",
    final_price: price,
    discount_percent: null,
    promotion_name: null,
    price_on_request: price === null,
  },
  availability: sold ? "SOLD" : "IN_STOCK",
  featured: !sold,
  new_arrival: false,
  condition: null,
  cutout_url: `/products/${cutout}.webp`,
}));

const settings: SiteSettings = {
  brand_name: "Vauclair",
  owner_name: null,
  tagline: null,
  logo_url: null,
  favicon_url: null,
  contact_email: "info@vauclair.example",
  contact_phone: null,
  address: null,
  currency: "USD",
  shipping_information: null,
  return_policy: null,
  warranty_information: null,
  seo_title: null,
  seo_description: null,
};

const ok = <T,>(value: T) => Promise.resolve(value);

export const getSiteSettings = () => ok(settings);
export const getSocialLinks = () => ok<SocialLink[]>([]);
export const getHomepage = () => Promise.reject(new Error("CMS copy not bundled with the preview"));
export const getCollection = () => ok({ products, categories: [] });
