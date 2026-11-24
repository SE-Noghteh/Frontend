/** White rounded card with an optional icon + title header. */

import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface SectionCardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, icon, children, className }: SectionCardProps) {
  return (
    <section className={cn("rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:p-5", className)}>
      {title ? (
        <header className="mb-3 flex items-center gap-2.5">
          {icon ? (
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-peach-soft text-error">
              {icon}
            </span>
          ) : null}
          <h2 className="text-body font-bold text-text-primary">{title}</h2>
        </header>
      ) : null}
      {children}
    </section>
  );
}
