import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  children: ReactNode;
  /** Tailwind max-width class for the heading block. */
  maxWidthClassName?: string;
  align?: "start" | "center";
  className?: string;
  /** Tailwind classes for the h2 (size / color). */
  titleClassName?: string;
}

/** Section title that fades in on scroll. */
export function SectionHeading({
  children,
  maxWidthClassName = "max-w-[660px]",
  align = "start",
  className = "",
  titleClassName = "text-page-title leading-[1.4] text-charcoal sm:text-[42px]",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`${maxWidthClassName} ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <h2 className={`text-balance font-black ${titleClassName}`}>{children}</h2>
    </Reveal>
  );
}
