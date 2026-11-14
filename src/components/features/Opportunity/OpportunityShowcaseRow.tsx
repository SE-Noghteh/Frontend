import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import type { Opportunity } from "@/types/Opportunity/opportunity";

import { OpportunityGrid } from "./OpportunityGrid";

interface OpportunityShowcaseRowProps {
  title: string;
  subtitle: string;
  /** Search page URL that shows every opportunity of this row. */
  viewAllTo: string;
  opportunities: Opportunity[];
}

/** Titled row of up to four opportunities with a "view all" link. */
export function OpportunityShowcaseRow({
  title,
  subtitle,
  viewAllTo,
  opportunities,
}: OpportunityShowcaseRowProps) {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-card-title font-extrabold text-text-primary">{title}</h3>
          <p className="mt-0.5 text-label text-charcoal-2">{subtitle}</p>
        </div>
        {/* TODO: replace with the shared Button component (link variant). */}
        <Link
          to={viewAllTo}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-decorative bg-surface-card px-4 py-2 text-label font-semibold text-text-primary transition-colors hover:border-action-primary"
        >
          مشاهده همه
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        </Link>
      </div>
      <OpportunityGrid opportunities={opportunities} limit={4} isCarouselOnMobile />
    </div>
  );
}
