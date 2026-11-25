
import { useState, type CSSProperties } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays } from "lucide-react";

import { Calendar } from "@/components/ui/Calendar/Calendar";

import {
  parseCalendarDate,
  toJalali,
} from "@/utils/jalali";

import { cn } from "@/utils/cn";

interface JalaliDatePickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

function toISODate(date: Date): string {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatJalali(value: string): string {
  if (!value) return "";

  const { year, month, day } = toJalali(
    parseCalendarDate(value),
  );

  return [year, month, day]
    .map((number) =>
      number.toLocaleString("fa-IR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    )
    .join("/");
}

const calendarStyle = {
  width: "100%",
  minWidth: 0,
  boxShadow: "none",
  "--cal-padding": "8px",
  "--cal-radius": "12px",
  "--cal-cell-height": "36px",
} as CSSProperties;

export function JalaliDatePicker({
  id,
  value,
  onChange,
  error = false,
  disabled = false,
  placeholder = "انتخاب تاریخ",
}: JalaliDatePickerProps) {
  const [open, setOpen] = useState(false);

  const initialDate = value
    ? parseCalendarDate(value)
    : new Date();

  const initialMonth = toJalali(initialDate);

  return (
    <Popover.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Popover.Trigger asChild>
        <button
          id={id}
          type="button"
          dir="rtl"
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
              "min-w-0 flex-1 text-start",
              value
                ? "text-text-primary"
                : "text-text-secondary",
            )}
          >
            {value
              ? formatJalali(value)
              : placeholder}
          </span>

          <CalendarDays
            size={18}
            aria-hidden="true"
            className="shrink-0 text-text-secondary"
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          dir="rtl"
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={12}
          aria-label="انتخاب تاریخ شمسی"
          style={{
            width: "min(340px, calc(100vw - 24px))",
            maxHeight:
              "var(--radix-popover-content-available-height)",
            boxSizing: "border-box",
            overflowX: "hidden",
            overflowY: "auto",
          }}
          className="z-50 rounded-xl border border-border-soft bg-white p-2 shadow-lg outline-none"
        >
          <div className="w-full min-w-0">
            <Calendar
              selectedDate={value || null}
              defaultMonth={{
                year: initialMonth.year,
                month: initialMonth.month,
              }}
              compactBelow={1000}
              fixedCells
              dayPopup="none"
              style={calendarStyle}
              onSelectDate={(date) => {
                onChange(toISODate(date));
                setOpen(false);
              }}
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
