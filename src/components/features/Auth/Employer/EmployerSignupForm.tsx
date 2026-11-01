import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmployerIdentityForm } from "./EmployerIdentityForm";

export function EmployerSignupForm() {
  const [accountType, setAccountType] = useState<"real" | "legal">("real");
  const [legalType, setLegalType] = useState("");
  const [hasLicense, setHasLicense] = useState(false);
  const [acceptRules, setAcceptRules] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptRules) {
      alert("برای ادامه باید قوانین را بپذیرید.");
      return;
    }
    setStep(2);
  };

  if (step === 2) {
    return <EmployerIdentityForm onBack={() => setStep(1)} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full text-right font-vazirmatn pb-12 mt-2"
      dir="rtl"
    >
      {/* استپر مراحل */}
      <div className="flex items-center justify-between w-full border-b border-border-decorative pb-3 mb-2 text-[13px] font-medium text-text-secondary">
        <div className="text-text-primary border-b-2 border-action-primary pb-3 -mb-3.5">نوع کارفرما</div>
        <div>اطلاعات هویتی</div>
        <div>مدارک</div>
        <div>حساب کاربری</div>
        <div>پایان</div>
      </div>

      <div className="text-right mb-1 mt-2">
        <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#262321" }}>
          به‌عنوان کارفرما شروع کنید
        </h1>
        <p className="text-label text-text-secondary leading-relaxed mt-2">
          نوع حساب را انتخاب کنید تا فقط اطلاعات و مدارک مرتبط را از شما بخواهیم.
        </p>
      </div>

      {/* کارت انتخاب شخص حقیقی */}
      <div
        onClick={() => {
          setAccountType("real");
          setLegalType("");
        }}
        className={`relative p-4 rounded-xl border-[1.5px] cursor-pointer transition-all flex items-start gap-4 ${
          accountType === "real"
            ? "border-action-primary bg-[#f8fbf3]"
            : "border-border-decorative bg-white hover:border-gray-300"
        }`}
      >
        <div className="mt-1 flex-shrink-0">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${accountType === "real" ? "border-action-primary" : "border-gray-400"}`}>
            {accountType === "real" && <div className="w-2.5 h-2.5 rounded-full bg-action-primary" />}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-body font-bold text-text-primary">شخص حقیقی</span>
              <svg className="w-5 h-5 text-action-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            {accountType === "real" && (
              <span className="text-caption text-action-primary font-medium">انتخاب‌شده</span>
            )}
          </div>
          <p className="text-caption text-text-secondary mt-2 leading-relaxed">
            برای کارفرمای مستقل، صاحب کسب‌وکار خانگی یا سفارش‌دهنده شخصی.<br />اطلاعات شخصی و مدارک هویتی آزمایشی
          </p>
        </div>
      </div>

      {/* کارت انتخاب شخص حقوقی */}
      <div
        onClick={() => setAccountType("legal")}
        className={`relative p-4 rounded-xl border-[1.5px] cursor-pointer transition-all flex items-start gap-4 ${
          accountType === "legal"
            ? "border-action-primary bg-[#f8fbf3]"
            : "border-border-decorative bg-white hover:border-gray-300"
        }`}
      >
        <div className="mt-1 flex-shrink-0">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${accountType === "legal" ? "border-action-primary" : "border-gray-400"}`}>
            {accountType === "legal" && <div className="w-2.5 h-2.5 rounded-full bg-action-primary" />}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-body font-bold text-text-primary">شخص حقوقی</span>
              <svg className="w-5 h-5 text-action-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            {accountType === "legal" && (
              <span className="text-caption text-action-primary font-medium">انتخاب‌شده</span>
            )}
          </div>
          <p className="text-caption text-text-secondary mt-2 leading-relaxed">
            برای شرکت، مؤسسه، آموزشگاه یا سازمان ثبت‌شده.<br />اطلاعات سازمان و نماینده مجاز، مدارک ثبتی آزمایشی
          </p>
        </div>
      </div>

      {/* فیلد انتخاب نوع شخص حقوقی */}
      {accountType === "legal" && (
        <div className="flex flex-col gap-1.5 w-full mt-2">
          <label className="text-label text-text-primary font-medium">
            نوع شخص حقوقی <span className="text-status-error">*</span>
          </label>
          <select
            value={legalType}
            onChange={(e) => setLegalType(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors border-border-decorative bg-surface-card appearance-none cursor-pointer"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "left 12px center" }}
          >
            <option value="" disabled>انتخاب کنید</option>
            <option value="limited">مسئولیت محدود</option>
            <option value="stock">سهامی خاص</option>
            <option value="cooperative">تعاونی</option>
            <option value="government">دولتی</option>
            <option value="other">سایر</option>
          </select>
        </div>
      )}

      {/* چک‌باکس‌ها */}
      <div className="flex flex-col gap-4 mt-2 w-full">
        {/* چک‌باکس جواز - تیک سمت راست */}
        <label className="flex items-center justify-start gap-3 cursor-pointer group w-full">
          <input
            type="checkbox"
            checked={hasLicense}
            onChange={(e) => setHasLicense(e.target.checked)}
            className="w-5 h-5 appearance-none rounded border-2 border-action-primary bg-white checked:bg-white checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231d3557%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat checked:bg-[length:14px_14px] focus:outline-none focus:ring-2 focus:ring-action-primary/50 cursor-pointer transition-all flex-shrink-0"
          />
          <span className="text-label text-text-primary text-right">کسب‌وکار دارای جواز دارم</span>
        </label>

        {/* چک‌باکس قوانین - تیک سمت راست */}
        <label className="flex items-start justify-start gap-3 cursor-pointer group w-full">
          <input
            type="checkbox"
            checked={acceptRules}
            onChange={(e) => setAcceptRules(e.target.checked)}
            className="w-5 h-5 mt-1 appearance-none rounded border-2 border-action-primary bg-white checked:bg-white checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231d3557%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat checked:bg-[length:14px_14px] focus:outline-none focus:ring-2 focus:ring-action-primary/50 cursor-pointer transition-all flex-shrink-0"
          />
          <div className="flex flex-col w-full">
            <span className="text-label text-text-primary leading-relaxed text-right">
              قوانین زدلنسر، اصول و تعهدات ایمنی همکاری با نوجوانان را خوانده‌ام و می‌پذیرم. <span className="text-status-error">*</span>
            </span>
            <div className="flex gap-4 mt-2 justify-start">
              <a href="#" className="text-label text-action-primary hover:underline">قوانین، اصول و تعهدات</a>
              <a href="#" className="text-label text-text-secondary hover:underline">حریم خصوصی</a>
            </div>
          </div>
        </label>
      </div>

      <Button
        type="submit"
        fullWidth
        disabled={!acceptRules || (accountType === "legal" && !legalType)}
        className="mt-4 w-full bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50"
      >
        ادامه؛ اطلاعات هویتی
      </Button>
    </form>
  );
}