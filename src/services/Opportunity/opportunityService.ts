/**
 * Opportunity API communication.
 *
 * Currently backed by mock data. To connect the backend, replace the body of
 * each function with a real request (keep the signatures): hooks, pages and
 * components need no change.
 */

import {
  MOCK_OPPORTUNITIES,
  } from "@/data/mockOpportunities";
import {
  MOCK_OPPORTUNITY_CATEGORIES,
  MOCK_TRENDING_SEARCHES,
} from "@/data/mockOpportunityCategories";
import type {
  Opportunity,
  OpportunityCategory,
  OpportunityFilters,
} from "@/types/Opportunity/opportunity";
import { matchesFilters, sortOpportunities } from "@/utils/opportunityFilters";

export function getOpportunities(
  filters: OpportunityFilters,
): Promise<Opportunity[]> {
  // TODO: replace with a real API request, e.g. GET /opportunities?...
  const matched = MOCK_OPPORTUNITIES.filter((opportunity) =>
    matchesFilters(opportunity, filters),
  );

  return Promise.resolve(sortOpportunities(matched, filters.sort));
}

export function getOpportunityCategories(): Promise<OpportunityCategory[]> {
  // TODO: replace with a real API request, e.g. GET /opportunity-categories
  return Promise.resolve(MOCK_OPPORTUNITY_CATEGORIES);
}

export function getTrendingSearches(): Promise<string[]> {
  // TODO: replace with a real API request, e.g. GET /opportunities/trending-searches
  return Promise.resolve(MOCK_TRENDING_SEARCHES);
}
