import type { ReactNode } from "react";

interface OpportunityTagProps {
  children: ReactNode;
  icon?: ReactNode;
  /** Hide on small screens to keep cards compact. */
  hideOnMobile?: boolean;
}

export function OpportunityTag({ children, icon, hideOnMobile = false }: OpportunityTagProps) {
  return (
    <span
      className={`${hideOnMobile ? "hidden sm:inline-flex" : "inline-flex"} items-center gap-1 rounded-md bg-surface-info px-1.5 py-0.5 text-caption font-medium text-text-secondary ring-1 ring-inset ring-border-decorative sm:px-2 sm:py-1 sm:text-caption`}
    >
      {icon}
      {children}
    </span>
  );
}
