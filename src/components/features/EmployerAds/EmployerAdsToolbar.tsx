
import { Search } from "lucide-react";

import { Dropdown } from "@/components/ui/Dropdown";

import type {
  EmployerAdsSort,
} from "@/types/Employer/employer";

const SORT_OPTIONS: {
  value: EmployerAdsSort;
  label: string;
}[] = [
  {
    value: "newest",
    label: "جدیدترین",
  },
  {
    value: "oldest",
    label: "قدیمی‌ترین",
  },
  {
    value: "most-applicants",
    label: "بیشترین درخواست",
  },
];

interface EmployerAdsToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sort: EmployerAdsSort;
  onSortChange: (value: EmployerAdsSort) => void;
}

const FIELD =
  "h-10 w-full rounded-xl border border-border-soft bg-white text-label text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

export function EmployerAdsToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: EmployerAdsToolbarProps) {
  const selectedSortLabel =
    SORT_OPTIONS.find(
      (option) => option.value === sort,
    )?.label ?? "";

  function handleSortChange(label: string) {
    const selectedOption = SORT_OPTIONS.find(
      (option) => option.label === label,
    );

    if (selectedOption) {
      onSortChange(selectedOption.value);
    }
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse md:items-end">

      {/* Sort */}

      <div className="min-w-0 md:w-44">

        <label
          htmlFor="employer-ads-sort"
          className="mb-1 block text-[11px] font-bold text-text-primary"
        >
          مرتب‌سازی
        </label>

        <Dropdown
          id="employer-ads-sort"
          value={selectedSortLabel}
          options={SORT_OPTIONS.map(
            (option) => option.label,
          )}
          onChange={handleSortChange}
          placeholder="مرتب‌سازی"
          className="h-10 min-h-10 rounded-xl border-border-soft px-3 py-0"
        />

      </div>

      {/* Search */}

      <div className="min-w-0 flex-1">

        <label
          htmlFor="employer-ads-search"
          className="mb-1 block text-[11px] font-bold text-text-primary"
        >
          جست‌وجو
        </label>

        <div className="relative">

          <input
            id="employer-ads-search"
            type="search"
            value={query}
            onChange={(event) =>
              onQueryChange(event.target.value)
            }
            placeholder="جست‌وجو در عنوان آگهی"
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
