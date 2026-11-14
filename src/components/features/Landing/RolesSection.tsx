import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { RoleIcon } from "@/components/ui/RoleIcon";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE_OUT } from "@/constants/motion";
import { ROLE_ORDER, ROLE_STYLES } from "@/constants/roles";
import { ROLE_GUIDES } from "@/data/roleGuides";
import type { UserRole } from "@/types/Landing/landing";

import { RoleDashboardPreview } from "./RoleDashboardPreview";
import { RoleIntroCard } from "./RoleIntroCard";
import { RoleStepList } from "./RoleStepList";

/** Tabs that explain what each of the three roles does on the platform. */
export function RolesSection() {
  const [activeRole, setActiveRole] = useState<UserRole>("seeker");
  const guide = ROLE_GUIDES[activeRole];
  const style = ROLE_STYLES[activeRole];

  return (
    <section id="roles" className="bg-surface-card py-16 sm:py-28">
      <SectionContainer>
        <SectionHeading maxWidthClassName="max-w-[660px]">سه نقش، یک مسیر امن</SectionHeading>

        <Tabs.Root
          value={activeRole}
          onValueChange={(value) => setActiveRole(value as UserRole)}
          dir="rtl"
          className="mt-10"
        >
          <Tabs.List className="flex w-fit gap-1 rounded-2xl border border-border-decorative bg-background-page p-1">
            {ROLE_ORDER.map((role) => (
              <Tabs.Trigger
                key={role}
                value={role}
                className="relative flex items-center gap-2.5 rounded-xl py-2 pe-5 ps-2.5 text-label font-bold text-text-secondary outline-none transition-colors data-[state=active]:text-text-primary"
              >
                {activeRole === role && (
                  <motion.span
                    layoutId="role-tab-pill"
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className={`absolute inset-0 rounded-xl ${ROLE_STYLES[role].soft}`}
                  />
                )}
                <span className="relative flex items-center gap-2.5">
                  <RoleIcon role={role} className="size-8" />
                  {ROLE_STYLES[role].name}
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeRole}-guide`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="flex flex-col"
              >
                <RoleIntroCard role={activeRole} guide={guide} />
                <RoleStepList role={activeRole} steps={guide.steps} />
                {/* TODO: replace with the shared Button component (link to sign-up). */}
                <button
                  type="button"
                  className={`group mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3.5 text-label font-bold transition-colors ${style.solid} ${style.solidHover}`}
                >
                  {guide.ctaLabel}
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>

            <div
              className={`hidden rounded-[28px] p-4 transition-colors duration-500 sm:block sm:p-8 ${style.soft}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <RoleDashboardPreview role={activeRole} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Tabs.Root>
      </SectionContainer>
    </section>
  );
}
