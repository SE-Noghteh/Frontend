/**
 * Single entry point for the sidebar toggle.
 * `toggle` does the right thing for the current device:
 * desktop -> collapse / expand, phone -> open the drawer.
 */

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSidebarStore } from "@/store/ui/useSidebarStore";

export const SIDEBAR_DESKTOP_QUERY = "(min-width: 1024px)";

export function useSidebar() {
  const isDesktop = useMediaQuery(SIDEBAR_DESKTOP_QUERY);
  const collapsed = useSidebarStore((state) => state.collapsed);
  const drawerOpen = useSidebarStore((state) => state.drawerOpen);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);
  const openDrawer = useSidebarStore((state) => state.openDrawer);
  const closeDrawer = useSidebarStore((state) => state.closeDrawer);

  const toggle = isDesktop ? toggleCollapsed : openDrawer;
  /** Whether the sidebar is currently shown in its wide / open form (for aria-expanded). */
  const expanded = isDesktop ? !collapsed : drawerOpen;

  return { isDesktop, collapsed, drawerOpen, expanded, toggle, closeDrawer };
}
