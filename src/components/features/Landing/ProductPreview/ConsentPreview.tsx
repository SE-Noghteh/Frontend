import { Bell } from "lucide-react";

import { InitialAvatar } from "@/components/ui/InitialAvatar";
import { ROLE_STYLES } from "@/constants/roles";

import { PreviewCard } from "./PreviewCard";
import { PreviewIconTile } from "./PreviewIconTile";
import { PreviewKeyValueList } from "./PreviewKeyValueList";

const PROJECT_ROWS = [
  ["پروژه", "طراحی ۵ پست اینستاگرام"],
  ["کارفرما", "کافه‌کتاب پاتوق ✓"],
  ["مبلغ و مهلت", "۱٫۲ میلیون · ۴ روز"],
  ["شیوه کار", "آنلاین"],
] as const;

/** Parent's view of a consent request from a teen. */
export function ConsentPreview() {
  const parentStyle = ROLE_STYLES.parent;

  return (
    <PreviewCard className="p-4">
      <div className="flex items-center gap-2 text-caption font-bold text-text-primary">
        <PreviewIconTile role="parent">
          <Bell />
        </PreviewIconTile>
        درخواست تأیید والد
      </div>
      <div className={`mt-3 flex items-center gap-3 rounded-xl p-3 ${ROLE_STYLES.seeker.soft}`}>
        <InitialAvatar name="سارا" role="seeker" />
        <div className="text-caption">
          <div className="font-bold text-text-primary">سارا · ۱۶ ساله</div>
          <div className="text-text-secondary">می‌خواد درخواست بده</div>
        </div>
      </div>
      <PreviewKeyValueList rows={PROJECT_ROWS} />
      <div className="mt-3 grid grid-cols-2 gap-2 text-caption font-bold">
        <span className={`grid h-9 place-items-center rounded-xl ${parentStyle.solid}`}>
          تأیید می‌کنم
        </span>
        <span className="grid h-9 place-items-center rounded-xl border border-border-decorative text-text-primary">
          رد درخواست
        </span>
      </div>
    </PreviewCard>
  );
}
