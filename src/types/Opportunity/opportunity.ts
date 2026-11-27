/**
 * Frontend opportunity domain.
 *
 * The backend uses `work`, `hybrid` and amounts in whole toman.
 * The service layer maps those API values to the UI-friendly values below.
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
  requiresSpecialReview: boolean;
}

export interface OpportunityAttachment {
  name: string;
  meta: string;
  url?: string;
  contentType?: string;
  size?: number;
}

export interface Opportunity {
  id: string;
  title: string;
  employerName: string;
  employerRating?: number;
  employerVerified?: boolean;
  categoryId: string;
  type: OpportunityType;
  workMode: WorkMode;
  level: SkillLevel;
  city?: string;

  /**
   * Kept in thousand tomans because the existing UI slider/formatter uses
   * thousand-toman values. The API adapter converts whole toman -> thousand.
   */
  budget: number;
  hasStipend: boolean;

  durationDays: number;
  deadlineInDays: number;
  applyDeadline?: string;
  minAge: number;
  maxAge?: number;
  applicantsCount?: number;

  skills: string[];
  postedDaysAgo: number;
  publishedAt?: string;
  createdAt?: string;

  requiresNoExperience?: boolean;
  requiresParentApproval?: boolean;
  acceptingApplications?: boolean;
  saved?: boolean;
  matchPercent?: number;

  description?: string;
  deliverables?: string;
  deliveryFormat?: string;
  files?: OpportunityAttachment[];
  employerInitial?: string;
  employerCollabsCount?: number;
}

export interface OpportunityPage {
  data: Opportunity[];
  total: number;
  limit: number;
  offset: number;
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

  /**
   * Kept for existing landing-page links. Swagger currently has no direct
   * query parameter for these two flags.
   */
  isUrgent: boolean;
  requiresNoExperience: boolean;

  sort: OpportunitySort;
}
