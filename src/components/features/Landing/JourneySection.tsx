import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";

import { RoleBadge } from "@/components/ui/RoleBadge";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE_OUT } from "@/constants/motion";
import { ROLE_ORDER, ROLE_STYLES } from "@/constants/roles";
import { JOURNEY_STEPS } from "@/data/journeySteps";

import { JourneyStep } from "./JourneyStep";
import { JourneyStepPreview } from "./ProductPreview/JourneyStepPreview";

/** Scroll-driven walkthrough from sign-up to the first payment. */
export function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const activeStep = JOURNEY_STEPS[activeIndex];

  return (
    <section id="journey">
      <SectionContainer className="py-16 sm:py-28">
        <SectionHeading maxWidthClassName="max-w-[640px]" titleClassName="text-page-title leading-[1.4] text-text-primary sm:text-[42px]">
          از ثبت‌نام تا اولین درآمد، <span className="text-highlight">قدم‌به‌قدم</span>
        </SectionHeading>
        <div className="mt-5 flex gap-2">
          {ROLE_ORDER.map((role) => (
            <RoleBadge key={role} role={role} size="md" />
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div ref={listRef} className="relative">
            <div className="absolute inset-y-10 start-5 w-0.5 -translate-x-1/2 bg-border-decorative rtl:translate-x-1/2">
              <motion.div style={{ scaleY: progress }} className="h-full origin-top bg-blue" />
            </div>
            {JOURNEY_STEPS.map((step, index) => (
              <JourneyStep
                key={step.title}
                step={step}
                index={index}
                isActive={activeIndex === index}
                onBecomeActive={setActiveIndex}
              />
            ))}
          </div>

          <div className="relative hidden lg:block">
            <div
              className={`sticky top-28 flex h-[480px] items-center justify-center rounded-[32px] p-10 transition-colors duration-700 ${ROLE_STYLES[activeStep.mainRole].soft}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="w-full max-w-[340px]"
                >
                  <JourneyStepPreview previewId={activeStep.previewId} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
