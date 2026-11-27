import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { opportunityKeys } from "@/queryKeys/opportunityKeys";
import {
  getSeekerOpportunityPage,
  saveOpportunity,
  unsaveOpportunity,
  type SeekerOpportunityQuery,
} from "@/services/Seeker/seekerOpportunityService";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import type {
  BudgetBucket,
  SeekerAd,
  SeekerAdCategory,
  SeekerAdKind,
  SeekerAdsSort,
  SeekerAdsTab,
} from "@/types/Seeker/seeker";

export interface SeekerAdsFilters {
  kind: SeekerAdKind | null;
  category: SeekerAdCategory | null;
  budget: BudgetBucket | null;
}

export const EMPTY_FILTERS: SeekerAdsFilters = {
  kind: null,
  category: null,
  budget: null,
};

function overlayMockApplicationState(
  ads: SeekerAd[],
  backendRequestIds: Set<string>,
): SeekerAd[] {
  return ads.map((ad) =>
    backendRequestIds.has(ad.id)
      ? { ...ad, application: "sentToEmployer" as const }
      : ad,
  );
}

export function useSeekerAds() {
  const queryClient = useQueryClient();
  const requests = useSeekerStore((state) => state.requests);

  const [tab, setTab] = useState<SeekerAdsTab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SeekerAdsSort>("newest");
  const [filters, setFilters] =
    useState<SeekerAdsFilters>(EMPTY_FILTERS);

  const hasActiveFilters =
    filters.kind !== null ||
    filters.category !== null ||
    filters.budget !== null;

  const dashboardQuery: SeekerOpportunityQuery = {
    tab,
    query,
    sort,
    category: filters.category,
    budget: filters.budget,
    limit: 100,
    offset: 0,
  };

  const pageQuery = useQuery({
    queryKey: opportunityKeys.dashboard(dashboardQuery),
    queryFn: () => getSeekerOpportunityPage(dashboardQuery),
    placeholderData: keepPreviousData,
  });

  const recommendedQueryConfig: SeekerOpportunityQuery = {
    tab: "recommended",
    query: "",
    sort: "match",
    category: null,
    budget: null,
    limit: 3,
    offset: 0,
  };

  const recommendedQuery = useQuery({
    queryKey: opportunityKeys.dashboard(recommendedQueryConfig),
    queryFn: () => getSeekerOpportunityPage(recommendedQueryConfig),
    placeholderData: keepPreviousData,
  });

  const saveMutation = useMutation({
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

  const backendRequestIds = useMemo(
    () =>
      new Set(
        requests
          .filter(
            (request) =>
              !request.demoOnly && request.sourceOpportunityId,
          )
          .map((request) => request.sourceOpportunityId as string),
      ),
    [requests],
  );

  const serverAds = pageQuery.data?.data ?? [];

  const ads = useMemo(() => {
    let result = overlayMockApplicationState(
      serverAds,
      backendRequestIds,
    );

    // Swagger dashboard uses one `tab`, so a kind filter is applied locally
    // when it needs to be combined with tabs such as `saved` or `for_me`.
    if (filters.kind) {
      result = result.filter((ad) => ad.kind === filters.kind);
    }

    return result;
  }, [backendRequestIds, filters.kind, serverAds]);

  const recommendedAds = useMemo(
    () =>
      overlayMockApplicationState(
        recommendedQuery.data?.data ?? [],
        backendRequestIds,
      ),
    [backendRequestIds, recommendedQuery.data?.data],
  );

  const toggleSaved = (adId: string) => {
    const ad =
      ads.find((item) => item.id === adId) ??
      recommendedAds.find((item) => item.id === adId);

    if (!ad || saveMutation.isPending) return;

    saveMutation.mutate({
      id: adId,
      saved: ad.saved,
    });
  };

  const clearFilters = () => {
    setQuery("");
    setFilters(EMPTY_FILTERS);
  };

  return {
    ads,
    total: pageQuery.data?.total ?? 0,
    recommendedAds,
    tab,
    setTab,
    query,
    setQuery,
    sort,
    setSort,
    filters,
    setFilters,
    hasActiveFilters,
    clearFilters,
    toggleSaved,
    isPending: pageQuery.isPending,
    isFetching: pageQuery.isFetching,
    isError: pageQuery.isError,
  };
}
