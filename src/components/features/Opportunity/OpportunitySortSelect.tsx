import { SORT_LABEL } from "@/constants/opportunityOptions";
import type { OpportunitySort } from "@/types/Opportunity/opportunity";

interface OpportunitySortSelectProps {
  value: OpportunitySort;
  onChange: (value: OpportunitySort) => void;
}

const SORT_OPTIONS = Object.keys(SORT_LABEL) as OpportunitySort[];

export function OpportunitySortSelect({ value, onChange }: OpportunitySortSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as OpportunitySort)}
      aria-label="مرتب‌سازی"
      className="h-11 rounded-xl border border-border-decorative bg-surface-card px-3 text-label text-text-primary outline-none focus:border-action-primary"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {SORT_LABEL[option]}
        </option>
      ))}
    </select>
  );
}
