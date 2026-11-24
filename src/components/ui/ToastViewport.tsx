/** Renders the current toast from `useToastStore` and hides it after a few seconds. */

import { Check, X } from "lucide-react";
import { useEffect } from "react";

import { useToastStore } from "@/store/ui/useToastStore";
import { cn } from "@/utils/cn";

const AUTO_HIDE_MS = 4500;

export function ToastViewport() {
  const toast = useToastStore((state) => state.toast);
  const hideToast = useToastStore((state) => state.hideToast);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(hideToast, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  const isError = toast.tone === "error";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-24 z-[60] flex justify-center lg:inset-x-auto lg:right-8 lg:bottom-8"
    >
      <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl bg-disabled-surface px-4 py-3 text-start shadow-lg">
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full",
            isError ? "bg-error-soft text-error" : "bg-green-6 text-success",
          )}
        >
          {isError ? <X size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
        </span>
        <div className="min-w-0">
          <p className="text-label font-bold text-text-primary">{toast.title}</p>
          {toast.description ? <p className="text-caption text-text-secondary">{toast.description}</p> : null}
        </div>
      </div>
    </div>
  );
}
