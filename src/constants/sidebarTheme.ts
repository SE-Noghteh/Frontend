import type { CSSProperties } from "react";

import type { SidebarBadgeColors, SidebarBadgeTone, SidebarTheme } from "@/types/Navigation/sidebar";

type CssVars = CSSProperties & Record<`--${string}`, string>;

/** Default colours, expressed with the project's design tokens. */
export const DEFAULT_SIDEBAR_THEME: Required<Omit<SidebarTheme, "badge">> & { badge: SidebarBadgeColors } = {
  surface: "var(--color-white)",
  activeBg: "var(--color-blue)",
  activeText: "var(--color-white)",
  text: "var(--color-charcoal-1)",
  hoverBg: "#eef3fa",
  pressedBg: "#dde8f5",
  badge: {
    bg: "var(--color-green-8)",
    bgActive: "var(--color-green-5)",
    text: "var(--color-green-1)",
    dot: "var(--color-green-4)",
    dotActive: "var(--color-green-5)",
  },
};

/** Ready-made badge colour families a page can pick per item (`badgeTone`). */
export const BADGE_TONES: Record<Exclude<SidebarBadgeTone, "default">, SidebarBadgeColors> = {
  info: {
    bg: "var(--color-info-soft)",
    bgActive: "var(--color-ocean-7)",
    text: "var(--color-info)",
    dot: "var(--color-info)",
    dotActive: "var(--color-ocean-7)",
  },
  warning: {
    bg: "var(--color-warning-soft)",
    bgActive: "#f1d9a2",
    text: "var(--color-warning)",
    dot: "var(--color-warning)",
    dotActive: "#f1d9a2",
  },
  error: {
    bg: "var(--color-error-soft)",
    bgActive: "var(--color-peach-5)",
    text: "var(--color-error)",
    dot: "var(--color-error)",
    dotActive: "var(--color-peach-5)",
  },
  success: {
    bg: "var(--color-success-soft)",
    bgActive: "var(--color-green-5)",
    text: "var(--color-success)",
    dot: "var(--color-success)",
    dotActive: "var(--color-green-5)",
  },
};

export function badgeVars(colors: SidebarBadgeColors): CssVars {
  return {
    "--sb-badge-bg": colors.bg,
    "--sb-badge-bg-active": colors.bgActive,
    "--sb-badge-text": colors.text,
    "--sb-dot": colors.dot,
    "--sb-dot-active": colors.dotActive,
  };
}

/** Turns a (partial) theme into the CSS variables the sidebar components read. */
export function themeToCssVars(theme?: SidebarTheme): CssVars {
  const d = DEFAULT_SIDEBAR_THEME;
  return {
    "--sb-surface": theme?.surface ?? d.surface,
    "--sb-active-bg": theme?.activeBg ?? d.activeBg,
    "--sb-active-text": theme?.activeText ?? d.activeText,
    "--sb-text": theme?.text ?? d.text,
    "--sb-hover-bg": theme?.hoverBg ?? d.hoverBg,
    "--sb-pressed-bg": theme?.pressedBg ?? d.pressedBg,
    ...badgeVars({ ...d.badge, ...theme?.badge }),
  };
}
