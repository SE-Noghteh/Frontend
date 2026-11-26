import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { ROLE_ORDER, ROLE_STYLES } from "@/constants/roles";

const FIELD_CLASS =
  "w-full rounded-xl border border-border-decorative bg-surface-card px-4 py-3 text-label text-text-primary outline-none transition-colors placeholder:text-charcoal-3 focus:border-action-primary";

/** Support contact form. */
export function SupportForm() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send the message to the backend (support service) before showing success.
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border-decorative bg-surface-card p-6">
        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-status-success" />
        <div>
          <div className="text-body font-bold text-text-primary">پیامت ثبت شد</div>
          <p className="mt-1 text-label leading-7 text-text-secondary">
            به‌زودی از طریق شماره یا ایمیلی که وارد کردی پاسخ می‌دیم.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 rounded-2xl border border-border-decorative bg-surface-card p-6"
    >
      <label className="block">
        <span className="mb-1.5 block text-label font-bold text-text-primary">نام</span>
        <input required className={FIELD_CLASS} placeholder="نام و نام‌خانوادگی" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-label font-bold text-text-primary">
          شماره موبایل یا ایمیل
        </span>
        <input required className={FIELD_CLASS} placeholder="۰۹۱۲…" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-label font-bold text-text-primary">نقش تو</span>
        <select className={FIELD_CLASS} defaultValue="seeker">
          {ROLE_ORDER.map((role) => (
            <option key={role} value={role}>
              {ROLE_STYLES[role].name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-label font-bold text-text-primary">پیام</span>
        <textarea required rows={5} className={FIELD_CLASS} placeholder="چه کمکی از ما برمیاد؟" />
      </label>
      {/* TODO: replace with the shared Button component. */}
      <button
        type="submit"
        className="h-12 w-full rounded-xl bg-action-primary text-label font-bold text-white transition-colors hover:bg-action-hover"
      >
        ارسال پیام
      </button>
    </form>
  );
}
