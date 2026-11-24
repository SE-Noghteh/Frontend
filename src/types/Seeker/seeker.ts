/** Domain types of the job-seeker dashboard (ads, requests, parent, profile). */

export type SeekerAdKind = "work" | "internship";
export type SeekerAdCategory = "design" | "video" | "programming";
export type SeekerAdsTab = "all" | "recommended" | "work" | "internship" | "saved";
export type SeekerAdsSort = "newest" | "deadline" | "match";
export type BudgetBucket = "under1" | "from1to3" | "over3";

/** What the seeker can do with an ad (drives the right-hand action panel on the ad page). */
export type AdApplicationState = "open" | "pendingParent" | "sentToEmployer" | "expired" | "noParent";

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
  /** Shown as the avatar letter; defaults to the first letter of the name. */
  employerInitial: string;
  employerCollabsCount: number;
  /** Payment in tomans (work) — omitted for internships. */
  budget?: number;
  /** Monthly stipend in tomans (internships). `0` means no stipend. */
  stipend?: number;
  matchPercent: number;
  /** Jalali date string, e.g. "1405/08/15". */
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

export type RequestParentStatus = "approved" | "pending" | "rejected" | "notRequired";
export type RequestEmployerStatus = "accepted" | "waitingParent" | "reviewing" | "rejectedByParent" | "rejectedByEmployer";
export type RequestTab = "all" | "waitingParent" | "reviewing" | "accepted" | "rejected";

export interface SeekerRequest {
  id: string;
  adId: string;
  title: string;
  employerName: string;
  /** Jalali date string. */
  sentAt: string;
  message: string;
  parentStatus: RequestParentStatus;
  employerStatus: RequestEmployerStatus;
  /** Parent's note shown when they rejected the request. */
  parentNote?: string;
  /** Per-step timestamps (Jalali date + time), used by the timeline. */
  timeline: {
    sent: string;
    parentDecision?: string;
    employerDecision?: string;
  };
  kind: SeekerAdKind;
  budget?: number;
  stipend?: number;
  deadline: string;
  /** Collaboration created when the employer accepted the request. */
  collabId?: string;
  /** Only reachable by URL (used to preview a state); not part of the list. */
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
