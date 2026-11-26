/**
 * Global UI state for the sidebar.
 *
 * - `collapsed`  : desktop rail vs full sidebar (remembered between visits)
 * - `drawerOpen` : phone drawer (never persisted)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  collapsed: boolean;
  drawerOpen: boolean;
  toggleCollapsed: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      drawerOpen: false,

      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: "noghteh-sidebar",
      partialize: (state) => ({ collapsed: state.collapsed }),
    },
  ),
);
