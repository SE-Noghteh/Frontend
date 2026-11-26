import type { JobSeekerMeResponse } from "@/types/Auth/jobSeeker_registrationReview";

interface Props {
  data: JobSeekerMeResponse["data"];
}

export function RegistrationReviewCorrectionList({ data }: Props) {
  const errors = data.admin_review_message
    ? data.admin_review_message.split("\n").filter(Boolean)
    : ["لطفاً اطلاعات وارد شده را بررسی و اصلاح کنید."];

  const attemptsLeft = data.correction_attempts_left ?? 5;

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="bg-surface-info border border-border-decorative rounded-lg p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-label font-bold text-action-primary">فرصت‌های اصلاح پرونده</span>
          <span className="text-label text-status-warning font-bold">{attemptsLeft} فرصت باقی‌مانده</span>
        </div>
        <p className="text-caption text-text-secondary leading-relaxed">
          از {attemptsLeft + 1} نوبت تعیین اعتبار، اگر بعد از {attemptsLeft} نوبت دیگر پرونده را اصلاح نکنید، اشتراک شما لغو می‌شود.
        </p>
      </div>

      <div className="border border-border-decorative rounded-lg bg-surface-card overflow-hidden">
        <div className="bg-surface-error/20 px-4 py-3 border-b border-border-decorative">
          <span className="text-label font-bold text-status-error">موارد نیازمند اصلاح</span>
        </div>
        <ul className="flex flex-col p-4 gap-4">
          {errors.map((error, index) => (
            <li key={index} className="flex items-start gap-3 text-right">
              <div className="mt-0.5 shrink-0">
                <svg className="w-5 h-5 text-status-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-label font-bold text-text-primary mb-1">مورد نیازمند اصلاح</span>
                <span className="text-caption text-text-secondary leading-relaxed">{error}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}