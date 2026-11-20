import { Check, Clock, FileText, Flag, Pencil, X } from "lucide-react";
import type { ReactNode } from "react";

import type { CollabBannerTone } from "@/types/Seeker/collab";
import { cn } from "@/utils/cn";

const TONES: Record<CollabBannerTone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-error-soft text-error",
  info: "bg-info-soft text-info",
};

const ICON_SIZE = 16;

function getIcon(tone: CollabBannerTone, text: string): ReactNode {
  if (tone === "success") return <Check size={ICON_SIZE} aria-hidden="true" />;
  if (tone === "error") return <X size={ICON_SIZE} aria-hidden="true" />;
  if (text.includes("اصلاح")) return <Pencil size={ICON_SIZE} aria-hidden="true" />;
  if (text.includes("اختلاف")) return <Flag size={ICON_SIZE} aria-hidden="true" />;
  if (tone === "info" && text.includes("شرایط")) return <FileText size={ICON_SIZE} aria-hidden="true" />;
  return <Clock size={ICON_SIZE} aria-hidden="true" />;
}

interface CollabBannerProps {
  tone: CollabBannerTone;
  text: string;
}

/** One-sentence summary of where the collaboration stands. */
export function CollabBanner({ tone, text }: CollabBannerProps) {
  return (
    <p
      role="status"
      className={cn("flex items-center gap-2.5 rounded-2xl px-4 py-3.5 text-label font-medium", TONES[tone])}
    >
      <span className="shrink-0">{getIcon(tone, text)}</span>
      {text}
    </p>
  );
}
