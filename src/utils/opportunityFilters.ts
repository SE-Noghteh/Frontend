/**
 * Pure helpers for opportunity filters: defaults, URL <-> filters conversion,
 * counting active filters and client-side matching (used by the mock service).
 */

import {
  BUDGET_SLIDER_MAX,
  URGENT_DEADLINE_DAYS,
} from "@/constants/opportunityOptions";
import type {
  AgeGroup,
  DurationBucket,
  Opportunity,
  OpportunityFilters,
  OpportunitySort,
  OpportunityType,
  SkillLevel,
  WorkMode,
} from "@/types/Opportunity/opportunity";

export const EMPTY_OPPORTUNITY_FILTERS: OpportunityFilters = {
  query: "",
  categoryIds: [],
  workModes: [],
  levels: [],
  types: [],
  durations: [],
  ageGroup: "",
  city: "",
  budgetMin: 0,
  budgetMax: BUDGET_SLIDER_MAX,
  isUrgent: false,
  requiresNoExperience: false,
  sort: "newest",
};

function splitList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

export function filtersFromSearchParams(
  params: URLSearchParams,
): OpportunityFilters {
  return {
    query: params.get("q") ?? "",
    categoryIds: splitList(params.get("cat")),
    workModes: splitList(params.get("mode")) as WorkMode[],
    levels: splitList(params.get("level")) as SkillLevel[],
    types: splitList(params.get("type")) as OpportunityType[],
    durations: splitList(params.get("dur")) as DurationBucket[],
    ageGroup: (params.get("age") ?? "") as AgeGroup | "",
    city: params.get("city") ?? "",
    budgetMin: Number(params.get("min") ?? 0),
    budgetMax: Number(params.get("max") ?? BUDGET_SLIDER_MAX),
    isUrgent: params.get("urgent") === "1",
    requiresNoExperience: params.get("noexp") === "1",
    sort: (params.get("sort") ?? "newest") as OpportunitySort,
  };
}

export function filtersToSearchParams(
  filters: OpportunityFilters,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query) params.set("q", filters.query);
  if (filters.categoryIds.length) params.set("cat", filters.categoryIds.join(","));
  if (filters.workModes.length) params.set("mode", filters.workModes.join(","));
  if (filters.levels.length) params.set("level", filters.levels.join(","));
  if (filters.types.length) params.set("type", filters.types.join(","));
  if (filters.durations.length) params.set("dur", filters.durations.join(","));
  if (filters.ageGroup) params.set("age", filters.ageGroup);
  if (filters.city) params.set("city", filters.city);
  if (filters.budgetMin > 0) params.set("min", String(filters.budgetMin));
  if (filters.budgetMax < BUDGET_SLIDER_MAX) {
    params.set("max", String(filters.budgetMax));
  }
  if (filters.isUrgent) params.set("urgent", "1");
  if (filters.requiresNoExperience) params.set("noexp", "1");
  if (filters.sort !== "newest") params.set("sort", filters.sort);

  return params;
}

export function isBudgetFilterActive(filters: OpportunityFilters): boolean {
  return filters.budgetMin > 0 || filters.budgetMax < BUDGET_SLIDER_MAX;
}

/** Number of active filters (search text and sort are not counted). */
export function countActiveFilters(filters: OpportunityFilters): number {
  return (
    filters.categoryIds.length +
    filters.workModes.length +
    filters.levels.length +
    filters.types.length +
    filters.durations.length +
    (filters.ageGroup ? 1 : 0) +
    (filters.city ? 1 : 0) +
    (isBudgetFilterActive(filters) ? 1 : 0) +
    (filters.isUrgent ? 1 : 0) +
    (filters.requiresNoExperience ? 1 : 0)
  );
}

export function getDurationBucket(durationDays: number): DurationBucket {
  if (durationDays <= 3) return "short";
  if (durationDays <= 7) return "week";
  if (durationDays <= 30) return "month";
  return "long";
}

function normalizePersian(text: string): string {
  return text.replace(/ي/g, "ی").replace(/ك/g, "ک").toLowerCase();
}

/** Client-side matching. The real backend will do this filtering itself. */
export function matchesFilters(
  opportunity: Opportunity,
  filters: OpportunityFilters,
): boolean {
  if (filters.query) {
    const haystack = normalizePersian(
      [opportunity.title, opportunity.employerName, ...opportunity.skills].join(" "),
    );
    const words = filters.query.trim().split(/\s+/);
    if (!words.every((word) => haystack.includes(normalizePersian(word)))) {
      return false;
    }
  }

  if (
    filters.categoryIds.length &&
    !filters.categoryIds.includes(opportunity.categoryId)
  ) {
    return false;
  }

  if (
    filters.workModes.length &&
    !filters.workModes.some(
      (mode) => opportunity.workMode === mode || opportunity.workMode === "both",
    )
  ) {
    return false;
  }

  if (filters.levels.length && !filters.levels.includes(opportunity.level)) {
    return false;
  }

  if (filters.types.length && !filters.types.includes(opportunity.type)) {
    return false;
  }

  if (
    filters.durations.length &&
    !filters.durations.includes(getDurationBucket(opportunity.durationDays))
  ) {
    return false;
  }

  if (filters.ageGroup === "under18" && opportunity.minAge > 15) return false;

  if (
    filters.city &&
    opportunity.workMode !== "online" &&
    opportunity.city !== filters.city
  ) {
    return false;
  }

  if (
    opportunity.budget < filters.budgetMin ||
    opportunity.budget > filters.budgetMax
  ) {
    return false;
  }

  if (filters.isUrgent && opportunity.deadlineInDays > URGENT_DEADLINE_DAYS) {
    return false;
  }

  if (filters.requiresNoExperience && !opportunity.requiresNoExperience) {
    return false;
  }

  return true;
}

export function sortOpportunities(
  opportunities: Opportunity[],
  sort: OpportunitySort,
): Opportunity[] {
  const sorted = [...opportunities];

  if (sort === "deadline") {
    sorted.sort((a, b) => a.deadlineInDays - b.deadlineInDays);
  } else if (sort === "budget") {
    sorted.sort((a, b) => b.budget - a.budget);
  } else {
    sorted.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }

  return sorted;
}
