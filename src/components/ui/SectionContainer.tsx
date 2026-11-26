import type { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  /** Tailwind max-width class. */
  maxWidthClassName?: string;
  className?: string;
}

/** Centered, padded content wrapper shared by public page sections. */
export function SectionContainer({
  children,
  maxWidthClassName = "max-w-[1200px]",
  className = "",
}: SectionContainerProps) {
  return (
    <div className={`mx-auto px-6 ${maxWidthClassName} ${className}`}>
      {children}
    </div>
  );
}
