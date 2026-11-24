import { ChevronDown, TriangleAlert } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/utils/cn";

const REASONS = ["مشکل در هماهنگی با کارفرما", "نمی‌توانم مهلت را رعایت کنم", "شرایط همکاری تغییر کرد", "دلیل دیگر"];

interface CancelCollabDialogProps {
  isOpen: boolean;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

export function CancelCollabDialog({ isOpen, onConfirm, onClose }: CancelCollabDialogProps) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (reason === "") {
      setHasError(true);
      return;
    }
    onConfirm(reason);
    setReason("");
    setNote("");
  };

  return (
    <Dialog isOpen={isOpen} title="لغو همکاری؟" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <p className="flex items-center gap-2 rounded-xl bg-warning-soft px-3 py-3 text-caption font-medium text-warning">
          <TriangleAlert size={16} aria-hidden="true" className="shrink-0" />
          با لغو، اعتبار و امتیاز حساب تو کاهش می‌یابد
        </p>

        <div>
          <label htmlFor="cancel-reason" className="mb-1.5 block text-label font-bold text-text-primary">
            دلیل لغو
          </label>
          <div className="relative">
            <select
              id="cancel-reason"
              value={reason}
              aria-invalid={hasError}
              onChange={(event) => {
                setReason(event.target.value);
                setHasError(false);
              }}
              className={cn(
                "h-10 w-full appearance-none rounded-xl border bg-white ps-9 pe-3 text-label text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                hasError ? "border-error" : "border-ocean-blue",
              )}
            >
              <option value="">انتخاب کن</option>
              {REASONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
          </div>
          <p className={cn("mt-1 text-caption", hasError ? "text-error" : "text-text-secondary")} role={hasError ? "alert" : undefined}>
            {hasError ? "دلیل لغو را انتخاب کن." : "یکی از گزینه‌ها را انتخاب کن."}
          </p>
        </div>

        <div>
          <label htmlFor="cancel-note" className="mb-1.5 block text-label font-bold text-text-primary">
            توضیح برای کارفرما
          </label>
          <textarea
            id="cancel-note"
            value={note}
            rows={3}
            onChange={(event) => setNote(event.target.value)}
            className="w-full resize-none rounded-xl border border-ocean-blue bg-white p-3 text-label leading-7 text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          />
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <Button type="submit" color="error" className="md:flex-1">
            لغو همکاری
          </Button>
          <Button variant="secondary" className="md:flex-1" onClick={onClose}>
            برگشت
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
