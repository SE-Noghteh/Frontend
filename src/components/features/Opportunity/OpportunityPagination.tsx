import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface OpportunityPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | "start" | "end";

function getItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];
  let start = Math.max(2, current - 1);
  let end = Math.min(total - 1, current + 1);

  if (current <= 4) {
    start = 2;
    end = 5;
  } else if (current >= total - 3) {
    start = total - 4;
    end = total - 1;
  }

  if (start > 2) items.push("start");

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < total - 1) items.push("end");

  items.push(total);
  return items;
}

export function OpportunityPagination({
  currentPage,
  totalPages,
  onPageChange,
}: OpportunityPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="صفحه‌بندی فرصت‌ها"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        startIcon={<ChevronRight size={15} aria-hidden="true" />}
        onClick={() => onPageChange(currentPage - 1)}
      >
        قبلی
      </Button>

      <div className="flex items-center gap-1">
        {getItems(currentPage, totalPages).map((item) =>
          typeof item === "number" ? (
            <button
              key={item}
              type="button"
              aria-current={item === currentPage ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={cn(
                "grid size-9 place-items-center rounded-lg border text-caption font-bold transition-colors",
                item === currentPage
                  ? "border-blue bg-blue text-white"
                  : "border-border-decorative bg-surface-card text-text-primary hover:border-ocean-blue",
              )}
            >
              {toPersianDigits(item)}
            </button>
          ) : (
            <span
              key={item}
              aria-hidden="true"
              className="grid size-9 place-items-center text-text-secondary"
            >
              …
            </span>
          ),
        )}
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        endIcon={<ChevronLeft size={15} aria-hidden="true" />}
        onClick={() => onPageChange(currentPage + 1)}
      >
        بعدی
      </Button>
    </nav>
  );
}
