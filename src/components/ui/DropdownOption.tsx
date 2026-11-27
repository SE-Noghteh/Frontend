import { Check } from "lucide-react";

interface DropdownOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

/** One row of a single-select dropdown menu. */
export function DropdownOption({
  label,
  selected,
  onSelect,
}: DropdownOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-selected={selected || undefined}
      onClick={onSelect}
      className="dd-option flex min-h-10 w-full shrink-0 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-start text-label transition-colors duration-150 focus-visible:outline-none data-selected:font-bold"
    >
      <span className="min-w-0 break-words">{label}</span>

      {selected ? (
        <Check
          size={16}
          className="dd-check shrink-0"
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
}
