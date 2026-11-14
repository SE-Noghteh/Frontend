/**
 * SAMPLE FILE
 *
 * Generic badge component.
 */

import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return <span>{children}</span>;
}