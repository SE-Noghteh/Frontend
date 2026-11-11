import { type InputHTMLAttributes, useId } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  hasError?: boolean;
}

export function Checkbox({
  label,
  description,
  hasError = false,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={`flex items-center w-full cursor-pointer group gap-2 ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <input
          id={checkboxId}
          type="checkbox"
          className={`peer w-5 h-5 rounded border-2 appearance-none cursor-pointer transition-colors 
            ${
              hasError
                ? "border-status-error bg-surface-card" 
                : "border-interface-secondary bg-surface-card"
            } 
            checked:bg-action-primary checked:border-action-primary 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1`}
          {...props}
        />

        <svg
          className="absolute w-3.5 h-3.5 text-surface-card pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <div className="flex flex-col select-none text-right">
        <span 
          className={`text-label font-medium leading-tight ${
            hasError ? "text-status-error" : "text-text-primary"
          }`}
        >
          {label}
        </span>
        {description && (
          <span className="text-caption text-text-secondary mt-1 leading-relaxed">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}