/**
 * Layout of the job-seeker dashboard: top bar + sidebar (bottom bar and drawer on phones) + page content.
 */

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { SeekerParentFooter } from "@/components/features/Seeker/SeekerParentFooter";
import { DashboardHeader } from "@/components/shared/DashboardHeader/DashboardHeader";
import { Sidebar } from "@/components/shared/Sidebar/Sidebar";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { mockParent, mockProfile } from "@/data/mockSeeker";
import {
  SEEKER_MORE_KEY,
  seekerBottomBarItems,
  seekerRoutes,
  seekerSidebarItems,
} from "@/data/seekerSidebarItems";
import { useSidebar } from "@/hooks/useSidebar";

/** Which sidebar item the current URL belongs to. */
function getActiveKey(pathname: string): string {
  if (pathname.startsWith("/seeker/requests")) return "requests";
  if (pathname.startsWith("/seeker/ads")) return "ads";
  if (pathname.startsWith("/seeker/collabs")) return "collabs";
  return "home";
}

export default function SeekerDashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isDesktop, drawerOpen, toggle, closeDrawer } = useSidebar();

  const activeKey = getActiveKey(pathname);
  const bottomBarKeys = seekerBottomBarItems.map((item) => item.key);
  // On phones the bar shows "more" as active when the page lives inside the drawer.
  const shownKey = isDesktop || drawerOpen || bottomBarKeys.includes(activeKey) ? activeKey : SEEKER_MORE_KEY;

  const handleSelect = (key: string) => {
    if (key === SEEKER_MORE_KEY) {
      toggle();
      return;
    }
    const target = seekerRoutes[key];
    if (target) navigate(target);
  };

  return (
    <div className="min-h-svh bg-background-page text-text-primary">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 p-4 pb-24 lg:gap-6 lg:p-6">
        <DashboardHeader
          userName={mockProfile.name}
          userRoleLabel={mockProfile.role}
          role="seeker"
          homeTo="/seeker/ads"
        />

        <div className="flex items-start gap-6">
          <Sidebar
            items={seekerSidebarItems}
            bottomItems={seekerBottomBarItems}
            activeKey={shownKey}
            onSelect={handleSelect}
            drawerOpen={drawerOpen}
            onDrawerClose={closeDrawer}
            footer={<SeekerParentFooter parent={mockParent} />}
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
