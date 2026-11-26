/**
 * Hamburger button that toggles a menu / sidebar (generic UI primitive, no business logic).
 * Solid brand blue with a very soft shadow; the label is required for screen readers.
 */

import type { ButtonHTMLAttributes } from "react";

import { Icon } from "@/components/ui/Icon";

interface MenuButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Accessible name. */
  label?: string;
  /** Mirrors the state of the menu it controls (aria-expanded). */
  expanded?: boolean;
}

export function MenuButton({
  label = "باز و بسته کردن منو",
  expanded,
  className = "",
  type = "button",
  ...props
}: MenuButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      aria-expanded={expanded}
      className={
        "flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue text-white " +
        "shadow-[0_1px_3px_rgba(29,53,87,0.18)] transition-all duration-150 " +
        "hover:bg-[#27497b] hover:shadow-[0_3px_8px_-2px_rgba(29,53,87,0.28)] active:bg-[#13264a] active:shadow-none " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring " +
        className
      }
      {...props}
    >
      <Icon name="menu" size={22} />
    </button>
  );
}
