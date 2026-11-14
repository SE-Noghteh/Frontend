import { StatusPill } from "@/components/ui/StatusPill";

import { DashboardFrame } from "./DashboardFrame";
import { DashboardListRow } from "./DashboardListRow";
import { DashboardStatTile } from "./DashboardStatTile";

export function SeekerDashboardPreview() {
  return (
    <DashboardFrame role="seeker" title="zedlancer.ir / پنل کارجو">
      <div className="grid grid-cols-3 gap-2.5">
        <DashboardStatTile role="seeker" label="درخواست فعال" value="۳" />
        <DashboardStatTile role="seeker" label="پروژه در جریان" value="۱" />
        <DashboardStatTile role="seeker" label="درآمد این ماه" value="۲٫۴ م" hint="+۱٫۲ م امروز" />
      </div>
      <div className="mb-2 mt-5 text-caption font-bold text-text-primary">وضعیت درخواست‌ها</div>
      <div className="space-y-2">
        <DashboardListRow
          title="طراحی ۵ پست اینستاگرام"
          description="کافه‌کتاب پاتوق"
          trailing={<StatusPill tone="success">پذیرفته شد</StatusPill>}
        />
        <DashboardListRow
          title="تدوین ریلز معرفی محصول"
          description="استودیو نیلوفر"
          trailing={<StatusPill tone="warning">منتظر والد</StatusPill>}
        />
        <DashboardListRow
          title="ورود اطلاعات جدول اکسل"
          description="دفتر حسابداری آریا"
          trailing={<StatusPill tone="info">در حال بررسی</StatusPill>}
        />
      </div>
    </DashboardFrame>
  );
}
