import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  isOnDark?: boolean;
}

/** Section title with a leading accent line, shared by all About sections. */
export function SectionLabel({ children, isOnDark = false }: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-4 text-section-title font-bold ${
        isOnDark ? "text-white" : "text-interface-secondary"
      }`}
    >
      <span className="h-0.5 w-12 rounded-full bg-accent-default" />
      {children}
    </p>
  );
}
