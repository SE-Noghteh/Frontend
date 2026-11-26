/** Domain types of the job-seeker dashboard (ads, requests, parent, profile). */

export type SeekerAdKind = "work" | "internship";
export type SeekerAdCategory = "design" | "video" | "programming";
export type SeekerAdsTab = "all" | "recommended" | "work" | "internship" | "saved";
export type SeekerAdsSort = "newest" | "deadline" | "match";
export type BudgetBucket = "under1" | "from1to3" | "over3";

/** The seeker's application state for an ad. Parent approval is not part of this flow. */
export type AdApplicationState = "open" | "sentToEmployer" | "expired";

/** Legacy type retained for the unused ParentApprovalCard component. */
export type RequestParentStatus = "approved" | "pending" | "rejected" | "notRequired";

export type RequestEmployerStatus = "accepted" | "reviewing" | "rejectedByEmployer";
export type RequestTab = "all" | "reviewing" | "accepted" | "rejected";

export interface SeekerAdFile {
  name: string;
  meta: string;
}

export interface SeekerAd {
  id: string;
  title: string;
  kind: SeekerAdKind;
  category: SeekerAdCategory;
  employerName: string;
  employerInitial: string;
  employerCollabsCount: number;
  budget?: number;
  stipend?: number;
  matchPercent: number;
  deadline: string;
  publishedAt: string;
  saved: boolean;
  description: string;
  skills: string[];
  deliverables: string;
  deliveryFormat: string;
  files: SeekerAdFile[];
  collabDuration: string;
  applicantsCount: number;
  application: AdApplicationState;
}

/** A request is sent directly to the employer; parent approval happens after contract agreement. */
export interface SeekerRequest {
  id: string;
  adId: string;
  title: string;
  employerName: string;
  sentAt: string;
  message: string;
  employerStatus: RequestEmployerStatus;
  timeline: {
    sent: string;
    employerDecision?: string;
  };
  kind: SeekerAdKind;
  budget?: number;
  stipend?: number;
  deadline: string;
  collabId?: string;
  demoOnly?: boolean;
}

export interface SeekerParent {
  name: string;
  relation: string;
  phone: string;
}

export interface SeekerProfile {
  name: string;
  role: string;
  age: number;
}
