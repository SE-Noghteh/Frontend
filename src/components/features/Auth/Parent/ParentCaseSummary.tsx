import {
  FileCheck2,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
  Video,
} from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import type { ParentAccount } from "@/types/Auth/parentAuth";

const RELATION_LABEL: Record<string, string> = {
  father: "پدر",
  mother: "مادر",
  guardian: "سرپرست",
};

interface ParentCaseSummaryProps {
  parent: ParentAccount;
}

export function ParentCaseSummary({
  parent,
}: ParentCaseSummaryProps) {
  const rows = [
    {
      label: "نام و نام خانوادگی",
      value: `${parent.first_name} ${parent.last_name}`,
      icon: UserRound,
    },
    {
      label: "شماره موبایل",
      value: parent.phone,
      icon: Phone,
      ltr: true,
    },
    {
      label: "نسبت با کارجو",
      value:
        RELATION_LABEL[parent.relationship] ??
        parent.relationship,
      icon: UsersRound,
    },
  ];

  return (
    <div className="space-y-4">
      <SectionCard
        title="اطلاعات حساب والد"
        icon={<ShieldCheck size={16} aria-hidden="true" />}
      >
        <dl className="space-y-3">
          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <div
                key={row.label}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border-decorative pb-3 last:border-b-0 last:pb-0"
              >
                <dt className="flex items-center gap-2 text-caption text-text-secondary">
                  <Icon size={15} aria-hidden="true" />
                  {row.label}
                </dt>
                <dd
                  dir={row.ltr ? "ltr" : undefined}
                  className="text-label font-bold text-text-primary"
                >
                  {row.value || "—"}
                </dd>
              </div>
            );
          })}
        </dl>
      </SectionCard>

      <SectionCard
        title="مدارک پرونده"
        icon={<FileCheck2 size={16} aria-hidden="true" />}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-success-soft px-3 py-3">
            <span className="grid size-9 place-items-center rounded-full bg-white text-success">
              <FileCheck2 size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="text-label font-bold text-text-primary">
                مدرک هویتی
              </p>
              <p className="text-caption text-success">
                هنگام ثبت‌نام دریافت شده
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-success-soft px-3 py-3">
            <span className="grid size-9 place-items-center rounded-full bg-white text-success">
              <Video size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="text-label font-bold text-text-primary">
                ویدئوی رضایت
              </p>
              <p className="text-caption text-success">
                هنگام ثبت‌نام دریافت شده
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
