import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  leftIcon?: ReactNode; 
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  leftIcon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-label font-medium transition-colors disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-action-primary text-white hover:bg-action-hover active:bg-action-pressed disabled:bg-surface-disabled disabled:text-text-disabled",
    secondary: "border border-action-primary text-action-primary hover:bg-surface-hover disabled:border-border-disabled disabled:text-text-disabled disabled:bg-surface-disabled",
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
    </button>
  );
}