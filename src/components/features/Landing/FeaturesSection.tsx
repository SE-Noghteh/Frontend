import { CalendarDays, FileSignature, IdCard, ShieldCheck, Wallet } from "lucide-react";
import type { ReactNode } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PLATFORM_FEATURES } from "@/data/platformFeatures";

import { FeatureStep } from "./FeatureStep";

const FEATURE_ICONS: Record<string, ReactNode> = {
  wallet: <Wallet />,
  agreement: <FileSignature />,
  "chat-calendar": <CalendarDays />,
  "skill-passport": <IdCard />,
  "parent-monitoring": <ShieldCheck />,
};

/** Connected stepper of platform features: horizontal on desktop, vertical on mobile. */
export function FeaturesSection() {
  return (
    <section id="features" className="bg-surface-card py-14 sm:py-24">
      <SectionContainer>
        <SectionHeading titleClassName="text-page-title leading-[1.5] text-text-primary sm:text-[42px] sm:leading-[1.4]">
          هر چیزی که یک همکاری مطمئن لازم داره، <span className="text-highlight">یک‌جا</span>
        </SectionHeading>

        <ol className="relative mt-8 sm:mt-12 lg:grid lg:grid-cols-5 lg:gap-4">
          {/* Horizontal connector through the icon centers (desktop) */}
          <span className="pointer-events-none absolute inset-x-[10%] top-6 hidden h-0.5 rounded-full bg-blue-8 lg:block" />
          {PLATFORM_FEATURES.map((feature, index) => (
            <FeatureStep
              key={feature.id}
              feature={feature}
              icon={FEATURE_ICONS[feature.id]}
              delay={index * 60}
              isLast={index === PLATFORM_FEATURES.length - 1}
            />
          ))}
        </ol>
      </SectionContainer>
    </section>
  );
}
