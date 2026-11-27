import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type { OpportunityFilters } from "@/types/Opportunity/opportunity";
import {
  filtersFromSearchParams,
  filtersToSearchParams,
} from "@/utils/opportunityFilters";

function readPage(searchParams: URLSearchParams): number {
  const parsed = Number(searchParams.get("page") ?? "1");
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function useOpportunityFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const page = useMemo(() => readPage(searchParams), [searchParams]);

  const setFilters = useCallback(
    (next: OpportunityFilters) => {
      // A filter/search/sort change always returns to page 1.
      setSearchParams(filtersToSearchParams(next), { replace: true });
    },
    [setSearchParams],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      const next = new URLSearchParams(searchParams);
      const normalized = Math.max(1, Math.floor(nextPage));

      if (normalized === 1) next.delete("page");
      else next.set("page", String(normalized));

      setSearchParams(next, { replace: false });
    },
    [searchParams, setSearchParams],
  );

  return { filters, setFilters, page, setPage };
}
