/** Color overrides of the dropdown components. Any CSS color / `var(--token)` works. */
export interface DropdownColors {
  triggerBg?: string;
  triggerText?: string;
  placeholderText?: string;
  border?: string;
  /** Trigger and search box border while active. */
  activeBorder?: string;
  menuBg?: string;
  menuBorder?: string;
  optionText?: string;
  hoverBg?: string;
  hoverText?: string;
  selectedBg?: string;
  selectedText?: string;
  /** Check mark of the selected option (single select). */
  checkColor?: string;
  /** Checkboxes and confirm button text (multi select). */
  accent?: string;
  /** Selected-item chips and confirm button background (multi select). */
  chipBg?: string;
  chipText?: string;
}
