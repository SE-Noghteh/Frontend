import { useQuery } from "@tanstack/react-query";

import { getParentProfile } from "@/services/Auth/Parent/parentAuthService";

export const parentProfileKey = ["parent", "me"] as const;

export function useParentProfile() {
  return useQuery({
    queryKey: parentProfileKey,
    queryFn: getParentProfile,
    retry: false,
  });
}
