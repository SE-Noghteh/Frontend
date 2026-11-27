import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import { getOpportunities } from "@/services/Opportunity/opportunityService";
import type { OpportunityFilters } from "@/types/Opportunity/opportunity";

/**
 * Backward-compatible list hook used by landing/live suggestions.
 * The full search page uses useOpportunityPage for real backend pagination.
 */
export function useOpportunities(filters: OpportunityFilters) {
  return useQuery({
    queryKey: opportunityKeys.list(filters),
    queryFn: () => getOpportunities(filters),
    placeholderData: keepPreviousData,
  });
}
