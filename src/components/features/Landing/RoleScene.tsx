import type { UserRole } from "@/types/Landing/landing";

import { EmployerScene } from "./illustrations/EmployerScene";
import { ParentScene } from "./illustrations/ParentScene";
import { PortfolioScene } from "./illustrations/PortfolioScene";

interface RoleSceneProps {
  role: UserRole;
  className?: string;
}

/** Illustration that represents a role. */
export function RoleScene({ role, className }: RoleSceneProps) {
  switch (role) {
    case "seeker":
      return <PortfolioScene className={className} />;
    case "employer":
      return <EmployerScene className={className} />;
    case "parent":
      return <ParentScene className={className} />;
  }
}
