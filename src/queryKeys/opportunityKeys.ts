import type { OpportunityFilters } from "@/types/Opportunity/opportunity";

export const opportunityKeys = {
  all: ["opportunities"] as const,
  list: (filters: OpportunityFilters) =>
    [...opportunityKeys.all, "list", filters] as const,
  categories: () => [...opportunityKeys.all, "categories"] as const,
  trendingSearches: () => [...opportunityKeys.all, "trending-searches"] as const,
};
