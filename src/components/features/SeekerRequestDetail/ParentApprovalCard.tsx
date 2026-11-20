import { ShieldCheck } from "lucide-react";

import { ParentStatusChip } from "@/components/features/SeekerRequests/RequestStatusChips";
import { SectionCard } from "@/components/ui/SectionCard";
import type { RequestParentStatus, SeekerParent } from "@/types/Seeker/seeker";

interface ParentApprovalCardProps {
  parent: SeekerParent;
  status: RequestParentStatus;
  /** The parent's reason when they rejected the request. */
  note?: string;
}

export function ParentApprovalCard({ parent, status, note }: ParentApprovalCardProps) {
  return (
    <SectionCard title="تأیید والد" icon={<ShieldCheck size={15} aria-hidden="true" />}>
      {status === "notRequired" ? (
        <div className="flex flex-col gap-2">
          <ParentStatusChip status={status} />
          <p className="text-caption leading-6 text-text-secondary">
            بالای ۱۸ سال هستی؛ درخواست مستقیماً برای کارفرما رفت.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-peach-soft font-bold text-error">
              {parent.name[0]}
            </span>
            <div className="min-w-0">
              <p className="text-label font-bold text-text-primary">{parent.name}</p>
              <p className="text-caption text-text-secondary">
                {parent.relation} · <bdi dir="ltr">{parent.phone}</bdi>
              </p>
            </div>
          </div>
          <div className="mt-3">
            <ParentStatusChip status={status} />
          </div>
          {status === "rejected" && note ? (
            <p className="mt-2 text-caption leading-6 text-text-secondary">«{note}»</p>
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
