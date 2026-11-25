
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/utils/cn";

interface DropdownProps {
  id?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  id,
  value,
  options,
  onChange,
  placeholder = "انتخاب کنید",
  error = false,
  disabled = false,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>

      <Popover.Trigger asChild>

        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-invalid={error}
          dir="rtl"
          className={cn(
            "flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2.5 text-label text-text-primary transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-error"
              : "border-ocean-blue",
            open && !error && "border-blue",
            className,
          )}
        >

          <span
            className={cn(
              "min-w-0 flex-1 truncate text-start",
              !value && "text-text-secondary",
            )}
          >
            {value || placeholder}
          </span>

          <ChevronDown
            size={17}
            aria-hidden="true"
            className={cn(
              "shrink-0 transition-transform duration-200",
              open && "rotate-180",
            )}
          />

        </button>

      </Popover.Trigger>

      <Popover.Portal>

        <Popover.Content
          dir="rtl"
          align="start"
          side="bottom"
          sideOffset={6}
          collisionPadding={12}
          aria-label="گزینه‌های انتخاب"
          className={cn(
            "z-50 overflow-y-auto rounded-xl border border-border-soft bg-white p-1.5 shadow-lg outline-none",
            "w-[var(--radix-popover-trigger-width)]",
            "max-h-[min(280px,var(--radix-popover-content-available-height))]",
          )}
        >

          {options.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  "flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-start text-label text-text-primary",
                  "cursor-pointer transition-colors duration-150",
                  "hover:bg-green-7",
                  "focus-visible:bg-green-7 focus-visible:outline-none",
                  selected && "bg-green-7 font-bold",
                )}
              >

                <span>{option}</span>

                {selected && (
                  <Check
                    size={16}
                    className="shrink-0 text-green-2"
                    aria-hidden="true"
                  />
                )}

              </button>
            );
          })}

        </Popover.Content>

      </Popover.Portal>

    </Popover.Root>
  );
}
