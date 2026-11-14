import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bookmark,
  Clock,
  MapPin,
  Monitor,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { EASE_OUT } from "@/constants/motion";
import {
  OPPORTUNITY_TYPE_LABEL,
  SKILL_LEVEL_LABEL,
  URGENT_DEADLINE_DAYS,
  WORK_MODE_LABEL,
} from "@/constants/opportunityOptions";
import type { Opportunity } from "@/types/Opportunity/opportunity";
import { formatBudget } from "@/utils/formatBudget";
import { toPersianDigits } from "@/utils/toPersianDigits";

import { CategoryIllustration } from "./CategoryIllustration";
import { OpportunityTag } from "./OpportunityTag";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

/** Summary card of one opportunity (job / internship). */
export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  // TODO: persist bookmarks through the backend once the endpoint exists.
  const [isSaved, setIsSaved] = useState(false);
  const isUrgent = opportunity.deadlineInDays <= URGENT_DEADLINE_DAYS;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-border-decorative bg-surface-card shadow-[0_1px_0_rgba(29,53,87,.04),0_8px_24px_-12px_rgba(29,53,87,.14)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(29,53,87,.04),0_18px_36px_-16px_rgba(29,53,87,.22)]"
    >
      {/* TODO: link to the opportunity details page when it exists. */}
      <Link
        to={`/search?cat=${opportunity.categoryId}`}
        className="absolute inset-0 z-10"
        aria-label={opportunity.title}
      />

      <div className="relative aspect-[16/6] overflow-hidden sm:aspect-[16/8]">
        <CategoryIllustration
          categoryId={opportunity.categoryId}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-2 top-2 flex items-center justify-between sm:inset-x-3 sm:top-3">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-caption font-semibold text-text-primary backdrop-blur sm:px-2.5 sm:py-1 sm:text-caption">
            {OPPORTUNITY_TYPE_LABEL[opportunity.type]}
          </span>
          {/* TODO: replace with the shared Button component. */}
          <button
            type="button"
            onClick={() => setIsSaved((previous) => !previous)}
            aria-label="ذخیره"
            aria-pressed={isSaved}
            className="relative z-20 grid size-7 place-items-center rounded-full bg-white/90 text-text-primary backdrop-blur transition-colors hover:bg-white sm:size-8"
          >
            <Bookmark className={`size-4 transition-all ${isSaved ? "fill-blue" : ""}`} />
          </button>
        </div>
        {isUrgent && (
          <span className="absolute bottom-2 start-2 flex items-center gap-1 rounded-full bg-action-primary px-2 py-0.5 text-caption font-medium text-white sm:bottom-3 sm:start-3 sm:px-2.5 sm:py-1 sm:text-caption">
            <Clock className="size-3" />
            {toPersianDigits(opportunity.deadlineInDays)} روز تا مهلت
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="flex items-center gap-1.5 text-caption text-charcoal-2 sm:text-caption">
          <span className="font-medium text-text-primary">{opportunity.employerName}</span>
          <BadgeCheck className="size-3.5 text-green-3" aria-label="کارفرمای تأییدشده" />
          <span className="ms-auto flex items-center gap-0.5">
            <Star className="size-3 fill-status-warning text-status-warning" />
            {toPersianDigits(opportunity.employerRating)}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[2.9em] text-label font-bold leading-[1.45] text-text-primary sm:text-body">
          {opportunity.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          <OpportunityTag
            icon={
              opportunity.workMode === "online" ? (
                <Monitor className="size-3" />
              ) : (
                <MapPin className="size-3" />
              )
            }
          >
            {WORK_MODE_LABEL[opportunity.workMode]}
            {opportunity.city ? ` · ${opportunity.city}` : ""}
          </OpportunityTag>
          <OpportunityTag>{SKILL_LEVEL_LABEL[opportunity.level]}</OpportunityTag>
          {opportunity.minAge === 15 && (
            <OpportunityTag hideOnMobile icon={<ShieldCheck className="size-3" />}>
              با رضایت والد
            </OpportunityTag>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-border-decorative pt-2 sm:pt-3">
          <div>
            <div className="text-caption text-charcoal-2">
              {opportunity.hasStipend ? "کمک‌هزینه ماهانه" : "مبلغ پروژه"}
            </div>
            <div className="text-label font-extrabold text-text-primary sm:text-body">
              {formatBudget(opportunity.budget)}{" "}
              <span className="text-caption font-medium text-charcoal-2">تومان</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-caption text-charcoal-2 sm:text-caption">
            <Users className="size-3.5" />
            {toPersianDigits(opportunity.applicantsCount)} درخواست
          </div>
        </div>
      </div>
    </motion.article>
  );
}
