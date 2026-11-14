/**
 * Landing page domain types.
 */

export type UserRole = "seeker" | "employer" | "parent";

export interface PlatformStats {
  activeSeekers: number;
  verifiedEmployers: number;
  publishedOpportunities: number;
  successRatePercent: number;
}

export interface Testimonial {
  id: string;
  role: UserRole;
  text: string;
  authorName: string;
  authorMeta: string;
  /** 1 - 5 */
  rating: number;
}

export type EmployerScenarioId = "shop" | "academy" | "office" | "event";

export interface ApplicantPreview {
  name: string;
  age: number;
  skill: string;
  /** Match percentage, 0 - 100. */
  matchPercent: number;
  /** 0 means no rating yet (new seeker). */
  rating: number;
  completedProjects: number;
}

export interface EmployerScenario {
  id: EmployerScenarioId;
  tabLabel: string;
  lead: string;
  points: string[];
  previewProjectTitle: string;
  previewApplicantsCount: number;
  previewApplicants: ApplicantPreview[];
}

export interface RoleGuideContent {
  title: string;
  lead: string;
  ctaLabel: string;
  steps: { title: string; description: string }[];
}

export type JourneyPreviewId =
  | "signup"
  | "resume"
  | "consent"
  | "agreement"
  | "workspace"
  | "wallet";

export interface JourneyStepContent {
  title: string;
  description: string;
  roles: UserRole[];
  /** Role whose color tints the preview panel. */
  mainRole: UserRole;
  previewId: JourneyPreviewId;
}

export interface PlatformFeature {
  id: string;
  title: string;
  text: string;
  role: UserRole;
}
