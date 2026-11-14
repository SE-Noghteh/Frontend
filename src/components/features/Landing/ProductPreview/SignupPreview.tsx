import { Check, ShieldCheck } from "lucide-react";

import { ROLE_STYLES } from "@/constants/roles";

import { PreviewCard } from "./PreviewCard";

const FIELDS = ["نام و نام‌خانوادگی", "تاریخ تولد · ۱۴ مهر ۱۳۸۹"];

export function SignupPreview() {
  return (
    <PreviewCard className="p-5">
      <div className="mb-4 text-label font-bold text-text-primary">ثبت‌نام نوجوان</div>
      <div className="space-y-2.5">
        {FIELDS.map((field) => (
          <div
            key={field}
            className="rounded-xl border border-border-decorative px-3 py-2.5 text-caption text-charcoal-2"
          >
            {field}
          </div>
        ))}
      </div>
      <div className={`mt-4 flex items-start gap-3 rounded-xl p-3 ${ROLE_STYLES.parent.soft}`}>
        <ShieldCheck className="size-5 shrink-0 text-green-2" />
        <div className="text-caption leading-6 text-green-2">
          سن زیر ۱۸ سال است؛ شماره والد را وارد کنید تا حساب والد ساخته شود.
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-border-decorative px-3 py-2.5 text-caption text-text-primary">
        ۰۹۱۲ ••• ۴۴۲۱ <Check className="size-4 text-status-success" />
      </div>
    </PreviewCard>
  );
}
