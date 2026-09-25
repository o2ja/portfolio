/**
 * Replaces `@/lib/api` for the preview. Content is the project's own demo seed,
 * copied verbatim from PORTFOLIO_EXPORT_Coach/AI_HANDOFF.md (fictional coach).
 * Only read methods exist: nothing here can submit an application.
 */
import type { CoachProfile, Offer, Post, Result, Service, SocialLink } from "../../PORTFOLIO_EXPORT_Coach/homepage/types";

const profile: CoachProfile = {
  name: "Sarah Mitchell",
  headline: "Strength that fits the life you already have.",
  subheadline: "Personalised online and in-person strength coaching, built around your week and your goals.",
  bio: "I have spent the last eight years coaching women who want to get stronger without letting training take over their lives.\n\nMy clients are busy people — mothers, professionals, students — who want results they can sustain. I write every programme myself, adjust it weekly, and stay available between sessions.",
  philosophy: "Training should feel like the best part of your day, not another obligation to manage.",
  credentials: ["BSc Sport & Exercise Science", "Certified Strength & Conditioning Specialist", "8 years coaching experience"],
  location: "London, UK",
  cta_label: "Start coaching",
  cta_text: "Applications are open. Tell me what you want to achieve and I will explain exactly how I can help.",
  hero_image_url: "",
  profile_image_url: "",
  email: "hello@example.com",
  phone: "+44 7700 900000",
  response_time: "",
};

const service = (s: Partial<Service>): Service =>
  ({ coaching_type: null, full_description: "", sort_order: 0, ...s }) as Service;

const services: Service[] = [
  service({
    id: "1", title: "Online Coaching", slug: "online-coaching", coaching_type: "ONLINE_COACHING",
    short_description: "Custom programming delivered weekly, with ongoing support and adjustments.",
    features: ["Individualised training programme", "Weekly programme updates", "Form review via video", "Direct messaging support"],
    duration: "Monthly", price: "£150/month", featured: true,
  }),
  service({
    id: "2", title: "Gym Coaching", slug: "gym-coaching", coaching_type: "GYM_COACHING",
    short_description: "In-person sessions at your gym, building skills and confidence with hands-on coaching.",
    features: ["1-on-1 personal training", "Technique coaching", "Programme design included", "Flexible scheduling"],
    duration: "Per session", price: "£65/session", featured: false,
  }),
];

const result = (r: Partial<Result>): Result =>
  ({ before_image_url: "", after_image_url: "", progress_images: [], sort_order: 0, ...r }) as Result;

const results: Result[] = [
  result({ id: "1", title: "Emma's first pull-up", goal: "STRENGTH", story: "Eight months of consistent training, twice a week around a full-time job.", duration: "8 months" }),
  result({ id: "2", title: "Running and lifting, together", goal: "GENERAL_FITNESS", story: "Training for a half-marathon while keeping her strength work going.", duration: "6 months" }),
  result({ id: "3", title: "Post-natal return to training", goal: "STRENGTH", story: "A gradual, careful return to barbell training after her second child.", duration: "12 months" }),
];

const post = (p: Partial<Post>): Post => ({ cover_image_url: "", featured: false, ...p }) as Post;

const posts: Post[] = [
  post({ id: "1", title: "Why your warm-up matters more than you think", slug: "warm-up", type: "TRAINING", excerpt: "A good warm-up is not just about injury prevention.", published_at: "2025-03-15" }),
  post({ id: "2", title: "Protein timing: does it actually matter?", slug: "protein-timing", type: "NUTRITION", excerpt: "The research says one thing. The internet says another.", published_at: "2025-02-28" }),
  post({ id: "3", title: "Finding consistency without motivation", slug: "consistency", type: "MINDSET", excerpt: "Motivation is unreliable. Here is what works instead.", published_at: "2025-02-10" }),
];

const offers: Offer[] = [
  {
    id: "1", title: "Spring intake — 20% off your first month",
    description: "New clients joining in March get their first month of online coaching at a reduced rate.",
    discount_label: "20% off", cta_label: "Apply now", cta_url: "/apply", image_url: "", featured: true, ends_at: "2025-04-01",
  },
];

const socialLinks: SocialLink[] = [
  { id: "1", platform: "instagram", label: "Instagram", url: "#", sort_order: 0 },
  { id: "2", platform: "tiktok", label: "TikTok", url: "#", sort_order: 1 },
  { id: "3", platform: "whatsapp", label: "WhatsApp", url: "#", sort_order: 2 },
];

const ok = <T,>(value: T) => Promise.resolve(value);

export const publicApi = {
  profile: () => ok(profile),
  socialLinks: () => ok(socialLinks),
  services: () => ok(services),
  results: (limit = 24) => ok(results.slice(0, limit)),
  posts: ({ limit }: { limit?: number } = {}) => ok(posts.slice(0, limit)),
  offers: () => ok(offers),
};
