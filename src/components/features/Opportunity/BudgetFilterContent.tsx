import * as Slider from "@radix-ui/react-slider";

import {
  BUDGET_SLIDER_MAX,
  BUDGET_SLIDER_STEP,
} from "@/constants/opportunityOptions";
import { formatBudget } from "@/utils/formatBudget";

interface BudgetFilterContentProps {
  min: number;
  max: number;
  onChange: (range: { budgetMin: number; budgetMax: number }) => void;
}

/** Range slider body of the budget filter popover. */
export function BudgetFilterContent({ min, max, onChange }: BudgetFilterContentProps) {
  return (
    <div className="px-2 pb-1 pt-2" dir="rtl">
      <div className="mb-4 flex items-center justify-between text-label font-semibold">
        <span>{formatBudget(min)}</span>
        <span className="text-charcoal-2">تا</span>
        <span>{max >= BUDGET_SLIDER_MAX ? "بدون سقف" : formatBudget(max)}</span>
      </div>
      <Slider.Root
        dir="rtl"
        min={0}
        max={BUDGET_SLIDER_MAX}
        step={BUDGET_SLIDER_STEP}
        minStepsBetweenThumbs={1}
        value={[min, max]}
        onValueChange={([budgetMin, budgetMax]) => onChange({ budgetMin, budgetMax })}
        className="relative flex h-5 w-full touch-none items-center"
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-border-decorative">
          <Slider.Range className="absolute h-full rounded-full bg-action-primary" />
        </Slider.Track>
        {[0, 1].map((thumb) => (
          <Slider.Thumb
            key={thumb}
            aria-label="بودجه"
            className="block size-5 rounded-full border-2 border-action-primary bg-surface-card shadow outline-none focus-visible:ring-4 focus-visible:ring-blue/15"
          />
        ))}
      </Slider.Root>
      <p className="mt-3 text-caption text-charcoal-2">مبلغ‌ها به تومان هستند.</p>
    </div>
  );
}
