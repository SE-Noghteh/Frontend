import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

import { useOpportunityCategories } from "@/hooks/useOpportunityCategories";
import { useTrendingSearches } from "@/hooks/useTrendingSearches";

import { CategoryIllustration } from "./CategoryIllustration";

interface SearchTrendingSuggestionsProps {
  onSelectQuery: (query: string) => void;
  onNavigate: () => void;
}

const VISIBLE_CATEGORIES = 6;

/** Popular searches + quick category links, shown while the search box is empty. */
export function SearchTrendingSuggestions({
  onSelectQuery,
  onNavigate,
}: SearchTrendingSuggestionsProps) {
  const { data: trending = [] } = useTrendingSearches();
  const { data: categories = [] } = useOpportunityCategories();

  return (
    <>
      <div className="mb-3 flex items-center gap-1.5 text-label font-bold text-text-primary">
        <TrendingUp className="size-4 text-green-3" />
        جستجوهای پرطرفدار
      </div>
      <div className="flex flex-wrap gap-2">
        {trending.map((term) => (
          // TODO: replace with the shared Button component.
          <button
            key={term}
            type="button"
            onClick={() => onSelectQuery(term)}
            className="rounded-full border border-border-decorative px-3.5 py-1.5 text-label text-text-primary transition-colors hover:border-action-primary hover:bg-surface-info"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="mb-2 mt-5 text-label font-bold text-text-primary">دسته‌بندی‌ها</div>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        {categories.slice(0, VISIBLE_CATEGORIES).map((category) => (
          <Link
            key={category.id}
            to={`/search?cat=${category.id}`}
            onClick={onNavigate}
            className="flex items-center gap-2.5 rounded-xl p-1.5 text-label text-text-primary hover:bg-surface-info"
          >
            <span className="size-9 shrink-0 overflow-hidden rounded-lg">
              <CategoryIllustration categoryId={category.id} className="h-full w-full" />
            </span>
            {category.shortTitle}
          </Link>
        ))}
      </div>
    </>
  );
}
