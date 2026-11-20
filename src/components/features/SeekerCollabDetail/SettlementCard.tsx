import { ArrowLeftRight } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { formatToman } from "@/utils/formatToman";
import { PLATFORM_FEE_RATE } from "@/utils/getCollabView";
import { toPersianDigits } from "@/utils/toPersianDigits";

const DONE_SHARE = 0.75;

interface SettlementCardProps {
  amount: number;
}

/** "تسویه‌ی لغو": what the seeker gets when the employer cancels after part of the work. */
export function SettlementCard({ amount }: SettlementCardProps) {
  const doneAmount = Math.round(amount * DONE_SHARE);
  const fee = Math.round(doneAmount * PLATFORM_FEE_RATE);
  const refund = amount - doneAmount;
  const payout = doneAmount - fee;

  return (
    <SectionCard title="تسویه‌ی لغو" icon={<ArrowLeftRight size={15} aria-hidden="true" />}>
      <dl className="flex flex-col gap-3 text-caption">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">کار انجام‌شده ({toPersianDigits(DONE_SHARE * 100)}٪)</dt>
          <dd className="font-bold text-text-primary">{formatToman(doneAmount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">کارمزد پلتفرم</dt>
          <dd className="font-bold text-text-primary">− {formatToman(fee)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">عودت به کارفرما</dt>
          <dd className="font-bold text-text-primary">{formatToman(refund)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border-soft pt-3">
          <dt className="text-text-secondary">واریز به کیف پول</dt>
          <dd className="text-body font-bold text-blue">{formatToman(payout)}</dd>
        </div>
      </dl>
    </SectionCard>
  );
}
