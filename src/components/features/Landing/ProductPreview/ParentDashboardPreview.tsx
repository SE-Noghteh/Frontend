import { InitialAvatar } from "@/components/ui/InitialAvatar";
import { StatusPill } from "@/components/ui/StatusPill";
import { ROLE_STYLES } from "@/constants/roles";

import { DashboardFrame } from "./DashboardFrame";
import { DashboardListRow } from "./DashboardListRow";

export function ParentDashboardPreview() {
  return (
    <DashboardFrame role="parent" title="zedlancer.ir / پنل والد">
      <div className={`flex items-center gap-3 rounded-xl p-3 ${ROLE_STYLES.parent.soft}`}>
        <InitialAvatar name="سارا" role="seeker" />
        <div className="text-label">
          <div className="font-bold text-text-primary">سارا · ۱۶ ساله</div>
          <div className="text-caption text-text-secondary">۲ همکاری فعال</div>
        </div>
        <span className="ms-auto">
          <StatusPill tone="warning">۱ درخواست منتظر تأیید</StatusPill>
        </span>
      </div>
      <div className="mb-2 mt-5 text-caption font-bold text-text-primary">این هفته</div>
      <div className="space-y-2">
        <DashboardListRow
          title="مهلت تحویل پست‌ها"
          description="پنجشنبه · کافه‌کتاب پاتوق"
          trailing={<StatusPill>۴ روز</StatusPill>}
        />
        <DashboardListRow
          title="نسخه ۳ توافق‌نامه"
          description="منتظر تأیید کارجو"
          trailing={<StatusPill tone="info">مشاهده</StatusPill>}
        />
        <DashboardListRow
          title="پرداخت پروژه قبلی"
          description="۱٬۲۰۰٬۰۰۰ تومان آزاد شد"
          trailing={<StatusPill tone="success">انجام شد</StatusPill>}
        />
      </div>
    </DashboardFrame>
  );
}
