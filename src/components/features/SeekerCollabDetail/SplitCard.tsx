import { Columns2 } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { formatToman } from "@/utils/formatToman";
import { getEarnings } from "@/utils/getCollabView";
import { toPersianDigits } from "@/utils/toPersianDigits";

const SEEKER_SHARE = 0.6;

interface SplitCardProps {
  amount: number;
}

/** "تقسیم مبلغ": the admin's decision splitting the net amount between seeker and employer. */
export function SplitCard({ amount }: SplitCardProps) {
  const { net } = getEarnings(amount);
  const seekerPart = Math.round(net * SEEKER_SHARE);
  const refundPart = net - seekerPart;

  return (
    <SectionCard title="تقسیم مبلغ" icon={<Columns2 size={15} aria-hidden="true" />}>
      <dl className="flex flex-col gap-3 text-caption">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">سهم تو ({toPersianDigits(SEEKER_SHARE * 100)}٪)</dt>
          <dd className="font-bold text-text-primary">{formatToman(seekerPart)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">عودت به کارفرما ({toPersianDigits(100 - SEEKER_SHARE * 100)}٪)</dt>
          <dd className="font-bold text-text-primary">{formatToman(refundPart)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border-soft pt-3">
          <dt className="text-text-secondary">واریز به کیف پول</dt>
          <dd className="text-body font-bold text-blue">{formatToman(seekerPart)}</dd>
        </div>
      </dl>
    </SectionCard>
  );
}
