import type { ReactNode } from "react";

import { ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

interface PreviewIconTileProps {
  role: UserRole;
  children: ReactNode;
}

export function PreviewIconTile({ role, children }: PreviewIconTileProps) {
  const style = ROLE_STYLES[role];

  return (
    <span
      className={`grid size-8 place-items-center rounded-lg [&_svg]:size-4 ${style.soft} ${style.text}`}
    >
      {children}
    </span>
  );
}
