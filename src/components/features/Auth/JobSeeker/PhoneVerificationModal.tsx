import { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ErrorBox } from "@/components/ui/ErrorBox";

type ErrorType = "invalid-code" | "timeout" | "sms-failed" | "too-many-attempts" | null;

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditPhone: () => void;
  phone: string;
  onVerify: (code: string) => void;
  simulateError?: ErrorType; 
  isLoading?: boolean; 
  error?: string | null; 
  onResend?: (onSuccess: () => void) => void;
  isResending?: boolean;
}

export function PhoneVerificationModal({ 
  isOpen, 
  onClose, 
  onEditPhone,
  phone, 
  onVerify,
  simulateError = null,
  isLoading = false, 
  error = null,
  onResend, 
  isResending = false
}: PhoneVerificationModalProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60); 
  const [attemptsTimeLeft, setAttemptsTimeLeft] = useState(600); 
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isTimeout = timeLeft === 0 || simulateError === "timeout";
  const isTooManyAttempts = simulateError === "too-many-attempts";
  const isSmsFailed = simulateError === "sms-failed";
  const isInvalidCode = simulateError === "invalid-code";

  useEffect(() => {
    if (!isOpen) return;
    
    setCode(Array(6).fill(""));
    setTimeLeft(120);
    setAttemptsTimeLeft(600);
    
    setTimeout(() => inputRefs.current[0]?.focus(), 100);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isTooManyAttempts) return;

    const timer = setInterval(() => {
      setAttemptsTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isTooManyAttempts]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const maskPhone = (phoneStr: string) => {
    if (phoneStr.length !== 11) return phoneStr;
    return `${phoneStr.slice(0, 4)} *** ${phoneStr.slice(7)}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6 && !isLoading) {
      onVerify(fullCode);
    }
  };

  const handleResendCode = () => {
    if (onResend) {
      onResend(() => {
        setTimeLeft(60); 
        setCode(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      });
    } else {
      setTimeLeft(60);
      setCode(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const isInputDisabled = isTimeout || isTooManyAttempts || isSmsFailed || isLoading;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-full" dir="rtl">
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-card-title font-bold text-text-primary">تأیید شماره‌ی همراه</h3>
          <button 
            onClick={onClose} 
            className="text-text-secondary hover:text-text-primary p-2 rounded-full border border-border-subtle bg-surface-card transition-colors"
            aria-label="بستن"
            disabled={isLoading} 
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <p className="text-label text-text-secondary mb-6">
          {isSmsFailed 
            ? `پیامک به شماره‌ی ${maskPhone(phone)} ارسال نشد.` 
            : `کد شش‌رقمی به شماره‌ی ${maskPhone(phone)} پیامک شد.`
          }
        </p>

        <button 
          onClick={onEditPhone}
          className="text-label font-medium text-action-primary hover:underline text-right mb-6 w-fit"
          disabled={isLoading}
        >
          ویرایش شماره
        </button>

        <div className="flex flex-col gap-3 mb-4">
          <label className="text-label font-bold text-text-primary">
            کد تأیید شش‌رقمی <span className="text-status-error">*</span>
          </label>
          
          <div className="flex justify-center items-center gap-2 sm:gap-3 w-full" dir="ltr">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                dir="ltr"
                disabled={isInputDisabled}
                className={`w-full max-w-[3rem] aspect-[3/4] sm:aspect-square flex-1 text-center text-section-title font-bold rounded-md border focus:outline-none transition-all placeholder:font-normal
                  ${isInputDisabled 
                    ? "bg-disabled-surface border-transparent text-disabled-text cursor-not-allowed" 
                    : error
                      ? "border-status-error text-status-error bg-surface-card" // اگر خطای بک‌اند داشت، قرمز شود
                      : isTimeout || isInvalidCode
                        ? "border-status-error text-status-error bg-surface-card" 
                        : "border-border-decorative text-interface-secondary bg-surface-card focus:ring-2 focus:ring-focus-ring focus:border-transparent placeholder:text-charcoal-4"
                  }
                `}
                placeholder="-"
              />
            ))}
          </div>
          
          {!isInputDisabled && (
            <p className="text-caption text-text-secondary mt-2 leading-relaxed">
              کد را از چپ به راست وارد کنید؛ اعتبار کد ۲ دقیقه است.<br/>
              میتوانی تا {formatTime(timeLeft)} دیگر کد جدید بگیری.
            </p>
          )}
          {isTimeout && !isTooManyAttempts && (
             <p className="text-caption text-text-secondary mt-2 leading-relaxed">
                زمان اعتبار کد به پایان رسیده است.
             </p>
          )}
        </div>

        {error && !isLoading && (
          <div className="mb-4">
            <ErrorBox 
              title="خطا در تایید کد" 
              description={error} 
            />
          </div>
        )}

        {isTimeout && !isTooManyAttempts && !isSmsFailed && (
          <div className="mb-4">
             <ErrorBox 
               title="اعتبار کد تمام شده است" 
               description="یک کد جدید درخواست کن؛ کد قبلی دیگر معتبر نیست." 
             />
          </div>
        )}

        {isInvalidCode && !isTimeout && !isTooManyAttempts && !isSmsFailed && (
          <div className="mb-4">
            <ErrorBox 
              title="کد واردشده درست نیست" 
              description="کد شش‌رقمی پیامک‌شده را بررسی و دوباره وارد کن." 
            />
          </div>
        )}

        {isSmsFailed && (
          <div className="mb-4">
            <ErrorBox 
              title="ارسال پیامک ناموفق بود" 
              description="اتصال اینترنت را بررسی کن و دوباره تلاش کن." 
            />
          </div>
        )}

        {isTooManyAttempts && (
          <div className="flex flex-col gap-2 mb-4">
            <ErrorBox 
              title="تعداد تلاش‌ها از حد مجاز گذشت" 
              description="برای امنیت حسابت، ۱۰ دقیقه دیگر دوباره تلاش کن." 
            />
            <p className="text-caption text-text-secondary text-right pl-2">
              تلاش بعدی ممکن است: {formatTime(attemptsTimeLeft)}
            </p>
          </div>
        )}


        {timeLeft === 0 && !isTooManyAttempts && !isLoading && (
          <div className="mb-4">
            <Button 
              type="button" 
              variant="primary" 
              fullWidth
              onClick={handleResendCode}
              disabled={isResending} 
            >
              {isResending ? "در حال ارسال..." : "ارسال دوباره‌ی کد"}
            </Button>
          </div>
        )}
        <Button 
          onClick={handleSubmit} 
          variant="primary" 
          fullWidth 
          disabled={code.join("").length !== 6 || isInputDisabled}
          className="mt-2"
        >
          {isLoading ? "در حال تایید..." : "تأیید و ادامه"}
        </Button>
      </div>
    </Modal>
  );
}