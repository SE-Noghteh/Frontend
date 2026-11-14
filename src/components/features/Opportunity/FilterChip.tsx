import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { toPersianDigits } from "@/utils/toPersianDigits";

interface FilterChipProps {
  label: string;
  /** Number of active selections; the chip is highlighted when greater than 0. */
  activeCount?: number;
  /** Popover width in px. */
  width?: number;
  children: ReactNode;
}

/** Pill button that opens a popover with filter options. */
export function FilterChip({ label, activeCount = 0, width = 280, children }: FilterChipProps) {
  const isActive = activeCount > 0;

  return (
    <Popover.Root>
      {/* TODO: replace the trigger with the shared Button component. */}
      <Popover.Trigger
        className={`group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-label font-medium outline-none transition-colors ${
          isActive
            ? "border-action-primary bg-action-primary text-white"
            : "border-border-decorative bg-surface-card text-text-primary hover:border-blue-6 data-[state=open]:border-action-primary"
        }`}
      >
        {label}
        {isActive && (
          <span className="grid size-5 place-items-center rounded-full bg-white/20 text-caption">
            {toPersianDigits(activeCount)}
          </span>
        )}
        <ChevronDown className="size-3.5 opacity-60 transition-transform group-data-[state=open]:rotate-180" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          collisionPadding={16}
          style={{ width }}
          className="animate-popover-in z-50 max-w-[calc(100vw-32px)] rounded-2xl border border-border-decorative bg-surface-card p-3 shadow-[0_24px_48px_-16px_rgba(29,53,87,.28)] outline-none"
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
