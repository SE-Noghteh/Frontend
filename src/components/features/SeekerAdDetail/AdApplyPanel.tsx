import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

import { Button, ButtonLink } from "@/components/ui/Button";
import type { AdApplicationState } from "@/types/Seeker/seeker";
import { cn } from "@/utils/cn";

type NoteTone = "warning" | "success" | "error";

const NOTE_TONES: Record<NoteTone, string> = {
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  error: "bg-error-soft text-error",
};

function Note({ tone, icon, children }: { tone: NoteTone; icon: ReactNode; children: ReactNode }) {
  return (
    <p className={cn("flex items-center gap-2 rounded-xl px-3 py-3 text-caption font-medium", NOTE_TONES[tone])}>
      <span className="shrink-0">{icon}</span>
      {children}
    </p>
  );
}

interface AdApplyPanelProps {
  state: AdApplicationState;
  isSaved: boolean;
  requestId?: string;
  onApply: () => void;
  onToggleSave: () => void;
  /** Hide saving when this panel is used for public-search opportunities. */
  showSaveButton?: boolean;
}

/** Right-hand card of the ad page: the primary action and the status note that explains it. */
export function AdApplyPanel({
  state,
  isSaved,
  requestId,
  onApply,
  onToggleSave,
  showSaveButton = true,
}: AdApplyPanelProps) {
  const viewRequest = (
    <ButtonLink to={requestId ? `/seeker/requests/${requestId}` : "/seeker/requests"} variant="secondary" fullWidth>
      مشاهده درخواست
    </ButtonLink>
  );

  return (
    <section
      aria-label="اقدام روی آگهی"
      className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:p-5"
    >
      {state === "open" ? (
        <>
          <Button fullWidth onClick={onApply}>
            ارسال درخواست
          </Button>
          <Note tone="warning" icon={<Check size={16} aria-hidden="true" />}>
            درخواستت مستقیماً برای کارفرما ارسال می‌شود
          </Note>
          {showSaveButton ? (
            <Button variant="text" size="sm" onClick={onToggleSave}>
              {isSaved ? "حذف از ذخیره‌شده‌ها" : "ذخیره آگهی"}
            </Button>
          ) : null}
        </>
      ) : null}

      {state === "sentToEmployer" ? (
        <>
          <Note tone="success" icon={<Check size={16} aria-hidden="true" />}>
            درخواستت برای کارفرما ارسال شد
          </Note>
          {viewRequest}
        </>
      ) : null}

      {state === "expired" ? (
        <>
          <Note tone="error" icon={<X size={16} aria-hidden="true" />}>
            مهلت درخواست به پایان رسیده است
          </Note>
          <Button fullWidth disabled>
            ارسال درخواست
          </Button>
        </>
      ) : null}
    </section>
  );
}
