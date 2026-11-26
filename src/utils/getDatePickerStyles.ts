import type { CSSProperties } from "react";

import type { DatePickerColors } from "@/types/DatePicker/datePicker";
import { toCssVariables } from "@/utils/toCssVariables";

const VARIABLES: Record<keyof DatePickerColors, string> = {
  triggerBg: "--dd-trigger-bg",
  triggerText: "--dd-trigger-text",
  placeholderText: "--dd-placeholder",
  border: "--dd-border",
  activeBorder: "--dd-active-border",
  calendarBg: "--cal-surface",
  calendarText: "--cal-text",
  dayHoverBg: "--cal-day-hover-bg",
  dayHoverText: "--cal-day-hover-text",
  selectedBg: "--cal-selected-bg",
  selectedText: "--cal-selected-text",
  selectedBorder: "--cal-selected-border",
  todayBg: "--cal-accent",
  todayText: "--cal-accent-text",
  navHoverBg: "--cal-hover-bg",
};

/** Style objects for the three parts of the date picker. */
export function getDatePickerStyles(colors?: DatePickerColors): {
  trigger: CSSProperties;
  content: CSSProperties;
  calendar: CSSProperties;
} {
  const variables = toCssVariables(colors, VARIABLES);

  return {
    trigger: variables,
    content: colors?.calendarBg ? { background: colors.calendarBg } : {},
    calendar: variables,
  };
}
