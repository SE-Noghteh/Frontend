import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  isRequired?: boolean;
  error?: string; 
}

export function Input({
  label,
  helperText,
  isRequired,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-label text-text-primary font-medium">
        {label} {isRequired && <span className="text-status-error">*</span>}
      </label>
      
      <div className="relative">
        <input
          className={`w-full rounded-md border px-3 py-2 text-body text-text-primary placeholder:text-text-disabled focus:outline-none transition-colors bg-surface-card shadow-sm ${
            error 
              ? "border-status-error focus:ring-2 focus:ring-status-error/50" 
              : "border-[#457b9d] focus:ring-2 focus:ring-action-primary/50 focus:border-action-primary"
          } ${className}`}
          {...props}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-status-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        )}
      </div>
      
      {error ? (
        <p className="text-caption text-status-error">{error}</p>
      ) : helperText ? (
        <p className="text-caption text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
}