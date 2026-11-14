import { Headset } from "lucide-react";
import { Link } from "react-router-dom";

/** "Didn't find your answer?" banner linking to the support page. */
export function SupportCallout() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border-decorative bg-surface-card p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-action-primary text-white">
          <Headset className="size-5" />
        </span>
        <div>
          <div className="text-body font-bold text-text-primary">جواب سؤالت رو پیدا نکردی؟</div>
          <div className="text-label text-charcoal-2">مستقیم به پشتیبانی پیام بده.</div>
        </div>
      </div>
      {/* TODO: replace with the shared Button component. */}
      <Link
        to="/support"
        className="rounded-xl bg-action-primary px-6 py-3 text-label font-bold text-white transition-colors hover:bg-action-hover"
      >
        ارتباط با پشتیبانی
      </Link>
    </div>
  );
}
