/**
 * Generic button used across the whole app (login, sign-up, dashboards, forms…).
 *
 * Look & feel is defined once in `styles/button.css`; this component only maps props to it.
 *
 *   variant   primary (filled) | secondary (outlined) | text (no chrome)
 *   size      md | sm | icon (square, icon-only — `aria-label` is required)
 *   color     palette preset: blue (default) | ocean | green | peach | error
 *   tone      "onDark" for buttons placed on dark/colored backgrounds (white fill / white outline)
 *   loading   shows a spinner, blocks clicks, keeps the button width stable
 *   startIcon / endIcon   placed by reading direction, so they flip automatically in RTL
 *
 * Custom color: pass only `--btn-color`, every other shade is derived from it.
 *   <Button style={{ "--btn-color": "#7c3aed" } as CSSProperties}>…</Button>
 *
 * Defaults to `type="button"`; pass `type="submit"` explicitly for forms.
 */

import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "md" | "sm" | "icon";
export type ButtonTone = "default" | "onDark";
export type ButtonColor = "blue" | "ocean" | "green" | "peach" | "error";

interface CommonButtonProps extends Omit<ComponentProps<"button">, "color"> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  tone?: ButtonTone;
  loading?: boolean;
  fullWidth?: boolean;
}

type ButtonProps =
  | (CommonButtonProps & {
      size?: "md" | "sm";
      startIcon?: ReactNode;
      endIcon?: ReactNode;
    })
  | (CommonButtonProps & {
      size: "icon";
      /** Icon-only buttons have no visible text, so an accessible name is mandatory. */
      "aria-label": string;
      startIcon?: never;
      endIcon?: never;
    });

export function Button({
  variant = "primary",
  size = "md",
  color = "blue",
  tone = "default",
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = size === "icon";
  const spinner = <LoaderCircle className="btn-spinner" aria-hidden="true" />;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-tone={tone === "onDark" ? "on-dark" : undefined}
      data-loading={loading || undefined}
      data-full-width={fullWidth || undefined}
      className={cn("btn", className)}
      {...props}
      // Block activation while loading without changing the visual "enabled" look.
      onClick={loading ? (event) => event.preventDefault() : props.onClick}
    >
      {isIconOnly ? (
        loading ? spinner : children
      ) : (
        <>
          {loading ? spinner : startIcon}
          {children}
          {!loading && endIcon}
        </>
      )}
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "color"> & {
  variant?: ButtonVariant;
  size?: "md" | "sm";
  color?: ButtonColor;
  tone?: ButtonTone;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
} & ({ to: string; href?: never } | { href: string; to?: never });

/**
 * Link that looks exactly like a Button.
 * `to` → client-side navigation (react-router); `href` → plain anchor (hash links, external URLs).
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  color = "blue",
  tone = "default",
  fullWidth = false,
  startIcon,
  endIcon,
  to,
  href,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const shared = {
    "data-variant": variant,
    "data-size": size,
    "data-color": color,
    "data-tone": tone === "onDark" ? "on-dark" : undefined,
    "data-full-width": fullWidth || undefined,
    className: cn("btn", className),
    ...props,
  };
  const content = (
    <>
      {startIcon}
      {children}
      {endIcon}
    </>
  );

  return to !== undefined ? (
    <Link to={to} {...shared}>
      {content}
    </Link>
  ) : (
    <a href={href} {...shared}>
      {content}
    </a>
  );
}