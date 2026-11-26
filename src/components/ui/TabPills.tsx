/** Horizontal pill tabs (scrollable on phones). Generic: values and labels come from the caller. */

import { cn } from "@/utils/cn";

interface TabPillsProps<T extends string> {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

export function TabPills<T extends string>({ tabs, value, onChange, ariaLabel }: TabPillsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2 text-label font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
              isActive
                ? "border-blue bg-blue text-white"
                : "border-border-soft bg-white text-text-secondary hover:border-ocean-6 hover:text-text-primary",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
