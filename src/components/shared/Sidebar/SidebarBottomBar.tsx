import type { CSSProperties } from "react";

import { SidebarItem } from "@/components/shared/Sidebar/SidebarItem";
import type { SidebarNavItem } from "@/types/Navigation/sidebar";

interface SidebarBottomBarProps {
  items: SidebarNavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  /** Theme CSS variables from the Sidebar. */
  style?: CSSProperties;
}

/** Phone "closed" state: always-visible navigation bar fixed to the bottom. */
export function SidebarBottomBar({ items, activeKey, onSelect, style }: SidebarBottomBarProps) {
  return (
    <nav
      aria-label="ناوبری اصلی"
      style={style}
      className="fixed inset-x-0 bottom-0 z-30 flex h-17 items-center justify-around bg-(--sb-surface) px-1 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
    >
      {items.map((item) => (
        <div key={item.key} className="flex min-w-0 flex-1 justify-center">
          <SidebarItem item={item} active={item.key === activeKey} layout="tab" onSelect={onSelect} />
        </div>
      ))}
    </nav>
  );
}
