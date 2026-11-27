import { ArrowRight, Search } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { OpportunityEmptyState } from "@/components/features/Opportunity/OpportunityEmptyState";
import { OpportunityFilterBar } from "@/components/features/Opportunity/OpportunityFilterBar";
import { OpportunityGrid } from "@/components/features/Opportunity/OpportunityGrid";
import { OpportunityPagination } from "@/components/features/Opportunity/OpportunityPagination";
import { OpportunitySortSelect } from "@/components/features/Opportunity/OpportunitySortSelect";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useOpportunityFilters } from "@/hooks/useOpportunityFilters";
import { useOpportunityPage } from "@/hooks/useOpportunityPage";
import { toPersianDigits } from "@/utils/toPersianDigits";

const PAGE_SIZE = 20;

export default function OpportunitySearchPage() {
  const { filters, setFilters, page, setPage } = useOpportunityFilters();
  const {
    data,
    isPending,
    isFetching,
    isError,
  } = useOpportunityPage(filters, page, PAGE_SIZE);

  const opportunities = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    if (!isPending && page !== currentPage) {
      setPage(currentPage);
    }
  }, [currentPage, isPending, page, setPage]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background-page">
      <div className="sticky top-0 z-30 border-b border-border-decorative bg-background-page/90 backdrop-blur-xl">
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
                onChange={(event) =>
                  setFilters({ ...filters, query: event.target.value })
                }
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
            <OpportunityFilterBar
              filters={filters}
              onChange={setFilters}
            />
          </div>
        </SectionContainer>
      </div>

      <SectionContainer className="py-8">
        <div className="mb-5 flex items-center justify-between gap-3 text-label text-charcoal-2">
          <p>
            <b className="text-text-primary">
              {toPersianDigits(total)}
            </b>{" "}
            فرصت پیدا شد
          </p>

          {isFetching && !isPending ? (
            <span className="text-caption">در حال به‌روزرسانی...</span>
          ) : null}
        </div>

        {isError ? (
          <div className="rounded-2xl border border-error/30 bg-error-soft p-6 text-center text-label text-error">
            دریافت آگهی‌ها از سرور انجام نشد. اتصال شبکه و API را بررسی کن.
          </div>
        ) : opportunities.length > 0 ? (
          <>
            <OpportunityGrid opportunities={opportunities} />
            <OpportunityPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          !isPending && <OpportunityEmptyState />
        )}
      </SectionContainer>
    </div>
  );
}
