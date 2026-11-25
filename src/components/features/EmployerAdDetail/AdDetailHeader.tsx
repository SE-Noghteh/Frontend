
import {
  BriefcaseBusiness,
  GraduationCap,
  CircleCheck,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export type AdDetailTab =
  | "overview"
  | "applicants"
  | "versions";

interface AdDetailHeaderProps {
  title: string;
  kind: "work" | "internship";
  statusLabel: string;
  activeTab: AdDetailTab;
  onTabChange: (tab: AdDetailTab) => void;
  onBack: () => void;
  onEdit: () => void;
  onClose: () => void;
}

const TABS: {
  id: AdDetailTab;
  label: string;
}[] = [
  { id: "overview", label: "نمای کلی" },
  { id: "applicants", label: "متقاضیان" },
  { id: "versions", label: "نسخه‌ها" },
];

export function AdDetailHeader({
  title,
  kind,
  statusLabel,
  activeTab,
  onTabChange,
  onBack,
  onEdit,
  onClose,
}: AdDetailHeaderProps) {
  const isInternship = kind === "internship";

  return (
    <header
      dir="rtl"
      className="flex min-w-0 flex-col gap-6"
    >

      {/* Breadcrumb */}

      <nav
        aria-label="مسیر صفحه"
        className="flex items-center gap-2 text-caption text-text-secondary"
      >
        <button
          type="button"
          onClick={onBack}
          className="hover:text-blue"
        >
          آگهی‌ها
        </button>

        <ChevronLeft size={14} />

        <span className="truncate">
          {title}
        </span>
      </nav>

      {/* Title and actions */}

      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="min-w-0">

          <div className="mb-3 flex flex-wrap items-center gap-2">

            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-7 px-3 py-1 text-caption text-green-2">
              <CircleCheck size={14} />
              {statusLabel}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-ocean-8 px-3 py-1.5 text-caption text-ocean-3">
              {isInternship ? (
                <GraduationCap size={15} />
              ) : (
                <BriefcaseBusiness size={15} />
              )}

              {isInternship ? "کارآموزی" : "کاری"}
            </span>

          </div>

          <h1 className="break-words text-xl font-bold text-text-primary sm:text-2xl">
            {title}
          </h1>

        </div>

        <div className="grid grid-cols-2 gap-3 lg:flex">

          <Button
  variant="secondary"
  className="min-w-0 lg:min-w-36"
  onClick={onEdit}
>
  ویرایش آگهی
</Button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-lg bg-red-50 px-5 text-label font-medium text-red-700 transition-colors hover:bg-red-100 lg:min-w-36"
          >
            بستن آگهی
          </button>

        </div>

      </div>

      {/* Tabs */}

      <nav
        aria-label="بخش‌های آگهی"
        className="flex flex-wrap items-center gap-1.5"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-current={
              activeTab === tab.id
                ? "page"
                : undefined
            }
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "min-h-11 rounded-xl border px-4 py-2.5 text-label font-medium transition-colors",
              activeTab === tab.id
                ? "border-blue bg-blue text-white"
                : "border-border-soft bg-white text-text-primary hover:bg-green-7",
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

    </header>
  );
}
