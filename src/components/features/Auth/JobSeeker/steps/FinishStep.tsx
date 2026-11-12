import { Button } from "@/components/ui/Button";

interface FinishStepProps {
  onPrev: () => void;
  onDashboard: () => void;
  parentPhone?: string;
}

export function FinishStep({ onPrev, onDashboard, parentPhone }: FinishStepProps) {
    const maskPhone = (phoneStr: string) => {
        if (phoneStr.length !== 11) return phoneStr;
        return `${phoneStr.slice(0, 4)} *** ${phoneStr.slice(7)}`;
      };
    
  return (
    <div className="flex flex-col gap-6">
      <div className="text-right mb-2">
        <p className="text-caption text-text-secondary mb-1">پایان ثبت‌نام</p>
        <h2 className="text-card-title font-bold" style={{ color: "var(--color-text-primary)" }}>
          حساب ساخته شد؛ هویتت در حال بررسی است
        </h2>
        <p className="text-label text-text-secondary mt-2">
          معمولاً تا ۲۴ ساعت کاری طول می‌کشد؛ نتیجه را با پیامک و اعلان خبر می‌دهیم.
        </p>
      </div>

      <div className="w-full p-4 rounded-md flex items-start gap-3 border-r-4 text-right bg-surface-info border-interface-secondary text-action-primary">
        <div className="mt-0.5 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-label font-bold">تا پایان بررسی می‌توانی پروفایلت را کامل کنی و آگهی‌ها را ببینی.</span>
          <span className="text-caption leading-relaxed">
            ارسال درخواست همکاری بعد از تأیید هویت فعال می‌شود.
          </span>
        </div>
      </div>

      <div className="w-full border border-border-decorative rounded-lg p-6 bg-surface-card mt-2">
        <h3 className="text-label font-bold text-text-primary mb-4 text-right">وضعیت ثبت‌نام</h3>
        
        <ul className="flex flex-col gap-3 text-label text-text-secondary text-right">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            حساب ساخته شد
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            شماره همراه تایید شد
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-status-info" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            ویدیو و شناسنامه در صف بررسی
            <span className="text-caption text-text-disabled mr-2">بررسی دستی توسط تیم زدلنسر</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-status-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            تأیید والد
            <span className="text-caption text-text-disabled mr-2 block">
              {parentPhone ? `دعوت‌نامه به ${maskPhone(parentPhone)} فرستاده شد` : "در انتظار تکمیل در پروفایل"}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex gap-3 mt-4">
        <Button variant="secondary" onClick={onPrev} className="flex-1">
          ویرایش اطلاعات
        </Button>
        <Button variant="primary" onClick={onDashboard} className="flex-1">
          رفتن به داشبورد
        </Button>
      </div>
    </div>
  );
}