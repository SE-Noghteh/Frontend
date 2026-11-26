import { Search } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface AdsEmptyStateProps {
  onClear: () => void;
}

export function AdsEmptyState({ onClear }: AdsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border-soft bg-white px-6 py-12 text-center shadow-[0_2px_10px_rgba(38,35,33,0.04)]">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-peach-soft text-error">
        <Search size={24} aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-card-title font-bold text-text-primary">آگهی‌ای پیدا نشد</h2>
      <p className="mt-1.5 text-label text-text-secondary">عبارت جست‌وجو یا فیلترها را تغییر بده</p>
      <Button variant="secondary" size="sm" className="mt-5" onClick={onClear}>
        پاک کردن فیلترها
      </Button>
    </div>
  );
}
