/**
 * SAMPLE FILE
 *
 * Generic UI container with no feature-specific business logic.
 */

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return <div>{children}</div>;
}