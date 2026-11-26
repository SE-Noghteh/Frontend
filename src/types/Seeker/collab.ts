/** Domain types of a collaboration (what happens after an employer accepts a request). */

import type { SeekerAdFile } from "@/types/Seeker/seeker";

export type CollabState =
  | "agreementWaitingParent"
  | "agreementReview"
  | "agreementChangeRequested"
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

export type CollabParentStatus = "pending" | "approved" | "rejected" | "notRequired";

export interface CollabWorkStage {
  id: string;
  title: string;
  percent: number;
  date: string;
  filesCount: number;
}

export interface CollabRating {
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
  amount: number;
  deliveryDate: string;
  deliverables: string;
  parentStatus: CollabParentStatus;
  /** When the final agreed terms were sent to the parent (Jalali date). */
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
