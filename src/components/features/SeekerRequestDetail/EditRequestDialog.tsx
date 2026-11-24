import { ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import type { SeekerRequest } from "@/types/Seeker/seeker";
import { cn } from "@/utils/cn";

const MOCK_REQUEST_DELAY_MS = 1000;

interface EditRequestDialogProps {
  isOpen: boolean;
  request: SeekerRequest;
  onClose: () => void;
}

/** Edit the message of a request. Editing sends it back to the parent for a new approval. */
export function EditRequestDialog({ isOpen, request, onClose }: EditRequestDialogProps) {
  const [message, setMessage] = useState(request.message);
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const editRequest = useSeekerStore((state) => state.editRequest);
  const showToast = useToastStore((state) => state.showToast);
  const needsParent = request.parentStatus !== "notRequired";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (message.trim() === "") {
      setHasError(true);
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
    setIsSaving(false);

    editRequest(request.id, message.trim());
    onClose();
    showToast({
      tone: "success",
      title: "درخواست دوباره ارسال شد",
      description: needsParent ? "برای تأیید به والدت رفت" : "برای کارفرما ارسال شد",
    });
  };

  return (
    <Dialog isOpen={isOpen} title="ویرایش درخواست" onClose={onClose} isDismissible={!isSaving}>
      <form onSubmit={handleSubmit} noValidate>
        <p className="text-caption text-text-secondary">
          {needsParent ? "بعد از ویرایش، دوباره برای تأیید والدت می‌رود." : "بعد از ویرایش، دوباره برای کارفرما می‌رود."}
        </p>

        <label htmlFor="edit-message" className="mt-4 mb-1.5 block text-label font-bold text-text-primary">
          پیام برای کارفرما
        </label>
        <textarea
          id="edit-message"
          value={message}
          rows={4}
          aria-invalid={hasError}
          onChange={(event) => {
            setMessage(event.target.value);
            if (hasError) setHasError(false);
          }}
          className={cn(
            "w-full resize-none rounded-xl border bg-white p-3 text-label leading-7 text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            hasError ? "border-error" : "border-ocean-blue",
          )}
        />
        {hasError ? (
          <p role="alert" className="mt-1 text-caption text-error">
            متن پیام را بنویس.
          </p>
        ) : null}

        {needsParent ? (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-error-soft px-3 py-3 text-caption text-text-primary">
            <ShieldCheck size={16} aria-hidden="true" className="shrink-0 text-error" />
            تأیید قبلی والد لغو می‌شود و باید دوباره تأیید کند
          </p>
        ) : null}

        <Button type="submit" loading={isSaving} className="mt-4 w-full md:w-auto">
          {isSaving ? "در حال ارسال…" : "ذخیره و ارسال دوباره"}
        </Button>
      </form>
    </Dialog>
  );
}
