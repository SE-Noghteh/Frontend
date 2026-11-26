import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { FileDropZone } from "@/components/ui/FileDropZone";
import { useCollabStore } from "@/store/seeker/useCollabStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { toPersianDigits } from "@/utils/toPersianDigits";

const MOCK_REQUEST_DELAY_MS = 1200;

interface DeliveryDialogProps {
  isOpen: boolean;
  collabId: string;
  onClose: () => void;
}

/** Hand over the final work: at least one file and an optional message. */
export function DeliveryDialog({ isOpen, collabId, onClose }: DeliveryDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [hasFileError, setHasFileError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const submitDelivery = useCollabStore((state) => state.submitDelivery);
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (files.length === 0) {
      setHasFileError(true);
      return;
    }

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
    setIsSending(false);

    submitDelivery(
      collabId,
      files.map((file) => ({ name: file.name, meta: `${toPersianDigits((file.size / 1_000_000).toFixed(1))} مگابایت` })),
    );
    setFiles([]);
    setMessage("");
    onClose();
    showToast({ tone: "success", title: "تحویل ثبت شد", description: "کارفرما تا ۷۲ ساعت دیگر آن را بررسی می‌کند." });
  };

  return (
    <Dialog isOpen={isOpen} title="ثبت تحویل نهایی" onClose={onClose} isDismissible={!isSending}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        <FileDropZone
          label="فایل‌های نهایی را اینجا بیندازید"
          files={files}
          hasError={hasFileError}
          onChange={(next) => {
            setFiles(next);
            if (next.length > 0) setHasFileError(false);
          }}
        />
        {hasFileError ? (
          <p role="alert" className="text-caption text-error">
            حداقل یک فایل پیوست کن.
          </p>
        ) : null}
        <p className="text-caption text-text-secondary">فایل‌ها بعد از ارسال برای کارفرما قابل دانلود می‌شود.</p>

        <div>
          <label htmlFor="delivery-message" className="mb-1.5 block text-label font-bold text-text-primary">
            پیام تحویل
          </label>
          <textarea
            id="delivery-message"
            value={message}
            rows={3}
            placeholder="توضیح کوتاهی برای کارفرما بنویس..."
            onChange={(event) => setMessage(event.target.value)}
            className="w-full resize-none rounded-xl border border-ocean-blue bg-white p-3 text-label leading-7 text-text-primary placeholder:text-text-secondary focus:placeholder:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          />
        </div>

        <Button type="submit" loading={isSending} className="w-full md:w-auto md:self-start">
          {isSending ? "در حال ارسال..." : "ارسال تحویل"}
        </Button>
      </form>
    </Dialog>
  );
}
