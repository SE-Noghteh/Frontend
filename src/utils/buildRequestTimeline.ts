import type { SeekerParent, SeekerRequest } from "@/types/Seeker/seeker";

import { formatJalaliDate } from "./formatToman";

export type TimelineStepState = "done" | "current" | "failed" | "upcoming";

export interface TimelineStep {
  label: string;
  state: TimelineStepState;
  /** Date (and time) of the step, when it already happened. */
  date?: string;
  hint?: string;
}

/** Turns a request's statuses into the vertical timeline shown on the detail page. */
export function buildRequestTimeline(request: SeekerRequest, parent: SeekerParent): TimelineStep[] {
  const { timeline, parentStatus, employerStatus } = request;
  const steps: TimelineStep[] = [
    { label: "درخواست ارسال شد", state: "done", date: formatJalaliDate(timeline.sent) },
  ];

  if (parentStatus === "approved") {
    steps.push({ label: "والد تأیید کرد", state: "done", date: formatJalaliDate(timeline.parentDecision ?? "") });
  } else if (parentStatus === "rejected") {
    steps.push({ label: "والد رد کرد", state: "failed", date: formatJalaliDate(timeline.parentDecision ?? "") });
  } else if (parentStatus === "pending") {
    steps.push({ label: "تأیید والد", state: "current", hint: `منتظر پاسخ ${parent.name}` });
  }

  switch (employerStatus) {
    case "waitingParent":
      steps.push({ label: "بررسی کارفرما", state: "upcoming", hint: "بعد از تأیید والد" });
      steps.push({ label: "نتیجه", state: "upcoming" });
      break;
    case "reviewing":
      steps.push({ label: "بررسی کارفرما", state: "current", hint: "کارفرما در حال بررسی است" });
      steps.push({ label: "نتیجه", state: "upcoming" });
      break;
    case "rejectedByParent":
      steps.push({ label: "بررسی کارفرما", state: "upcoming", hint: "ارسال نمی‌شود" });
      steps.push({ label: "نتیجه", state: "upcoming" });
      break;
    case "accepted":
      steps.push({
        label: "کارفرما پذیرفت",
        state: "done",
        date: formatJalaliDate(timeline.employerDecision ?? ""),
      });
      steps.push({ label: "شروع همکاری", state: "current", hint: "منتظر توافق شرایط" });
      break;
    case "rejectedByEmployer":
      steps.push({ label: "بررسی کارفرما", state: "done", date: formatJalaliDate(timeline.employerDecision ?? "") });
      steps.push({ label: "رد شد", state: "failed", hint: "کارفرما فرد دیگری را انتخاب کرد" });
      break;
  }

  return steps;
}
