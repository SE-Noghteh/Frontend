
import { useEffect, useRef } from "react";

import {
  X,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

interface CloseAdModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function CloseAdModal({
  open,
  title,
  onCancel,
  onConfirm,
}: CloseAdModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      dir="rtl"
      aria-labelledby="close-ad-title"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-md rounded-2xl border border-border-soft bg-white p-5 text-text-primary shadow-xl backdrop:bg-black/45 sm:p-6"
    >

      <div className="flex items-center justify-between gap-3">

        <h2
          id="close-ad-title"
          className="text-card-title font-bold"
        >
          بستن آگهی
        </h2>

        <button
          type="button"
          aria-label="بستن پنجره"
          onClick={onCancel}
          className="rounded-lg p-1 hover:bg-background-page"
        >
          <X size={20} />
        </button>

      </div>

      <div className="my-5 flex flex-col items-center gap-4 text-center">

        <div className="flex size-14 items-center justify-center rounded-full bg-red-50">

          <AlertTriangle
            size={28}
            className="text-red-600"
          />

        </div>

        <p className="text-label leading-7">

          آیا از بستن آگهی{" "}

          <strong>{title}</strong>

          {" "}اطمینان دارید؟

        </p>

        <p className="text-caption leading-6 text-text-secondary">
          پس از بستن آگهی، امکان ثبت درخواست جدید
          برای آن وجود نخواهد داشت.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-3">
<Button
  variant="secondary"
  onClick={onCancel}
>
  انصراف
</Button>

        <button
          type="button"
          onClick={onConfirm}
          className="min-h-11 rounded-lg bg-red-600 px-4 text-label font-bold text-white transition-colors hover:bg-red-700"
        >
          بستن آگهی
        </button>

      </div>

    </dialog>
  );
}
