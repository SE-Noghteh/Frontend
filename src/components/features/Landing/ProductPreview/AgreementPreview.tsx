import { Check, Clock, FileText } from "lucide-react";

import { StatusPill } from "@/components/ui/StatusPill";
import { ROLE_STYLES } from "@/constants/roles";

import { PreviewCard } from "./PreviewCard";
import { PreviewIconTile } from "./PreviewIconTile";
import { PreviewKeyValueList } from "./PreviewKeyValueList";

const VERSIONS = ["۱", "۲", "۳"];
const TERMS = [
  ["مبلغ", "۱٬۲۰۰٬۰۰۰ تومان"],
  ["مهلت تحویل", "۴ روز"],
  ["تعداد اصلاحات", "تا ۲ بار"],
] as const;

/** Versioned agreement between employer and seeker. */
export function AgreementPreview() {
  const style = ROLE_STYLES.employer;

  return (
    <PreviewCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-caption font-bold text-text-primary">
          <PreviewIconTile role="employer">
            <FileText />
          </PreviewIconTile>
          توافق‌نامه همکاری
        </div>
        <div className="flex gap-1">
          {VERSIONS.map((version, index) => (
            <span
              key={version}
              className={`grid size-6 place-items-center rounded-md text-caption font-bold ${
                index === VERSIONS.length - 1 ? style.solid : "bg-blue-8/50 text-blue-5"
              }`}
            >
              {version}
            </span>
          ))}
        </div>
      </div>
      <PreviewKeyValueList rows={TERMS} />
      <div className={`mt-2 rounded-xl p-2.5 text-caption ${style.soft} ${style.text}`}>
        تغییر نسخه ۳: مهلت از ۵ روز به ۴ روز
      </div>
      <div className="mt-3 flex items-center gap-2 text-caption">
        <StatusPill tone="success" icon={<Check className="size-3" />}>
          کارفرما
        </StatusPill>
        <StatusPill tone="warning" icon={<Clock className="size-3" />}>
          منتظر تأیید کارجو
        </StatusPill>
      </div>
    </PreviewCard>
  );
}
