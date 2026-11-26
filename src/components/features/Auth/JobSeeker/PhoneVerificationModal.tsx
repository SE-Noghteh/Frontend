import { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { resolveErrorMessage } from "@/utils/resolveErrorMessage";

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

const CODE_TTL_SECONDS = 300;
const RESEND_COOLDOWN_SECONDS = 60;
const MAX_ATTEMPTS = 5;

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
  isResending = false,
}: PhoneVerificationModalProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(CODE_TTL_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [attemptsTimeLeft, setAttemptsTimeLeft] = useState(600);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTitle, setToastTitle] = useState<string>("");

  const isTimeout = timeLeft === 0 || simulateError === "timeout";
  const isSmsFailed = simulateError === "sms-failed";
  const isTooManyAttemptsByServer = simulateError === "too-many-attempts";
  const isCodeBurned = failedAttempts >= MAX_ATTEMPTS;
  const isTooManyAttempts = isCodeBurned || isTooManyAttemptsByServer;

  const remainingAttempts = Math.max(MAX_ATTEMPTS - failedAttempts, 0);

  const farsiError = resolveErrorMessage(error);

  const isRateLimitError =
    !!error &&
    (error.toLowerCase().includes("wait before requesting") ||
    error.toLowerCase().includes("rate limit") ||
    error.toLowerCase().includes("too many requests"));

  const isCodeInvalid =
    hasAttemptedSubmit &&
    !!error &&
    !isSmsFailed &&
    !isTooManyAttempts &&
    !isTimeout &&
    !isRateLimitError;

  const showToastForError =
    !!error &&
    !isCodeInvalid &&
    !isSmsFailed &&
    !isTooManyAttempts &&
    !isTimeout;

  useEffect(() => {
    if (!isOpen) {
      setToastMessage(null);
      return;
    }

    setCode(Array(6).fill(""));
    setTimeLeft(CODE_TTL_SECONDS);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setAttemptsTimeLeft(600);
    setHasAttemptedSubmit(false);
    setFailedAttempts(0);

    setTimeout(() => inputRefs.current[0]?.focus(), 100);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isTooManyAttemptsByServer) return;

    const timer = setInterval(() => {
      setAttemptsTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isTooManyAttemptsByServer]);

  useEffect(() => {
    if (!error && !isSmsFailed && !isTooManyAttempts && !isTimeout) {
      setToastMessage(null);
      return;
    }

    if (isSmsFailed) {
      setToastTitle("ارسال پیامک ناموفق بود");
      setToastMessage("اتصال اینترنت را بررسی کن و دوباره تلاش کن.");
    } else if (isTooManyAttemptsByServer) {
      setToastTitle("تعداد تلاش‌ها از حد مجاز گذشت");
      setToastMessage(
        `برای امنیت حسابت، تا ${formatTime(attemptsTimeLeft)} دیگر دوباره تلاش کن.`
      );
    } else if (isTimeout) {
      setToastTitle("اعتبار کد تمام شده است");
      setToastMessage("یک کد جدید درخواست کن؛ کد قبلی دیگر معتبر نیست.");
    } else if (isRateLimitError) {
      setToastTitle("کمی صبر کن");
      setToastMessage("برای دریافت مجدد کد، لطفاً چند لحظه صبر کن و دوباره تلاش کن.");
    } else if (showToastForError) {
      setToastTitle("خطا در اطلاعات وارد شده");
      setToastMessage(farsiError);
    } else {
      setToastMessage(null);
    }
  }, [
    error,
    isSmsFailed,
    isTooManyAttemptsByServer,
    isTooManyAttempts,
    isTimeout,
    showToastForError,
    farsiError,
    attemptsTimeLeft,
  ]);

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

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6 && !isLoading && !isInputDisabled) {
      setHasAttemptedSubmit(true);
      
      setFailedAttempts((prev) => Math.min(prev + 1, MAX_ATTEMPTS));
      
      onVerify(fullCode);
    }
  };

  const resetTimersAfterResend = () => {
    setTimeLeft(CODE_TTL_SECONDS);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setCode(Array(6).fill(""));
    setHasAttemptedSubmit(false);
    setFailedAttempts(0);
    inputRefs.current[0]?.focus();
  };

  const handleResendCode = () => {
    if (resendCooldown > 0 || isResending) return;

    if (onResend) {
      onResend(resetTimersAfterResend);
    } else {
      resetTimersAfterResend();
    }
  };

  const isBlockingError =
    isTooManyAttemptsByServer || isSmsFailed || isTimeout || isCodeBurned;
  const isInputDisabled = isBlockingError || isLoading;
  const canResend =
    resendCooldown === 0 &&
    !isLoading &&
    !isResending;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col w-full" dir="rtl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-card-title font-bold text-text-primary">
              تأیید شماره‌ی همراه
            </h3>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary p-2 rounded-full border border-border-subtle bg-surface-card transition-colors"
              aria-label="بستن"
              disabled={isLoading}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <p className="text-label text-text-secondary mb-6">
            {isSmsFailed ? (
              <>
                پیامک به شماره‌ی{" "}
                <span dir="ltr" className="inline-block">
                  {maskPhone(phone)}
                </span>{" "}
                ارسال نشد.
              </>
            ) : (
              <>
                کد شش‌رقمی به شماره‌ی{" "}
                <span dir="ltr" className="inline-block">
                  {maskPhone(phone)}
                </span>{" "}
                پیامک شد.
              </>
            )}
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

            <div
              className="flex justify-center items-center gap-2 sm:gap-3 w-full"
              dir="ltr"
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  dir="ltr"
                  disabled={isInputDisabled}
                  className={`w-full max-w-[3rem] aspect-[3/4] sm:aspect-square flex-1 text-center text-section-title font-bold rounded-md border focus:outline-none transition-all placeholder:font-normal
                    ${
                      isInputDisabled
                        ? "bg-disabled-surface border-transparent text-disabled-text cursor-not-allowed"
                        : isCodeInvalid
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
                کد را از چپ به راست وارد کنید؛ اعتبار کد {formatTime(timeLeft)} است.
              </p>
            )}

            {isCodeInvalid && !isLoading && (
              <p className="text-caption text-status-error mt-1">
                کد وارد شده درست نیست. {remainingAttempts} تلاش دیگر باقی مانده است.
              </p>
            )}

            {isCodeBurned && !isSmsFailed && !isTooManyAttemptsByServer && (
              <p className="text-caption text-status-error mt-1 font-medium">
                این کد باطل شد. برای ادامه، کد جدید درخواست کن.
              </p>
            )}
          </div>

          {isTooManyAttemptsByServer && (
            <div className="flex flex-col gap-2 mb-4">
              <p className="text-caption text-status-error text-right pl-2 font-medium">
                تلاش بعدی ممکن است: {formatTime(attemptsTimeLeft)}
              </p>
            </div>
          )}

          {!isLoading && (
            <div className="mb-4">
              <Button
                type="button"
                fullWidth
                onClick={handleResendCode}
                disabled={!canResend}
              >
                {isResending
                  ? "در حال ارسال..."
                  : resendCooldown > 0
                  ? `ارسال دوباره‌ی کد تا ${formatTime(resendCooldown)}`
                  : "ارسال دوباره‌ی کد"}
              </Button>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={code.join("").length !== 6 || isInputDisabled}
            className="mt-2"
          >
            {isLoading
              ? "در حال تایید..."
              : isCodeBurned
              ? "کد باطل شد — کد جدید بگیر"
              : "تأیید و ادامه"}
          </Button>
        </div>
      </Modal>

      {toastMessage && (
        <Toast
          title={toastTitle}
          description={toastMessage}
          onClose={() => {
            setToastMessage(null);
          }}
          duration={6000}
        />
      )}
    </>
  );
}