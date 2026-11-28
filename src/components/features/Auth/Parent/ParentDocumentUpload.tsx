import {
  FileImage,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/Button";

interface ParentDocumentUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function ParentDocumentUpload({
  file,
  onChange,
  error,
}: ParentDocumentUploadProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="space-y-2">
      <div>
        <p className="text-label font-medium text-text-primary">
          تصویر مدرک هویتی{" "}
          <span className="text-error">*</span>
        </p>
        <p className="mt-1 text-caption leading-6 text-text-secondary">
          تصویر صفحه اول شناسنامه یا مدرک هویتی والد؛
          PNG/JPEG تا ۵ مگابایت.
        </p>
      </div>

      {file ? (
        <div
          className={`flex items-center gap-3 rounded-xl border p-3 ${
            error
              ? "border-error bg-error-soft/40"
              : "border-ocean-7 bg-info-soft/40"
          }`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="پیش‌نمایش مدرک هویتی"
              className="size-16 rounded-lg object-cover"
            />
          ) : (
            <span className="grid size-16 place-items-center rounded-lg bg-white text-info">
              <FileImage size={24} aria-hidden="true" />
            </span>
          )}

          <div className="min-w-0 flex-1">
            <p
              dir="ltr"
              className="truncate text-start text-label font-bold text-text-primary"
            >
              {file.name}
            </p>
            <p className="text-caption text-text-secondary">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <Button
            type="button"
            size="icon"
            variant="text"
            color="error"
            aria-label="حذف مدرک"
            onClick={() => onChange(null)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition hover:bg-info-soft/40 ${
            error
              ? "border-error bg-error-soft/30"
              : "border-ocean-blue"
          }`}
        >
          <Upload
            size={24}
            className="mb-2 text-info"
            aria-hidden="true"
          />
          <span className="text-label font-bold text-action-primary">
            انتخاب تصویر
          </span>
          <span className="mt-1 text-caption text-text-secondary">
            JPG یا PNG
          </span>
        </label>
      )}

      <input
        id={inputId}
        hidden
        type="file"
        accept="image/png,image/jpeg"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
      />

      {error ? (
        <p className="text-caption text-error">{error}</p>
      ) : null}
    </div>
  );
}
