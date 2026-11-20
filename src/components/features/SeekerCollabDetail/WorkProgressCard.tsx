import { Flag } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { formatJalaliDate } from "@/utils/formatToman";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface WorkProgressCardProps {
  deliveryDate: string;
  /** Highest percent reported so far. */
  percent: number;
  daysLeft: number;
}

export function WorkProgressCard({ deliveryDate, percent, daysLeft }: WorkProgressCardProps) {
  return (
    <SectionCard title="پیشرفت کار" icon={<Flag size={15} aria-hidden="true" />}>
      <div className="flex items-center justify-between text-caption text-text-secondary">
        <span>{toPersianDigits(daysLeft)} روز مانده</span>
        <span>تحویل {formatJalaliDate(deliveryDate)}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="پیشرفت کار"
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-border-soft"
      >
        <div className="h-full rounded-full bg-blue" style={{ width: `${percent}%` }} />
      </div>
    </SectionCard>
  );
}
