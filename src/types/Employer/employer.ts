
export type EmployerAdKind = "work" | "internship";

export type EmployerAdStatus =
  | "published"
  | "collaboration"
  | "expired"
  | "closed";

export type EmployerAdsTab =
  | "all"
  | "published"
  | "collaboration"
  | "inactive";

export type EmployerAdsSort =
  | "newest"
  | "oldest"
  | "most-applicants";

export interface EmployerApplicant {
  id: string;
  name: string;
}

export interface EmployerAd {
  id: string;
  title: string;
  kind: EmployerAdKind;
  status: EmployerAdStatus;
  createdAt: string;
  deadline: string;
  applicantsCount: number;
  newApplicantsCount: number;
  applicants: EmployerApplicant[];
  description?: string;
  category?: string;
  skills?: string[];
  deliverables?: string;
  deliveryFormat?: string;
  deliveryDate?: string;
  budget?: number;
  collaborationMode?: string;
  ageRange?: string;
  parentConsent?: boolean;
  internshipDuration?: string;
  weeklyHours?: string;
  hasAllowance?: boolean;
}
