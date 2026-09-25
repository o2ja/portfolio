/** Mirrors the FastAPI response schemas. */

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
  "ARCHIVED",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const COACHING_TYPES = ["ONLINE_COACHING", "GYM_COACHING"] as const;
export type CoachingType = (typeof COACHING_TYPES)[number];

export const GOALS = [
  "FAT_LOSS",
  "MUSCLE_GAIN",
  "STRENGTH",
  "GENERAL_FITNESS",
  "OTHER",
] as const;
export type Goal = (typeof GOALS)[number];

export const EXPERIENCE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export type TrainingExperience = (typeof EXPERIENCE_LEVELS)[number];

export const CONTACT_METHODS = ["PHONE", "WHATSAPP", "EMAIL", "INSTAGRAM"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export const POST_TYPES = ["TRAINING", "NUTRITION", "MINDSET", "ANNOUNCEMENT"] as const;
export type PostType = (typeof POST_TYPES)[number];

export const POST_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export type CoachProfile = {
  name: string;
  headline: string;
  subheadline: string;
  bio: string;
  philosophy: string;
  credentials: string[];
  profile_image_url: string;
  hero_image_url: string;
  email: string;
  phone: string;
  location: string;
  cta_label: string;
  cta_text: string;
  response_time: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  label: string;
  url: string;
  sort_order: number;
  active?: boolean;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  coaching_type: CoachingType | null;
  short_description: string;
  full_description: string;
  features: string[];
  duration: string;
  price: string;
  featured: boolean;
  sort_order: number;
  active?: boolean;
};

export type Result = {
  id: string;
  title: string;
  goal: Goal | null;
  story: string;
  before_image_url: string;
  after_image_url: string;
  progress_images: string[];
  duration: string;
  sort_order: number;
  published?: boolean;
  archived?: boolean;
  consent_note?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  type: PostType;
  featured: boolean;
  published_at: string | null;
  content?: string;
  status?: PostStatus;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  cta_label: string;
  cta_url: string;
  image_url: string;
  discount_label: string;
  featured: boolean;
  ends_at: string | null;
  starts_at?: string | null;
  active?: boolean;
  archived?: boolean;
};

export type LeadListItem = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  coaching_type: CoachingType;
  goal: Goal;
  status: LeadStatus;
  submitted_at: string;
  updated_at: string;
};

export type LeadNote = {
  id: string;
  body: string;
  author_email: string;
  created_at: string;
};

export type LeadHistoryEntry = {
  id: string;
  old_status: LeadStatus | null;
  new_status: LeadStatus;
  note: string;
  created_at: string;
};

export type LeadDetail = LeadListItem & {
  training_experience: TrainingExperience;
  preferred_contact_method: ContactMethod | null;
  message: string;
  consent: boolean;
  contacted_at: string | null;
  accepted_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  archived_at: string | null;
  created_at: string;
  history: LeadHistoryEntry[];
  notes: LeadNote[];
};

export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
};

export type CountPoint = { key: string; count: number };
export type TimePoint = { date: string; count: number };

export type WorkflowTiming = {
  submitted_to_contacted_hours: number | null;
  contacted_to_accepted_hours: number | null;
  accepted_to_in_progress_hours: number | null;
  in_progress_to_completed_hours: number | null;
};

export type Analytics = {
  total: number;
  range_start: string;
  range_end: string;
  by_day: TimePoint[];
  by_status: CountPoint[];
  by_coaching_type: CountPoint[];
  by_goal: CountPoint[];
  timing: WorkflowTiming;
};

export type Dashboard = {
  counts: Record<
    "total" | "new" | "contacted" | "accepted" | "in_progress" | "completed" | "rejected" | "archived",
    number
  >;
  recent_leads: LeadListItem[];
  action_needed: LeadListItem[];
  by_day: TimePoint[];
  by_status: CountPoint[];
  by_coaching_type: CountPoint[];
  by_goal: CountPoint[];
  published_posts: number;
  active_offers: number;
  published_results: number;
};

export type AdminMe = {
  email: string;
  last_login_at: string | null;
  csrf_token: string | null;
};

export type ApplicationInput = {
  full_name: string;
  phone: string;
  email: string;
  coaching_type: CoachingType | "";
  goal: Goal | "";
  training_experience: TrainingExperience | "";
  preferred_contact_method: ContactMethod | "";
  message: string;
  consent: boolean;
};
