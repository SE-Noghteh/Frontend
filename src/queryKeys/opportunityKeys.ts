import type { OpportunityFilters } from "@/types/Opportunity/opportunity";

export const opportunityKeys = {
  all: ["opportunities"] as const,

  lists: () => [...opportunityKeys.all, "list"] as const,
  list: (filters: OpportunityFilters) =>
    [...opportunityKeys.lists(), filters] as const,

  page: (filters: OpportunityFilters, page: number, limit: number) =>
    [...opportunityKeys.lists(), "page", filters, page, limit] as const,

  detail: (id: string) =>
    [...opportunityKeys.all, "detail", id] as const,

  dashboard: (params: object) =>
    [...opportunityKeys.all, "dashboard", params] as const,

  categories: () =>
    [...opportunityKeys.all, "categories"] as const,

  trendingSearches: () =>
    [...opportunityKeys.all, "trending-searches"] as const,
};
