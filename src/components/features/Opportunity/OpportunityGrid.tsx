import { AnimatePresence, motion } from "framer-motion";

import type { Opportunity } from "@/types/Opportunity/opportunity";

import { OpportunityCard } from "./OpportunityCard";

interface OpportunityGridProps {
  opportunities: Opportunity[];
  /** Keep only the first N items (landing rows show a preview). */
  limit?: number;
  /**
   * On phones the cards become a horizontal snap carousel instead of a stacked grid.
   * Used on the landing page to keep rows compact.
   */
  isCarouselOnMobile?: boolean;
}

const CAROUSEL_CLASS =
  "max-sm:flex max-sm:snap-x max-sm:gap-3 max-sm:overflow-x-auto max-sm:pb-2 hide-scrollbar [&>article]:w-[60%] [&>article]:shrink-0 [&>article]:snap-start sm:[&>article]:w-auto";

/** Responsive list of opportunity cards (shared by the landing page and the search page). */
export function OpportunityGrid({
  opportunities,
  limit,
  isCarouselOnMobile = false,
}: OpportunityGridProps) {
  const visible = limit ? opportunities.slice(0, limit) : opportunities;

  return (
    <motion.div
      layout
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${isCarouselOnMobile ? CAROUSEL_CLASS : ""}`}
    >
      <AnimatePresence mode="popLayout">
        {visible.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
