import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { ROLE_STYLES } from "@/constants/roles";
import type { PlatformFeature } from "@/types/Landing/landing";

interface FeatureStepProps {
  feature: PlatformFeature;
  icon: ReactNode;
  /** Delay in ms for the staggered reveal. */
  delay: number;
  /** The last step has no connector line on mobile. */
  isLast: boolean;
}

/** One node of the connected features stepper (horizontal on desktop, vertical on mobile). */
export function FeatureStep({ feature, icon, delay, isLast }: FeatureStepProps) {
  return (
    <Reveal delay={delay} className="relative pb-3 last:pb-0 lg:pb-0">
      <li className="relative flex gap-4 lg:block lg:text-center">
        {!isLast && (
          <span className="absolute -bottom-3 start-[19px] top-10 w-0.5 rounded-full bg-blue-8 lg:hidden" />
        )}
        <span
          className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full ring-4 ring-white lg:mx-auto lg:size-12 [&_svg]:size-5 ${ROLE_STYLES[feature.role].solid}`}
        >
          {icon}
        </span>
        <div className="flex-1 rounded-2xl border border-border-decorative bg-background-page p-4 lg:mt-5 lg:h-[calc(100%-68px)] lg:p-5">
          <h3 className="text-body font-extrabold text-text-primary sm:text-body">
            {feature.title}
          </h3>
          <p className="mt-1.5 text-label leading-6 text-text-secondary sm:text-label sm:leading-7">
            {feature.text}
          </p>
        </div>
      </li>
    </Reveal>
  );
}
