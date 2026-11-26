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
  disabled,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-label text-text-primary font-medium">
        {label} {isRequired && <span className="text-status-error">*</span>}
      </label>
      
      <div className="relative">
        <select
          disabled={disabled}
          className={`w-full appearance-none rounded-md border px-3 py-2 pl-10 text-body text-text-primary focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors bg-surface-card cursor-pointer 
          disabled:bg-surface-disabled disabled:text-text-disabled disabled:cursor-not-allowed
          border-border-decorative
          ${className}`}
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
        
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
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