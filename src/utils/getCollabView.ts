/**
 * Turns a collaboration's state into everything its page shows: status chip, the 5-step bar,
 * the banner, which cards appear and which buttons are available.
 * Pure data, so the screens stay in one table and the components stay dumb.
 */

import type { StatusTone } from "@/components/ui/StatusChip";
import type {
  CollabActionConfig,
  CollabBannerTone,
  CollabBlock,
  CollabState,
  CollabStepStatus,
  SeekerCollab,
} from "@/types/Seeker/collab";

export const COLLAB_STEP_LABELS = ["توافق", "پرداخت", "انجام کار", "تحویل", "واریز"] as const;

export const PLATFORM_FEE_RATE = 0.1;

export interface CollabView {
  chip: { tone: StatusTone; label: string };
  /** One status per step of `COLLAB_STEP_LABELS`. */
  steps: CollabStepStatus[];
  banner?: { tone: CollabBannerTone; text: string };
  main: CollabBlock[];
  /** Buttons shown in their own card under the main cards. */
  actions: CollabActionConfig[];
  /** Button under the agreed-terms card ("درخواست تغییر شرایط"). */
  termsAction?: { label: string; isDisabled?: boolean };
  /** Cancelled before work started: no agreed-terms card. */
  hideTerms?: boolean;
}

const D = "done" as const;
const C = "current" as const;
const F = "failed" as const;
const U = "upcoming" as const;

const CHANGE_TERMS = { label: "درخواست تغییر شرایط" };

export function getCollabView(collab: SeekerCollab): CollabView {
  const parentName = "مریم رضایی";

  const views: Record<CollabState, CollabView> = {
    agreementWaitingParent: {
      chip: { tone: "warning", label: "منتظر تأیید والد" },
      steps: [C, U, U, U, U],
      banner: { tone: "warning", text: `شرایط همکاری برای تأیید به ${parentName} رفته است` },
      main: ["parent", "earnings"],
      actions: [],
      termsAction: { ...CHANGE_TERMS, isDisabled: true },
    },
    agreementReview: {
      chip: { tone: "info", label: "در حال همکاری" },
      steps: [C, U, U, U, U],
      banner: { tone: "info", text: "کارفرما شرایط همکاری را فرستاده؛ بررسی و تأیید کن" },
      main: ["earnings"],
      actions: [
        { id: "acceptTerms", label: "پذیرش شرایط", variant: "primary" },
        { id: "requestContractEdit", label: "درخواست ویرایش قرارداد", variant: "secondary" },
      ],
    },
    agreementParentRejected: {
      chip: { tone: "error", label: "ردشده توسط والد" },
      steps: [F, U, U, U, U],
      banner: { tone: "error", text: "والدت شرایط این همکاری را تأیید نکرد" },
      main: ["parentMessage"],
      actions: [],
    },
    paymentWaiting: {
      chip: { tone: "warning", label: "منتظر پرداخت کارفرما" },
      steps: [D, C, U, U, U],
      banner: { tone: "warning", text: "کارفرما تا ۲۳ ساعت دیگر باید پول را در امانت بگذارد" },
      main: ["whyWait", "earnings"],
      actions: [],
      termsAction: CHANGE_TERMS,
    },
    paymentPaid: {
      chip: { tone: "success", label: "پول در امانت" },
      steps: [D, C, U, U, U],
      banner: { tone: "success", text: "کارفرما پرداخت کرد؛ مبلغ در امانت زدلنسر است" },
      main: ["earnings"],
      actions: [{ id: "startWork", label: "شروع کار", variant: "primary" }],
      termsAction: CHANGE_TERMS,
    },
    paymentExpired: {
      chip: { tone: "error", label: "لغو شد" },
      steps: [D, F, U, U, U],
      banner: { tone: "error", text: "کارفرما در مهلت پرداخت نکرد و همکاری لغو شد" },
      main: [],
      actions: [{ id: "searchAds", label: "جست‌وجوی آگهی", variant: "primary" }],
      hideTerms: true,
    },
    workInProgress: {
      chip: { tone: "info", label: "در حال همکاری" },
      steps: [D, D, C, U, U],
      main: ["progress", "stages"],
      actions: [
        { id: "addStage", label: "ثبت مرحله‌ی جدید", variant: "primary" },
        { id: "submitDelivery", label: "ثبت تحویل نهایی", variant: "secondary" },
      ],
      termsAction: CHANGE_TERMS,
    },
    workLate: {
      chip: { tone: "warning", label: "تأخیر در تحویل" },
      steps: [D, D, C, U, U],
      banner: { tone: "warning", text: "مهلت تحویل ۲ روز پیش تمام شد؛ کارفرما می‌تواند همکاری را لغو کند" },
      main: ["stages"],
      actions: [
        { id: "submitDelivery", label: "ثبت تحویل", variant: "primary" },
        { id: "requestExtension", label: "درخواست تمدید مهلت", variant: "secondary" },
      ],
      termsAction: CHANGE_TERMS,
    },
    deliveryWaiting: {
      chip: { tone: "info", label: "منتظر تأیید کارفرما" },
      steps: [D, D, D, C, U],
      banner: { tone: "info", text: "کارفرما تا ۷۲ ساعت دیگر تحویل را بررسی می‌کند" },
      main: ["delivery", "earnings"],
      actions: [],
      termsAction: CHANGE_TERMS,
    },
    revisionRequested: {
      chip: { tone: "warning", label: "درخواست اصلاح" },
      steps: [D, D, D, C, U],
      banner: { tone: "warning", text: `کارفرما اصلاح خواسته: تا ${collab.revisionDeadline} فرصت داری` },
      main: ["revision"],
      actions: [],
      termsAction: CHANGE_TERMS,
    },
    revisionInProgress: {
      chip: { tone: "info", label: "اصلاح در جریان" },
      steps: [D, D, D, C, U],
      main: ["stages"],
      actions: [{ id: "submitDelivery", label: "ارسال دوباره‌ی تحویل", variant: "primary" }],
      termsAction: CHANGE_TERMS,
    },
    payoutWaiting: {
      chip: { tone: "info", label: "در انتظار واریز" },
      steps: [D, D, D, D, C],
      banner: { tone: "success", text: "کارفرما تحویل را تأیید کرد؛ ادمین به‌زودی واریز می‌کند" },
      main: ["earnings", "payoutFlow"],
      actions: [],
    },
    completed: {
      chip: { tone: "success", label: "تمام شد" },
      steps: [D, D, D, D, D],
      banner: { tone: "success", text: "۲٬۱۶۰٬۰۰۰ تومان به کیف پولت واریز شد" },
      main: ["rating", "earnings"],
      actions: [
        { id: "viewWallet", label: "مشاهده‌ی کیف پول", variant: "primary" },
        { id: "addToPortfolio", label: "افزودن به نمونه‌کار", variant: "secondary" },
      ],
    },
    disputeReview: {
      chip: { tone: "warning", label: "اختلاف در بررسی" },
      steps: [D, D, D, C, U],
      banner: { tone: "warning", text: "کارفرما اختلاف ثبت کرد؛ ادمین تا ۷۲ ساعت دیگر بررسی می‌کند" },
      main: ["disputeFlow"],
      actions: [{ id: "respondDispute", label: "ثبت پاسخ و مدارک", variant: "primary" }],
    },
    disputeSplit: {
      chip: { tone: "info", label: "تصمیم ادمین" },
      steps: [D, D, D, C, U],
      banner: { tone: "info", text: "ادمین مبلغ را بین دو طرف تقسیم کرد" },
      main: ["split"],
      actions: [],
    },
    disputeRefund: {
      chip: { tone: "error", label: "عودت به کارفرما" },
      steps: [D, D, D, F, U],
      banner: { tone: "error", text: "ادمین مبلغ را به کارفرما برگرداند" },
      main: ["refundReason"],
      actions: [
        { id: "objectDecision", label: "ثبت اعتراض", variant: "primary" },
        { id: "searchAds", label: "جست‌وجوی آگهی", variant: "secondary" },
      ],
    },
    cancelledByEmployer: {
      chip: { tone: "error", label: "لغو توسط کارفرما" },
      steps: [D, D, F, U, U],
      banner: { tone: "error", text: "کارفرما همکاری را لغو کرد؛ سهم کار انجام‌شده به تو می‌رسد" },
      main: ["settlement"],
      actions: [],
      hideTerms: true,
    },
    cancelledBySeeker: {
      chip: { tone: "error", label: "لغو شد" },
      steps: [D, D, F, U, U],
      banner: { tone: "error", text: "همکاری را لغو کردی" },
      main: [],
      actions: [{ id: "searchAds", label: "جست‌وجوی آگهی", variant: "primary" }],
      hideTerms: true,
    },
  };

  return views[collab.state];
}

/** Platform fee and what the seeker gets for a contract amount (tomans). */
export function getEarnings(amount: number) {
  const fee = Math.round(amount * PLATFORM_FEE_RATE);
  return { amount, fee, net: amount - fee };
}
