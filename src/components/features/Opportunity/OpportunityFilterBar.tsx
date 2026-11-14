import { Sprout, X, Zap } from "lucide-react";

import {
  AGE_GROUP_LABEL,
  CITIES,
  DURATION_LABEL,
  OPPORTUNITY_TYPE_LABEL,
  SKILL_LEVEL_LABEL,
  WORK_MODE_FILTER_OPTIONS,
  WORK_MODE_LABEL,
} from "@/constants/opportunityOptions";
import { useOpportunityCategories } from "@/hooks/useOpportunityCategories";
import type {
  AgeGroup,
  DurationBucket,
  OpportunityFilters,
  OpportunityType,
  SkillLevel,
} from "@/types/Opportunity/opportunity";
import {
  EMPTY_OPPORTUNITY_FILTERS,
  countActiveFilters,
  isBudgetFilterActive,
} from "@/utils/opportunityFilters";
import { toPersianDigits } from "@/utils/toPersianDigits";

import { BudgetFilterContent } from "./BudgetFilterContent";
import { FilterChip } from "./FilterChip";
import { FilterOption } from "./FilterOption";
import { FilterToggle } from "./FilterToggle";

interface OpportunityFilterBarProps {
  filters: OpportunityFilters;
  onChange: (filters: OpportunityFilters) => void;
}

const AGE_GROUPS: AgeGroup[] = ["under18", "adult"];
const TYPES: OpportunityType[] = ["project", "internship"];
const LEVELS: SkillLevel[] = ["beginner", "intermediate", "advanced"];
const DURATIONS = Object.keys(DURATION_LABEL) as DurationBucket[];

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];
}

/** Horizontally scrollable bar of every opportunity filter. */
export function OpportunityFilterBar({ filters, onChange }: OpportunityFilterBarProps) {
  const { data: categories = [] } = useOpportunityCategories();
  const activeCount = countActiveFilters(filters);

  const update = (patch: Partial<OpportunityFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="hide-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 py-1">
      <FilterChip label="دسته‌بندی" activeCount={filters.categoryIds.length} width={340}>
        <div className="max-h-[320px] overflow-y-auto">
          {categories.map((category) => (
            <FilterOption
              key={category.id}
              isChecked={filters.categoryIds.includes(category.id)}
              onToggle={() => update({ categoryIds: toggleItem(filters.categoryIds, category.id) })}
            >
              {category.title}
            </FilterOption>
          ))}
        </div>
      </FilterChip>

      <FilterChip label="شیوه کار" activeCount={filters.workModes.length}>
        {WORK_MODE_FILTER_OPTIONS.map((mode) => (
          <FilterOption
            key={mode}
            isChecked={filters.workModes.includes(mode)}
            onToggle={() => update({ workModes: toggleItem(filters.workModes, mode) })}
          >
            {WORK_MODE_LABEL[mode]}
          </FilterOption>
        ))}
        <p className="px-2.5 pt-2 text-caption leading-5 text-charcoal-2">
          کارهای حضوری فقط پس از بررسی ایمنی و مجوز منتشر می‌شوند.
        </p>
      </FilterChip>

      <FilterChip label="مناسب سن من" activeCount={filters.ageGroup ? 1 : 0}>
        {AGE_GROUPS.map((ageGroup) => (
          <FilterOption
            key={ageGroup}
            isChecked={filters.ageGroup === ageGroup}
            onToggle={() => update({ ageGroup: filters.ageGroup === ageGroup ? "" : ageGroup })}
          >
            {AGE_GROUP_LABEL[ageGroup]}
          </FilterOption>
        ))}
      </FilterChip>

      <FilterChip label="نوع فرصت" activeCount={filters.types.length}>
        {TYPES.map((type) => (
          <FilterOption
            key={type}
            isChecked={filters.types.includes(type)}
            onToggle={() => update({ types: toggleItem(filters.types, type) })}
          >
            {OPPORTUNITY_TYPE_LABEL[type]}
          </FilterOption>
        ))}
      </FilterChip>

      <FilterChip label="سطح مهارت" activeCount={filters.levels.length}>
        {LEVELS.map((level) => (
          <FilterOption
            key={level}
            isChecked={filters.levels.includes(level)}
            onToggle={() => update({ levels: toggleItem(filters.levels, level) })}
          >
            {SKILL_LEVEL_LABEL[level]}
          </FilterOption>
        ))}
      </FilterChip>

      <FilterChip label="بودجه" activeCount={isBudgetFilterActive(filters) ? 1 : 0} width={300}>
        <BudgetFilterContent
          min={filters.budgetMin}
          max={filters.budgetMax}
          onChange={update}
        />
      </FilterChip>

      <FilterChip label="مدت انجام" activeCount={filters.durations.length}>
        {DURATIONS.map((duration) => (
          <FilterOption
            key={duration}
            isChecked={filters.durations.includes(duration)}
            onToggle={() => update({ durations: toggleItem(filters.durations, duration) })}
          >
            {DURATION_LABEL[duration]}
          </FilterOption>
        ))}
      </FilterChip>

      <FilterChip label="شهر" activeCount={filters.city ? 1 : 0} width={220}>
        {CITIES.map((city) => (
          <FilterOption
            key={city}
            isChecked={filters.city === city}
            onToggle={() => update({ city: filters.city === city ? "" : city })}
          >
            {city}
          </FilterOption>
        ))}
      </FilterChip>

      <span className="mx-1 h-5 w-px shrink-0 bg-border-decorative" />

      <FilterToggle
        isOn={filters.isUrgent}
        onToggle={() => update({ isUrgent: !filters.isUrgent })}
        icon={<Zap className="size-3.5" />}
      >
        مهلت نزدیک
      </FilterToggle>
      <FilterToggle
        isOn={filters.requiresNoExperience}
        onToggle={() => update({ requiresNoExperience: !filters.requiresNoExperience })}
        icon={<Sprout className="size-3.5" />}
      >
        بدون نیاز به تجربه
      </FilterToggle>

      {activeCount > 0 && (
        // TODO: replace with the shared Button component (ghost variant).
        <button
          type="button"
          onClick={() =>
            onChange({
              ...EMPTY_OPPORTUNITY_FILTERS,
              query: filters.query,
              sort: filters.sort,
            })
          }
          className="ms-1 inline-flex h-10 shrink-0 items-center gap-1 rounded-full px-3 text-label font-medium text-peach-3 transition-colors hover:bg-peach-7"
        >
          <X className="size-3.5" />
          پاک کردن ({toPersianDigits(activeCount)})
        </button>
      )}
    </div>
  );
}
