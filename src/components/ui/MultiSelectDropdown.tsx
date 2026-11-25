
import { useId, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import {
  ChevronDown,
  Search,
  X,
} from "lucide-react";

import { cn } from "@/utils/cn";

interface MultiSelectDropdownProps {
  id?: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, "")
    .replace(/\s+/g, "")
    .trim();
}

export function MultiSelectDropdown({
  id,
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
  error = false,
}: MultiSelectDropdownProps) {
  const generatedId = useId();
  const triggerId = id ?? generatedId;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOptions = options.filter(
    (option) =>
      normalizeText(option).includes(
        normalizeText(query),
      ),
  );

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
    <div dir="rtl" className="flex min-w-0 flex-col gap-3">

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
            className={cn(
              "flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2.5 text-label transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-error"
                : "border-ocean-blue",
              open && !error && "border-blue",
            )}
          >

            <span
              className={cn(
                "min-w-0 flex-1 truncate text-start",
                value.length > 0
                  ? "text-text-primary"
                  : "text-text-secondary",
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
                "shrink-0 text-text-secondary transition-transform duration-200",
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
            className={cn(
              "z-50 flex flex-col overflow-y-auto rounded-xl border border-border-soft bg-white p-2 shadow-lg outline-none",
              "w-[var(--radix-popover-trigger-width)]",
              "max-h-[var(--radix-popover-content-available-height)]",
            )}
          >

            {/* Search */}

            <div className="relative mb-2 shrink-0">

              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary"
              />

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="جست‌وجو..."
                aria-label="جست‌وجوی گزینه‌ها"
                className="h-11 w-full rounded-lg border border-border-soft bg-white ps-10 pe-3 text-label outline-none focus:border-blue"
              />

            </div>

            {/* Options */}

            <div
              role="group"
              aria-label="گزینه‌ها"
              className="flex min-h-0 max-h-64 flex-col gap-1 overflow-y-auto overscroll-contain"
            >

              {filteredOptions.length === 0 ? (

                <div className="px-3 py-8 text-center text-label text-text-secondary">
                  موردی پیدا نشد
                </div>

              ) : (

                filteredOptions.map((option) => {
                  const selected =
                    value.includes(option);

                  return (
                    <label
                      key={option}
                      className={cn(
                        "flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-label text-text-primary",
                        "transition-colors duration-150",
                        "hover:bg-green-7",
                        "focus-within:bg-green-7",
                        selected && "bg-green-7",
                      )}
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
                        className="size-4 shrink-0 cursor-pointer accent-blue"
                      />

                    </label>
                  );
                })

              )}

            </div>

            {/* Footer */}

            <div className="mt-2 flex shrink-0 items-center justify-between gap-3 border-t border-border-soft px-2 pt-2">

              <span className="text-caption text-text-secondary">
                {value.length.toLocaleString("fa-IR")}
                {" مورد انتخاب شده"}
              </span>

              <Popover.Close asChild>

                <button
                  type="button"
                  className="rounded-lg bg-green-7 px-4 py-2 text-label font-bold text-blue hover:opacity-80"
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
              className="inline-flex max-w-full items-center gap-2 rounded-lg bg-green-7 px-3 py-1.5 text-caption text-text-primary"
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
                className="shrink-0 rounded p-0.5 transition-colors hover:bg-green-6"
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
