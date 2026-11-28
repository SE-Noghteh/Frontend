import {
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type NoticeTone = "info" | "success" | "error" | "warning";

const STYLE: Record<NoticeTone, string> = {
  info: "border-info/20 bg-info-soft text-info",
  success:
    "border-success/20 bg-success-soft text-success",
  error: "border-error/20 bg-error-soft text-error",
  warning:
    "border-warning/20 bg-warning-soft text-warning",
};

const ICON: Record<NoticeTone, ReactNode> = {
  info: <Info size={17} aria-hidden="true" />,
  success: (
    <CheckCircle2 size={17} aria-hidden="true" />
  ),
  error: (
    <AlertCircle size={17} aria-hidden="true" />
  ),
  warning: (
    <AlertCircle size={17} aria-hidden="true" />
  ),
};

interface AuthNoticeProps {
  tone?: NoticeTone;
  children: ReactNode;
  className?: string;
}

export function AuthNotice({
  tone = "info",
  children,
  className,
}: AuthNoticeProps) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2.5 text-caption leading-6",
        STYLE[tone],
        className,
      )}
    >
      <span className="mt-1 shrink-0">{ICON[tone]}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
