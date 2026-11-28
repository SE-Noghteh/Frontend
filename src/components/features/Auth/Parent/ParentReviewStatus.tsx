import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import type { ParentAdminReviewStatus } from "@/types/Auth/parentAuth";
import { cn } from "@/utils/cn";

interface ParentReviewStatusProps {
  status?: ParentAdminReviewStatus;
  compact?: boolean;
}

const STATUS = {
  pending: {
    label: "در انتظار بررسی",
    icon: Clock3,
    className:
      "border-warning/20 bg-warning-soft text-warning",
  },
  approved: {
    label: "تأیید شده",
    icon: CheckCircle2,
    className:
      "border-success/20 bg-success-soft text-success",
  },
  rejected: {
    label: "نیازمند اصلاح",
    icon: XCircle,
    className:
      "border-error/20 bg-error-soft text-error",
  },
} as const;

export function ParentReviewStatus({
  status = "pending",
  compact = false,
}: ParentReviewStatusProps) {
  const item = STATUS[status];
  const Icon = item.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-bold",
        compact
          ? "px-2.5 py-1 text-caption"
          : "px-3 py-1.5 text-label",
        item.className,
      )}
    >
      <Icon
        size={compact ? 14 : 16}
        aria-hidden="true"
      />
      {item.label}
    </span>
  );
}
