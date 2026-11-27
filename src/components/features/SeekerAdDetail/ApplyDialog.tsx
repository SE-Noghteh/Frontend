import { ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import type { SeekerAd } from "@/types/Seeker/seeker";
import { cn } from "@/utils/cn";

const MESSAGE_PLACEHOLDER =
  "توضیحات درخواست را بنویس...";
const MOCK_REQUEST_DELAY_MS = 700;

type ApplyDialogAd = Pick<
  SeekerAd,
  "id" | "title" | "employerName"
>;

interface ApplyDialogProps {
  isOpen: boolean;
  ad: ApplyDialogAd;
  shouldFail?: boolean;
  onSubmit?: (message: string) => string;
  onClose: () => void;
}

export function ApplyDialog({
  isOpen,
  ad,
  shouldFail = false,
  onSubmit,
  onClose,
}: ApplyDialogProps) {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const submitApplication = useSeekerStore(
    (state) => state.submitApplication,
  );

  const showToast = useToastStore(
    (state) => state.showToast,
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (message.trim() === "") {
      setHasError(true);
      return;
    }

    setIsSending(true);
    await new Promise((resolve) =>
      setTimeout(resolve, MOCK_REQUEST_DELAY_MS),
    );
    setIsSending(false);

    if (shouldFail) {
      onClose();
      showToast({
        tone: "error",
        title: "ارسال انجام نشد",
        description:
          "اتصال برقرار نشد؛ دوباره تلاش کن",
      });
      return;
    }

    const requestId = onSubmit
      ? onSubmit(message.trim())
      : submitApplication(ad.id, message.trim());

    onClose();

    if (!requestId) {
      showToast({
        tone: "error",
        title: "درخواست ثبت نشد",
        description:
          "ممکن است قبلاً برای این آگهی درخواست داده باشی یا مهلت آن تمام شده باشد",
      });
      return;
    }

    showToast({
      tone: "success",
      title: "درخواست ثبت شد",
      description:
        "فعلاً این درخواست در بخش Mock فرانت ثبت شد",
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="ارسال درخواست"
      onClose={onClose}
      isDismissible={!isSending}
    >
      <form onSubmit={handleSubmit} noValidate>
        <p className="text-caption text-text-secondary">
          {ad.title} · {ad.employerName}
        </p>

        <p className="mt-1 text-caption text-text-secondary">
          نمونه‌کارهای مرتبطت را معرفی کن.
        </p>

        <label
          htmlFor="apply-message"
          className="mt-4 mb-1.5 block text-label font-bold text-text-primary"
        >
          پیام برای کارفرما
        </label>

        <textarea
          id="apply-message"
          value={message}
          rows={4}
          placeholder={MESSAGE_PLACEHOLDER}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? "apply-message-error"
              : undefined
          }
          onChange={(event) => {
            setMessage(event.target.value);
            if (hasError) setHasError(false);
          }}
          className={cn(
            "w-full resize-none rounded-xl border bg-white p-3 text-label leading-7 text-text-primary placeholder:text-text-secondary focus:placeholder:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            hasError
              ? "border-error"
              : "border-ocean-blue",
          )}
        />

        {hasError ? (
          <p
            id="apply-message-error"
            role="alert"
            className="mt-1 text-caption text-error"
          >
            متن پیام را بنویس.
          </p>
        ) : null}

        <p className="mt-4 flex items-center gap-2 rounded-xl bg-error-soft px-3 py-3 text-caption text-text-primary">
          <ShieldCheck
            size={16}
            aria-hidden="true"
            className="shrink-0 text-error"
          />
          ثبت درخواست هنوز API ندارد و فعلاً در فرانت شبیه‌سازی می‌شود.
          تأیید والد در مرحله نهایی‌شدن قرارداد انجام می‌شود.
        </p>

        <Button
          type="submit"
          loading={isSending}
          className="mt-4 w-full md:w-auto"
        >
          {isSending
            ? "در حال ارسال..."
            : "ارسال درخواست"}
        </Button>
      </form>
    </Dialog>
  );
}
