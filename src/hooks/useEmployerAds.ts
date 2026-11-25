
import { useMemo, useState } from "react";

import { useEmployerStore } from "@/store/employer/useEmployerStore";

import type {
  EmployerAdsTab,
  EmployerAdsSort,
} from "@/types/Employer/employer";

export function useEmployerAds() {
  const allAds = useEmployerStore((state) => state.ads);

  const [tab, setTab] =
    useState<EmployerAdsTab>("all");

  const [query, setQuery] = useState("");

  const [sort, setSort] =
    useState<EmployerAdsSort>("newest");

  const ads = useMemo(() => {
    let result = [...allAds];

    if (tab === "inactive") {
      result = result.filter(
        (ad) =>
          ad.status === "closed" ||
          ad.status === "expired",
      );
    } else if (tab !== "all") {
      result = result.filter(
        (ad) => ad.status === tab,
      );
    }

    const search = query.trim().toLowerCase();

    if (search) {
      result = result.filter((ad) =>
        ad.title.toLowerCase().includes(search),
      );
    }

    result.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.createdAt.localeCompare(b.createdAt);

        case "most-applicants":
          return b.applicantsCount - a.applicantsCount;

        case "newest":
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });

    return result;
  }, [allAds, tab, query, sort]);

  const clearFilters = () => {
    setTab("all");
    setQuery("");
    setSort("newest");
  };

  return {
    ads,
    allAds,
    tab,
    setTab,
    query,
    setQuery,
    sort,
    setSort,
    clearFilters,
  };
}
