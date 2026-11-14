import { useQuery } from "@tanstack/react-query";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import { getTrendingSearches } from "@/services/Opportunity/opportunityService";

export function useTrendingSearches() {
  return useQuery({
    queryKey: opportunityKeys.trendingSearches(),
    queryFn: getTrendingSearches,
    staleTime: Infinity,
  });
}
