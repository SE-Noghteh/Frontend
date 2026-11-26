import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import { getOpportunities } from "@/services/Opportunity/opportunityService";
import type { OpportunityFilters } from "@/types/Opportunity/opportunity";

/** Opportunities matching the given filters. Keeps the previous list while refetching. */
export function useOpportunities(filters: OpportunityFilters) {
  return useQuery({
    queryKey: opportunityKeys.list(filters),
    queryFn: () => getOpportunities(filters),
    placeholderData: keepPreviousData,
  });
}
