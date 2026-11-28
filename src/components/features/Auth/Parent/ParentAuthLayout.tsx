import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { ParentAuthTabs } from "@/components/features/Auth/Parent/ParentAuthTabs";
import { ToastViewport } from "@/components/ui/ToastViewport";

interface ParentAuthLayoutProps {
  children: ReactNode;
  activeTab: "login" | "signup";
  hideTabs?: boolean;
}

function BrandHeader() {
  return (
    <header
      className="flex h-16 items-center justify-between bg-white px-5 lg:px-8"
      dir="rtl"
    >
      <Link
        to="/"
        className="flex items-center"
        aria-label="صفحه اصلی زدلنسر"
      >
        <img
          src="/images/ZedlancerLogo.svg"
          alt="زدلنسر"
          className="h-7 w-auto"
        />
      </Link>

      <Link
        to="/"
        className="text-caption font-medium text-text-secondary transition hover:text-action-primary"
      >
        خانه
      </Link>
    </header>
  );
}

export function ParentAuthLayout({
  children,
  activeTab,
  hideTabs = false,
}: ParentAuthLayoutProps) {
  return (
    <div className="flex min-h-svh w-full flex-col bg-white">
      <div
        className="flex flex-1 flex-col lg:flex-row"
        dir="ltr"
      >
        <section
          className="order-2 flex w-full flex-col bg-white lg:order-1 lg:w-[59.375%]"
          dir="rtl"
        >
          <div className="hidden lg:block">
            <BrandHeader />
          </div>

          <div className="mx-auto flex w-full max-w-[760px] flex-1 flex-col px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
            {!hideTabs ? (
              <ParentAuthTabs active={activeTab} />
            ) : null}

            <div className="flex flex-1 flex-col pt-6">
              {children}
            </div>
          </div>
        </section>

        <aside className="order-1 w-full overflow-hidden bg-background-page lg:order-2 lg:w-[40.625%]">
          <div className="lg:hidden">
            <BrandHeader />
          </div>

          <div className="h-44 overflow-hidden sm:h-56 lg:h-full lg:min-h-[680px]">
            <img
              src="/images/parent-auth-hero.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </aside>
      </div>

      <footer
        className="flex min-h-11 items-center justify-between gap-4 bg-action-primary px-5 py-2 text-caption text-white sm:px-8"
        dir="rtl"
      >
        <span>زدلنسر؛ شروع راه امن خانواده</span>
        <Link
          to="/support"
          className="font-medium text-brand-peach hover:underline"
        >
          نیاز به راهنمایی داری؟
        </Link>
      </footer>

      <ToastViewport />
    </div>
  );
}
