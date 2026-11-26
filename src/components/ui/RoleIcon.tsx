import { Briefcase, ShieldCheck, UserRound } from "lucide-react";

import { ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

const ROLE_ICONS = {
  seeker: UserRound,
  employer: Briefcase,
  parent: ShieldCheck,
} as const;

interface RoleIconProps {
  role: UserRole;
  className?: string;
}

/** Round icon badge that identifies a role (used in tabs and labels). */
export function RoleIcon({ role, className = "size-8" }: RoleIconProps) {
  const Icon = ROLE_ICONS[role];
  const style = ROLE_STYLES[role];

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full ${style.soft} ${style.text} ${className}`}
    >
      <Icon className="size-[55%]" strokeWidth={2} />
    </span>
  );
}
