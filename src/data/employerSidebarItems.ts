import type { SidebarNavItem } from "@/types/Navigation/sidebar";

/** Employer dashboard navigation (same order and keys as the Figma `Sidebar` component set). */
export const employerSidebarItems: SidebarNavItem[] = [
  { key: "home", label: "خانه", icon: "home" },
  { key: "ads", label: "آگهی‌ها", icon: "ads", badge: 2 },
  { key: "collabs", label: "همکاری‌ها", icon: "grid" },
  { key: "chat", label: "گفت‌وگو", icon: "chat", badge: 2 },
  { key: "calendar", label: "تقویم", icon: "calendar" },
  { key: "wallet", label: "مالی", icon: "wallet", badge: 1 },
  { key: "support", label: "پشتیبانی", icon: "help" },
];

/** Phone bottom bar: only the five main sections (the rest live in the floating drawer). */
export const employerBottomBarItems: SidebarNavItem[] = [
  employerSidebarItems[0],
  employerSidebarItems[1],
  employerSidebarItems[2],
  employerSidebarItems[3],
  { key: "profile", label: "پروفایل", icon: "user" },
];
