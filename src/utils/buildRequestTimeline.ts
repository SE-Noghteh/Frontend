import type { SeekerRequest } from "@/types/Seeker/seeker";

import { formatJalaliDate } from "./formatToman";

export type TimelineStepState = "done" | "current" | "failed" | "upcoming";

export interface TimelineStep {
  label: string;
  state: TimelineStepState;
  date?: string;
  hint?: string;
}

/** Turns the employer's request decision into the vertical timeline shown on the detail page. */
export function buildRequestTimeline(request: SeekerRequest): TimelineStep[] {
  const { timeline, employerStatus } = request;
  const steps: TimelineStep[] = [
    { label: "درخواست ارسال شد", state: "done", date: formatJalaliDate(timeline.sent) },
  ];

  switch (employerStatus) {
    case "reviewing":
      steps.push({ label: "بررسی کارفرما", state: "current", hint: "کارفرما در حال بررسی درخواست است" });
      steps.push({ label: "نتیجه بررسی", state: "upcoming" });
      break;
    case "accepted":
      steps.push({
        label: "کارفرما پذیرفت",
        state: "done",
        date: formatJalaliDate(timeline.employerDecision ?? ""),
      });
      steps.push({ label: "توافق شرایط همکاری", state: "current", hint: "منتظر نهایی‌شدن شرایط قرارداد" });
      break;
    case "rejectedByEmployer":
      steps.push({
        label: "بررسی کارفرما",
        state: "done",
        date: formatJalaliDate(timeline.employerDecision ?? ""),
      });
      steps.push({ label: "درخواست پذیرفته نشد", state: "failed", hint: "کارفرما فرد دیگری را انتخاب کرد" });
      break;
  }

  return steps;
}
