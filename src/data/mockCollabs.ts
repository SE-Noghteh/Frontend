/** Mock collaborations: one per screen of the design, so every state can be opened by id. */

import type { CollabState, CollabWorkStage, SeekerCollab } from "@/types/Seeker/collab";

const AMOUNT = 2_400_000;

const DELIVERY_FILES = [
  { name: "پست‌های پاییز.zip", meta: "۱۲٫۴ مگابایت · ۱۴۰۵/۰۹/۰۸" },
  { name: "استوری‌ها.zip", meta: "۸٫۴ مگابایت · ۱۴۰۵/۰۹/۰۸" },
];

const STAGES: CollabWorkStage[] = [
  { id: "s1", title: "اسکچ‌های نهایی ۸ پست آماده شد", percent: 75, date: "1405/08/12", filesCount: 1 },
  { id: "s2", title: "اسکچ اولیه و پالت رنگی", percent: 40, date: "1405/08/08", filesCount: 3 },
  { id: "s3", title: "بررسی راهنمای برند", percent: 10, date: "1405/08/05", filesCount: 0 },
];

const REVISION_STAGES: CollabWorkStage[] = [
  { id: "r1", title: "اصلاح لوگو در پست ۳", percent: 90, date: "1405/09/11", filesCount: 0 },
  { id: "s1", title: "اسکچ‌های نهایی ۸ پست آماده شد", percent: 75, date: "1405/08/12", filesCount: 1 },
];

function collab(id: string, state: CollabState, overrides: Partial<SeekerCollab> = {}): SeekerCollab {
  return {
    id,
    adId: "1",
    title: "طراحی پست‌های پاییز",
    employerName: "استودیو سپیدار",
    employerInitial: "س",
    state,
    amount: AMOUNT,
    deliveryDate: "1405/09/10",
    deliverables: "۱۰ پست · ۱۰ استوری",
    parentStatus: "approved",
    parentSentAt: "1405/09/02",
    stages: [],
    deliveryFiles: [],
    revisionItems: [],
    revisionDeadline: "1405/09/15",
    ...overrides,
  };
}

export const mockCollabs: SeekerCollab[] = [
  collab("1", "agreementWaitingParent", { parentStatus: "pending" }),
  collab("2", "agreementReview", { parentStatus: "pending" }),
  collab("3", "agreementParentRejected", {
    parentStatus: "rejected",
    parentNote: "مبلغ و مهلت با برنامه‌ی امتحانات هماهنگ نیست؛ مهلت را کمی بیشتر کنید.",
  }),
  collab("4", "paymentWaiting"),
  collab("5", "paymentPaid"),
  collab("6", "paymentExpired"),
  collab("7", "workInProgress", { stages: STAGES }),
  collab("8", "workLate", { stages: STAGES }),
  collab("9", "deliveryWaiting", { deliveryFiles: DELIVERY_FILES }),
  collab("10", "revisionRequested", {
    deliveryFiles: DELIVERY_FILES,
    revisionItems: ["لوگو در پست‌های ۳ و ۵ کمی کوچک شود", "رنگ پس‌زمینه‌ی استوری‌ها با پالت برند یکی شود"],
  }),
  collab("11", "revisionInProgress", { stages: REVISION_STAGES, deliveryFiles: DELIVERY_FILES }),
  collab("12", "payoutWaiting", { deliveryFiles: DELIVERY_FILES }),
  collab("13", "completed", {
    deliveryFiles: DELIVERY_FILES,
    rating: { score: 5, comment: "کار تمیز و به‌موقع؛ همکاری با سارا عالی بود." },
  }),
  collab("14", "disputeReview", { deliveryFiles: DELIVERY_FILES }),
  collab("15", "disputeSplit", { deliveryFiles: DELIVERY_FILES }),
  collab("16", "disputeRefund", { deliveryFiles: DELIVERY_FILES }),
  collab("17", "cancelledByEmployer", { stages: STAGES }),
];
