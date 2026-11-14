interface OpportunityEmptyStateProps {
  message?: string;
}

export function OpportunityEmptyState({
  message = "نتیجه‌ای پیدا نشد؛ فیلترها رو کم کن.",
}: OpportunityEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border-decorative bg-white/60 p-16 text-center text-charcoal-2">
      {message}
    </div>
  );
}
