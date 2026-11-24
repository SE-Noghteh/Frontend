/** Small rounded status label (success, warning, info, error or neutral). */

import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type StatusTone = "success" | "warning" | "info" | "error" | "neutral" | "peach";

const TONES: Record<StatusTone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
  error: "bg-error-soft text-error",
  neutral: "bg-background-page text-text-secondary ring-1 ring-border-soft",
  peach: "bg-brand-peach-soft text-peach-2",
};

interface StatusChipProps {
  tone: StatusTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function StatusChip({ tone, icon, children, className }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] leading-none font-medium whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
