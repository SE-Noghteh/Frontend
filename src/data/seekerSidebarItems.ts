import type { SidebarNavItem } from "@/types/Navigation/sidebar";

/** Job-seeker dashboard navigation. Same sidebar component as the employer panel, different items. */
export const seekerSidebarItems: SidebarNavItem[] = [
  { key: "home", label: "خانه", icon: "home" },
  { key: "ads", label: "آگهی‌ها", icon: "ads" },
  { key: "requests", label: "درخواست‌های من", icon: "paperclip", badge: 2, badgeTone: "error" },
  { key: "collabs", label: "همکاری‌ها", icon: "grid", badge: 1, badgeTone: "error" },
  { key: "chat", label: "گفت‌وگو", icon: "chat", badge: 3, badgeTone: "error" },
  { key: "passport", label: "پاسپورت مهارتی", icon: "user" },
  { key: "calendar", label: "تقویم", icon: "calendar" },
  { key: "wallet", label: "مالی", icon: "wallet" },
  { key: "parent", label: "والد", icon: "shield", badge: 1, badgeTone: "error" },
  { key: "support", label: "پشتیبانی", icon: "help" },
];

/** Phone bottom bar: the main sections plus "more", which opens the drawer with everything else. */
export const SEEKER_MORE_KEY = "more";

export const seekerBottomBarItems: SidebarNavItem[] = [
  seekerSidebarItems[0],
  seekerSidebarItems[1],
  seekerSidebarItems[3],
  seekerSidebarItems[4],
  { key: SEEKER_MORE_KEY, label: "بیشتر", icon: "menu" },
];

/** Sidebar items that already have a page. The rest stay inert until their pages exist. */
export const seekerRoutes: Record<string, string> = {
  ads: "/seeker/ads",
  requests: "/seeker/requests",
  collabs: "/seeker/collabs",
};
