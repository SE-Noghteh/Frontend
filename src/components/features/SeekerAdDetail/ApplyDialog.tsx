import { ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import type { SeekerAd } from "@/types/Seeker/seeker";
import { cn } from "@/utils/cn";

const MESSAGE_PLACEHOLDER = "توضیحات درخواست را بنویس...";
const MOCK_REQUEST_DELAY_MS = 1200;

interface ApplyDialogProps {
  isOpen: boolean;
  ad: SeekerAd;
  /** Parent who approves first. Not needed for adult seekers. */
  parentName?: string;
  needsParent: boolean;
  /** Preview switch: make the mock request fail with a network error. */
  shouldFail?: boolean;
  onClose: () => void;
}

/** Form that sends an application for an ad (message to the employer). */
export function ApplyDialog({ isOpen, ad, parentName, needsParent, shouldFail = false, onClose }: ApplyDialogProps) {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const submitApplication = useSeekerStore((state) => state.submitApplication);
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (message.trim() === "") {
      setHasError(true);
      return;
    }

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
    setIsSending(false);
    onClose();

    if (shouldFail) {
      showToast({ tone: "error", title: "ارسال انجام نشد", description: "اتصال برقرار نشد؛ دوباره تلاش کن" });
      return;
    }

    submitApplication(ad.id, message.trim(), needsParent);
    showToast({
      tone: "success",
      title: "درخواست ثبت شد",
      description: needsParent ? "برای تأیید به والدت ارسال شد" : "برای کارفرما ارسال شد",
    });
  };

  return (
    <Dialog isOpen={isOpen} title="ارسال درخواست" onClose={onClose} isDismissible={!isSending}>
      <form onSubmit={handleSubmit} noValidate>
        <p className="text-caption text-text-secondary">
          {ad.title} · {ad.employerName}
        </p>
        <p className="mt-1 text-caption text-text-secondary">نمونه‌کارهای مرتبطت را معرفی کن.</p>

        <label htmlFor="apply-message" className="mt-4 mb-1.5 block text-label font-bold text-text-primary">
          پیام برای کارفرما
        </label>
        <textarea
          id="apply-message"
          value={message}
          rows={4}
          placeholder={MESSAGE_PLACEHOLDER}
          aria-invalid={hasError}
          aria-describedby={hasError ? "apply-message-error" : undefined}
          onChange={(event) => {
            setMessage(event.target.value);
            if (hasError) setHasError(false);
          }}
          className={cn(
            "w-full resize-none rounded-xl border bg-white p-3 text-label leading-7 text-text-primary placeholder:text-text-secondary focus:placeholder:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            hasError ? "border-error" : "border-ocean-blue",
          )}
        />
        {hasError ? (
          <p id="apply-message-error" role="alert" className="mt-1 text-caption text-error">
            متن پیام را بنویس.
          </p>
        ) : null}

        <p className="mt-4 flex items-center gap-2 rounded-xl bg-error-soft px-3 py-3 text-caption text-text-primary">
          <ShieldCheck size={16} aria-hidden="true" className="shrink-0 text-error" />
          {needsParent
            ? `بعد از ارسال، درخواست اول برای تأیید به والدت${parentName ? ` (${parentName})` : ""} می‌رود`
            : "درخواست مستقیم برای کارفرما ارسال می‌شود"}
        </p>

        <Button type="submit" loading={isSending} className="mt-4 w-full md:w-auto">
          {isSending ? "در حال ارسال..." : needsParent ? "ارسال برای تأیید والد" : "ارسال درخواست"}
        </Button>
      </form>
    </Dialog>
  );
}
