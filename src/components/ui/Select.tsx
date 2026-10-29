import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helperText?: string;
  isRequired?: boolean;
  options: { label: string; value: string }[];
}

export function Select({
  label,
  helperText,
  isRequired,
  options,
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
          className={`w-full appearance-none rounded-md border px-3 py-2 pl-10 text-body text-text-primary focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors border-border-decorative bg-surface-card cursor-pointer ${className}`}
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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-text-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      {helperText ? (
        <p className="text-caption text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
}