/**
 * Labels and static options used by opportunity cards and filters.
 */

import type {
  AgeGroup,
  DurationBucket,
  OpportunitySort,
  OpportunityType,
  SkillLevel,
  WorkMode,
} from "@/types/Opportunity/opportunity";

export const WORK_MODE_LABEL: Record<WorkMode, string> = {
  online: "آنلاین",
  onsite: "حضوری",
  both: "هر دو",
};

export const SKILL_LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: "مبتدی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

export const OPPORTUNITY_TYPE_LABEL: Record<OpportunityType, string> = {
  project: "پروژه",
  internship: "کارآموزی",
};

export const DURATION_LABEL: Record<DurationBucket, string> = {
  short: "کمتر از ۳ روز",
  week: "تا یک هفته",
  month: "تا یک ماه",
  long: "بیش از یک ماه",
};

export const AGE_GROUP_LABEL: Record<AgeGroup, string> = {
  under18: "زیر ۱۸ سال (با رضایت والد)",
  adult: "۱۸ تا ۲۳ سال",
};

export const SORT_LABEL: Record<OpportunitySort, string> = {
  newest: "جدیدترین",
  deadline: "نزدیک‌ترین مهلت",
  budget: "بیشترین مبلغ",
};

/** Selectable in the work-mode filter ("both" is a property of an opportunity only). */
export const WORK_MODE_FILTER_OPTIONS: WorkMode[] = ["online", "onsite"];

/** Upper bound of the budget slider (thousand tomans). */
export const BUDGET_SLIDER_MAX = 5000;
export const BUDGET_SLIDER_STEP = 100;

/** An opportunity is "urgent" when its deadline is this many days away or less. */
export const URGENT_DEADLINE_DAYS = 3;

/** TODO: replace with the city list from the backend. */
export const CITIES = ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز", "کرج"];
