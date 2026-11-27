import type { CSSProperties } from "react";

/** Maps `{ colorName: value }` to CSS variables; unset colors keep their stylesheet default. */
export function toCssVariables<T extends object>(
  values: T | undefined,
  names: Record<keyof T, string>,
): CSSProperties {
  const entries = Object.entries(values ?? {})
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => [
      names[key as keyof T],
      value,
    ]);

  return Object.fromEntries(entries) as CSSProperties;
}
