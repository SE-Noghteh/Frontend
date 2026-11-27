import { ChevronLeft, Flag } from "lucide-react";

import { AdMatchBadge } from "@/components/features/SeekerAds/AdMatchBadge";
import { ButtonLink } from "@/components/ui/Button";
import type { SeekerAd } from "@/types/Seeker/seeker";
import { formatAdAmount } from "@/utils/formatAdAmount";

interface RecommendedAdsProps {
  ads: SeekerAd[];
  onShowAll: () => void;
}

export function RecommendedAds({
  ads,
  onShowAll,
}: RecommendedAdsProps) {
  if (ads.length === 0) return null;

  return (
    <section
      aria-labelledby="recommended-ads-title"
      className="rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:p-5"
    >
      <header className="mb-3 flex items-center justify-between gap-3">
        <h2
          id="recommended-ads-title"
          className="flex items-center gap-2.5 text-body font-bold text-text-primary"
        >
          <span className="grid size-8 place-items-center rounded-full bg-brand-peach-soft text-error">
            <Flag size={15} aria-hidden="true" />
          </span>
          آگهی‌های مناسب تو
        </h2>

        <button
          type="button"
          onClick={onShowAll}
          className="inline-flex items-center gap-1 text-caption font-medium text-text-secondary transition hover:text-text-primary"
        >
          همه پیشنهادها
          <ChevronLeft size={14} aria-hidden="true" />
        </button>
      </header>

      <ul className="flex flex-col gap-2">
        {ads.map((ad) => (
          <li
            key={ad.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl bg-background-page/70 px-3 py-2.5 md:flex-nowrap"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ocean-8 text-label font-bold text-ocean-3">
              {ad.employerInitial}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-label font-bold text-text-primary">
                {ad.title}
              </p>
              <p className="truncate text-caption text-text-secondary">
                {ad.employerName} · {formatAdAmount(ad)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {ad.matchPercent !== undefined ? (
                <AdMatchBadge percent={ad.matchPercent} />
              ) : null}

              <ButtonLink
                to={ad.detailPath ?? `/seeker/ads/${ad.id}`}
                variant="secondary"
                size="sm"
                className="hidden md:inline-flex"
              >
                مشاهده آگهی
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
