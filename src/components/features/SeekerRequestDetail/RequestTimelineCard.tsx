import { Check, Clock, X } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { StepTimeline } from "@/components/ui/StepTimeline";
import type { TimelineStep } from "@/utils/buildRequestTimeline";
import { cn } from "@/utils/cn";

interface RequestTimelineCardProps {
  steps: TimelineStep[];
  banner?: { tone: "success" | "error"; text: string };
}

/** Vertical step list ("درخواست ارسال شد" → … → result) with an optional outcome banner under it. */
export function RequestTimelineCard({ steps, banner }: RequestTimelineCardProps) {
  return (
    <SectionCard title="وضعیت درخواست" icon={<Clock size={15} aria-hidden="true" />}>
      <StepTimeline steps={steps} />

      {banner ? (
        <p
          role="status"
          className={cn(
            "mt-4 flex items-center gap-2 rounded-xl px-3 py-3 text-caption font-medium",
            banner.tone === "success" ? "bg-success-soft text-success" : "bg-error-soft text-error",
          )}
        >
          {banner.tone === "success" ? (
            <Check size={16} aria-hidden="true" className="shrink-0" />
          ) : (
            <X size={16} aria-hidden="true" className="shrink-0" />
          )}
          {banner.text}
        </p>
      ) : null}
    </SectionCard>
  );
}
