/**
 * Replaces `@/lib/api` for the preview, serving the export's own offline seed
 * (PORTFOLIO_EXPORT_full_system/homepage/mockData.ts). Read endpoints only:
 * ordering, reviews and job applications cannot be submitted from a preview.
 */
import {
  mockFeaturedProducts,
  mockJobs,
  mockLocation,
  mockMenuResponse,
  mockReviewsResponse,
  mockStore,
} from "../../PORTFOLIO_EXPORT_full_system/homepage/mockData";

export { safe } from "../../PORTFOLIO_EXPORT_full_system/homepage/lib/api";

const ok = <T,>(value: T) => Promise.resolve(value);

export const api = {
  store: { status: () => ok(mockStore), location: () => ok(mockLocation) },
  menu: {
    full: () => ok(mockMenuResponse),
    products: ({ featured, limit }: { featured?: boolean; limit?: number } = {}) =>
      ok(mockFeaturedProducts.filter((p) => !featured || p.is_featured).slice(0, limit)),
  },
  reviews: { list: (limit = 24) => ok({ ...mockReviewsResponse, items: mockReviewsResponse.items.slice(0, limit) }) },
  careers: { list: () => ok(mockJobs) },
};
