import { Wallet } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import type { SeekerAd } from "@/types/Seeker/seeker";
import { formatJalaliDate, formatToman } from "@/utils/formatToman";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface ConditionRow {
  label: string;
  value: string;
}

interface AdConditionsCardProps {
  ad?: SeekerAd;
  rows?: ConditionRow[];
}

export function AdConditionsCard({ ad, rows: customRows }: AdConditionsCardProps) {
  let rows = customRows ?? [];

  if (!customRows && ad) {
    const isWork = ad.kind === "work";
    const amountLabel = isWork ? "بودجه" : "کمک‌هزینه";
    const amountValue = isWork
      ? formatToman(ad.budget ?? 0)
      : ad.stipend
        ? `${formatToman(ad.stipend)} / ماه`
        : "بدون کمک‌هزینه";

    rows = [
      { label: amountLabel, value: amountValue },
      { label: "مهلت درخواست", value: formatJalaliDate(ad.deadline) },
      { label: "مدت همکاری", value: ad.collabDuration },
      { label: "درخواست‌ها", value: `${toPersianDigits(ad.applicantsCount)} نفر` },
    ];
  }

  return (
    <SectionCard title="شرایط" icon={<Wallet size={15} aria-hidden="true" />}>
      <dl className="flex flex-col gap-3 text-caption">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <dt className="text-text-secondary">{row.label}</dt>
            <dd className="text-start font-bold text-text-primary">{row.value}</dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}
