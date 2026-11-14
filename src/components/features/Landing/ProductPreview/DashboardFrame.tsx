import type { ReactNode } from "react";

import { ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

import { PreviewCard } from "./PreviewCard";

interface DashboardFrameProps {
  role: UserRole;
  title: string;
  children: ReactNode;
}

/** Browser-like window that wraps a dashboard preview. */
export function DashboardFrame({ role, title, children }: DashboardFrameProps) {
  const style = ROLE_STYLES[role];

  return (
    <PreviewCard className="overflow-hidden">
      <div className={`flex items-center gap-3 px-4 py-2.5 ${style.soft}`}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className={`size-2.5 rounded-full opacity-60 ${style.dot}`} />
          ))}
        </div>
        <div className="mx-auto rounded-md bg-white/80 px-3 py-1 text-caption text-text-secondary">
          {title}
        </div>
        <span className="w-10" />
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </PreviewCard>
  );
}
