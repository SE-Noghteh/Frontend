/**
 * Search, tab, sort and filter state of the seeker ads list.
 * Pure client-side for now; the returned `ads` is what the page renders.
 */

import { useMemo, useState } from "react";

import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import type { BudgetBucket, SeekerAd, SeekerAdCategory, SeekerAdKind, SeekerAdsSort, SeekerAdsTab } from "@/types/Seeker/seeker";
import { normalizeText } from "@/utils/normalizeText";

export interface SeekerAdsFilters {
  kind: SeekerAdKind | null;
  category: SeekerAdCategory | null;
  budget: BudgetBucket | null;
}

export const EMPTY_FILTERS: SeekerAdsFilters = { kind: null, category: null, budget: null };

function getAmount(ad: SeekerAd): number {
  return ad.budget ?? ad.stipend ?? 0;
}

function matchesBudget(ad: SeekerAd, bucket: BudgetBucket): boolean {
  const amount = getAmount(ad);
  if (bucket === "under1") return amount < 1_000_000;
  if (bucket === "from1to3") return amount >= 1_000_000 && amount <= 3_000_000;
  return amount > 3_000_000;
}

function sortAds(ads: SeekerAd[], sort: SeekerAdsSort): SeekerAd[] {
  const copy = [...ads];
  if (sort === "match") return copy.sort((a, b) => b.matchPercent - a.matchPercent);
  if (sort === "deadline") return copy.sort((a, b) => a.deadline.localeCompare(b.deadline));
  return copy;
}

export function useSeekerAds() {
  const allAds = useSeekerStore((state) => state.ads);
  const toggleSaved = useSeekerStore((state) => state.toggleSaved);

  const [tab, setTab] = useState<SeekerAdsTab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SeekerAdsSort>("newest");
  const [filters, setFilters] = useState<SeekerAdsFilters>(EMPTY_FILTERS);

  const hasActiveFilters = filters.kind !== null || filters.category !== null || filters.budget !== null;

  const ads = useMemo(() => {
    const needle = normalizeText(query.trim());

    let result = allAds.filter((ad) => {
      if (tab === "work" && ad.kind !== "work") return false;
      if (tab === "internship" && ad.kind !== "internship") return false;
      if (tab === "saved" && !ad.saved) return false;
      if (filters.kind && ad.kind !== filters.kind) return false;
      if (filters.category && ad.category !== filters.category) return false;
      if (filters.budget && !matchesBudget(ad, filters.budget)) return false;
      if (needle) {
        const haystack = normalizeText(`${ad.title} ${ad.employerName} ${ad.skills.join(" ")}`);
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });

    // "recommended" always ranks by match, whatever the sort select says.
    result = sortAds(result, tab === "recommended" ? "match" : sort);
    return result;
  }, [allAds, tab, query, sort, filters]);

  const recommendedAds = useMemo(() => allAds.slice(0, 3), [allAds]);

  const clearFilters = () => {
    setQuery("");
    setFilters(EMPTY_FILTERS);
  };

  return {
    ads,
    recommendedAds,
    tab,
    setTab,
    query,
    setQuery,
    sort,
    setSort,
    filters,
    setFilters,
    hasActiveFilters,
    clearFilters,
    toggleSaved,
  };
}
