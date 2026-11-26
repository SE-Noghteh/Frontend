import type { ReactNode } from "react";

import type { JalaliDate } from "@/utils/jalali";

/** Colors of one entry chip. Any CSS color / `var(--token)` works. */
export interface CalendarTone {
  background: string;
  text: string;
}

/** One item shown inside a day cell (usually mapped from a backend response). */
export interface CalendarEntry {
  id?: string | number;
  /** Gregorian `Date`, or ISO string ("2026-11-09" / full ISO) — what the backend normally sends. */
  date: Date | string;
  /** Text (or any node) rendered in the chip. */
  label: ReactNode;
  /** Key into the `tones` prop. Defaults to "neutral". */
  tone?: string;
  /** Per-entry color override, wins over `tone`. */
  color?: Partial<CalendarTone>;
  /** Anything the caller wants back in `onEntryClick` / `renderDay`. */
  data?: unknown;
}

export interface CalendarLegendItem {
  tone: string;
  label: ReactNode;
}

/** Visible month (Jalali). */
export interface CalendarMonth {
  year: number;
  month: number;
}

/** What `renderDay` receives for each real day of the visible month. */
export interface CalendarDayContext {
  /** Jalali date of the cell. */
  jalali: JalaliDate;
  /** Same day as a Gregorian `Date` (local midnight). */
  date: Date;
  entries: CalendarEntry[];
  isToday: boolean;
  isSelected: boolean;
}
