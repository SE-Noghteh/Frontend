import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helperText?: string;
  isRequired?: boolean;
  options: { label: string; value: string }[];
  error?: string;
}

export function Select({
  label,
  helperText,
  isRequired,
  options,
  error,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-label text-text-primary font-medium">
        {label} {isRequired && <span className="text-status-error">*</span>}
      </label>
      <div className="relative">
        <select
          className={`w-full appearance-none rounded-md border px-3 py-2 pl-10 text-body text-text-primary focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors bg-surface-card cursor-pointer ${
            error ? "border-status-error focus:ring-status-error" : "border-border-decorative"
          } ${className}`}
          {...props}
        >
          <option value="" disabled hidden>
            انتخاب کنید
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className={`pointer-events-none absolute inset-y-0 left-3 flex items-center ${error ? "text-status-error" : "text-text-secondary"}`}>
          {error ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
        </div>
      </div>
      {error ? (
        <p className="text-caption text-status-error">{error}</p>
      ) : helperText ? (
        <p className="text-caption text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
}