/** Vertical list of steps joined by a line (done, current, failed, upcoming). Generic: steps come from the caller. */

import { Check, X } from "lucide-react";

import type { TimelineStep, TimelineStepState } from "@/utils/buildRequestTimeline";
import { cn } from "@/utils/cn";

const DOT_STYLES: Record<TimelineStepState, string> = {
  done: "bg-blue",
  current: "bg-brand-peach-soft ring-2 ring-error/60",
  failed: "bg-error",
  upcoming: "bg-border-soft",
};

const LABEL_STYLES: Record<TimelineStepState, string> = {
  done: "text-text-primary",
  current: "text-text-primary",
  failed: "text-error",
  upcoming: "text-text-secondary",
};

interface StepTimelineProps {
  steps: TimelineStep[];
}

export function StepTimeline({ steps }: StepTimelineProps) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.label} className="relative flex gap-3 pb-5 last:pb-0">
            {!isLast ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-4 -bottom-0.5 start-[7px] w-0.5",
                  step.state === "done" ? "bg-blue" : "bg-border-soft",
                )}
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn("relative mt-1 grid size-4 shrink-0 place-items-center rounded-full", DOT_STYLES[step.state])}
            >
              {step.state === "done" ? <Check size={9} className="text-white" /> : null}
              {step.state === "failed" ? <X size={9} className="text-white" /> : null}
            </span>
            <div className="min-w-0 text-start">
              <p className={cn("text-label font-bold", LABEL_STYLES[step.state])}>{step.label}</p>
              {step.date ? <p className="text-caption text-text-secondary">{step.date}</p> : null}
              {step.hint ? <p className="text-caption text-text-secondary">{step.hint}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
