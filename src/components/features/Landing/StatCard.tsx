import type { LucideIcon } from "lucide-react";

import { AnimatedProgressBar } from "@/components/ui/AnimatedProgressBar";
import { CountUp } from "@/components/ui/CountUp";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  hint: string;
  value: number;
  /** Display ceiling: the bar fills to value / max. */
  max: number;
  suffix?: string;
  /** Tailwind class for the bar fill. */
  barClassName: string;
  /** Stagger delay in seconds. */
  delay: number;
}

/** Translucent stat tile used on the dark stats panel. */
export function StatCard({
  icon: Icon,
  label,
  hint,
  value,
  max,
  suffix,
  barClassName,
  delay,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.05] p-3.5 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white/80 [&_svg]:size-[18px]">
          <Icon />
        </span>
        <span className="text-caption font-semibold text-white/60">{label}</span>
      </div>
      <div className="mt-4 text-[32px] font-black leading-none tracking-tight text-white sm:mt-6 sm:text-[48px]">
        <CountUp to={value} suffix={suffix} />
      </div>
      <div className="mt-5">
        <AnimatedProgressBar ratio={value / max} fillClassName={barClassName} delay={delay} />
      </div>
      <div className="mt-3 text-caption text-white/60">{hint}</div>
    </div>
  );
}
