import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { RoleBadge } from "@/components/ui/RoleBadge";
import type { JourneyStepContent } from "@/types/Landing/landing";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface JourneyStepProps {
  step: JourneyStepContent;
  /** 0-based position in the journey. */
  index: number;
  isActive: boolean;
  onBecomeActive: (index: number) => void;
}

/** One step of the journey; becomes active when it crosses the middle of the viewport. */
export function JourneyStep({ step, index, isActive, onBecomeActive }: JourneyStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isCentered = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isCentered) onBecomeActive(index);
  }, [isCentered, index, onBecomeActive]);

  const stepNumber = toPersianDigits(index + 1);

  return (
    <div ref={ref} className="relative flex gap-4 py-6 sm:gap-5 sm:py-10 lg:py-14">
      <div
        className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 text-label font-extrabold transition-colors duration-500 ${
          isActive
            ? "border-action-primary bg-action-primary text-white"
            : "border-border-decorative bg-surface-card text-charcoal-2"
        }`}
      >
        {stepNumber}
      </div>
      <div className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-45"}`}>
        <div className="flex flex-wrap items-center gap-1.5">
          {step.roles.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
        </div>
        <h3 className="mt-3 text-card-title font-extrabold text-text-primary">
          <span className="text-blue-6">مرحله {stepNumber}:</span> {step.title}
        </h3>
        <p className="mt-2 max-w-[440px] text-label leading-8 text-text-secondary">
          {step.description}
        </p>
      </div>
    </div>
  );
}
