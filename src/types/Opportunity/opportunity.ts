/**
 * Opportunity (job / internship) domain types.
 * Shapes mirror what the backend is expected to return.
 */

export type WorkMode = "online" | "onsite" | "both";
export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type OpportunityType = "project" | "internship";
export type DurationBucket = "short" | "week" | "month" | "long";
export type AgeGroup = "under18" | "adult";
export type OpportunitySort = "newest" | "deadline" | "budget";

export interface OpportunityCategory {
  id: string;
  title: string;
  shortTitle: string;
  /** Categories that need extra safety review before publishing. */
  requiresSpecialReview: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  employerName: string;
  employerRating: number;
  categoryId: string;
  type: OpportunityType;
  workMode: WorkMode;
  level: SkillLevel;
  city?: string;
  /** Amount in thousand tomans. */
  budget: number;
  /** True when the amount is a monthly stipend (internships). */
  hasStipend: boolean;
  durationDays: number;
  deadlineInDays: number;
  minAge: 15 | 18;
  applicantsCount: number;
  skills: string[];
  postedDaysAgo: number;
  requiresNoExperience: boolean;
}

export interface OpportunityFilters {
  query: string;
  categoryIds: string[];
  workModes: WorkMode[];
  levels: SkillLevel[];
  types: OpportunityType[];
  durations: DurationBucket[];
  ageGroup: AgeGroup | "";
  city: string;
  budgetMin: number;
  budgetMax: number;
  isUrgent: boolean;
  requiresNoExperience: boolean;
  sort: OpportunitySort;
}
