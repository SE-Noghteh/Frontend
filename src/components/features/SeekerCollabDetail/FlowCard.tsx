import type { ReactNode } from "react";

import { SectionCard } from "@/components/ui/SectionCard";
import { StepTimeline } from "@/components/ui/StepTimeline";
import type { TimelineStep } from "@/utils/buildRequestTimeline";

interface FlowCardProps {
  title: string;
  icon: ReactNode;
  steps: TimelineStep[];
}

/** Card holding a vertical timeline ("روند واریز", "روند بررسی"). */
export function FlowCard({ title, icon, steps }: FlowCardProps) {
  return (
    <SectionCard title={title} icon={icon}>
      <StepTimeline steps={steps} />
    </SectionCard>
  );
}
