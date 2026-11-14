/**
 * Sidebar demo (shown inside the components test page).
 * The MenuButton collapses the sidebar on desktop and opens the drawer on phones.
 * Resize the window below 1024px to see the phone variants (bottom bar + drawer).
 */

import { useState } from "react";

import { Sidebar } from "@/components/shared/Sidebar/Sidebar";
import { MenuButton } from "@/components/ui/MenuButton";
import { employerBottomBarItems, employerSidebarItems } from "@/data/employerSidebarItems";
import { useSidebar } from "@/hooks/useSidebar";

export default function SidebarDemo() {
  const [activeKey, setActiveKey] = useState("home");
  const { collapsed, drawerOpen, expanded, toggle, closeDrawer } = useSidebar();

  return (
    <div dir="rtl" className="flex min-h-screen flex-col gap-4 bg-background-page p-4 pb-24 lg:gap-6 lg:p-6">
      <div>
        <MenuButton expanded={expanded} onClick={toggle} />
      </div>

      <div className="flex flex-1 gap-6">
        <Sidebar
          items={employerSidebarItems}
          bottomItems={employerBottomBarItems}
          activeKey={activeKey}
          onSelect={setActiveKey}
          collapsed={collapsed}
          drawerOpen={drawerOpen}
          onDrawerClose={closeDrawer}
          className="sticky top-6 self-start"
        />
        <main className="flex-1" />
      </div>
    </div>
  );
}
