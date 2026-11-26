import { ShieldCheck } from "lucide-react";

import { ParentStatusChip } from "@/components/features/SeekerRequests/RequestStatusChips";
import { SectionCard } from "@/components/ui/SectionCard";
import type { SeekerCollab } from "@/types/Seeker/collab";
import type { SeekerParent } from "@/types/Seeker/seeker";
import { formatJalaliDate } from "@/utils/formatToman";

interface CollabParentCardProps {
  parent: SeekerParent;
  collab: SeekerCollab;
}

/** Shown while the agreed terms wait for the parent's answer. */
export function CollabParentCard({ parent, collab }: CollabParentCardProps) {
  return (
    <SectionCard title="تأیید والد" icon={<ShieldCheck size={15} aria-hidden="true" />}>
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-peach-soft font-bold text-error">
          {parent.name[0]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-label font-bold text-text-primary">{parent.name}</p>
          <p className="text-caption text-text-secondary">
            هنوز پاسخ نداده · ارسال {formatJalaliDate(collab.parentSentAt)}
          </p>
        </div>
        <ParentStatusChip status="pending" />
      </div>
    </SectionCard>
  );
}
