import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { EmployerSuccessPage } from "./EmployerSuccessPage";
import { useEmployerSignup } from "@/providers/EmployerSignupProvider";
import { signupIndividual, signupLegal, verifyOtp, resendOtp, getBackendFieldErrors } from "@/services/Auth/employerAuthService";
import { Modal } from "@/components/ui/Modal";

export function EmployerAccountForm({ onBack }: { onBack: () => void }) {
  const { accountType, individualIdentity, legalIdentity, documents, account, setAccount } = useEmployerSignup();

  const [mobile, setMobile] = useState(account?.mobile || "");
  const [email, setEmail] = useState(account?.email || "");
  const [password, setPassword] = useState(account?.password || "");
  const [confirmPassword, setConfirmPassword] = useState(account?.password || "");

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const [timeLeft, setTimeLeft] = useState(120);
  const [isOtpSuccess, setIsOtpSuccess] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setAccount({ mobile, email, password });
  }, [mobile, email, password, setAccount]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isOtpModalOpen && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isOtpModalOpen) {
      setResendMessage(null);
    }
    return () => clearInterval(interval);
  }, [isOtpModalOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setOtpError("کد ۶ رقمی را کامل وارد کنید");
      return;
    }
    setOtpError(null);
    setResendMessage(null);
    setIsVerifyingOtp(true);

    try {
      await verifyOtp(mobile, code, accountType);
      setIsMobileVerified(true);
      setIsOtpSuccess(true);
      
      setTimeout(() => {
        setIsOtpModalOpen(false);
        setIsSubmitted(true);
      }, 500);
    } catch (error: any) {
      const translated = getBackendFieldErrors(error);
      setOtpError(translated.message || "کد وارد شده نادرست است");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setOtpError(null);
    setResendMessage(null);
    setTimeLeft(120);
    try {
      await resendOtp(mobile, accountType);
      setResendMessage("کد جدید پیامک شد.");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } catch (error: any) {
      const translated = getBackendFieldErrors(error);
      setOtpError(translated.message || "خطا در ارسال مجدد کد");
    } finally {
      setIsResending(false);
    }
  };

  const handleEditPhone = () => {
    setIsOtpModalOpen(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpError(null);
    setResendMessage(null);
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    const newErrors: Record<string, string> = {};
    if (!/^09\d{9}$/.test(mobile)) newErrors.mobile = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "ایمیل معتبر نیست";
    if (!passwordChecks.length) newErrors.password = "رمز عبور باید حداقل ۱۲ نویسه باشد";
    else if (!passwordChecks.upperLower) newErrors.password = "رمز باید شامل حرف بزرگ و کوچک باشد";
    else if (!passwordChecks.number) newErrors.password = "رمز باید شامل عدد باشد";
    else if (!passwordChecks.special) newErrors.password = "رمز باید شامل یک نشانه باشد";
    if (password !== confirmPassword) newErrors.confirmPassword = "تکرار رمز عبور مطابقت ندارد";

    if (!documents.nationalCard) newErrors.nationalCard = "شناسنامه الزامی است";
    if (!documents.videoFile) newErrors.video = "ویدیو الزامی است";
    if (accountType === "legal" && !documents.establishmentDocument) {
      newErrors.establishmentDocument = "آگهی تاسیس الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (accountType === "real" && individualIdentity) {
        await signupIndividual(individualIdentity, documents, { mobile, email, password });
      } else if (accountType === "legal" && legalIdentity) {
        await signupLegal(legalIdentity, documents, { mobile, email, password });
      } else {
        setGlobalError("داده‌های هویتی ناقص است");
        setIsSubmitting(false);
        return;
      }

      setIsOtpModalOpen(true);
      setTimeLeft(120);
      setOtp(["", "", "", "", "", ""]);
      setOtpError(null);
      setResendMessage(null);
      setIsOtpSuccess(false);
    } catch (error: any) {
      const translated = getBackendFieldErrors(error);
      
      if (translated.field) {
        setErrors((prev) => ({ ...prev, [translated.field!]: translated.message }));
      } else {
        setGlobalError(translated.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <EmployerSuccessPage />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-right font-vazirmatn pb-12 mt-2" dir="rtl">
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

        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">شماره همراه</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
            }}
            disabled={isMobileVerified}
            className={`w-full h-[42px] rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none focus:ring-1 transition-colors bg-surface-card ${
              isMobileVerified ? "border-green-500 text-green-600"
              : errors.mobile ? "border-status-error"
              : "border-[#457b9d]"
            }`}
            dir="rtl"
          />
          {isMobileVerified ? (
            <p className="text-caption text-green-600">شماره‌ی همراه تایید شد.</p>
          ) : errors.mobile ? (
            <p className="text-caption text-status-error">{errors.mobile}</p>
          ) : (
            <p className="text-caption text-text-secondary">شماره با ۰۹ شروع شود و ۱۱ رقم باشد.</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">
            ایمیل <span className="text-caption text-text-secondary">(اختیاری)</span>
          </label>
          <Input label="" type="email" dir="ltr" placeholder="employer@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">رمز عبور</label>
          <PasswordInput label="" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
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
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
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

        <div className="flex flex-col gap-2 w-full">
          <label className="text-label font-medium text-text-primary">تکرار رمز عبور</label>
          <PasswordInput label="" placeholder="••••••••" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)} error={errors.confirmPassword} />
        </div>

        {globalError && (
          <p className="text-status-error text-label mt-1 font-medium">{globalError}</p>
        )}

        <div className="flex items-center gap-3 mt-6">
          <Button type="button" onClick={onBack} className="w-24 border border-action-primary !text-action-primary bg-transparent hover:bg-surface-hover py-2.5 rounded-lg font-bold">قبلی</Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1 bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold disabled:opacity-50">
            {isSubmitting ? "در حال ارسال..." : "ثبت و ارسال برای بررسی"}
          </Button>
        </div>
      </form>

      <Modal isOpen={isOtpModalOpen} onClose={() => { setIsOtpModalOpen(false); setOtp(["", "", "", "", "", ""]); setOtpError(null); setResendMessage(null); }}>
        <div className="flex flex-col w-full text-right font-vazirmatn" dir="rtl">
          
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "Vazirmatn", fontSize: "18px", fontWeight: "bold", color: "#1d3557" }}>
              تایید شماره همراه
            </h2>
            <button
              type="button"
              onClick={() => { setIsOtpModalOpen(false); setOtp(["", "", "", "", "", ""]); setOtpError(null); setResendMessage(null); }}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <p className="text-label text-text-secondary mb-6">
            کد شش‌رقمی به شماره‌ی <span dir="ltr" className="inline-block font-bold">{mobile}</span> پیامک شد.
          </p>

          <div className="mb-6">
            <label className="text-label font-bold text-[#262321] block mb-3">کد تایید شش‌رقمی</label>
            
            <div className="grid grid-cols-6 gap-2 w-full" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { otpRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  placeholder="-"
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  style={{
                    color: isOtpSuccess ? "#1d3557" : digit ? "#1d3557" : "inherit",
                    backgroundColor: isOtpSuccess ? "#eff6ff" : "#fff",
                  }}
                  className={`w-full h-14 text-center text-xl rounded-lg outline-none transition-all duration-200 bg-white border
                    placeholder:text-gray-400 focus:placeholder:text-gray-500
                    ${isOtpSuccess 
                      ? "border-blue-300" 
                      : "border-[#93c5fd] focus:border-[#9ca3af]"
                    }
                  `}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-text-secondary text-[13px]">
              {timeLeft > 0 
                ? `می‌توانی تا ${formatTime(timeLeft)} دیگر کد جدید بگیری.` 
                : "زمان ارسال کد به پایان رسیده است."}
            </span>
            
            {timeLeft > 0 ? (
              <button 
                type="button" 
                onClick={handleEditPhone}
                disabled={isResending} 
                className="text-action-primary text-[13px] font-bold hover:underline disabled:opacity-50"
              >
                {isResending ? "در حال ارسال..." : "ویرایش شماره"}
              </button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                onClick={handleResendOtp}
                loading={isResending}
                className="text-[13px] h-[36px] px-4"
              >
                ارسال دوباره کد
              </Button>
            )}
          </div>

          <div style={{ marginBottom: "32px", marginTop: "8px" }}>
            {otpError && <p className="text-status-error text-label font-medium">{otpError}</p>}
            {resendMessage && <p className="text-green-600 text-sm font-medium">{resendMessage}</p>}
          </div>

          <Button 
            type="button" 
            onClick={handleVerifyOtp} 
            loading={isVerifyingOtp} 
            disabled={!isOtpComplete || isOtpSuccess}
            fullWidth
            style={{
              backgroundColor: isOtpSuccess ? "#1d3557" : isOtpComplete ? "#1d3557" : "#e5e7eb",
              color: isOtpSuccess ? "white" : isOtpComplete ? "white" : "#9ca3af",
            }}
            className={`py-2.5 rounded-lg font-bold transition-all ${
              isOtpComplete 
                ? "hover:opacity-90" 
                : "cursor-not-allowed"
            }`}
          >
            {isOtpSuccess ? "در حال انتقال..." : "تایید و ادامه"}
          </Button>
        </div>
      </Modal>
    </>
  );
}