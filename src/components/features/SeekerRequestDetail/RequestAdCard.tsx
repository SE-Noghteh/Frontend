import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionCard } from "@/components/ui/SectionCard";
import type { SeekerAd } from "@/types/Seeker/seeker";
import { formatAdAmount } from "@/utils/formatAdAmount";
import { formatJalaliDate } from "@/utils/formatToman";

interface RequestAdCardProps {
  ad: SeekerAd;
}

/** Short summary of the ad the request belongs to. */
export function RequestAdCard({ ad }: RequestAdCardProps) {
  const rows = [
    { label: "نوع", value: ad.kind === "work" ? "کاری" : "کارآموزی" },
    { label: ad.kind === "work" ? "بودجه" : "کمک‌هزینه", value: formatAdAmount(ad).replace("کمک‌هزینه ", "") },
    { label: "مهلت", value: formatJalaliDate(ad.deadline) },
  ];

  return (
    <SectionCard title="آگهی" icon={<Megaphone size={15} aria-hidden="true" />}>
      <dl className="flex flex-col gap-3 text-caption">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <dt className="text-text-secondary">{row.label}</dt>
            <dd className="font-bold text-text-primary">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 text-center">
        <Link to={`/seeker/ads/${ad.id}`} className="text-caption font-bold text-ocean-3 hover:underline">
          مشاهده آگهی
        </Link>
      </div>
    </SectionCard>
  );
}
