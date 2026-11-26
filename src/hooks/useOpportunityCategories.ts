import { useQuery } from "@tanstack/react-query";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import { getOpportunityCategories } from "@/services/Opportunity/opportunityService";

export function useOpportunityCategories() {
  return useQuery({
    queryKey: opportunityKeys.categories(),
    queryFn: getOpportunityCategories,
    staleTime: Infinity,
  });
}
