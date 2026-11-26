import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";

import { DropdownOption } from "@/components/ui/DropdownOption";
import type { DropdownColors } from "@/types/Dropdown/dropdown";
import { cn } from "@/utils/cn";
import { getDropdownStyle } from "@/utils/getDropdownStyle";

interface DropdownProps {
  id?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  colors?: DropdownColors;
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
  colors,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const style = getDropdownStyle(colors);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>

      <Popover.Trigger asChild>

        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-invalid={error}
          dir="rtl"
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
              !value && "dd-placeholder",
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
          style={style}
          className={cn(
            "dd dd-menu z-50 overflow-y-auto rounded-xl border p-1.5 shadow-lg outline-none",
            "w-[var(--radix-popover-trigger-width)]",
            "max-h-[min(280px,var(--radix-popover-content-available-height))]",
          )}
        >

          {options.map((option) => (
            <DropdownOption
              key={option}
              label={option}
              selected={option === value}
              onSelect={() => {
                onChange(option);
                setOpen(false);
              }}
            />
          ))}

        </Popover.Content>

      </Popover.Portal>

    </Popover.Root>
  );
}
