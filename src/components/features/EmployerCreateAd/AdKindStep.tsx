
import { BookOpen, Briefcase } from "lucide-react";

import { cn } from "@/utils/cn";
import type { EmployerAdKind } from "@/types/Employer/employer";

interface AdKindStepProps {
  value: EmployerAdKind | "";
  onChange: (value: EmployerAdKind) => void;
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
                "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                selected
                  ? "border-green-3 bg-green-7"
                  : "border-border-soft bg-white",
              )}
            >

              <input
                type="radio"
                name="ad-kind"
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="accent-blue"
              />

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

    </div>
  );
}
