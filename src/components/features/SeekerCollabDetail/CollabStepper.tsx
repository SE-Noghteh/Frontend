import { Check } from "lucide-react";

import type { CollabStepStatus } from "@/types/Seeker/collab";
import { cn } from "@/utils/cn";
import { COLLAB_STEP_LABELS } from "@/utils/getCollabView";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface CollabStepperProps {
  steps: CollabStepStatus[];
}

const CIRCLE: Record<CollabStepStatus, string> = {
  done: "border-blue bg-blue text-white",
  current: "border-blue bg-white text-text-primary",
  failed: "border-error bg-white text-error",
  upcoming: "border-border-soft bg-white text-text-secondary",
};

const COLUMNS = COLLAB_STEP_LABELS.length;

/** The five stages of a collaboration: توافق → پرداخت → انجام کار → تحویل → واریز. */
export function CollabStepper({ steps }: CollabStepperProps) {
  // The dark line runs from the first step up to the last step that has been reached.
  const lastReached = steps.reduce((last, status, index) => (status === "upcoming" ? last : index), 0);
  const columnWidth = 100 / COLUMNS;
  const lineSpan = 100 - columnWidth;

  return (
    <div className="rounded-2xl border border-border-soft bg-white px-3 py-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:px-6 md:py-5">
      <div className="relative">
        <span
          aria-hidden="true"
          style={{ insetInlineStart: `${columnWidth / 2}%`, width: `${lineSpan}%` }}
          className="absolute top-3.5 h-0.5 bg-border-soft"
        />
        <span
          aria-hidden="true"
          style={{
            insetInlineStart: `${columnWidth / 2}%`,
            width: `${(lastReached / (COLUMNS - 1)) * lineSpan}%`,
          }}
          className="absolute top-3.5 h-0.5 bg-blue"
        />

        <ol aria-label="مراحل همکاری" className="relative grid grid-cols-5">
          {COLLAB_STEP_LABELS.map((label, index) => {
            const status = steps[index];
            const isActive = status === "current" || status === "failed";

            return (
              <li key={label} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  aria-current={status === "current" ? "step" : undefined}
                  className={cn(
                    "grid size-7 place-items-center rounded-full border-2 text-caption font-bold",
                    CIRCLE[status],
                  )}
                >
                  {status === "done" ? <Check size={13} aria-hidden="true" /> : toPersianDigits(index + 1)}
                </span>
                <span
                  className={cn(
                    "text-[10px] md:text-caption",
                    isActive ? "font-bold text-text-primary" : "text-text-secondary",
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
