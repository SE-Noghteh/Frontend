
import { type InputHTMLAttributes } from "react";
import { Button } from "./Button";

interface PhoneInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  isRequired?: boolean;
  error?: string;
  onSendCode?: () => void;
  isCodeSent?: boolean;
}

export function PhoneInput({
  label,
  helperText,
  isRequired,
  error,
  onSendCode,
  isCodeSent = false,
  className = "",
  value,
  ...props
}: PhoneInputProps) {
  const phoneValue = String(value ?? "");
  const isSendCodeDisabled =
    phoneValue.length !== 11 || !/^09\d{9}$/.test(phoneValue);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-label text-text-primary font-medium">
        {label}{" "}
        {isRequired && (
          <span className="text-status-error">*</span>
        )}
      </label>

      <div className="flex gap-2 items-center w-full">
        <div className="relative flex-1">
          <input
            {...props}
            value={value ?? ""}
            className={`w-full rounded-md border px-3 py-2 text-body transition-colors text-right
              ${
                isCodeSent
                  ? "border-status-success text-text-primary bg-surface-card"
                  : error
                    ? "border-status-error focus:ring-status-error text-text-primary bg-surface-card"
                    : "border-border-decorative text-text-primary bg-surface-card focus:ring-focus-ring"
              }
              focus:outline-none focus:ring-1 disabled:opacity-100 disabled:cursor-default pl-10 ${className}`}
            dir="rtl"
            disabled={isCodeSent || props.disabled}
          />

          {isCodeSent && (
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-status-success">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          {error && !isCodeSent && (
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-status-error">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          )}
        </div>

        {!isCodeSent && (
          <Button
            type="button"
            variant="secondary"
            onClick={onSendCode}
            disabled={isSendCodeDisabled}
            className="whitespace-nowrap !px-4 h-[42px]"
          >
            ارسال کد
          </Button>
        )}
      </div>

      {error && !isCodeSent ? (
        <p className="text-caption text-status-error">
          {error}
        </p>
      ) : isCodeSent ? (
        <p className="text-caption text-status-success">
          شماره همراه تأیید شد.
        </p>
      ) : helperText ? (
        <p className="text-caption text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
