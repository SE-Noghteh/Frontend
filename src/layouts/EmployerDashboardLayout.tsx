
/**
 * Employer dashboard layout.
 * Reuses shared dashboard components and responsive navigation.
 */

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { DashboardHeader } from "@/components/shared/DashboardHeader/DashboardHeader";
import { Sidebar } from "@/components/shared/Sidebar/Sidebar";
import { ToastViewport } from "@/components/ui/ToastViewport";

import {
  employerSidebarItems,
  employerBottomBarItems,
} from "@/data/employerSidebarItems";

import { useSidebar } from "@/hooks/useSidebar";

const employerRoutes: Record<string, string> = {
  ads: "/employer/ads",
};

function getActiveKey(pathname: string): string {
  if (pathname.startsWith("/employer/ads")) return "ads";
  if (pathname.startsWith("/employer/collabs")) return "collabs";
  if (pathname.startsWith("/employer/chat")) return "chat";
  if (pathname.startsWith("/employer/calendar")) return "calendar";
  if (pathname.startsWith("/employer/wallet")) return "wallet";
  if (pathname.startsWith("/employer/support")) return "support";
  if (pathname.startsWith("/employer/profile")) return "profile";

  return "home";
}

export default function EmployerDashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    collapsed,
    drawerOpen,
    toggle,
    closeDrawer,
  } = useSidebar();

  const activeKey = getActiveKey(pathname);

  const handleSelect = (key: string) => {
    if (key === "profile") {
      toggle();
      return;
    }

    const target = employerRoutes[key];

    if (target) {
      navigate(target);
    }
  };

  return (
    <div className="min-h-svh bg-background-page text-text-primary">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 p-4 pb-24 lg:gap-6 lg:p-6">

        <DashboardHeader
          userName="کارفرما"
          userRoleLabel="کارفرما"
          role="employer"
          homeTo="/employer/ads"
        />

        <div className="flex items-start gap-6">

          <Sidebar
            items={employerSidebarItems}
            bottomItems={employerBottomBarItems}
            activeKey={activeKey}
            onSelect={handleSelect}
            collapsed={collapsed}
            drawerOpen={drawerOpen}
            onDrawerClose={closeDrawer}
            className="sticky top-6 min-h-[calc(100svh-7.5rem)] self-start"
          />

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>

        </div>
      </div>

      <ToastViewport />
    </div>
  );
}
