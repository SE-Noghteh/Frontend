import { BookOpen, Briefcase, Lock } from "lucide-react";

import { cn } from "@/utils/cn";
import type { EmployerAdKind } from "@/types/Employer/employer";

interface AdKindStepProps {
  value: EmployerAdKind | "";
  onChange: (value: EmployerAdKind) => void;
  disabled?: boolean;
}

const OPTIONS = [
  {
    value: "work" as const,
    title: "کاری",
    description: "پروژه یا همکاری مشخص با مبلغ توافقی",
    icon: Briefcase,
  },
  {
    value: "internship" as const,
    title: "کارآموزی",
    description: "فرصت یادگیری و کسب تجربه عملی",
    icon: BookOpen,
  },
];

export function AdKindStep({
  value,
  onChange,
  disabled = false,
}: AdKindStepProps) {
  return (
    <div className="flex flex-col gap-4">

      <h2 className="text-card-title font-bold">
        نوع آگهی چیست؟
      </h2>

      <div className="grid gap-3 md:grid-cols-2">

        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 transition-colors",

                disabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer",

                selected
                  ? "border-green-3 bg-green-7"
                  : "border-border-soft bg-white",

                disabled && !selected &&
                  "bg-gray-50 opacity-50",
              )}
            >

              {disabled && selected ? (
                <Lock
                  size={17}
                  className="shrink-0 text-green-2"
                  aria-label="نوع آگهی قفل شده است"
                />
              ) : (
                <input
                  type="radio"
                  name="ad-kind"
                  value={option.value}
                  checked={selected}
                  disabled={disabled}
                  onChange={() => onChange(option.value)}
                  className="accent-blue"
                />
              )}

              <div className="min-w-0 flex-1">

                <p className="font-bold">
                  {option.title}
                </p>

                <p className="mt-1 text-caption text-text-secondary">
                  {option.description}
                </p>

              </div>

              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-7 text-green-2">
                <Icon size={20} />
              </span>

            </label>
          );
        })}

      </div>

      {disabled && (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-border-soft bg-background-page px-4 py-3">

          <Lock
            size={18}
            className="shrink-0 text-text-secondary"
          />

          <p className="text-label font-bold text-text-secondary">
            نوع آگهی پس از انتشار قابل تغییر نیست.
          </p>

        </div>
      )}

    </div>
  );
}