import type { UserRole } from "@/types/Landing/landing";

import { EmployerDashboardPreview } from "./ProductPreview/EmployerDashboardPreview";
import { ParentDashboardPreview } from "./ProductPreview/ParentDashboardPreview";
import { SeekerDashboardPreview } from "./ProductPreview/SeekerDashboardPreview";

interface RoleDashboardPreviewProps {
  role: UserRole;
}

/** The dashboard sample of the given role. */
export function RoleDashboardPreview({ role }: RoleDashboardPreviewProps) {
  switch (role) {
    case "seeker":
      return <SeekerDashboardPreview />;
    case "employer":
      return <EmployerDashboardPreview />;
    case "parent":
      return <ParentDashboardPreview />;
  }
}
