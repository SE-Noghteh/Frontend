import { ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

interface RoleBadgeProps {
  role: UserRole;
  /** "md" is used for hero-level labels, "sm" inside lists and cards. */
  size?: "sm" | "md";
  className?: string;
}

/** Colored pill with the role's dot and name. */
export function RoleBadge({ role, size = "sm", className = "" }: RoleBadgeProps) {
  const style = ROLE_STYLES[role];
  const sizeClass =
    size === "md" ? "px-3 py-1 text-caption" : "px-2.5 py-1 text-caption";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold ${sizeClass} ${style.chip} ${className}`}
    >
      <span
        className={`rounded-full ${style.dot} ${size === "md" ? "size-2" : "size-1.5"}`}
      />
      {style.name}
    </span>
  );
}
