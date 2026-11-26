/** Domain types of a collaboration (what happens after an employer accepts a request). */

import type { SeekerAdFile } from "@/types/Seeker/seeker";

/** Where a collaboration is. Each value is one screen of the design. */
export type CollabState =
  | "agreementWaitingParent"
  | "agreementReview"
  | "agreementParentRejected"
  | "paymentWaiting"
  | "paymentPaid"
  | "paymentExpired"
  | "workInProgress"
  | "workLate"
  | "deliveryWaiting"
  | "revisionRequested"
  | "revisionInProgress"
  | "payoutWaiting"
  | "completed"
  | "disputeReview"
  | "disputeSplit"
  | "disputeRefund"
  | "cancelledByEmployer"
  | "cancelledBySeeker";

export type CollabParentStatus = "pending" | "approved" | "rejected";

/** One reported step of the work ("اسکچ اولیه و پالت رنگی", 40%). */
export interface CollabWorkStage {
  id: string;
  title: string;
  /** 0-100 */
  percent: number;
  /** Jalali date. */
  date: string;
  filesCount: number;
}

export interface CollabRating {
  /** 1-5 */
  score: number;
  comment: string;
}

export interface SeekerCollab {
  id: string;
  adId: string;
  title: string;
  employerName: string;
  employerInitial: string;
  state: CollabState;
  /** Contract amount in tomans. */
  amount: number;
  /** Jalali delivery date. */
  deliveryDate: string;
  deliverables: string;
  parentStatus: CollabParentStatus;
  /** When the terms were sent to the parent (Jalali date). */
  parentSentAt: string;
  parentNote?: string;
  stages: CollabWorkStage[];
  deliveryFiles: SeekerAdFile[];
  revisionItems: string[];
  revisionDeadline: string;
  rating?: CollabRating;
}

export type CollabStepStatus = "done" | "current" | "failed" | "upcoming";

export type CollabBannerTone = "success" | "warning" | "error" | "info";

/** Cards that can appear in the main column, in the order they are rendered. */
export type CollabBlock =
  | "parent"
  | "earnings"
  | "whyWait"
  | "progress"
  | "stages"
  | "delivery"
  | "revision"
  | "payoutFlow"
  | "rating"
  | "disputeFlow"
  | "split"
  | "refundReason"
  | "settlement"
  | "parentMessage";

export type CollabActionId =
  | "acceptTerms"
  | "requestContractEdit"
  | "startWork"
  | "addStage"
  | "submitDelivery"
  | "requestExtension"
  | "startRevision"
  | "viewPreviousDelivery"
  | "viewWallet"
  | "addToPortfolio"
  | "respondDispute"
  | "objectDecision"
  | "searchAds"
  | "cancelCollab";

export interface CollabActionConfig {
  id: CollabActionId;
  label: string;
  variant: "primary" | "secondary" | "text";
}
