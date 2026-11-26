import type { IconName } from "@/components/ui/Icon";

/** Colour family of the badge (message count, pending count...). */
export type SidebarBadgeTone = "default" | "info" | "warning" | "error" | "success";

export interface SidebarNavItem {
  /** Stable identifier, also used as the active key. */
  key: string;
  label: string;
  icon: IconName;
  /** Count or short text. Shown as a pill when expanded and as a dot when collapsed. */
  badge?: number | string;
  /** Overrides the theme's default badge colour for this item only. */
  badgeTone?: SidebarBadgeTone;
}

/** Any CSS colour value works: hex, `var(--color-blue)`, `oklch(...)`. */
export interface SidebarBadgeColors {
  bg: string;
  /** Background while its item is active. */
  bgActive: string;
  text: string;
  /** Dot colour (collapsed state / phone bar). */
  dot: string;
  dotActive: string;
}

/** Every colour the sidebar uses. All fields are optional; missing ones fall back to the defaults. */
export interface SidebarTheme {
  surface?: string;
  activeBg?: string;
  activeText?: string;
  text?: string;
  hoverBg?: string;
  pressedBg?: string;
  /** Colours of the default badge tone. */
  badge?: Partial<SidebarBadgeColors>;
}

export type SidebarVariant = "desktop-open" | "desktop-closed" | "phone-drawer" | "phone-bar";
