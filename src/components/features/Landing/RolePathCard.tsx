import { ArrowLeft } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { RoleBadge } from "@/components/ui/RoleBadge";
import type { UserRole } from "@/types/Landing/landing";

import { RoleScene } from "./RoleScene";

interface RolePathCardProps {
  role: UserRole;
  text: string;
  ctaLabel: string;
  /** Delay in ms for the staggered reveal. */
  delay: number;
  /** Draws a divider on the start side (desktop) between cards. */
  hasDivider: boolean;
}

/** Column of the final call-to-action: illustration, role badge, text and button. */
export function RolePathCard({ role, text, ctaLabel, delay, hasDivider }: RolePathCardProps) {
  return (
    <Reveal
      delay={delay}
      className={`flex flex-col items-center px-6 text-center md:px-8 ${
        hasDivider ? "md:border-s md:border-border-decorative" : ""
      }`}
    >
      <RoleScene role={role} className="w-[140px] sm:w-[190px]" />
      <RoleBadge role={role} size="md" className="mt-2" />
      <p className="mt-4 max-w-[280px] text-label leading-8 text-text-secondary">{text}</p>
      {/* TODO: replace with the shared Button component (link to sign-up). */}
      <button
        type="button"
        className="group mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-8 bg-surface-card px-6 py-3 text-label font-bold text-text-primary transition-colors hover:border-blue"
      >
        {ctaLabel}
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      </button>
    </Reveal>
  );
}
