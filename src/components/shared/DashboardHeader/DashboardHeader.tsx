/**
 * Top bar of the dashboards: logo, global search, notifications and the user menu.
 * Shared by every dashboard role; the user comes from props.
 */

import { Bell, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { InitialAvatar } from "@/components/ui/InitialAvatar";
import type { UserRole } from "@/types/Landing/landing";

interface DashboardHeaderProps {
  userName: string;
  userRoleLabel: string;
  role: UserRole;
  homeTo: string;
}

export function DashboardHeader({ userName, userRoleLabel, role, homeTo }: DashboardHeaderProps) {
  return (
    <header className="flex items-end gap-3 md:items-center lg:gap-4">
      <Link to={homeTo} aria-label="زدلنسر" className="flex shrink-0 items-center self-center">
        <img src="/images/ZedlancerLogo.svg" alt="زدلنسر" className="h-8 w-auto lg:h-9" />
      </Link>

      <div className="hidden min-w-0 flex-1 md:block">
        <label htmlFor="dashboard-search" className="mb-1 block text-[11px] font-bold text-text-primary">
          جست‌وجوی آگهی
        </label>
        <div className="relative">
          <input
            id="dashboard-search"
            type="search"
            placeholder="جست‌وجو در آگهی‌ها، درخواست‌ها و گفت‌وگوها"
            className="h-10 w-full rounded-xl border border-ocean-blue bg-white ps-4 pe-10 text-label text-text-primary placeholder:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          />
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>
      </div>

      <div className="ms-auto flex items-center gap-2 self-center md:ms-0">
        <button
          type="button"
          aria-label="اعلان‌ها"
          className="grid size-10 place-items-center rounded-xl border border-border-soft bg-white text-text-primary transition hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <Bell size={18} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="منوی کاربر"
          className="flex h-10 items-center gap-2 rounded-xl border border-border-soft bg-white ps-2 pe-3 transition hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <InitialAvatar name={userName} role={role} className="size-7 text-caption" />
          <span className="hidden text-start md:block">
            <span className="block text-[12px] leading-4 font-bold text-text-primary">{userName}</span>
            <span className="block text-[10px] leading-3 text-text-secondary">{userRoleLabel}</span>
          </span>
          <ChevronDown size={14} aria-hidden="true" className="text-text-secondary" />
        </button>
      </div>
    </header>
  );
}
