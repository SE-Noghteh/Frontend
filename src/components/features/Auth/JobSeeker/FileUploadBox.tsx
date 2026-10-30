import { useRef, useState } from "react";

interface FileUploadBoxProps {
  title: string;
  description: string;
  subDescription?: string;
  buttonText: string;
  accept: string;
  helperText?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  error?: string; 
}

export function FileUploadBox({
  title,
  description,
  subDescription,
  buttonText,
  accept,
  helperText,
  value,
  onChange,
  error,
}: FileUploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false); 

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }
    
    if (accept.includes("image") && !file.type.startsWith("image/")) {
      alert("لطفاً فقط فایل تصویری انتخاب کنید.");
      return;
    }
    if (accept.includes("video") && !file.type.startsWith("video/")) {
      alert("لطفاً فقط فایل ویدیویی انتخاب کنید.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange?.(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!value) setIsDragging(true); 
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (value) return; 

    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const isVideo = accept.includes("video");

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
          error 
            ? "border-status-error" 
            : value
              ? "border-border-decorative bg-surface-card"
              : isDragging
                ? "border-action-primary bg-brand-peach-soft border-solid scale-[1.01]"
                : "border-dashed border-border-decorative bg-surface-card hover:bg-surface-hover cursor-pointer"
        }`}
        onClick={() => {
          if (!value) fileInputRef.current?.click();
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />

        {value && previewUrl ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="w-24 h-24 rounded-md overflow-hidden border border-border-decorative flex-shrink-0 bg-surface-disabled flex items-center justify-center">
                {isVideo ? (
                  <video src={previewUrl} className="w-full h-full object-cover" />
                ) : (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>
              
              <div className="flex flex-col text-right">
                <span className="text-label text-text-primary font-medium truncate max-w-[200px]">
                  {value.name}
                </span>
                <span className="text-caption text-text-secondary">
                  {(value.size / (1024 * 1024)).toFixed(1)} مگابایت
                </span>
                <span className="text-caption text-status-success flex items-center gap-1 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  بارگذاری شد
                </span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="rounded-md border border-border-decorative px-6 py-1.5 text-label text-text-primary hover:bg-surface-hover transition-colors"
            >
              {buttonText.replace("انتخاب", "جایگزینی")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 pointer-events-none">
            <div className={`${isDragging ? "text-action-primary" : "text-text-secondary"} transition-colors`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="text-center flex flex-col gap-1">
              <p className={`text-label font-medium ${isDragging ? "text-action-primary" : "text-text-primary"}`}>
                {isDragging ? "فایل را اینجا رها کنید" : description}
              </p>
              {subDescription && (
                <p className="text-caption text-text-secondary">{subDescription}</p>
              )}
            </div>
            <button
              type="button"
              className="mt-2 rounded-md border border-action-primary px-6 py-1.5 text-label text-action-primary hover:bg-surface-hover transition-colors"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>

      {error ? (
        <p className="text-caption text-status-error text-right mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-caption text-text-secondary text-right leading-relaxed">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}