import { useQuery } from "@tanstack/react-query";

import { landingKeys } from "@/queryKeys/landingKeys";
import { getPlatformStats } from "@/services/Landing/landingService";

export function usePlatformStats() {
  return useQuery({
    queryKey: landingKeys.stats(),
    queryFn: getPlatformStats,
  });
}
