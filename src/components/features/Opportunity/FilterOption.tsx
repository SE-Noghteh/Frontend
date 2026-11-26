import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface FilterOptionProps {
  isChecked: boolean;
  onToggle: () => void;
  children: ReactNode;
}

/** One checkbox-style row inside a filter popover. */
export function FilterOption({ isChecked, onToggle, children }: FilterOptionProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-start text-label text-text-primary transition-colors hover:bg-surface-hover"
    >
      <span
        className={`grid size-[18px] shrink-0 place-items-center rounded-[6px] border transition-colors ${
          isChecked
            ? "border-action-primary bg-action-primary"
            : "border-border-decorative bg-surface-card"
        }`}
      >
        {isChecked && <Check className="size-3 text-white" strokeWidth={3} />}
      </span>
      <span className="flex-1">{children}</span>
    </button>
  );
}
