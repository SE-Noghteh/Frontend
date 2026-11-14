import { Briefcase, FileCheck2, Trophy, UsersRound } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { usePlatformStats } from "@/hooks/usePlatformStats";
import type { PlatformStats } from "@/types/Landing/landing";

import { StatCard } from "./StatCard";

const STAT_CARDS = [
  { key: "activeSeekers", max: 1000, suffix: "+", label: "کارجوی فعال", hint: "نوجوان و جوان ۱۵ تا ۲۳ ساله", barClassName: "bg-brand-peach", icon: UsersRound },
  { key: "verifiedEmployers", max: 200, suffix: "+", label: "کارفرمای تأییدشده", hint: "هویت و شماره بررسی شده", barClassName: "bg-ocean-6", icon: Briefcase },
  { key: "publishedOpportunities", max: 500, suffix: "", label: "آگهی منتشرشده", hint: "در ۱۳ دسته‌بندی", barClassName: "bg-green-5", icon: FileCheck2 },
  { key: "successRatePercent", max: 100, suffix: "٪", label: "پروژه موفق", hint: "با تأیید خروجی و آزادسازی پول", barClassName: "bg-white", icon: Trophy },
] as const satisfies readonly {
  key: keyof PlatformStats;
  max: number;
  suffix: string;
  label: string;
  hint: string;
  barClassName: string;
  icon: typeof UsersRound;
}[];

export function StatsSection() {
  const { data: stats } = usePlatformStats();

  return (
    <SectionContainer className="pt-14 sm:pt-24">
      <Reveal className="relative overflow-hidden rounded-[24px] bg-blue p-4 text-white sm:rounded-[28px] sm:p-10">
        <h2 className="text-balance text-page-title font-black leading-[1.5] sm:text-[32px]">
          جامعه‌ای که هر روز بزرگ‌تر می‌شه
        </h2>

        <div className="mt-6 grid min-h-40 grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3 lg:grid-cols-4">
          {stats &&
            STAT_CARDS.map((card, index) => (
              <StatCard
                key={card.key}
                icon={card.icon}
                label={card.label}
                hint={card.hint}
                value={stats[card.key]}
                max={card.max}
                suffix={card.suffix}
                barClassName={card.barClassName}
                delay={index * 0.08}
              />
            ))}
        </div>
      </Reveal>
    </SectionContainer>
  );
}
