import { Paperclip } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";

interface RequestsEmptyStateProps {
  /** True when the seeker has no requests at all (not just none in the selected tab). */
  isFirstTime: boolean;
}

export function RequestsEmptyState({ isFirstTime }: RequestsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border-soft bg-white px-6 py-12 text-center shadow-[0_2px_10px_rgba(38,35,33,0.04)]">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-peach-soft text-error">
        <Paperclip size={24} aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-card-title font-bold text-text-primary">
        {isFirstTime ? "هنوز درخواستی نفرستاده‌ای" : "درخواستی در این دسته نیست"}
      </h2>
      <p className="mt-1.5 text-label text-text-secondary">
        {isFirstTime ? "آگهی مناسبت را پیدا کن و اولین درخواستت را بفرست" : "دسته‌ی دیگری را امتحان کن"}
      </p>
      {isFirstTime ? (
        <ButtonLink to="/seeker/ads" size="sm" className="mt-5">
          جست‌وجوی آگهی
        </ButtonLink>
      ) : null}
    </div>
  );
}
