import { Check } from "lucide-react";

import { StatusChip } from "@/components/ui/StatusChip";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface AdMatchBadgeProps {
  percent: number;
}

export function AdMatchBadge({ percent }: AdMatchBadgeProps) {
  return (
    <StatusChip tone="success" icon={<Check size={12} aria-hidden="true" />}>
      تطابق {toPersianDigits(percent)}٪
    </StatusChip>
  );
}
