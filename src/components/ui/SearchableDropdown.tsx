import { useState, type KeyboardEvent } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";

import { DropdownOption } from "@/components/ui/DropdownOption";
import { DropdownSearch } from "@/components/ui/DropdownSearch";
import type { DropdownColors } from "@/types/Dropdown/dropdown";
import { cn } from "@/utils/cn";
import { getDropdownStyle } from "@/utils/getDropdownStyle";
import { matchesSearch } from "@/utils/matchesSearch";

interface SearchableDropdownProps {
  id?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  colors?: DropdownColors;
}

/** Single-select dropdown with a search box. */
export function SearchableDropdown({
  id,
  value,
  options,
  onChange,
  placeholder = "انتخاب کنید",
  searchPlaceholder,
  emptyText = "موردی پیدا نشد",
  error = false,
  disabled = false,
  className,
  colors,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOptions = options.filter((option) => matchesSearch(option, query));
  const style = getDropdownStyle(colors);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) setQuery("");
  }

  function selectOption(option: string) {
    onChange(option);
    handleOpenChange(false);
  }

  // Enter picks the first match.
  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (query && filteredOptions.length > 0) selectOption(filteredOptions[0]);
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          id={id}
          type="button"
          dir="rtl"
          disabled={disabled}
          aria-invalid={error}
          style={style}
          className={cn(
            "dd dd-trigger flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-label transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <span className={cn("min-w-0 flex-1 truncate text-start", !value && "dd-placeholder")}>
            {value || placeholder}
          </span>

          <ChevronDown
            size={17}
            aria-hidden="true"
            className={cn("dd-icon shrink-0 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          dir="rtl"
          side="bottom"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          aria-label="گزینه‌های انتخاب"
          style={style}
          className="dd dd-menu z-50 flex max-h-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] flex-col overflow-y-auto rounded-xl border p-2 shadow-lg outline-none"
        >
          <DropdownSearch
            value={query}
            onChange={setQuery}
            placeholder={searchPlaceholder}
            onKeyDown={handleSearchKeyDown}
          />

          <div className="flex max-h-64 min-h-0 flex-col gap-1 overflow-y-auto overscroll-contain">
            {filteredOptions.length === 0 ? (
              <div className="dd-icon px-3 py-8 text-center text-label">{emptyText}</div>
            ) : (
              filteredOptions.map((option) => (
                <DropdownOption
                  key={option}
                  label={option}
                  selected={option === value}
                  onSelect={() => selectOption(option)}
                />
              ))
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
