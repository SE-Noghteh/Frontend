import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Check, FileSignature, Gauge, Wallet } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { EASE_OUT } from "@/constants/motion";
import { EMPLOYER_SCENARIOS } from "@/data/employerScenarios";
import type { EmployerScenarioId } from "@/types/Landing/landing";

import { EmployerBenefitItem } from "./EmployerBenefitItem";
import { ApplicantsPreview } from "./ProductPreview/ApplicantsPreview";

const BENEFITS = [
  { icon: Wallet, title: "پرداخت بدون ریسک", description: "پول در کیف پول امانت می‌مونه." },
  { icon: FileSignature, title: "توافق‌نامه شفاف", description: "مبلغ و مهلت از اول مشخصه." },
  { icon: BadgeCheck, title: "متقاضی‌های ارزیابی‌شده", description: "رزومه، نظرات و امتیاز قبلی." },
  { icon: Gauge, title: "هزینه‌ای ناچیز", description: "فقط هزینه کوچک انتشار آگهی؛ بدون کمیسیون از مبلغ پروژه." },
];

/** Pitch for employers: pick a business scenario and see how it works. */
export function EmployersSection() {
  const [scenarioId, setScenarioId] = useState<EmployerScenarioId>("shop");
  const scenario =
    EMPLOYER_SCENARIOS.find((item) => item.id === scenarioId) ?? EMPLOYER_SCENARIOS[0];

  return (
    <section id="employers" className="bg-blue py-16 text-white sm:py-28">
      <SectionContainer>
        <Reveal className="max-w-[720px]">
          <h2 className="text-balance text-page-title font-black leading-[1.4] sm:text-[44px]">
            کارهای کوچیک و تکراری‌ات رو به استعدادهای تازه بسپار
          </h2>
          <p className="mt-4 text-body leading-9 text-white/75 sm:text-card-title sm:leading-10">
            لازم نیست نیروی تمام‌وقت بگیری. هر پروژه با مبلغ و مهلت روشن، از یک آگهی ساده شروع
            می‌شه. سناریوی کار خودت رو انتخاب کن:
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {EMPLOYER_SCENARIOS.map((item) => (
            // TODO: replace with the shared Button component.
            <button
              key={item.id}
              type="button"
              onClick={() => setScenarioId(item.id)}
              className={`relative rounded-full px-5 py-2.5 text-label font-bold transition-colors ${
                scenarioId === item.id ? "text-blue" : "text-white/80 hover:text-white"
              }`}
            >
              {scenarioId === item.id && (
                <motion.span
                  layoutId="employer-scenario-pill"
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span className="relative">{item.tabLabel}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <p className="text-card-title font-bold leading-9">{scenario.lead}</p>
              <ul className="mt-6 space-y-4">
                {scenario.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-label leading-7 text-white/85"
                  >
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-white/15 text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {/* TODO: replace both with the shared Button component. */}
                <button
                  type="button"
                  className="rounded-xl bg-white px-7 py-3.5 text-label font-extrabold text-green-1 transition-colors hover:bg-green-8"
                >
                  ثبت آگهی
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-white/30 px-7 py-3.5 text-label font-bold text-white transition-colors hover:bg-white/10"
                >
                  تعرفه ثبت آگهی
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="rounded-[24px] bg-white/[.06] p-4 ring-1 ring-white/10 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <ApplicantsPreview scenario={scenario} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <EmployerBenefitItem key={benefit.title} {...benefit} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
