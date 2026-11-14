import type { ReactNode } from "react";

interface PreviewCardProps {
  children: ReactNode;
  className?: string;
}

/** White elevated card used to showcase product UI samples on the landing page. */
export function PreviewCard({ children, className = "" }: PreviewCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border-decorative bg-surface-card shadow-[0_1px_2px_rgba(29,53,87,.04),0_12px_32px_-16px_rgba(29,53,87,.18)] ${className}`}
    >
      {children}
    </div>
  );
}
