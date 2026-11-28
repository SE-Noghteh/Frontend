import { Link } from "react-router-dom";

import { cn } from "@/utils/cn";

interface ParentAuthTabsProps {
  active: "login" | "signup";
}

export function ParentAuthTabs({
  active,
}: ParentAuthTabsProps) {
  const tabs = [
    {
      key: "login" as const,
      label: "ورود",
      to: "/parent/login",
    },
    {
      key: "signup" as const,
      label: "ساخت حساب",
      to: "/parent/signup",
    },
  ];

  return (
    <nav
      aria-label="ورود و ثبت‌نام والد"
      className="grid grid-cols-2 border-b border-border-decorative"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          to={tab.to}
          className={cn(
            "border-b-2 px-4 py-3 text-center text-label font-medium transition",
            active === tab.key
              ? "border-action-primary text-action-primary"
              : "border-transparent text-text-secondary hover:text-text-primary",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
