
import { useId } from "react";

import { cn } from "@/utils/cn";
import { Dropdown } from "@/components/ui/Dropdown";
import { JalaliDatePicker } from "@/components/ui/JalaliDatePicker";

interface AdFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;

  error?: string;
  placeholder?: string;

  type?:
    | "text"
    | "number"
    | "date"
    | "textarea"
    | "select";

  options?: string[];

  min?: number;
  step?: number;

  disabled?: boolean;
}

export function AdFormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  options = [],
  min,
  step,
  disabled = false,
}: AdFormFieldProps) {
  const id = useId();

  const fieldClass = cn(
    "w-full rounded-lg border bg-white px-3 py-2.5 text-label outline-none transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    error
      ? "border-error"
      : "border-ocean-blue focus:border-blue",
  );

  return (
    <div className="flex min-w-0 flex-col gap-1.5">

      <label
        htmlFor={id}
        className="text-label font-bold text-text-primary"
      >
        {label}
      </label>

      {/* Textarea */}

      {type === "textarea" ? (

        <textarea
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          rows={5}
          aria-invalid={Boolean(error)}
          className={cn(fieldClass, "resize-y")}
        />

      /* Custom dropdown */

      ) : type === "select" ? (

        <Dropdown
          id={id}
          value={value}
          options={options}
          onChange={onChange}
          placeholder={placeholder || "انتخاب کنید"}
          error={Boolean(error)}
          disabled={disabled}
        />

      /* Persian date picker */

      ) : type === "date" ? (

        <JalaliDatePicker
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "انتخاب تاریخ"}
          error={Boolean(error)}
          disabled={disabled}
        />

      /* Text and number inputs */

      ) : (

        <input
          id={id}
          type={type}
          value={value}
          min={min}
          step={step}
          disabled={disabled}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={fieldClass}
        />

      )}

      {/* Validation error */}

      {error && (
        <span
          role="alert"
          className="text-caption text-error"
        >
          {error}
        </span>
      )}

    </div>
  );
}
