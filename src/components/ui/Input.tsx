import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  isRequired?: boolean;
}

export function Input({
  label,
  helperText,
  isRequired,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-label text-text-primary font-medium">
        {label} {isRequired && <span className="text-status-error">*</span>}
      </label>
      <input
        className={`w-full rounded-md border px-3 py-2 text-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors border-border-decorative bg-surface-card ${className}`}
        {...props}
      />
      {helperText ? (
        <p className="text-caption text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
}