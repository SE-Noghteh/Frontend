import { useId, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import { ChevronDown, X } from "lucide-react";

import { DropdownSearch } from "@/components/ui/DropdownSearch";
import type { DropdownColors } from "@/types/Dropdown/dropdown";
import { cn } from "@/utils/cn";
import { getDropdownStyle } from "@/utils/getDropdownStyle";
import { matchesSearch } from "@/utils/matchesSearch";

interface MultiSelectDropdownProps {
  id?: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  colors?: DropdownColors;
}

export function MultiSelectDropdown({
  id,
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
  error = false,
  searchPlaceholder,
  emptyText = "موردی پیدا نشد",
  className,
  colors,
}: MultiSelectDropdownProps) {
  const generatedId = useId();
  const triggerId = id ?? generatedId;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOptions = options.filter((option) =>
    matchesSearch(option, query),
  );
  const style = getDropdownStyle(colors);

  function toggleOption(option: string) {
    if (disabled) return;

    if (value.includes(option)) {
      onChange(
        value.filter((item) => item !== option),
      );
    } else {
      onChange([...value, option]);
    }
  }

  function removeOption(option: string) {
    if (disabled) return;

    onChange(
      value.filter((item) => item !== option),
    );
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setQuery("");
    }
  }

  return (
    <div dir="rtl" style={style} className="dd flex min-w-0 flex-col gap-3">

      <Popover.Root
        open={open}
        onOpenChange={handleOpenChange}
      >

        <Popover.Trigger asChild>

          <button
            id={triggerId}
            type="button"
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

            <span
              className={cn(
                "min-w-0 flex-1 truncate text-start",
                value.length === 0 && "dd-placeholder",
              )}
            >
              {value.length > 0
                ? `${value.length.toLocaleString("fa-IR")} مورد انتخاب شده`
                : placeholder}
            </span>

            <ChevronDown
              size={18}
              aria-hidden="true"
              className={cn(
                "dd-icon shrink-0 transition-transform duration-200",
                open && "rotate-180",
              )}
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
            aria-label="انتخاب چند گزینه"
            style={style}
            className={cn(
              "dd dd-menu z-50 flex flex-col overflow-y-auto rounded-xl border p-2 shadow-lg outline-none",
              "w-[var(--radix-popover-trigger-width)]",
              "max-h-[var(--radix-popover-content-available-height)]",
            )}
          >

            {/* Search */}

            <DropdownSearch
              value={query}
              onChange={setQuery}
              placeholder={searchPlaceholder}
            />

            {/* Options */}

            <div
              role="group"
              aria-label="گزینه‌ها"
              className="flex min-h-0 max-h-64 flex-col gap-1 overflow-y-auto overscroll-contain"
            >

              {filteredOptions.length === 0 ? (

                <div className="dd-icon px-3 py-8 text-center text-label">
                  {emptyText}
                </div>

              ) : (

                filteredOptions.map((option) => {
                  const selected =
                    value.includes(option);

                  return (
                    <label
                      key={option}
                      data-selected={selected || undefined}
                      className="dd-option flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-label transition-colors duration-150"
                    >

                      <span className="min-w-0 break-words">
                        {option}
                      </span>

                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          toggleOption(option)
                        }
                        className="dd-checkbox size-4 shrink-0 cursor-pointer"
                      />

                    </label>
                  );
                })

              )}

            </div>

            {/* Footer */}

            <div className="mt-2 flex shrink-0 items-center justify-between gap-3 border-t border-(--dd-menu-border) px-2 pt-2">

              <span className="dd-icon text-caption">
                {value.length.toLocaleString("fa-IR")}
                {" مورد انتخاب شده"}
              </span>

              <Popover.Close asChild>

                <button
                  type="button"
                  className="dd-confirm rounded-lg px-4 py-2 text-label font-bold hover:opacity-80"
                >
                  تأیید
                </button>

              </Popover.Close>

            </div>

          </Popover.Content>

        </Popover.Portal>

      </Popover.Root>

      {/* Selected items */}

      {value.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">

          {value.map((option) => (

            <span
              key={option}
              className="dd-chip inline-flex max-w-full items-center gap-2 rounded-lg px-3 py-1.5 text-caption"
            >

              <span className="break-words">
                {option}
              </span>

              <button
                type="button"
                disabled={disabled}
                aria-label={`حذف ${option}`}
                onClick={() =>
                  removeOption(option)
                }
                className="shrink-0 rounded p-0.5 transition-colors"
              >
                <X size={14} aria-hidden="true" />
              </button>

            </span>

          ))}

        </div>
      )}

    </div>
  );
}
