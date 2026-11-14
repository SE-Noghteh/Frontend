import type { CSSProperties } from "react";

import { BADGE_TONES, badgeVars } from "@/constants/sidebarTheme";
import { Icon } from "@/components/ui/Icon";
import type { SidebarNavItem } from "@/types/Navigation/sidebar";

/**
 * row : icon + label + badge. With `collapsed` the label and badge fade away
 *       and the item becomes an icon with a badge dot (desktop open / closed, phone drawer).
 * tab : icon only inside a pill (phone bottom bar).
 *
 * All colours come from CSS variables set by the Sidebar (theme) and, for the badge,
 * optionally from the item's own `badgeTone`.
 */
export type SidebarItemLayout = "row" | "tab";

interface SidebarItemProps {
  item: SidebarNavItem;
  active: boolean;
  layout: SidebarItemLayout;
  collapsed?: boolean;
  /** `lg` (default) = larger text and icon; `md` = the compact size. */
  size?: "md" | "lg";
  onSelect: (key: string) => void;
}

const ACTIVE =
  "bg-(--sb-active-bg) text-(--sb-active-text) shadow-[0_4px_10px_-2px_color-mix(in_srgb,var(--sb-active-bg)_30%,transparent)]";
const IDLE = "text-(--sb-text) hover:bg-(--sb-hover-bg) active:bg-(--sb-pressed-bg)";

const SMOOTH = "ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none";

function formatBadge(value: number | string): string {
  return typeof value === "number" ? value.toLocaleString("fa-IR") : value;
}

export function SidebarItem({ item, active, layout, collapsed = false, size = "lg", onSelect }: SidebarItemProps) {
  const state = active ? ACTIVE : IDLE;
  const common =
    "relative flex items-center rounded-[10px] " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring " +
    state;

  const toneStyle: CSSProperties | undefined =
    item.badgeTone && item.badgeTone !== "default" ? badgeVars(BADGE_TONES[item.badgeTone]) : undefined;
  const hasBadge = item.badge !== undefined && item.badge !== "";

  const dot = hasBadge ? (
    <span
      aria-hidden="true"
      style={toneStyle}
      className={`absolute right-3 top-1.5 size-2.5 rounded-full ${active ? "bg-(--sb-dot-active)" : "bg-(--sb-dot)"}`}
    />
  ) : null;

  if (layout === "tab") {
    return (
      <button
        type="button"
        onClick={() => onSelect(item.key)}
        aria-current={active ? "page" : undefined}
        aria-label={item.label}
        title={item.label}
        className={`${common} h-14 w-full min-w-0 max-w-16 flex-col justify-center gap-0.5 px-0.5 transition-colors duration-150`}
      >
        <Icon name={item.icon} />
        <span className="max-w-full truncate text-[11px] leading-tight">{item.label}</span>
        {dot}
      </button>
    );
  }

  // Label and badge keep their natural size (no reflow while the width changes) and are clipped by the item.
  // Closing: they leave quickly. Opening: they wait until there is room, then fade in.
  const fade = collapsed
    ? "opacity-0 translate-x-2 duration-100"
    : "opacity-100 translate-x-0 delay-150 duration-300";

  return (
    <button
      type="button"
      onClick={() => onSelect(item.key)}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? item.label : undefined}
      title={collapsed ? item.label : undefined}
      className={`${common} ${size === "lg" ? "h-12" : "h-11"} w-full gap-3 overflow-hidden ${size === "lg" ? "px-4" : "px-[17px]"} text-right transition-colors duration-150`}
    >
      <Icon name={item.icon} size={size === "lg" ? 24 : undefined} className="shrink-0" />

      <span
        className={`min-w-0 flex-1 whitespace-nowrap ${size === "lg" ? "text-[17px]" : "text-label"} transition-[opacity,transform] ${SMOOTH} ${fade} ${
          active ? "font-medium" : ""
        }`}
      >
        {item.label}
      </span>

      {hasBadge ? (
        <>
          <span
            style={toneStyle}
            className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 ${size === "lg" ? "text-label" : "text-caption"} font-bold text-(--sb-badge-text) transition-[opacity,transform] ${SMOOTH} ${fade} ${
              active ? "bg-(--sb-badge-bg-active)" : "bg-(--sb-badge-bg)"
            }`}
          >
            {formatBadge(item.badge as number | string)}
          </span>
          <span
            aria-hidden="true"
            style={toneStyle}
            className={`absolute right-2 top-1.5 size-2.5 rounded-full transition-opacity ${SMOOTH} ${
              active ? "bg-(--sb-dot-active)" : "bg-(--sb-dot)"
            } ${collapsed ? "opacity-100 delay-150 duration-300" : "opacity-0 duration-100"}`}
          />
        </>
      ) : null}
    </button>
  );
}
