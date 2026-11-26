import { ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useToastStore } from "@/store/ui/useToastStore";
import type { SeekerCollab } from "@/types/Seeker/collab";
import { cn } from "@/utils/cn";
import { toPersianDigits } from "@/utils/toPersianDigits";

const MOCK_REQUEST_DELAY_MS = 1200;

const DELIVERABLE_OPTIONS = ["۱۰ پست", "۱۰ استوری", "۲ ریلز"];
const DEFAULT_DELIVERABLES = DELIVERABLE_OPTIONS.slice(0, 2);

const FIELD =
  "w-full rounded-xl border bg-white px-3 text-label text-text-primary placeholder:text-text-secondary focus:placeholder:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

type FieldErrors = Partial<Record<"deadline" | "amount" | "deliverables" | "reason", string>>;

interface ChangeTermsDialogProps {
  isOpen: boolean;
  collab: SeekerCollab;
  onClose: () => void;
}

/** Ask to change the agreed terms (deadline, amount, deliverables). The parent approves first. */
export function ChangeTermsDialog({ isOpen, collab, onClose }: ChangeTermsDialogProps) {
  const [deadline, setDeadline] = useState(toPersianDigits(collab.deliveryDate));
  const [amount, setAmount] = useState(toPersianDigits(collab.amount.toLocaleString("en-US").replace(/,/g, "٬")));
  const [deliverables, setDeliverables] = useState<string[]>(DEFAULT_DELIVERABLES);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSending, setIsSending] = useState(false);

  const showToast = useToastStore((state) => state.showToast);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (deadline.trim() === "") next.deadline = "مهلت را وارد کن.";
    // Accepts Persian or Latin digits and thousands separators.
    const digits = amount.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[^\d]/g, "");
    if (digits === "" || Number(digits) <= 0) next.amount = "مبلغ را درست وارد کن.";
    if (deliverables.length === 0) next.deliverables = "حداقل یک خروجی انتخاب کن.";
    if (reason.trim() === "") next.reason = "دلیل تغییر را بنویس.";
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
    setIsSending(false);

    setReason("");
    onClose();
    showToast({ tone: "success", title: "درخواست تغییر ثبت شد", description: "اول والدت تأیید می‌کند." });
  };

  const toggleDeliverable = (item: string) => {
    setDeliverables((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
    setErrors((current) => ({ ...current, deliverables: undefined }));
  };

  return (
    <Dialog isOpen={isOpen} title="درخواست تغییر شرایط" onClose={onClose} isDismissible={!isSending}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="terms-deadline" className="mb-1.5 block text-label font-bold text-text-primary">
              مهلت تحویل
            </label>
            <input
              id="terms-deadline"
              value={deadline}
              inputMode="numeric"
              aria-invalid={Boolean(errors.deadline)}
              onChange={(event) => {
                setDeadline(event.target.value);
                setErrors((current) => ({ ...current, deadline: undefined }));
              }}
              className={cn(FIELD, "h-11", errors.deadline ? "border-error" : "border-ocean-blue")}
            />
            {errors.deadline ? (
              <p role="alert" className="mt-1 text-caption text-error">
                {errors.deadline}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="terms-amount" className="mb-1.5 block text-label font-bold text-text-primary">
              مبلغ جدید (تومان)
            </label>
            <input
              id="terms-amount"
              value={amount}
              inputMode="numeric"
              aria-invalid={Boolean(errors.amount)}
              onChange={(event) => {
                setAmount(event.target.value);
                setErrors((current) => ({ ...current, amount: undefined }));
              }}
              className={cn(FIELD, "h-11", errors.amount ? "border-error" : "border-ocean-blue")}
            />
            {errors.amount ? (
              <p role="alert" className="mt-1 text-caption text-error">
                {errors.amount}
              </p>
            ) : null}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-label font-bold text-text-primary">خروجی‌ها</legend>
          <ul className="flex flex-col gap-2.5">
            {DELIVERABLE_OPTIONS.map((item) => (
              <li key={item}>
                <label className="flex cursor-pointer items-center gap-3 text-label text-text-primary">
                  <input
                    type="checkbox"
                    checked={deliverables.includes(item)}
                    onChange={() => toggleDeliverable(item)}
                    className="size-5 shrink-0 rounded-md accent-blue"
                  />
                  {item}
                </label>
              </li>
            ))}
          </ul>
          {errors.deliverables ? (
            <p role="alert" className="mt-1 text-caption text-error">
              {errors.deliverables}
            </p>
          ) : null}
        </fieldset>

        <div>
          <label htmlFor="terms-reason" className="mb-1.5 block text-label font-bold text-text-primary">
            دلیل تغییر
          </label>
          <textarea
            id="terms-reason"
            value={reason}
            rows={4}
            placeholder="دلیل تغییر را بنویس..."
            aria-invalid={Boolean(errors.reason)}
            onChange={(event) => {
              setReason(event.target.value);
              setErrors((current) => ({ ...current, reason: undefined }));
            }}
            className={cn(FIELD, "resize-none p-3 leading-7", errors.reason ? "border-error" : "border-ocean-blue")}
          />
          {errors.reason ? (
            <p role="alert" className="mt-1 text-caption text-error">
              {errors.reason}
            </p>
          ) : null}
        </div>

        <p className="flex items-center gap-2 rounded-xl bg-error-soft px-3 py-3 text-caption text-text-primary">
          <ShieldCheck size={16} aria-hidden="true" className="shrink-0 text-error" />
          اول والدت تأیید می‌کند، بعد برای کارفرما می‌رود
        </p>

        <Button type="submit" loading={isSending} className="w-full md:w-auto md:self-start">
          {isSending ? "در حال ارسال..." : "ارسال درخواست تغییر"}
        </Button>
      </form>
    </Dialog>
  );
}
