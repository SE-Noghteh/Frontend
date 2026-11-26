/**
 * Responsive dialog: a centered card on desktop, a bottom sheet on phones.
 * Generic UI primitive: title, body and actions come from the caller.
 */

import { X } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";

import { cn } from "@/utils/cn";

interface DialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Lets the caller block closing while a request is in flight. */
  isDismissible?: boolean;
  className?: string;
}

export function Dialog({ isOpen, title, onClose, children, isDismissible = true, className }: DialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDismissible) onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isDismissible, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
      <button
        type="button"
        tabIndex={-1}
        aria-label="بستن"
        onClick={isDismissible ? onClose : undefined}
        className="absolute inset-0 cursor-default bg-charcoal/45"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 max-h-[92dvh] w-full overflow-y-auto bg-white p-5 shadow-2xl",
          "rounded-t-3xl md:max-w-[34rem] md:rounded-3xl md:p-6",
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-card-title font-bold text-text-primary">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={!isDismissible}
            aria-label="بستن پنجره"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-background-page text-text-secondary transition hover:bg-brand-peach-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:opacity-50"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
