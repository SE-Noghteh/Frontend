import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string; 
}

export function Checkbox({ label, description, className = "", ...props }: CheckboxProps) {
  return (
    <label 
      className={`flex flex-row-reverse items-start justify-between w-full cursor-pointer group gap-4 ${className}`}
    >
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          className="peer w-5 h-5 rounded border-border-decorative bg-surface-card text-action-primary focus:ring-focus-ring accent-action-primary cursor-pointer appearance-none border checked:bg-action-primary checked:border-action-primary transition-colors"
          {...props}
        />

        <svg
          className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
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
      
      <div className="flex flex-col text-right flex-1">
        <span className="text-label font-medium text-text-primary select-none">
          {label}
        </span>
        {description && (
          <span className="text-caption text-text-secondary mt-1 select-none leading-relaxed">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}