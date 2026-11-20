import type { CalendarTone } from "@/types/Calendar/calendar";

/** Default tone palette (built from the design tokens). Override or extend through the `tones` prop. */
export const DEFAULT_CALENDAR_TONES: Record<string, CalendarTone> = {
  neutral: { background: "var(--color-green-8)", text: "var(--color-charcoal)" },
  info: { background: "var(--color-info-soft)", text: "var(--color-info)" },
  success: { background: "var(--color-green-7)", text: "var(--color-green-1)" },
  warning: { background: "var(--color-warning-soft)", text: "var(--color-warning)" },
  error: { background: "var(--color-error-soft)", text: "var(--color-error)" },
};
