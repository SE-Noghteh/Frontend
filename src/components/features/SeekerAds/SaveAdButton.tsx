import { Flag } from "lucide-react";

import { cn } from "@/utils/cn";

interface SaveAdButtonProps {
  isSaved: boolean;
  onToggle: () => void;
}

/** Flag toggle that saves an ad for later. */
export function SaveAdButton({ isSaved, onToggle }: SaveAdButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isSaved}
      aria-label={isSaved ? "حذف از ذخیره‌شده‌ها" : "ذخیره آگهی"}
      onClick={onToggle}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        isSaved ? "bg-error-soft text-error" : "text-text-secondary hover:bg-background-page",
      )}
    >
      <Flag size={15} aria-hidden="true" className={isSaved ? "fill-current" : undefined} />
    </button>
  );
}
