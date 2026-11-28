import {
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  useState,
  type InputHTMLAttributes,
} from "react";

import { cn } from "@/utils/cn";

interface AuthFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size"
  > {
  label: string;
  error?: string;
  helperText?: string;
  requiredMark?: boolean;
  password?: boolean;
}

export function AuthField({
  label,
  error,
  helperText,
  requiredMark = false,
  password = false,
  className,
  type,
  dir,
  ...props
}: AuthFieldProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const resolvedType = password
    ? showPassword
      ? "text"
      : "password"
    : type;

  const isLtr = dir === "ltr";
  const hasError = Boolean(error);

  const inputSidePadding = password
    ? hasError
      ? isLtr
        ? "pr-20"
        : "pl-20"
      : isLtr
        ? "pr-11"
        : "pl-11"
    : hasError
      ? isLtr
        ? "pr-10"
        : "pl-10"
      : "";

  return (
    <label className="flex w-full flex-col gap-1.5">
      <span className="text-label font-medium text-text-primary">
        {label}
        {requiredMark ? (
          <span className="me-1 text-error">*</span>
        ) : null}
      </span>

      <span className="relative block">
        <input
          {...props}
          dir={dir}
          type={resolvedType}
          className={cn(
            "h-11 w-full rounded-lg border bg-white px-3 text-label text-text-primary outline-none transition",
            "placeholder:text-text-disabled focus:border-action-primary focus:ring-2 focus:ring-action-primary/10",
            isLtr ? "text-left" : "text-right",
            hasError
              ? "border-error"
              : "border-ocean-blue",
            inputSidePadding,
            className,
          )}
        />

        {hasError ? (
          <AlertCircle
            size={17}
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-error",
              isLtr
                ? password
                  ? "right-10"
                  : "right-3"
                : password
                  ? "left-10"
                  : "left-3",
            )}
          />
        ) : null}

        {password ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={
              showPassword
                ? "پنهان کردن رمز"
                : "نمایش رمز"
            }
            onClick={() =>
              setShowPassword((current) => !current)
            }
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-text-secondary transition hover:text-text-primary",
              isLtr ? "right-3" : "left-3",
            )}
          >
            {showPassword ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        ) : null}
      </span>

      {error ? (
        <span className="text-caption text-error">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-caption leading-6 text-text-secondary">
          {helperText}
        </span>
      ) : null}
    </label>
  );
}
