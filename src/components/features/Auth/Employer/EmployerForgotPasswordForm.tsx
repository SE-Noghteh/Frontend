import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Modal } from "@/components/ui/Modal";
import { forgotPassword, verifyResetOtp, resetPassword, getBackendFieldErrors } from "@/services/Auth/employerAuthService";

type Step = "phone" | "reset";

export function EmployerForgotPasswordForm() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("phone");
  const [accountType] = useState<"real" | "legal">("real");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // مودال OTP
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // تایمر OTP
  const [timeLeft, setTimeLeft] = useState(120);
  const [isOtpSuccess, setIsOtpSuccess] = useState(false); 

  // Reset Token و رمز جدید
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  // منطق شمارش معکوس
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

  // ========== مرحله ۱: ارسال کد ==========
  const handleSendCode = async () => {
    setError(null);
    setMobileError(undefined);

    if (!mobile.trim()) { setMobileError("شماره موبایل را وارد کنید"); return; }
    if (!/^09\d{9}$/.test(mobile)) { setMobileError("شماره موبایل معتبر نیست (مثل ۰۹۱۲...)"); return; }

    setIsLoading(true);
    try {
      await forgotPassword(mobile, accountType);
      setIsOtpModalOpen(true);
      setTimeLeft(120);
      setOtp(["", "", "", "", "", ""]);
      setOtpError(null);
      setResendMessage(null);
      setIsOtpSuccess(false);
    } catch (err: any) {
      const translated = getBackendFieldErrors(err);
      if (translated.field === "mobile") {
        setMobileError(translated.message);
      } else {
        setError(translated.message || "خطا در ارسال کد");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ========== مرحله ۲: تایید OTP ==========
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
    if (code.length !== 6) { setOtpError("کد ۶ رقمی را کامل وارد کنید"); return; }

    setOtpError(null);
    setResendMessage(null);
    setIsVerifyingOtp(true);
    
    try {
      const res = await verifyResetOtp(mobile, code, accountType);
      setResetToken(res.reset_token);
      setIsOtpSuccess(true);
      setTimeout(() => {
        setIsOtpModalOpen(false);
        setStep("reset");
      }, 500);
    } catch (err: any) {
      const translated = getBackendFieldErrors(err);
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
      await forgotPassword(mobile, accountType);
      setResendMessage("کد جدید پیامک شد.");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } catch (err: any) {
      const translated = getBackendFieldErrors(err);
      setOtpError(translated.message || "خطا در ارسال مجدد");
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

  // ========== مرحله ۳: رمز جدید ==========
  const passwordChecks = {
    length: newPassword.length >= 12,
    upperLower: (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)),
    number: /\d/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const errs: Record<string, string> = {};
    if (!passwordChecks.length) errs.newPassword = "رمز باید حداقل ۱۲ نویسه باشد";
    else if (!passwordChecks.upperLower) errs.newPassword = "رمز باید حرف بزرگ و کوچک داشته باشد";
    else if (!passwordChecks.number) errs.newPassword = "رمز باید عدد داشته باشد";
    else if (!passwordChecks.special) errs.newPassword = "رمز باید یک نشانه داشته باشد";
    if (newPassword !== confirmPassword) errs.confirmPassword = "تکرار رمز مطابقت ندارد";

    if (Object.keys(errs).length > 0) { setPasswordErrors(errs); return; }

    setIsLoading(true);
    try {
      await resetPassword(resetToken, newPassword, accountType);
      setSuccessMessage("رمز عبور با موفقیت تغییر کرد. حالا می‌توانید وارد شوید.");
      setTimeout(() => navigate("/employerlogin"), 2000);
    } catch (err: any) {
      const translated = getBackendFieldErrors(err);
      if (translated.field) {
        setPasswordErrors(prev => ({ ...prev, [translated.field!]: translated.message }));
      } else {
        setError(translated.message || "خطا در تغییر رمز");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ========== رندر ==========
  return (
    <>
      {step === "phone" && (
        <form onSubmit={(e) => { e.preventDefault(); handleSendCode(); }} className="flex flex-col gap-6 w-full text-right font-vazirmatn pb-12" dir="rtl">
          <div className="text-right mb-3 mt-4">
            <h1 style={{ fontFamily: "Vazirmatn", fontSize: "32px", fontWeight: "bold", color: "#262321" }}>
              ورود با کد پیامکی
            </h1>
            <p className="text-label text-text-secondary leading-relaxed mt-2">
              رمزت را نمی‌دانی؟ کد یکبارمصرف به شماره‌ات پیامک می‌شود.
            </p>
          </div>

          <PhoneInput
            label="شماره موبایل"
            isRequired
            placeholder="09123456789"
            value={mobile}
            onChange={(e) => { setMobile(e.target.value); if (error) setError(null); if (mobileError) setMobileError(undefined); }}
            error={mobileError}
            onSendCode={handleSendCode}
            isSendingCode={isLoading}
          />

          {error && <p className="text-status-error text-label mt-1 font-medium">{error}</p>}

          <div className="text-right mt-2">
            <a href="/employerlogin" className="text-label font-bold text-action-primary hover:underline">
              رمز یادم آمد؛ ورود با رمز عبور
            </a>
          </div>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="flex flex-col gap-5 w-full text-right font-vazirmatn pb-12 mt-2" dir="rtl">
          <div className="text-right mb-2 mt-2">
            <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#262321" }}>
              رمز عبور جدید
            </h1>
            <p className="text-label text-text-secondary leading-relaxed mt-2">
              یک رمز عبور قوی برای حساب خود انتخاب کنید.
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-label font-medium text-text-primary">رمز عبور جدید</label>
            <PasswordInput label="" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} error={passwordErrors.newPassword} />
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
                  <span className={passwordChecks[item.key as keyof typeof passwordChecks] ? "text-green-600" : "text-text-secondary"}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-label font-medium text-text-primary">تکرار رمز عبور</label>
            <PasswordInput label="" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={passwordErrors.confirmPassword} />
          </div>

          {error && <p className="text-status-error text-label mt-1 font-medium">{error}</p>}
          {successMessage && <p className="text-green-600 text-label mt-1 font-medium">{successMessage}</p>}

          <Button 
            type="submit" 
            fullWidth 
            loading={isLoading} 
            className="mt-4"
          >
            تغییر رمز عبور
          </Button>
        </form>
      )}

      {/* مودال OTP */}
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

          {/* بخش وضعیت زمان و دکمه‌ها (حذف تکرار با if/else) */}
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

          {/* پیام‌ها با فاصله زیاد از دکمه */}
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
            {isOtpSuccess ? "در حال انتقال..." : "تایید و ورود"}
          </Button>
        </div>
      </Modal>
    </>
  );
}