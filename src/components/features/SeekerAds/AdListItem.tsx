import { Clock } from "lucide-react";

import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { AdMatchBadge } from "@/components/features/SeekerAds/AdMatchBadge";
import { SaveAdButton } from "@/components/features/SeekerAds/SaveAdButton";
import { ButtonLink } from "@/components/ui/Button";
import type { SeekerAd } from "@/types/Seeker/seeker";
import { formatAdAmount } from "@/utils/formatAdAmount";
import { formatJalaliDate } from "@/utils/formatToman";

interface AdListItemProps {
  ad: SeekerAd;
  onToggleSave: (adId: string) => void;
}

export function AdListItem({ ad, onToggleSave }: AdListItemProps) {
  return (
    <article className="rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:px-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-body leading-7 font-bold text-text-primary md:text-card-title">{ad.title}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          <AdMatchBadge percent={ad.matchPercent} />
          <SaveAdButton isSaved={ad.saved} onToggle={() => onToggleSave(ad.id)} />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-caption text-text-secondary">
          <AdKindTag kind={ad.kind} />
          <span className="inline-flex items-center gap-1">
            <Clock size={13} aria-hidden="true" />
            مهلت درخواست {formatJalaliDate(ad.deadline)}
          </span>
          <span>
            {ad.employerName} · {formatAdAmount(ad)}
          </span>
        </div>

        <ButtonLink to={`/seeker/ads/${ad.id}`} size="sm" className="self-start md:self-auto">
          مشاهده و درخواست
        </ButtonLink>
      </div>
    </article>
  );
}
