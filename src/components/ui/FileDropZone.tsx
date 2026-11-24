/** Dashed area to add files (click or drop). Generic: it only reports the chosen files. */

import { Paperclip } from "lucide-react";
import { useId, useRef, useState, type DragEvent } from "react";

import { cn } from "@/utils/cn";

interface FileDropZoneProps {
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
  hasError?: boolean;
  accept?: string;
}

export function FileDropZone({ label, files, onChange, hasError = false, accept }: FileDropZoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    onChange([...files, ...Array.from(incoming)]);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <div>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        className="sr-only"
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex w-full flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-6 text-label font-medium text-text-primary transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          hasError ? "border-error bg-error-soft/40" : "border-border-soft hover:border-ocean-6",
          isDragging && "border-ocean-blue bg-info-soft",
        )}
      >
        <Paperclip size={18} aria-hidden="true" className="text-text-secondary" />
        {label}
      </button>

      {files.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="inline-flex items-center gap-2 rounded-lg bg-background-page px-2.5 py-1 text-caption text-text-primary"
            >
              <span dir="ltr" className="max-w-40 truncate">
                {file.name}
              </span>
              <button
                type="button"
                aria-label={`حذف ${file.name}`}
                onClick={() => onChange(files.filter((_, fileIndex) => fileIndex !== index))}
                className="text-text-secondary hover:text-error"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
