/** Title block of a dashboard page: breadcrumb on top, title + subtitle, optional action on the opposite side. */

import type { ReactNode } from "react";

import { Breadcrumb } from "@/components/shared/Breadcrumb/Breadcrumb";

interface PageHeaderProps {
  breadcrumb: { label: string; to?: string }[];
  title: string;
  subtitle?: string;
  action?: ReactNode;
  /** Small status line above the title (e.g. a chip on a detail page). */
  eyebrow?: ReactNode;
}

export function PageHeader({ breadcrumb, title, subtitle, action, eyebrow }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb items={breadcrumb} />

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          {eyebrow ? <div className="mb-2 flex flex-wrap items-center gap-2">{eyebrow}</div> : null}
          <h1 className="text-section-title leading-9 font-bold text-text-primary md:text-page-title">{title}</h1>
          {subtitle ? <p className="mt-1 text-label text-text-secondary">{subtitle}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
