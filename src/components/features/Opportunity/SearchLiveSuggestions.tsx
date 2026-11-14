import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { useDebounce } from "@/hooks/useDebounce";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useOpportunityCategories } from "@/hooks/useOpportunityCategories";
import { EMPTY_OPPORTUNITY_FILTERS } from "@/utils/opportunityFilters";

interface SearchLiveSuggestionsProps {
  query: string;
  onSelectQuery: (query: string) => void;
  onNavigate: () => void;
}

const MAX_OPPORTUNITIES = 4;
const MAX_CATEGORIES = 3;

/** Matches for the text typed in the search box (categories + opportunities). */
export function SearchLiveSuggestions({
  query,
  onSelectQuery,
  onNavigate,
}: SearchLiveSuggestionsProps) {
  const debouncedQuery = useDebounce(query, 250);
  const { data: opportunities = [] } = useOpportunities({
    ...EMPTY_OPPORTUNITY_FILTERS,
    query: debouncedQuery,
  });
  const { data: categories = [] } = useOpportunityCategories();

  const matchedCategories = categories
    .filter((category) => category.title.includes(query))
    .slice(0, MAX_CATEGORIES);
  const matchedOpportunities = opportunities.slice(0, MAX_OPPORTUNITIES);

  return (
    <>
      {/* TODO: replace with the shared Button component. */}
      <button
        type="button"
        onClick={() => onSelectQuery(query)}
        className="flex w-full items-center gap-3 rounded-xl bg-surface-info px-3 py-2.5 text-start text-label text-text-primary"
      >
        <Search className="size-4 text-charcoal-2" />
        <span className="flex-1">
          جستجوی «<b>{query}</b>» در همه فرصت‌ها
        </span>
        <kbd className="rounded border border-border-decorative bg-surface-card px-1.5 py-0.5 text-caption text-charcoal-2">
          Enter
        </kbd>
      </button>

      {matchedCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {matchedCategories.map((category) => (
            <Link
              key={category.id}
              to={`/search?cat=${category.id}`}
              onClick={onNavigate}
              className="rounded-full bg-green-7 px-3 py-1 text-caption text-green-2"
            >
              در {category.shortTitle}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-3 space-y-0.5">
        {matchedOpportunities.length === 0 && (
          <p className="px-2 py-3 text-label text-charcoal-2">
            نتیجه مستقیمی پیدا نشد؛ جستجوی کامل رو امتحان کن.
          </p>
        )}
        {matchedOpportunities.map((opportunity) => (
          <button
            key={opportunity.id}
            type="button"
            onClick={() => onSelectQuery(opportunity.title)}
            className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-start text-label hover:bg-surface-info"
          >
            <span className="truncate text-text-primary">{opportunity.title}</span>
            <span className="shrink-0 text-caption text-charcoal-2">
              {opportunity.employerName}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
