import { useMemo, useState } from "react";
import { useEmployerStore } from "@/store/employer/useEmployerStore";
import { getEffectiveAdStatus } from "@/utils/employerAdStatus";
import { useAdClock } from "@/hooks/useAdClock";
import type { EmployerAdsTab, EmployerAdsSort } from "@/types/Employer/employer";

export function useEmployerAds() {
  const allAds = useEmployerStore(state => state.ads);
  const today = useAdClock();
  const [tab, setTab] = useState<EmployerAdsTab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<EmployerAdsSort>("newest");
  const ads = useMemo(() => {
    let result = [...allAds];
    if (tab === "inactive") {
      result = result.filter(ad => {
        const status = getEffectiveAdStatus(ad, today);
        return status === "closed" || status === "expired";
      });
    } else if (tab !== "all") {
      result = result.filter(ad => getEffectiveAdStatus(ad, today) === tab);
    }
    const search = query.trim().toLowerCase();
    if (search) result = result.filter(ad => ad.title.toLowerCase().includes(search));
    result.sort((a, b) => {
      switch (sort) {
        case "oldest": return a.createdAt.localeCompare(b.createdAt);
        case "most-applicants": return b.applicantsCount - a.applicantsCount;
        default: return b.createdAt.localeCompare(a.createdAt);
      }
    });
    return result;
  }, [allAds, tab, query, sort, today]);
  const clearFilters = () => { setTab("all"); setQuery(""); setSort("newest"); };
  return { ads, allAds, tab, setTab, query, setQuery, sort, setSort, clearFilters };
}
