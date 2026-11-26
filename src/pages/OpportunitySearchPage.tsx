/**
 * Opportunity search page (first version).
 * Filters live in the URL search params; results come from useOpportunities.
 * TODO: complete the page (pagination, saved searches, mobile filter drawer, ...).
 */

import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { OpportunityEmptyState } from "@/components/features/Opportunity/OpportunityEmptyState";
import { OpportunityFilterBar } from "@/components/features/Opportunity/OpportunityFilterBar";
import { OpportunityGrid } from "@/components/features/Opportunity/OpportunityGrid";
import { OpportunitySortSelect } from "@/components/features/Opportunity/OpportunitySortSelect";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useOpportunityFilters } from "@/hooks/useOpportunityFilters";
import { toPersianDigits } from "@/utils/toPersianDigits";

export default function OpportunitySearchPage() {
  const { filters, setFilters } = useOpportunityFilters();
  const { data: opportunities = [], isPending } = useOpportunities(filters);

  return (
    <div className="min-h-screen bg-surface-info">
      <div className="sticky top-0 z-30 border-b border-border-decorative bg-surface-info/90 backdrop-blur-xl">
        <SectionContainer className="py-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="بازگشت"
              className="grid size-11 shrink-0 place-items-center rounded-xl border border-border-decorative bg-surface-card text-text-primary transition-colors hover:border-action-primary"
            >
              <ArrowRight className="size-5" />
            </Link>
            <label className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-border-decorative bg-surface-card px-3 focus-within:border-action-primary">
              <Search className="size-4 text-charcoal-2" />
              <input
                value={filters.query}
                onChange={(event) => setFilters({ ...filters, query: event.target.value })}
                placeholder="جستجو در فرصت‌ها"
                className="w-full bg-transparent text-label outline-none"
              />
            </label>
            <OpportunitySortSelect
              value={filters.sort}
              onChange={(sort) => setFilters({ ...filters, sort })}
            />
          </div>
          <div className="mt-2">
            <OpportunityFilterBar filters={filters} onChange={setFilters} />
          </div>
        </SectionContainer>
      </div>

      <SectionContainer className="py-8">
        <p className="mb-5 text-label text-charcoal-2">
          <b className="text-text-primary">{toPersianDigits(opportunities.length)}</b> فرصت پیدا شد
        </p>
        {opportunities.length > 0 ? (
          <OpportunityGrid opportunities={opportunities} />
        ) : (
          !isPending && <OpportunityEmptyState />
        )}
      </SectionContainer>
    </div>
  );
}
