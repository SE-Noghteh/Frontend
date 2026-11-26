import { InitialAvatar } from "@/components/ui/InitialAvatar";

import { DashboardFrame } from "./DashboardFrame";
import { DashboardStatTile } from "./DashboardStatTile";

const TOP_APPLICANTS = [
  ["نیلوفر رضایی", "۱۷ ساله · تصویرسازی", "۹۲٪"],
  ["آرین موسوی", "۱۹ ساله · فتوشاپ", "۸۵٪"],
  ["هستی کریمی", "۱۵ ساله · کارآموز", "۷۴٪"],
] as const;

export function EmployerDashboardPreview() {
  return (
    <DashboardFrame role="employer" title="zedlancer.ir / پنل کارفرما">
      <div className="grid grid-cols-3 gap-2.5">
        <DashboardStatTile role="employer" label="آگهی فعال" value="۲" />
        <DashboardStatTile role="employer" label="درخواست جدید" value="۱۸" />
        <DashboardStatTile role="employer" label="در امانت" value="۳٫۱ م" />
      </div>
      <div className="mb-2 mt-5 text-caption font-bold text-text-primary">برترین متقاضی‌ها</div>
      <div className="space-y-2">
        {TOP_APPLICANTS.map(([name, description, match]) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl border border-border-decorative bg-surface-card p-3"
          >
            <InitialAvatar name={name} role="seeker" />
            <div className="flex-1">
              <div className="text-label font-bold text-text-primary">{name}</div>
              <div className="text-caption text-charcoal-2">{description}</div>
            </div>
            <span className="text-label font-extrabold text-text-primary">{match}</span>
          </div>
        ))}
      </div>
    </DashboardFrame>
  );
}
