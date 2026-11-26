import { ChevronDown, Search } from "lucide-react";

import type { SeekerAdsSort } from "@/types/Seeker/seeker";

const SORT_OPTIONS: { value: SeekerAdsSort; label: string }[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "deadline", label: "نزدیک‌ترین مهلت" },
  { value: "match", label: "بیشترین تطابق" },
];

interface AdsToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sort: SeekerAdsSort;
  onSortChange: (value: SeekerAdsSort) => void;
}

const FIELD =
  "h-10 w-full rounded-xl border border-border-soft bg-white text-label text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

/** Search box and sort select above the ads list. */
export function AdsToolbar({ query, onQueryChange, sort, onSortChange }: AdsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse md:items-end">
      <div className="md:w-44">
        <label htmlFor="ads-sort" className="mb-1 block text-[11px] font-bold text-text-primary">
          مرتب‌سازی
        </label>
        <div className="relative">
          <select
            id="ads-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SeekerAdsSort)}
            className={`${FIELD} appearance-none ps-9 pe-3`}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <label htmlFor="ads-search" className="mb-1 block text-[11px] font-bold text-text-primary">
          جست‌وجو
        </label>
        <div className="relative">
          <input
            id="ads-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="جست‌وجو در عنوان آگهی، مهارت یا کارفرما"
            className={`${FIELD} ps-9 pe-3 placeholder:text-text-secondary`}
          />
          <Search
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>
      </div>
    </div>
  );
}
