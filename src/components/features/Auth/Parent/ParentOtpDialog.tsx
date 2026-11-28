import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface ParentOtpDialogProps {
  isOpen: boolean;
  phone: string;
  title?: string;
  submitLabel?: string;
  expiresIn?: number;
  resendAfter?: number;
  error?: string | null;
  isLoading?: boolean;
  isResending?: boolean;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onEditPhone?: () => void;
  onClose: () => void;
}

function maskPhone(phone: string): string {
  if (phone.length !== 11) return phone;
  return `${phone.slice(0, 4)} *** ${phone.slice(-4)}`;
}

function formatTime(seconds: number): string {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;

  return toPersianDigits(
    `${minute}:${String(second).padStart(2, "0")}`,
  );
}

export function ParentOtpDialog({
  isOpen,
  phone,
  title = "تأیید شماره همراه",
  submitLabel = "تأیید کد",
  expiresIn = 300,
  resendAfter = 60,
  error,
  isLoading = false,
  isResending = false,
  onVerify,
  onResend,
  onEditPhone,
  onClose,
}: ParentOtpDialogProps) {
  const [digits, setDigits] = useState<string[]>(
    Array(6).fill(""),
  );
  const [timeLeft, setTimeLeft] =
    useState(expiresIn);
  const [resendLeft, setResendLeft] =
    useState(resendAfter);
  const refs = useRef<
    Array<HTMLInputElement | null>
  >([]);

  useEffect(() => {
    if (!isOpen) return;

    setDigits(Array(6).fill(""));
    setTimeLeft(expiresIn);
    setResendLeft(resendAfter);

    const timer = window.setInterval(() => {
      setTimeLeft((value) => Math.max(0, value - 1));
      setResendLeft((value) =>
        Math.max(0, value - 1),
      );
    }, 1000);

    const focusTimer = window.setTimeout(
      () => refs.current[0]?.focus(),
      120,
    );

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(focusTimer);
    };
  }, [expiresIn, isOpen, resendAfter]);

  const updateDigit = (
    index: number,
    value: string,
  ) => {
    const normalized = value
      .replace(/[^\d]/g, "")
      .slice(-1);

    setDigits((current) => {
      const next = [...current];
      next[index] = normalized;
      return next;
    });

    if (normalized && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === "Backspace" &&
      !digits[index] &&
      index > 0
    ) {
      refs.current[index - 1]?.focus();
    }
  };

  const otp = digits.join("");
  const expired = timeLeft === 0;

  return (
    <Dialog
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      isDismissible={!isLoading && !isResending}
      className="md:max-w-[30rem]"
    >
      <div dir="rtl">
        <p className="text-label leading-7 text-text-secondary">
          کد شش‌رقمی به شماره{" "}
          <b dir="ltr" className="text-text-primary">
            {maskPhone(phone)}
          </b>{" "}
          پیامک شد.
        </p>

        {onEditPhone ? (
          <button
            type="button"
            onClick={onEditPhone}
            className="mt-2 text-caption font-bold text-action-primary hover:underline"
          >
            ویرایش شماره
          </button>
        ) : null}

        <div className="mt-5">
          <label className="text-label font-bold text-text-primary">
            کد تأیید شش‌رقمی{" "}
            <span className="text-error">*</span>
          </label>

          <div
            dir="ltr"
            className="mt-2 grid grid-cols-6 gap-2"
          >
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                inputMode="numeric"
                autoComplete={
                  index === 0
                    ? "one-time-code"
                    : "off"
                }
                maxLength={1}
                value={digit}
                disabled={
                  expired || isLoading || isResending
                }
                onChange={(event) =>
                  updateDigit(
                    index,
                    event.target.value,
                  )
                }
                onKeyDown={(event) =>
                  handleKeyDown(index, event)
                }
                className={`h-12 min-w-0 rounded-lg border bg-white text-center text-body font-bold outline-none transition focus:ring-2 ${
                  error
                    ? "border-error text-error focus:ring-error/15"
                    : "border-ocean-blue text-text-primary focus:ring-action-primary/15"
                }`}
              />
            ))}
          </div>

          {error ? (
            <p className="mt-2 text-caption text-error">
              {error}
            </p>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-caption text-text-secondary">
            <span>
              اعتبار کد: {formatTime(timeLeft)}
            </span>

            <button
              type="button"
              disabled={
                resendLeft > 0 ||
                isResending ||
                isLoading
              }
              onClick={onResend}
              className="font-bold text-action-primary disabled:cursor-not-allowed disabled:text-text-disabled"
            >
              {resendLeft > 0
                ? `ارسال مجدد تا ${formatTime(
                    resendLeft,
                  )}`
                : isResending
                  ? "در حال ارسال..."
                  : "ارسال مجدد کد"}
            </button>
          </div>
        </div>

        <Button
          type="button"
          fullWidth
          loading={isLoading}
          disabled={otp.length !== 6 || expired}
          onClick={() => onVerify(otp)}
          className="mt-5"
        >
          {submitLabel}
        </Button>
      </div>
    </Dialog>
  );
}
