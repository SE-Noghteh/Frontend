import type { ReactNode } from "react";

interface FilterToggleProps {
  isOn: boolean;
  onToggle: () => void;
  icon: ReactNode;
  children: ReactNode;
}

/** On/off pill used for boolean filters (urgent, no experience). */
export function FilterToggle({ isOn, onToggle, icon, children }: FilterToggleProps) {
  // TODO: replace with the shared Button component.
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isOn}
      className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-label font-medium transition-colors ${
        isOn
          ? "border-green-3 bg-green-7 text-green-2"
          : "border-border-decorative bg-surface-card text-text-primary hover:border-blue-6"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
