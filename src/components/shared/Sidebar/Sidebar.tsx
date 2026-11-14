/**
 * Application sidebar. One component, four states (same as the Figma `Sidebar` set):
 *
 *  - desktop open   : 264px card, labelled items
 *  - desktop closed : 88px rail, icons only
 *  - phone open     : 300px drawer sliding from the right (RTL)
 *  - phone closed   : bottom navigation bar
 *
 * Everything that depends on where the sidebar is used is a prop:
 *  - content : `items` (label, icon, badge), `brand`, `footer`
 *  - colours : `theme` (surface, active, text, hover, badge) and per-item `badgeTone`
 * Nothing here knows about a specific page or feature.
 */

import { useEffect, type ReactNode } from "react";

import { SidebarBottomBar } from "@/components/shared/Sidebar/SidebarBottomBar";
import { SidebarItem } from "@/components/shared/Sidebar/SidebarItem";
import { Icon } from "@/components/ui/Icon";
import { themeToCssVars } from "@/constants/sidebarTheme";
import { useAnimatedPresence } from "@/hooks/useAnimatedPresence";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SIDEBAR_DESKTOP_QUERY } from "@/hooks/useSidebar";
import type { SidebarNavItem, SidebarTheme } from "@/types/Navigation/sidebar";

interface SidebarProps {
  items: SidebarNavItem[];
  /** Phone bottom bar items. Defaults to `items`. */
  bottomItems?: SidebarNavItem[];
  activeKey: string;
  onSelect: (key: string) => void;

  /** Colours. Any field you leave out keeps its default. */
  theme?: SidebarTheme;

  /** Shown at the top of the phone drawer (logo, app name...). */
  brand?: ReactNode;
  /** Pinned to the bottom of the desktop card and the phone drawer (user card, help link...). */
  footer?: ReactNode;

  /** Desktop: show the icon-only rail instead of the full sidebar. */
  collapsed?: boolean;
  /** Phone: show the drawer (the bottom bar is always visible on phones). */
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
  className?: string;
}

// desktop width: symmetric ease so opening and closing feel the same
const WIDTH_EASE = "ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none";
// drawer: softer, longer curve (iOS-style) so it glides instead of snapping
const DRAWER_EASE = "ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none";
const DRAWER_MS = 700;

/** Drawer content fades / slides in one piece after another (stagger). */
function reveal(shown: boolean): string {
  return `transition-[opacity,transform] duration-[600ms] ${DRAWER_EASE} ${shown ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"}`;
}
function revealDelay(shown: boolean, index: number): { transitionDelay: string } {
  return { transitionDelay: shown ? `${200 + index * 55}ms` : "0ms" };
}

export function Sidebar({
  items,
  bottomItems,
  activeKey,
  onSelect,
  theme,
  brand = "زدلنسر",
  footer,
  collapsed = false,
  drawerOpen = false,
  onDrawerClose,
  className = "",
}: SidebarProps) {
  const isDesktop = useMediaQuery(SIDEBAR_DESKTOP_QUERY);
  const drawerVisible = !isDesktop && drawerOpen;
  const { mounted: drawerMounted, shown: drawerShown } = useAnimatedPresence(drawerVisible, DRAWER_MS);
  const vars = themeToCssVars(theme);

  useEffect(() => {
    if (!drawerVisible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDrawerClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerVisible, onDrawerClose]);

  if (!isDesktop) {
    const selectAndClose = (key: string) => {
      onSelect(key);
      onDrawerClose?.();
    };

    return (
      <>
        <SidebarBottomBar items={bottomItems ?? items} activeKey={activeKey} onSelect={onSelect} style={vars} />

        {drawerMounted ? (
          <div className="fixed inset-0 z-40">
            <button
              type="button"
              aria-label="بستن منو"
              tabIndex={-1}
              onClick={onDrawerClose}
              className={`absolute inset-0 bg-black/40 backdrop-blur-[3px] transition-opacity duration-[700ms] ${DRAWER_EASE} ${
                drawerShown ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Floating card: 16px from top / right / bottom, ~58% wide (max 224px), as tall as its content (max 80%); the page stays visible on the left. */}
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="منوی اصلی"
              style={vars}
              className={`absolute inset-y-0 right-4 my-auto flex h-fit max-h-[min(80dvh,calc(100dvh-2rem))] w-[min(58vw,224px)] flex-col gap-1 rounded-3xl bg-(--sb-surface) p-3 shadow-[0_16px_48px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-[700ms] ${DRAWER_EASE} ${
                drawerShown ? "translate-x-0" : "translate-x-[calc(100%+1.5rem)]"
              }`}
            >
              <div
                className={`flex items-center justify-between ${reveal(drawerShown)}`}
                style={revealDelay(drawerShown, 0)}
              >
                <span className="text-[19px] font-bold text-blue">{brand}</span>
                <button
                  type="button"
                  autoFocus
                  aria-label="بستن منو"
                  onClick={onDrawerClose}
                  className="flex size-11 items-center justify-center rounded-xl bg-green-8 text-blue transition-all duration-150 hover:bg-green-6 hover:shadow-[0_4px_10px_-2px_rgba(72,80,55,0.3)] active:bg-green-5 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>


              <nav aria-label="ناوبری اصلی" className="flex min-h-0 flex-col gap-1 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={item.key} className={reveal(drawerShown)} style={revealDelay(drawerShown, index + 1)}>
                    <SidebarItem
                      item={item}
                      active={item.key === activeKey}
                      layout="row"
                      size="md"
                      onSelect={selectAndClose}
                    />
                  </div>
                ))}
              </nav>

              {footer ? (
                <div
                  className={`mt-auto border-t border-green-8 pt-2 ${reveal(drawerShown)}`}
                  style={revealDelay(drawerShown, items.length + 2)}
                >
                  {footer}
                </div>
              ) : null}
            </aside>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <aside
      aria-label="منوی اصلی"
      style={vars}
      className={`flex shrink-0 flex-col gap-2 rounded-3xl bg-(--sb-surface) px-[16px] py-6 shadow-[0_6px_24px_rgba(36,41,28,0.07)] transition-[width] duration-300 ${WIDTH_EASE} ${
        collapsed ? "w-[88px]" : "w-[264px]"
      } ${className}`}
    >
      <nav aria-label="ناوبری اصلی" className="flex flex-col gap-2">
        {items.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            active={item.key === activeKey}
            layout="row"
            collapsed={collapsed}
            onSelect={onSelect}
          />
        ))}
      </nav>

      {footer ? <div className="mt-auto overflow-hidden pt-3">{footer}</div> : null}
    </aside>
  );
}
