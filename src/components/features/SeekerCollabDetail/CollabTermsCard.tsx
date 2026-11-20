import { FileText } from "lucide-react";

import { ParentStatusChip } from "@/components/features/SeekerRequests/RequestStatusChips";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import type { SeekerCollab } from "@/types/Seeker/collab";
import { formatJalaliDate, formatToman } from "@/utils/formatToman";

interface CollabTermsCardProps {
  collab: SeekerCollab;
  action?: { label: string; isDisabled?: boolean };
  onAction: () => void;
}

/** "شرایط توافق‌شده": amount, delivery date, deliverables and the parent's approval. */
export function CollabTermsCard({ collab, action, onAction }: CollabTermsCardProps) {
  const rows = [
    { label: "مبلغ قرارداد", value: formatToman(collab.amount) },
    { label: "تحویل", value: formatJalaliDate(collab.deliveryDate) },
    { label: "خروجی‌ها", value: collab.deliverables },
  ];

  return (
    <SectionCard title="شرایط توافق‌شده" icon={<FileText size={15} aria-hidden="true" />}>
      <dl className="flex flex-col gap-3 text-caption">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <dt className="text-text-secondary">{row.label}</dt>
            <dd className="font-bold text-text-primary">{row.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4">
          <dt className="text-text-secondary">تأیید والد</dt>
          <dd>
            <ParentStatusChip status={collab.parentStatus === "approved" ? "approved" : collab.parentStatus} />
          </dd>
        </div>
      </dl>

      {action ? (
        <Button variant="secondary" size="sm" fullWidth disabled={action.isDisabled} className="mt-4" onClick={onAction}>
          {action.label}
        </Button>
      ) : null}
    </SectionCard>
  );
}
