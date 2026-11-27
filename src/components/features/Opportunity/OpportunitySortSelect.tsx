import { Dropdown } from "@/components/ui/Dropdown";
import { SORT_LABEL } from "@/constants/opportunityOptions";
import type { OpportunitySort } from "@/types/Opportunity/opportunity";

interface OpportunitySortSelectProps {
  value: OpportunitySort;
  onChange: (value: OpportunitySort) => void;
}

const SORT_OPTIONS = Object.entries(SORT_LABEL) as [OpportunitySort, string][];
const SORT_LABELS = SORT_OPTIONS.map(([, label]) => label);

export function OpportunitySortSelect({
  value,
  onChange,
}: OpportunitySortSelectProps) {
  const currentLabel = SORT_LABEL[value];

  return (
    <Dropdown
      id="opportunity-sort"
      value={currentLabel}
      options={SORT_LABELS}
      onChange={(label) => {
        const selected = SORT_OPTIONS.find(([, optionLabel]) => optionLabel === label);
        if (selected) onChange(selected[0]);
      }}
      placeholder="مرتب‌سازی"
    />
  );
}
