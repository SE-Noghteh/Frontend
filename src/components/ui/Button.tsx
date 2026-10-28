import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center rounded-md px-4 py-2 text-label font-medium transition-colors";
  const variants = {
    primary: "bg-action-primary text-white hover:bg-action-hover active:bg-action-pressed disabled:bg-surface-disabled disabled:text-text-disabled",
    secondary: "border border-action-primary text-action-primary hover:bg-surface-hover",
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}