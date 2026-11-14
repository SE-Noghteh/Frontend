import { Lock, Wallet } from "lucide-react";

import { StatusPill } from "@/components/ui/StatusPill";
import { ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

import { PreviewCard } from "./PreviewCard";
import { PreviewIconTile } from "./PreviewIconTile";

const TRANSACTIONS = [
  ["آزادسازی · طراحی پست‌ها", "+۱٬۲۰۰٬۰۰۰", "text-status-success"],
  ["سپرده · تدوین ریلز", "−۲٬۲۰۰٬۰۰۰", "text-text-primary"],
] as const;

interface WalletPreviewProps {
  role?: UserRole;
}

export function WalletPreview({ role = "seeker" }: WalletPreviewProps) {
  const style = ROLE_STYLES[role];

  return (
    <PreviewCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-caption font-bold text-text-primary">
          <PreviewIconTile role={role}>
            <Wallet />
          </PreviewIconTile>
          کیف پول
        </div>
        <StatusPill tone="success" icon={<Lock className="size-3" />}>
          امن
        </StatusPill>
      </div>
      <div className="mt-3 text-caption text-charcoal-2">موجودی کل</div>
      <div className="text-section-title font-black text-text-primary">
        ۴٬۸۰۰٬۰۰۰ <span className="text-caption font-medium text-charcoal-2">تومان</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-caption">
        <div className={`rounded-xl p-2.5 ${style.soft}`}>
          <div className="text-text-secondary">در امانت پروژه‌ها</div>
          <div className="mt-0.5 font-bold text-text-primary">۱٬۲۰۰٬۰۰۰</div>
        </div>
        <div className="rounded-xl bg-blue-8/40 p-2.5">
          <div className="text-text-secondary">قابل برداشت</div>
          <div className="mt-0.5 font-bold text-text-primary">۳٬۶۰۰٬۰۰۰</div>
        </div>
      </div>
      <div className="mt-3 divide-y divide-border-decorative text-caption">
        {TRANSACTIONS.map(([label, amount, amountClass]) => (
          <div key={label} className="flex items-center justify-between py-2">
            <span className="text-text-secondary">{label}</span>
            <span className={`font-bold ${amountClass}`}>{amount}</span>
          </div>
        ))}
      </div>
    </PreviewCard>
  );
}
