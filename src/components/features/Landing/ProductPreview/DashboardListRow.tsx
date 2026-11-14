import type { ReactNode } from "react";

interface DashboardListRowProps {
  title: string;
  description: string;
  trailing: ReactNode;
}

export function DashboardListRow({ title, description, trailing }: DashboardListRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border-decorative bg-surface-card p-3">
      <div className="min-w-0 flex-1">
        <div className="truncate text-label font-bold text-text-primary">{title}</div>
        <div className="text-caption text-charcoal-2">{description}</div>
      </div>
      {trailing}
    </div>
  );
}
