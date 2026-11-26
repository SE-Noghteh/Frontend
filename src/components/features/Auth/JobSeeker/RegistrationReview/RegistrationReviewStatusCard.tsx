import type { JobSeekerMeResponse, ParentApprovalRequestResponse } from "@/types/Auth/jobSeeker_registrationReview";

interface Props {
  data: JobSeekerMeResponse["data"];
  parentApprovalData?: ParentApprovalRequestResponse;
}

export function RegistrationReviewStatusCard({ data, parentApprovalData }: Props) {
  const isPending = data.admin_approval_status === "pending";
  const isApproved = data.admin_approval_status === "approved";
  const isNeedsCorrection = data.admin_approval_status === "needs_correction";
  const isUnder18 = data.parent_approval_required;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("fa-IR").format(new Date(dateStr));
  };

  const maskPhone = (phoneStr?: string) => {
    if (!phoneStr || phoneStr.length !== 11) return "والد";
    return `${phoneStr.slice(7)} *** ${phoneStr.slice(0,4)}`;
  };

  const getDaysUntilExpiry = (expiresAt?: string | null) => {
    if (!expiresAt) return "۷";
    const diff = new Date(expiresAt).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days.toString() : "۰";
  };

  return (
    <div className="flex flex-col gap-6 w-full text-right">
      <div className="flex flex-col gap-4">
        <div className="flex justify-start">
          {isPending && (
            <span className="flex items-center gap-1.5 text-caption font-medium text-status-warning bg-surface-warning px-3 py-1 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              در انتظار بررسی
            </span>
          )}
          {isApproved && (
            <span className="flex items-center gap-1.5 text-caption font-medium text-status-success bg-surface-success px-3 py-1 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              تایید شده
            </span>
          )}
          {isNeedsCorrection && (
            <span className="flex items-center gap-1.5 text-caption font-medium text-status-error bg-surface-error px-3 py-1 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              نیازمند اصلاح
            </span>
          )}
        </div>

        <h2 className="text-page-title font-bold text-text-primary leading-tight">
          {isPending && "پرونده‌ات در صف بررسی ادمین است"}
          {isApproved && "خوش آمدی؛ می‌توانی وارد حسابت شوی"}
          {isNeedsCorrection && "موردی از اطلاعات نیاز به اصلاح دارد"}
        </h2>

        <p className="text-label text-text-secondary">
          {isPending && "تا اعلام نتیجه لازم نیست کاری انجام بدهی، هر وقت خواستی به حساب کاربری‌ات برگرد."}
          {isApproved && "اطلاعات و مدارک هویتی تو با موفقیت بررسی و تایید شد."}
          {isNeedsCorrection && "لطفاً موارد مشخص شده را اصلاح کنید و مجدداً ارسال نمایید."}
        </p>
      </div>

      <div className="border border-border-decorative rounded-lg p-5 bg-surface-card mt-2">
        <div className="flex justify-between items-center py-2 border-b border-border-decorative/50">
          <span className="text-label text-text-secondary">تاریخ ثبت</span>
          <span className="text-label text-text-primary font-medium">{formatDate(data.created_at)}</span>
        </div>
        {isApproved && (
          <div className="flex justify-between items-center py-2">
            <span className="text-label text-text-secondary">تاریخ تایید</span>
            <span className="text-label text-text-primary font-medium">{formatDate(data.admin_reviewed_at)}</span>
          </div>
        )}
        {isPending && (
          <div className="flex justify-between items-center py-2">
            <span className="text-label text-text-secondary">نوبت بررسی در صف</span>
            <span className="text-label text-text-primary font-medium">اول از ۵</span>
          </div>
        )}
      </div>

      {(isPending || isApproved) && (
        <div className="border border-border-decorative rounded-lg p-6 bg-surface-card flex flex-col gap-6 mt-2">
          
          <div className="flex gap-4 relative">
            <div className="absolute right-[11px] top-6 bottom-[-24px] w-0.5 bg-status-success z-0"></div>
            <div className="w-6 h-6 rounded-full bg-status-success flex items-center justify-center shrink-0 z-10">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-label font-bold text-text-primary">ثبت شد</span>
              <span className="text-caption text-text-secondary mt-1">اطلاعات پایه و مدارک هویتی دریافت شد.</span>
            </div>
          </div>

          <div className="flex gap-4 relative">
            {isApproved && <div className="absolute right-[11px] top-6 bottom-[-24px] w-0.5 bg-status-success z-0"></div>}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${isApproved ? 'bg-status-success' : 'bg-surface-warning border-2 border-status-warning'}`}>
              {isApproved ? (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <div className="w-2 h-2 rounded-full bg-status-warning"></div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-label font-bold text-text-primary">بررسی اطلاعات و مدارک</span>
              <span className="text-caption text-text-secondary mt-1">
                {isApproved ? "بررسی کامل شد و تایید شد." : "در صف بررسی ادمین"}
              </span>
            </div>
          </div>

          <div className="flex gap-4 relative">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${isApproved ? 'bg-status-success' : 'bg-surface-disabled border-2 border-border-disabled'}`}>
               {isApproved && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <div className="flex flex-col">
              <span className={`text-label font-bold ${isApproved ? 'text-text-primary' : 'text-text-secondary'}`}>اعلام نتیجه</span>
              <span className="text-caption text-text-secondary mt-1">
                {isApproved ? "پرونده تایید شد." : "پس از تصمیم ادمین اینجا نمایش داده می‌شود."}
              </span>
            </div>
          </div>

          {isUnder18 && (
            <div className="flex gap-4 relative">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${data.parent_connected ? 'bg-status-success' : 'bg-surface-warning border-2 border-status-warning'}`}>
                {data.parent_connected ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-status-warning"></div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <span className="text-label font-bold text-text-primary">تأیید والد</span>
                
                {!data.parent_connected && parentApprovalData?.invitation_code ? (
                  <div className="mt-3 p-3 bg-surface-info rounded-md border border-border-decorative w-full max-w-sm">
                    <span className="text-caption text-text-secondary block mb-1">
                      کد دعوت‌نامه برای {maskPhone(parentApprovalData.phone)}:
                    </span>
                    <span className="text-lg font-bold tracking-widest text-action-primary block">
                      {parentApprovalData.invitation_code}
                    </span>
                    <span className="text-caption text-text-secondary block mt-2">
                      این کد را به والد خود بدهید. اعتبار: {getDaysUntilExpiry(parentApprovalData.expires_at)} روز
                    </span>
                  </div>
                ) : data.parent_connected ? (
                  <span className="text-caption text-status-success mt-1 block">
                    والد با موفقیت متصل شد.
                  </span>
                ) : (
                  <span className="text-caption text-text-disabled mt-1 block">
                    در حال دریافت اطلاعات والد...
                  </span>
                )}
                
              </div>
            </div>
          )}

          {isPending && (
            <p className="text-caption text-text-secondary text-center mt-4 pt-4 border-t border-border-decorative/50">
              بررسی معمولاً ۲۴ تا ۴۸ ساعت کاری طول می‌کشد. در این مدت امکان ورود به حساب کارجویی نیست.
            </p>
          )}

        </div>
      )}
    </div>
  );
}