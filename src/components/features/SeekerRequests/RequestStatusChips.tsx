import { Check, CircleCheck, Clock, ShieldCheck, TriangleAlert, X } from "lucide-react";

import { StatusChip } from "@/components/ui/StatusChip";
import type { RequestEmployerStatus, RequestParentStatus } from "@/types/Seeker/seeker";

const ICON = 12;

/** Overall status of a request (what the employer side looks like to the seeker). */
export function RequestStatusChip({ status }: { status: RequestEmployerStatus }) {
  switch (status) {
    case "accepted":
      return (
        <StatusChip tone="success" icon={<CircleCheck size={ICON} aria-hidden="true" />}>
          پذیرفته شد
        </StatusChip>
      );
    case "waitingParent":
      return (
        <StatusChip tone="warning" icon={<TriangleAlert size={ICON} aria-hidden="true" />}>
          منتظر تأیید والد
        </StatusChip>
      );
    case "reviewing":
      return (
        <StatusChip tone="info" icon={<Clock size={ICON} aria-hidden="true" />}>
          در بررسی کارفرما
        </StatusChip>
      );
    case "rejectedByParent":
      return <StatusChip tone="error">ردشده توسط والد</StatusChip>;
    case "rejectedByEmployer":
      return <StatusChip tone="neutral">رد شده توسط کارفرما</StatusChip>;
  }
}

/** The parent's decision on a request. */
export function ParentStatusChip({ status }: { status: RequestParentStatus }) {
  switch (status) {
    case "approved":
      return (
        <StatusChip tone="success" icon={<Check size={ICON} aria-hidden="true" />}>
          تأیید والد
        </StatusChip>
      );
    case "pending":
      return (
        <StatusChip tone="warning" icon={<Clock size={ICON} aria-hidden="true" />}>
          منتظر تأیید والد
        </StatusChip>
      );
    case "rejected":
      return (
        <StatusChip tone="error" icon={<X size={ICON} aria-hidden="true" />}>
          ردشده توسط والد
        </StatusChip>
      );
    case "notRequired":
      return (
        <StatusChip tone="neutral" icon={<ShieldCheck size={ICON} aria-hidden="true" />}>
          بدون نیاز به والد
        </StatusChip>
      );
  }
}
