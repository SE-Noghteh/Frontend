import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Reveal } from "@/components/ui/Reveal";
import { EASE_OUT } from "@/constants/motion";
import { useOpportunities } from "@/hooks/useOpportunities";
import type { OpportunityFilters } from "@/types/Opportunity/opportunity";
import {
  EMPTY_OPPORTUNITY_FILTERS,
  countActiveFilters,
  filtersToSearchParams,
} from "@/utils/opportunityFilters";
import { toPersianDigits } from "@/utils/toPersianDigits";

import { OpportunityFilterBar } from "../Opportunity/OpportunityFilterBar";
import { OpportunityGrid } from "../Opportunity/OpportunityGrid";
import { OpportunitySearchBox } from "../Opportunity/OpportunitySearchBox";
import { OpportunityShowcaseRow } from "../Opportunity/OpportunityShowcaseRow";

const NO_EXPERIENCE_FILTERS: OpportunityFilters = {
  ...EMPTY_OPPORTUNITY_FILTERS,
  requiresNoExperience: true,
};
const URGENT_FILTERS: OpportunityFilters = {
  ...EMPTY_OPPORTUNITY_FILTERS,
  isUrgent: true,
};
const PREVIEW_RESULTS = 8;

/**
 * Search box + filters on the landing page.
 * Without filters it shows two curated rows; with filters it previews the results
 * and offers a link to the full search page.
 */
export function OpportunitySearchSection() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<OpportunityFilters>(EMPTY_OPPORTUNITY_FILTERS);

  const activeCount = countActiveFilters(filters);
  const hasFilters = activeCount > 0;

  const { data: results = [] } = useOpportunities(filters);
  const { data: noExperience = [] } = useOpportunities(NO_EXPERIENCE_FILTERS);
  const { data: urgent = [] } = useOpportunities(URGENT_FILTERS);

  const goToSearchPage = (next: OpportunityFilters) =>
    navigate(`/search?${filtersToSearchParams(next).toString()}`);

  return (
    <section id="search" className="relative z-10 mx-auto -mt-10 max-w-[1200px] px-6">
      <Reveal className="rounded-[28px] border border-border-decorative bg-white/80 p-3 shadow-[0_32px_64px_-32px_rgba(29,53,87,.3)] backdrop-blur-xl sm:p-5">
        <OpportunitySearchBox
          value={filters.query}
          onValueChange={(query) => setFilters({ ...filters, query })}
          onSearch={(query) => goToSearchPage({ ...filters, query })}
        />
        <div className="mt-3">
          <OpportunityFilterBar filters={filters} onChange={setFilters} />
        </div>
      </Reveal>

      <div className="mt-12">
        <AnimatePresence mode="wait" initial={false}>
          {hasFilters ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-card-title font-extrabold text-text-primary">
                  {toPersianDigits(results.length)} فرصت مطابق فیلترهای تو
                </h3>
                {/* TODO: replace with the shared Button component. */}
                <button
                  type="button"
                  onClick={() => goToSearchPage(filters)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-action-primary px-5 py-2.5 text-label font-bold text-white transition-colors hover:bg-action-hover"
                >
                  مشاهده همه نتایج
                  <ArrowLeft className="size-4" />
                </button>
              </div>
              {results.length ? (
                <OpportunityGrid
                  opportunities={results}
                  limit={PREVIEW_RESULTS}
                  isCarouselOnMobile
                />
              ) : (
                <div className="rounded-2xl border border-dashed border-border-decorative bg-white/60 p-10 text-center text-label text-charcoal-2">
                  با این ترکیب فیلتر چیزی پیدا نشد؛ یکی‌دو فیلتر رو بردار.
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="rows"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="space-y-12"
            >
              <OpportunityShowcaseRow
                title="شروع بدون سابقه"
                subtitle="پروژه‌هایی که برای اولین تجربه کاری مناسبن"
                viewAllTo="/search?noexp=1"
                opportunities={noExperience}
              />
              <OpportunityShowcaseRow
                title="مهلت‌شون نزدیکه"
                subtitle="تا ۳ روز آینده می‌تونی درخواست بدی"
                viewAllTo="/search?urgent=1"
                opportunities={urgent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
