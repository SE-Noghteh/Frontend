import { ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

interface DashboardStatTileProps {
  role: UserRole;
  label: string;
  value: string;
  hint?: string;
}

export function DashboardStatTile({ role, label, value, hint }: DashboardStatTileProps) {
  return (
    <div className="rounded-xl border border-border-decorative bg-surface-card p-3">
      <div className="text-caption text-charcoal-2">{label}</div>
      <div className="mt-1 flex items-center gap-1.5 text-card-title font-black text-text-primary">
        <span className={`size-2 rounded-full ${ROLE_STYLES[role].dot}`} />
        {value}
      </div>
      {hint && <div className="text-caption text-status-success">{hint}</div>}
    </div>
  );
}
