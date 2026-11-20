import { Wallet } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { formatToman } from "@/utils/formatToman";
import { getEarnings, PLATFORM_FEE_RATE } from "@/utils/getCollabView";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface EarningsCardProps {
  amount: number;
}

/** "دریافتی تو": contract amount minus the platform fee. */
export function EarningsCard({ amount }: EarningsCardProps) {
  const { fee, net } = getEarnings(amount);

  return (
    <SectionCard title="دریافتی تو" icon={<Wallet size={15} aria-hidden="true" />}>
      <dl className="flex flex-col gap-3 text-caption">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">مبلغ قرارداد</dt>
          <dd className="font-bold text-text-primary">{formatToman(amount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">کارمزد پلتفرم ({toPersianDigits(PLATFORM_FEE_RATE * 100)}٪)</dt>
          <dd dir="ltr" className="font-bold text-text-primary">
            − {toPersianDigits(fee.toLocaleString("en-US").replace(/,/g, "٬"))}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border-soft pt-3">
          <dt className="text-text-secondary">دریافتی خالص</dt>
          <dd className="text-body font-bold text-blue">{formatToman(net)}</dd>
        </div>
      </dl>
    </SectionCard>
  );
}
