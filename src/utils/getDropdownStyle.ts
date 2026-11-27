import type { CSSProperties } from "react";

import type { DropdownColors } from "@/types/Dropdown/dropdown";
import { toCssVariables } from "@/utils/toCssVariables";

const VARIABLES: Record<keyof DropdownColors, string> = {
  triggerBg: "--dd-trigger-bg",
  triggerText: "--dd-trigger-text",
  placeholderText: "--dd-placeholder",
  border: "--dd-border",
  activeBorder: "--dd-active-border",
  menuBg: "--dd-menu-bg",
  menuBorder: "--dd-menu-border",
  optionText: "--dd-option-text",
  hoverBg: "--dd-hover-bg",
  hoverText: "--dd-hover-text",
  selectedBg: "--dd-selected-bg",
  selectedText: "--dd-selected-text",
  checkColor: "--dd-check",
  accent: "--dd-accent",
  chipBg: "--dd-chip-bg",
  chipText: "--dd-chip-text",
};

export function getDropdownStyle(
  colors?: DropdownColors,
): CSSProperties {
  return toCssVariables(colors, VARIABLES);
}
