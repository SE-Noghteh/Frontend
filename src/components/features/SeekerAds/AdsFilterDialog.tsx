import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { EMPTY_FILTERS, type SeekerAdsFilters } from "@/hooks/useSeekerAds";
import type { BudgetBucket, SeekerAdCategory, SeekerAdKind } from "@/types/Seeker/seeker";
import { cn } from "@/utils/cn";

interface AdsFilterDialogProps {
  isOpen: boolean;
  filters: SeekerAdsFilters;
  onApply: (filters: SeekerAdsFilters) => void;
  onClose: () => void;
}

const KIND_OPTIONS: { value: SeekerAdKind; label: string }[] = [
  { value: "internship", label: "کارآموزی" },
  { value: "work", label: "کاری" },
];

const CATEGORY_OPTIONS: { value: SeekerAdCategory; label: string }[] = [
  { value: "programming", label: "برنامه‌نویسی" },
  { value: "video", label: "ویدئو" },
  { value: "design", label: "طراحی" },
];

const BUDGET_OPTIONS: { value: BudgetBucket; label: string }[] = [
  { value: "over3", label: "بیش از ۳ میلیون" },
  { value: "from1to3", label: "۱ تا ۳ میلیون" },
  { value: "under1", label: "تا ۱ میلیون" },
];

interface ChipGroupProps<T extends string> {
  legend: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
}

/** Single-choice chips; clicking the selected chip clears it. */
function ChipGroup<T extends string>({ legend, options, value, onChange }: ChipGroupProps<T>) {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 text-label font-bold text-text-primary">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(isSelected ? null : option.value)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-caption font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                isSelected
                  ? "border-blue bg-blue text-white"
                  : "border-border-soft bg-white text-text-secondary hover:border-ocean-6",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function AdsFilterDialog({ isOpen, filters, onApply, onClose }: AdsFilterDialogProps) {
  const [draft, setDraft] = useState<SeekerAdsFilters>(filters);

  // Re-sync the draft each time the dialog opens, so cancelled edits do not stick.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setDraft(filters);
  }

  return (
    <Dialog isOpen={isOpen} title="فیلتر آگهی‌ها" onClose={onClose}>
      <ChipGroup
        legend="نوع آگهی"
        options={KIND_OPTIONS}
        value={draft.kind}
        onChange={(kind) => setDraft((current) => ({ ...current, kind }))}
      />
      <ChipGroup
        legend="دسته‌بندی"
        options={CATEGORY_OPTIONS}
        value={draft.category}
        onChange={(category) => setDraft((current) => ({ ...current, category }))}
      />
      <ChipGroup
        legend="بودجه"
        options={BUDGET_OPTIONS}
        value={draft.budget}
        onChange={(budget) => setDraft((current) => ({ ...current, budget }))}
      />

      <div className="mt-6 flex flex-col gap-2 md:flex-row">
        <Button className="md:flex-1" onClick={() => onApply(draft)}>
          اعمال فیلتر
        </Button>
        <Button variant="secondary" className="md:flex-1" onClick={() => setDraft(EMPTY_FILTERS)}>
          پاک کردن
        </Button>
      </div>
    </Dialog>
  );
}
