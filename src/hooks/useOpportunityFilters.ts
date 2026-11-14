import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type { OpportunityFilters } from "@/types/Opportunity/opportunity";
import {
  filtersFromSearchParams,
  filtersToSearchParams,
} from "@/utils/opportunityFilters";

/**
 * Opportunity filters stored in the URL search params,
 * so a filtered search can be shared and survives a refresh.
 */
export function useOpportunityFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => filtersFromSearchParams(searchParams), [searchParams]);

  const setFilters = (next: OpportunityFilters) =>
    setSearchParams(filtersToSearchParams(next), { replace: true });

  return { filters, setFilters };
}
