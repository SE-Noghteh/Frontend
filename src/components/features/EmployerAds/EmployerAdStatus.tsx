
import { StatusChip } from "@/components/ui/StatusChip";

import type { StatusTone } from "@/components/ui/StatusChip";
import type { EmployerAdStatus as AdStatus } from "@/types/Employer/employer";

const STATUS_CONFIG: Record<
  AdStatus,
  { label: string; tone: StatusTone }
> = {
  published: {
    label: "منتشرشده",
    tone: "success",
  },
  collaboration: {
    label: "در همکاری",
    tone: "info",
  },
  expired: {
    label: "منقضی",
    tone: "warning",
  },
  closed: {
    label: "بسته‌شده",
    tone: "neutral",
  },
};

interface EmployerAdStatusProps {
  status: AdStatus;
}

export function EmployerAdStatus({
  status,
}: EmployerAdStatusProps) {
  const config = STATUS_CONFIG[status];

  return (
    <StatusChip tone={config.tone}>
      {config.label}
    </StatusChip>
  );
}
