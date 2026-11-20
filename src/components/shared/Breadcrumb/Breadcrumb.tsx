/** Back button + trail ("آگهی‌ها › فهرست"). The last item is the current page. */

import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-caption text-text-secondary">
      <button
        type="button"
        aria-label="بازگشت"
        onClick={() => navigate(-1)}
        className="grid size-7 shrink-0 place-items-center rounded-lg border border-border-soft bg-white text-text-secondary transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        {/* RTL: pointing right means "back" */}
        <ChevronLeft size={14} aria-hidden="true" className="rotate-180" />
      </button>

      <ol className="flex items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-text-primary">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-text-primary" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronLeft size={12} aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
