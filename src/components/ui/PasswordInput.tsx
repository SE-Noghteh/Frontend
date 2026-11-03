import { type InputHTMLAttributes, type ReactNode, useState } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  isRequired?: boolean;
  children?: ReactNode; 
}

export function PasswordInput({
  label,
  helperText,
  isRequired,
  children, 
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles = "w-full rounded-md border px-3 py-2 pl-10 text-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors border-border-decorative bg-surface-card";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-label text-text-primary font-medium">
        {label} {isRequired && <span className="text-status-error">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`${baseStyles} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
          tabIndex={-1}
        >
          {showPassword ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          )}
        </button>
      </div>
      {helperText ? (
        <p className="text-caption text-text-secondary">{helperText}</p>
      ) : null}
      
      {children && (
        <div className="mt-1">
          {children}
        </div>
      )}
    </div>
  );
}