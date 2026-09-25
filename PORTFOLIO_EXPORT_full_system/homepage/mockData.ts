import type {
  Category,
  JobSummary,
  MenuResponse,
  ProductSummary,
  ReviewListResponse,
  StoreLocation,
  StoreStatusPublic,
} from "./lib/types";

/**
 * Static mock dataset for isolated portfolio and miniature carousel previews.
 * Derived directly from the backend database seed configuration (`seed_dev.py`).
 * No backend server or network connectivity is required when using this fixture.
 */

export const mockStore: StoreStatusPublic = {
  status: "OPEN",
  accepts_orders: true,
  reopening_message: null,
  store_name: "Bagel House",
  tagline: "Hand-rolled bagels, single-origin coffee and small-batch ice cream, made fresh every morning.",
  currency: "USD",
  tax_rate: "0.0800",
  delivery_fee: "3.50",
  free_delivery_threshold: "25.00",
  minimum_order_value: "10.00",
  delivery_enabled: true,
  pickup_enabled: true,
  dine_in_enabled: true,
};

export const mockLocation: StoreLocation = {
  store_name: "Bagel House",
  phone: "+1 555 0142",
  email: "hello@bagelhouse.example",
  address_line: "48 Harbour Street",
  city: "Wellington",
  postal_code: "6011",
  country: "New Zealand",
  latitude: "-41.2865",
  longitude: "174.7762",
  maps_url: "https://maps.google.com/?q=-41.2865,174.7762",
  opening_hours: "Mon–Fri  6:30 – 15:00\nSat–Sun  7:30 – 16:00",
};

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Bagels",
    slug: "bagels",
    description: "Hand-rolled, boiled and baked each morning.",
    image_url: null,
    sort_order: 1,
  },
  {
    id: "cat-2",
    name: "Coffee",
    slug: "coffee",
    description: "Single origin, ground the minute you order.",
    image_url: null,
    sort_order: 2,
  },
  {
    id: "cat-3",
    name: "Ice Cream",
    slug: "ice-cream",
    description: "Churned in small batches, never held over.",
    image_url: null,
    sort_order: 3,
  },
  {
    id: "cat-4",
    name: "Breakfast",
    slug: "breakfast",
    description: "Served until the bake runs out.",
    image_url: null,
    sort_order: 4,
  },
];

export const mockFeaturedProducts: ProductSummary[] = [
  {
    id: "prod-1",
    name: "Chicken Bagel",
    slug: "chicken-bagel",
    description: "House-cured chicken, dill cream cheese, pickled cucumber.",
    price: "8.50",
    image_url: "/pics/Chicken Bagel.jpeg",
    is_featured: true,
    is_available: true,
    preparation_time_minutes: 9,
    category_id: "cat-1",
  },
  {
    id: "prod-2",
    name: "Smoked Salmon Bagel",
    slug: "smoked-salmon-bagel",
    description: "Cold-smoked salmon, capers, red onion, lemon cream cheese.",
    price: "11.00",
    image_url: "/pics/Smoked Salmon Bagel.jpeg",
    is_featured: true,
    is_available: true,
    preparation_time_minutes: 8,
    category_id: "cat-1",
  },
  {
    id: "prod-3",
    name: "Flat White",
    slug: "flat-white",
    description: "Double ristretto, steamed milk, a thin cap of foam.",
    price: "4.20",
    image_url: "/pics/Flat White.jpeg",
    is_featured: true,
    is_available: true,
    preparation_time_minutes: 4,
    category_id: "cat-2",
  },
  {
    id: "prod-4",
    name: "Burnt Honey",
    slug: "burnt-honey",
    description: "Caramelised honey, sea salt, a scrape of vanilla.",
    price: "5.50",
    image_url: "/pics/Burnt Honey.jpeg",
    is_featured: true,
    is_available: true,
    preparation_time_minutes: 3,
    category_id: "cat-3",
  },
];

export const mockMenuResponse: MenuResponse = {
  sections: [
    {
      category: mockCategories[0],
      products: [
        mockFeaturedProducts[0],
        {
          id: "prod-5",
          name: "Everything Bagel",
          slug: "everything-bagel",
          description: "Poppy, sesame, garlic and onion. Plain or toasted.",
          price: "3.20",
          image_url: "/pics/Everything Bagel.jpeg",
          is_featured: false,
          is_available: true,
          preparation_time_minutes: 4,
          category_id: "cat-1",
        },
        mockFeaturedProducts[1],
        {
          id: "prod-6",
          name: "Cinnamon Raisin Bagel",
          slug: "cinnamon-raisin-bagel",
          description: "Sweet, dense and best toasted with salted butter.",
          price: "3.60",
          image_url: "/pics/Cinnamon Raisin Bagel.jpeg",
          is_featured: false,
          is_available: true,
          preparation_time_minutes: 4,
          category_id: "cat-1",
        },
      ],
    },
    {
      category: mockCategories[1],
      products: [
        mockFeaturedProducts[2],
        {
          id: "prod-7",
          name: "Filter Coffee",
          slug: "filter-coffee",
          description: "Batch brewed every twenty minutes. Rotating single origin.",
          price: "3.40",
          image_url: "/pics/Filter Coffee.jpeg",
          is_featured: false,
          is_available: true,
          preparation_time_minutes: 2,
          category_id: "cat-2",
        },
        {
          id: "prod-8",
          name: "Cold Brew",
          slug: "cold-brew",
          description: "Steeped eighteen hours, served over a single large cube.",
          price: "4.60",
          image_url: "/pics/Cold Brew.jpeg",
          is_featured: false,
          is_available: true,
          preparation_time_minutes: 2,
          category_id: "cat-2",
        },
      ],
    },
    {
      category: mockCategories[2],
      products: [
        mockFeaturedProducts[3],
        {
          id: "prod-9",
          name: "Dark Chocolate Sorbet",
          slug: "dark-chocolate-sorbet",
          description: "Seventy percent cocoa, water-based, intensely bitter.",
          price: "5.20",
          image_url: "/pics/Dark Chocolate Sorbet.jpeg",
          is_featured: false,
          is_available: true,
          preparation_time_minutes: 3,
          category_id: "cat-3",
        },
      ],
    },
    {
      category: mockCategories[3],
      products: [
        {
          id: "prod-10",
          name: "Eggs on Sourdough",
          slug: "eggs-on-sourdough",
          description: "Two soft-scrambled eggs, cultured butter, chives.",
          price: "9.80",
          image_url: "/pics/Eggs on Sourdough.jpeg",
          is_featured: false,
          is_available: true,
          preparation_time_minutes: 11,
          category_id: "cat-4",
        },
      ],
    },
  ],
};

export const mockReviewsResponse: ReviewListResponse = {
  items: [
    {
      id: "rev-1",
      customer_name: "Marta K.",
      rating: 5,
      review_text: "The chicken bagel is the best thing I have eaten this year. Worth the queue.",
      created_at: "2026-09-18T08:30:00Z",
    },
    {
      id: "rev-2",
      customer_name: "Daniel R.",
      rating: 5,
      review_text: "Coffee is genuinely excellent and the staff remember your order by week two.",
      created_at: "2026-09-19T09:15:00Z",
    },
    {
      id: "rev-3",
      customer_name: "Priya S.",
      rating: 4,
      review_text: "Lovely space, great bagels. Gets very busy after nine on weekends.",
      created_at: "2026-09-20T10:45:00Z",
    },
  ],
  total: 48,
  summary: {
    total: 48,
    average: 4.8,
    distribution: { "5": 41, "4": 6, "3": 1, "2": 0, "1": 0 },
  },
};

export const mockJobs: JobSummary[] = [
  {
    id: "job-1",
    title: "Barista",
    slug: "barista",
    department: "Front of house",
    location: "Harbour Street",
    employment_type: "FULL_TIME",
    salary_range: "$22–26 / hour",
    created_at: "2026-09-15T00:00:00Z",
  },
  {
    id: "job-2",
    title: "Overnight Baker",
    slug: "overnight-baker",
    department: "Kitchen",
    location: "Harbour Street",
    employment_type: "PART_TIME",
    salary_range: "$26–30 / hour",
    created_at: "2026-09-15T00:00:00Z",
  },
];
