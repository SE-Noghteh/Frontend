import { useMutation, useQueryClient } from "@tanstack/react-query";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import {
  saveOpportunity,
  unsaveOpportunity,
} from "@/services/Seeker/seekerOpportunityService";

export function useOpportunitySave() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      saved,
    }: {
      id: string;
      saved: boolean;
    }) => {
      if (saved) await unsaveOpportunity(id);
      else await saveOpportunity(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: opportunityKeys.all,
      });
    },
  });

  return {
    toggleSaved: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
