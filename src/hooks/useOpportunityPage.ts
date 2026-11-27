import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import { getOpportunityPage } from "@/services/Opportunity/opportunityService";
import type { OpportunityFilters } from "@/types/Opportunity/opportunity";

export function useOpportunityPage(
  filters: OpportunityFilters,
  page: number,
  limit = 20,
) {
  const safePage = Math.max(1, Math.floor(page));
  const offset = (safePage - 1) * limit;

  return useQuery({
    queryKey: opportunityKeys.page(filters, safePage, limit),
    queryFn: () => getOpportunityPage(filters, { limit, offset }),
    placeholderData: keepPreviousData,
  });
}
