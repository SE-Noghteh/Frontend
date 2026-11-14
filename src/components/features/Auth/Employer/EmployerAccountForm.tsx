import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { EmployerSuccessPage } from "./EmployerSuccessPage"; // ← اضافه شد

export function EmployerAccountForm({ onBack }: { onBack: () => void }) {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false); // ← استیت جدید

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = () => {
    setErrors((prev) => ({ ...prev, mobile: "" }));

    if (!/^09\d{9}$/.test(mobile)) {
      if (!mobile.startsWith("09")) {
        setErrors((prev) => ({ ...prev, mobile: "شماره موبایل باید با ۰۹ شروع شود" }));
      } else {
        setErrors((prev) => ({ ...prev, mobile: "شماره موبایل باید ۱۱ رقم باشد" }));
      }
      return;
    }

    setIsOtpModalOpen(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    console.log("OTP:", otp.join(""));
    setIsMobileVerified(true);
    setIsOtpModalOpen(false);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    
    if (errors.confirmPassword) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }

    if (value && password !== value) {
      setErrors((prev) => ({ ...prev, confirmPassword: "تکرار رمز عبور با رمز اصلی مطابقت ندارد" }));
    }
  };

  const passwordChecks = {
    length: password.length >= 12,
    upperLower: (/[a-z]/.test(password) && /[A-Z]/.test(password)) || (/[آ-ی]/.test(password) && /[ا-ی]/.test(password)),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!isMobileVerified) {
      newErrors.mobile = "لطفاً شماره همراه را تایید کنید";
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }
    
    if (!passwordChecks.length) newErrors.password = "رمز عبور باید حداقل ۱۲ نویسه باشد";
    else if (!passwordChecks.upperLower) newErrors.password = "رمز باید شامل حرف بزرگ و کوچک باشد";
    else if (!passwordChecks.number) newErrors.password = "رمز باید شامل عدد باشد";
    else if (!passwordChecks.special) newErrors.password = "رمز باید شامل یک نشانه باشد";
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور با رمز اصلی مطابقت ندارد";
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    console.log({ mobile, email, password });
    setIsSubmitted(true); // ← رفتن به صفحه موفقیت
  };

  // شرط نمایش صفحه موفقیت
  if (isSubmitted) {
    return <EmployerSuccessPage />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full text-right font-vazirmatn pb-12 mt-2"
        dir="rtl"
      >
        {/* استپر مراحل */}
        <div className="flex items-center justify-between w-full border-b border-border-decorative pb-3 mb-2 text-[13px] font-medium text-text-secondary">
          <div>نوع کارفرما</div>
          <div>اطلاعات هویتی</div>
          <div>مدارک</div>
          <div className="text-text-primary border-b-2 border-action-primary pb-3 -mb-3.5">حساب کاربری</div>
          <div>پایان</div>
        </div>

        <div className="text-right -mb-4 -mt-4">
          <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#000000" }}>
            کلید ورودتان را بسازید
          </h1>
        </div>

        {/* شماره همراه */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">
            شماره همراه
          </label>
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 relative">
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
                }}
                disabled={isMobileVerified}
                className={`w-full h-[42px] rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none focus:ring-1 transition-colors bg-surface-card ${
                  isMobileVerified 
                    ? "border-green-500 text-green-600" 
                    : errors.mobile 
                    ? "border-status-error focus:ring-status-error/50" 
                    : "border-[#457b9d] focus:ring-action-primary/50"
                }`}
                dir="rtl"
              />
              {isMobileVerified && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
            {!isMobileVerified && (
              <Button 
                type="button" 
                onClick={handleSendCode}
                className="h-[42px] bg-action-primary hover:bg-action-hover text-white px-6 rounded-md text-sm font-bold transition-colors"
              >
                ارسال کد
              </Button>
            )}
          </div>
          {isMobileVerified ? (
            <p className="text-caption text-green-600">شماره‌ی همراه تایید شد.</p>
          ) : errors.mobile ? (
            <p className="text-caption text-status-error">{errors.mobile}</p>
          ) : (
            <p className="text-caption text-text-secondary">شماره با ۰۹ شروع شود و ۱۱ رقم باشد.</p>
          )}
        </div>

        {/* ایمیل */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">
            ایمیل <span className="text-caption text-text-secondary">(اختیاری)</span>
          </label>
          <Input 
            label="" 
            type="email" 
            dir="ltr" 
            placeholder="employer@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={errors.email}
          />
        </div>

        {/* رمز عبور */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">رمز عبور</label>
          <PasswordInput
            label=""
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          
          <div className="flex flex-col gap-1.5 mt-2 w-full">
            {[
              { key: "length", text: "حداقل ۱۲ نویسه" },
              { key: "upperLower", text: "حرف بزرگ و کوچک لاتین" },
              { key: "number", text: "حداقل یک عدد" },
              { key: "special", text: "حداقل یک نشانه" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-start gap-2 text-caption w-full">
                <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${passwordChecks[item.key as keyof typeof passwordChecks] ? "bg-green-500 border-green-500" : "border-gray-400"} flex items-center justify-center`}>
                  {passwordChecks[item.key as keyof typeof passwordChecks] && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className={passwordChecks[item.key as keyof typeof passwordChecks] ? "text-green-600" : "text-text-secondary"}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* تکرار رمز عبور */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">تکرار رمز عبور</label>
          <PasswordInput
            label=""
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            error={errors.confirmPassword}
          />
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-center gap-3 mt-6">
          <Button 
            type="button" 
            onClick={onBack} 
            className="w-24 border border-action-primary !text-action-primary bg-transparent hover:bg-surface-hover py-2.5 rounded-lg font-bold transition-colors"
          >
            قبلی
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold transition-colors"
          >
            ثبت و ارسال برای بررسی
          </Button>
        </div>
      </form>

      {/* مودال تایید کد */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" dir="rtl">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsOtpModalOpen(false)} className="absolute top-5 left-5 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">
              ✕
            </button>
            <h2 className="text-card-title font-bold text-text-primary mb-2 mt-2">تایید شماره‌ی همراه</h2>
            <p className="text-label text-text-secondary mb-6">
              کد شش‌رقمی به شماره‌ی <span dir="ltr" className="inline-block font-bold">{mobile}</span> پیامک شد.
            </p>
            <button onClick={() => setIsOtpModalOpen(false)} className="text-label font-bold text-action-primary hover:underline mb-6 block">ویرایش شماره</button>
            
            <div className="mb-2 text-right">
              <label className="text-label font-medium text-text-primary">کد تایید شش‌رقمی <span className="text-status-error">*</span></label>
            </div>
            <div className="flex justify-between gap-2 mb-4" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { otpRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold border border-border-decorative rounded-lg focus:outline-none focus:ring-2 focus:ring-action-primary bg-surface-card text-text-primary"
                />
              ))}
            </div>
            <p className="text-caption text-text-secondary mb-6">می‌توانی تا ۰۱:۴۲ دیگر کد جدید بگیری.</p>
            <Button type="button" onClick={handleVerifyOtp} className="w-full bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold">
              تایید و ادامه
            </Button>
          </div>
        </div>
      )}
    </>
  );
}