import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { FileDropZone } from "@/components/ui/FileDropZone";
import { useCollabStore } from "@/store/seeker/useCollabStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { cn } from "@/utils/cn";
import { toPersianDigits } from "@/utils/toPersianDigits";

const MOCK_REQUEST_DELAY_MS = 1000;
const DEFAULT_PERCENT = 50;

const FIELD =
  "w-full rounded-xl border bg-white px-3 text-label text-text-primary placeholder:text-text-secondary focus:placeholder:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

interface AddStageDialogProps {
  isOpen: boolean;
  collabId: string;
  onClose: () => void;
}

/** Report a step of the work: title, short description, progress and optional files. */
export function AddStageDialog({ isOpen, collabId, onClose }: AddStageDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState(DEFAULT_PERCENT);
  const [files, setFiles] = useState<File[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addStage = useCollabStore((state) => state.addStage);
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (description.trim() === "") {
      setHasError(true);
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
    setIsSaving(false);

    addStage(collabId, { title: title.trim() || description.trim(), percent, filesCount: files.length });
    setTitle("");
    setDescription("");
    setFiles([]);
    onClose();
    showToast({ tone: "success", title: "مرحله ثبت شد", description: "کارفرما از پیشرفت کار باخبر شد." });
  };

  return (
    <Dialog isOpen={isOpen} title="ثبت مرحله‌ی جدید" onClose={onClose} isDismissible={!isSaving}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="stage-title" className="mb-1.5 block text-label font-bold text-text-primary">
            عنوان مرحله
          </label>
          <input
            id="stage-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="مثلاً اسکچ‌های نهایی"
            className={cn(FIELD, "h-10 border-ocean-blue")}
          />
        </div>

        <div>
          <label htmlFor="stage-description" className="mb-1.5 block text-label font-bold text-text-primary">
            توضیح
          </label>
          <textarea
            id="stage-description"
            value={description}
            rows={3}
            aria-invalid={hasError}
            placeholder="چه کاری انجام شد؟"
            onChange={(event) => {
              setDescription(event.target.value);
              if (hasError) setHasError(false);
            }}
            className={cn(FIELD, "resize-none p-3 leading-7", hasError ? "border-error" : "border-ocean-blue")}
          />
          {hasError ? (
            <p role="alert" className="mt-1 text-caption text-error">
              توضیح مرحله را بنویس.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="stage-percent" className="mb-2 block text-label font-bold text-text-primary">
            درصد پیشرفت: {toPersianDigits(percent)}٪
          </label>
          <input
            id="stage-percent"
            type="range"
            min={0}
            max={100}
            step={5}
            value={percent}
            onChange={(event) => setPercent(Number(event.target.value))}
            className="w-full accent-blue"
          />
        </div>

        <FileDropZone label="افزودن فایل (تصویر یا PDF)" files={files} onChange={setFiles} accept="image/*,.pdf" />

        <Button type="submit" loading={isSaving} className="w-full md:w-auto md:self-start">
          {isSaving ? "در حال ثبت..." : "ثبت مرحله"}
        </Button>
      </form>
    </Dialog>
  );
}
