import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export function EmployerSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full text-right font-vazirmatn pb-12 mt-2" dir="rtl">
      
      {/* استپر مراحل */}
      <div className="flex items-center justify-between w-full border-b border-border-decorative pb-3 mb-2 text-[13px] font-medium text-text-secondary">
        <div>نوع کارفرما</div>
        <div>اطلاعات هویتی</div>
        <div>مدارک</div>
        <div>حساب کاربری</div>
        <div className="text-text-primary border-b-2 border-action-primary pb-3 -mb-3.5">پایان</div>
      </div>

      <div className="text-right -mb-4 -mt-2">
        <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#000000" }}>
          پرونده شما ثبت شد
        </h1>
      </div>

      {/* برچسب در حال بررسی */}
      <div className="flex justify-start -mt-4 -mb-4">
        <span className="inline-flex items-center gap-1.5 bg-[#eef3f8] text-[#315f86] text-[13px] font-medium px-4 py-1.5 rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          در حال بررسی
        </span>
      </div>

      <div className="text-right mb-0">
        {/* متن مسیر بررسی پرونده - مشکی و وزیرمتن */}
        <h2 className="text-label font-bold" style={{ color: "#000000", fontFamily: "Vazirmatn, sans-serif" }}>مسیر بررسی پرونده</h2>
      </div>

      {/* کارت وضعیت */}
      <div className="border border-border-decorative rounded-xl p-6 bg-white flex flex-col gap-6 w-full">
        
        {/* مرحله ۱: ثبت شد */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#1d3557] flex-shrink-0"></div>
          <div className="flex flex-col items-start text-right">
            <span className="text-label font-bold text-text-primary">ثبت شد</span>
            <span className="text-caption text-text-secondary">✓ کامل · مدارک نمونه دریافت شدند</span>
          </div>
        </div>

        {/* مرحله ۲: بررسی اطلاعات و مدارک */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#b5c98a] flex-shrink-0"></div>
          <div className="flex flex-col items-start text-right">
            <span className="text-label font-bold text-text-primary">بررسی اطلاعات و مدارک</span>
            <span className="text-caption text-text-secondary">در صف بررسی شبیه‌سازی‌شده</span>
          </div>
        </div>

        {/* مرحله ۳: اعلام نتیجه */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#1d3557] flex-shrink-0"></div>
          <div className="flex flex-col items-start text-right">
            <span className="text-label font-bold text-text-primary">اعلام نتیجه</span>
            <span className="text-caption text-text-secondary">پس از تصمیم بازبین مجاز</span>
          </div>
        </div>
      </div>

      <p className="text-caption text-text-secondary text-center mt-2">
        ۲۴ تا ۴۸ ساعت کاری · زمان نمونه در نسخه آزمایشی؛ نه تعهد زمان پاسخ
      </p>

      <div className="flex flex-col gap-3 mt-4">
        <Button 
          type="button" 
          onClick={() => navigate("/")}
          className="w-full bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold transition-colors"
        >
          رفتن به مرکز پیگیری
        </Button>
        <Button 
          type="button" 
          onClick={() => alert("صفحه پشتیبانی به زودی...")}
          className="w-full border border-action-primary !text-action-primary bg-transparent hover:bg-surface-hover py-2.5 rounded-lg font-bold transition-colors"
        >
          تماس با پشتیبانی
        </Button>
      </div>

    </div>
  );
}