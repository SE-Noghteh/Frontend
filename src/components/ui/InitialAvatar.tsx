import { ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

interface InitialAvatarProps {
  name: string;
  role?: UserRole;
  className?: string;
}

/** Round avatar showing the first letter of the name, tinted by role. */
export function InitialAvatar({
  name,
  role = "employer",
  className = "size-9 text-label",
}: InitialAvatarProps) {
  const style = ROLE_STYLES[role];

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-bold ${style.solid} ${className}`}
    >
      {name[0]}
    </span>
  );
}
