import { useQuery } from "@tanstack/react-query";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import { getOpportunityById } from "@/services/Opportunity/opportunityService";

/** Loads an opportunity by the exact ID used in the public search result. */
export function useOpportunity(opportunityId: string | undefined) {
  return useQuery({
    queryKey: opportunityKeys.detail(opportunityId ?? ""),
    queryFn: () => getOpportunityById(opportunityId ?? ""),
    enabled: Boolean(opportunityId),
  });
}
