import type { FaqCategory } from "@/types/Faq/faq";

export type FaqCategoryFilter = FaqCategory | "همه";

export const FAQ_CATEGORY_FILTERS: FaqCategoryFilter[] = [
  "همه",
  "کارجو",
  "کارفرما",
  "والد",
  "پرداخت",
];

interface FaqCategoryTabsProps {
  value: FaqCategoryFilter;
  onChange: (value: FaqCategoryFilter) => void;
}

/** Pill filter for the FAQ category. */
export function FaqCategoryTabs({ value, onChange }: FaqCategoryTabsProps) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
      {FAQ_CATEGORY_FILTERS.map((category) => (
        // TODO: replace with the shared Button component.
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          aria-pressed={value === category}
          className={`shrink-0 rounded-full border px-4 py-2 text-label font-bold transition-colors ${
            value === category
              ? "border-action-primary bg-action-primary text-white"
              : "border-border-decorative bg-surface-card text-text-secondary hover:border-blue-7"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
