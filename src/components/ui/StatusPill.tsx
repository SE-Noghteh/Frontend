import type { ReactNode } from "react";

type StatusTone = "neutral" | "success" | "info" | "warning" | "error";

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: "bg-surface-info text-blue-5",
  success: "bg-surface-success text-status-success",
  info: "bg-surface-info text-status-info",
  warning: "bg-surface-warning text-status-warning",
  error: "bg-surface-error text-status-error",
};

interface StatusPillProps {
  tone?: StatusTone;
  icon?: ReactNode;
  children: ReactNode;
}

export function StatusPill({ tone = "neutral", icon, children }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-semibold ${TONE_CLASS[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
