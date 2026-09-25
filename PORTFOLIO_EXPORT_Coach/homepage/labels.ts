import type {
  CoachingType,
  ContactMethod,
  Goal,
  LeadStatus,
  PostType,
  TrainingExperience,
} from "./types";

export const coachingTypeLabel: Record<CoachingType, string> = {
  ONLINE_COACHING: "Online coaching",
  GYM_COACHING: "Gym coaching",
};

export const goalLabel: Record<Goal, string> = {
  FAT_LOSS: "Fat loss",
  MUSCLE_GAIN: "Muscle gain",
  STRENGTH: "Strength",
  GENERAL_FITNESS: "General fitness",
  OTHER: "Something else",
};

export const experienceLabel: Record<TrainingExperience, string> = {
  BEGINNER: "New to training",
  INTERMEDIATE: "Training for a while",
  ADVANCED: "Experienced",
};

export const contactMethodLabel: Record<ContactMethod, string> = {
  PHONE: "Phone call",
  WHATSAPP: "WhatsApp",
  EMAIL: "Email",
  INSTAGRAM: "Instagram",
};

export const statusLabel: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  REJECTED: "Not a fit",
  ARCHIVED: "Archived",
};

export const postTypeLabel: Record<PostType, string> = {
  TRAINING: "Training",
  NUTRITION: "Nutrition",
  MINDSET: "Mindset",
  ANNOUNCEMENT: "News",
};

/** Which statuses the coach may move a lead to next - mirrors the server rules. */
export const nextStatuses: Record<LeadStatus, LeadStatus[]> = {
  NEW: ["CONTACTED", "REJECTED", "ARCHIVED"],
  CONTACTED: ["ACCEPTED", "REJECTED", "ARCHIVED"],
  ACCEPTED: ["IN_PROGRESS", "REJECTED", "ARCHIVED"],
  IN_PROGRESS: ["COMPLETED", "ARCHIVED"],
  COMPLETED: ["ARCHIVED"],
  REJECTED: ["ARCHIVED"],
  ARCHIVED: [],
};

export function formatDate(value: string | null | undefined, withTime = false): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export function relativeDays(value: string): string {
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  return formatDate(value);
}

export function formatHours(hours: number | null): string {
  if (hours === null) return "Not enough data yet";
  if (hours < 24) return `${hours.toFixed(1)} hours`;
  return `${(hours / 24).toFixed(1)} days`;
}
