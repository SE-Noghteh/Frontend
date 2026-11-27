import type { JobSeekerMeResponse } from "@/types/Auth/jobSeeker_registrationReview";
import { parseAdminReviewMessage } from "@/utils/adminReviewMapper";

interface Props {
  data: JobSeekerMeResponse["data"];
}

export function RegistrationReviewCorrectionList({ data }: Props) {
  const errors = parseAdminReviewMessage(data.admin_review_message || "");

  const attemptsLeft = data.correction_attempts_left ?? 5;

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="bg-[#f0f5fa] border border-[#d0e0ee] rounded-lg p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-[#1d3557]">فرصت‌های اصلاح پرونده</span>
          <span className="text-sm font-bold text-[#1d3557]">{attemptsLeft} فرصت باقی‌مانده</span>
        </div>
        
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => {
            const isFilled = i < (5 - attemptsLeft);
            
            return (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full ${
                  isFilled ? "bg-[#1d3557]" : "bg-[#e8e0da]"
                }`}
              ></div>
            );
          })}
        </div>
        
        <p className="text-xs text-text-secondary leading-relaxed text-right mt-1">
          از {5} نوبت تعیین اعتبار، اگر بعد از {attemptsLeft} نوبت دیگر پرونده را اصلاح نکنید، ثبت‌نام شما لغو می‌شود.
        </p>
      </div>

      <div className="border border-[#e8e0da] rounded-lg bg-white overflow-hidden">
        <div className="bg-[#fdf6f5] px-5 py-4 border-b border-[#e8e0da]">
          <span className="text-sm font-bold text-[#a3312d]">موارد نیازمند اصلاح</span>
        </div>
        <ul className="flex flex-col p-0">
          {errors.map((error, index) => (
            <li key={index} className="flex items-start justify-between gap-4 p-5 border-b border-[#e8e0da] last:border-b-0">
              <div className="flex flex-col gap-1 text-right w-full">
                <span className="text-sm font-bold text-text-primary">مورد نیازمند اصلاح</span>
                <span className="text-xs text-text-secondary leading-relaxed">{error}</span>
              </div>
              <div className="shrink-0 mt-0.5">
                <div className="bg-[#fdf6f5] text-[#a3312d] rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}