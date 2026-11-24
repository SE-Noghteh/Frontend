import { ChevronLeft, Flag } from "lucide-react";

import { ProgressRing } from "@/components/features/SeekerCollabDetail/ProgressRing";
import { SectionCard } from "@/components/ui/SectionCard";
import type { CollabWorkStage } from "@/types/Seeker/collab";
import { formatJalaliDate } from "@/utils/formatToman";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface WorkStagesCardProps {
  stages: CollabWorkStage[];
  /** When set, shows the "ثبت مرحله‌ی جدید" link in the header. */
  onAddStage?: () => void;
}

/** "مراحل انجام کار": what the seeker reported so far. */
export function WorkStagesCard({ stages, onAddStage }: WorkStagesCardProps) {
  return (
    <SectionCard title="مراحل انجام کار" icon={<Flag size={15} aria-hidden="true" />}>
      {onAddStage ? (
        <button
          type="button"
          onClick={onAddStage}
          className="mb-3 inline-flex items-center gap-1 text-caption font-medium text-text-secondary transition hover:text-text-primary"
        >
          ثبت مرحله‌ی جدید
          <ChevronLeft size={14} aria-hidden="true" />
        </button>
      ) : null}

      <ul className="flex flex-col gap-2">
        {stages.map((stage) => (
          <li key={stage.id} className="flex items-center gap-3 rounded-xl bg-background-page px-3 py-2.5">
            <ProgressRing percent={stage.percent} />
            <div className="min-w-0 text-start">
              <p className="text-label font-bold text-text-primary">{stage.title}</p>
              <p className="text-caption text-text-secondary">
                {formatJalaliDate(stage.date)}
                {stage.filesCount > 0 ? ` · ${toPersianDigits(stage.filesCount)} فایل` : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
