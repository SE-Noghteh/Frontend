import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthField } from "@/components/features/Auth/Parent/AuthField";
import { AuthNotice } from "@/components/features/Auth/Parent/AuthNotice";
import { ParentOtpDialog } from "@/components/features/Auth/Parent/ParentOtpDialog";
import {
  isValidParentPassword,
  ParentPasswordCriteria,
} from "@/components/features/Auth/Parent/ParentPasswordCriteria";
import { Button } from "@/components/ui/Button";
import {
  getParentAuthErrorMessage,
  requestParentPasswordReset,
  setParentNewPassword,
  verifyParentPasswordResetOtp,
} from "@/services/Auth/Parent/parentAuthService";
import type { OtpResponse } from "@/types/Auth/parentAuth";
import { normalizePhone } from "@/utils/normalizeDigits";

const PHONE_PATTERN = /^09\d{9}$/;

type Phase = "phone" | "password" | "done";

export function ParentForgotPasswordFlow() {
  const [phase, setPhase] =
    useState<Phase>("phone");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] =
    useState<string | null>(null);
  const [globalError, setGlobalError] =
    useState<string | null>(null);

  const [otpOpen, setOtpOpen] = useState(false);
  const [otpInfo, setOtpInfo] =
    useState<OtpResponse | null>(null);
  const [otpError, setOtpError] =
    useState<string | null>(null);
  const [isRequesting, setIsRequesting] =
    useState(false);
  const [isVerifying, setIsVerifying] =
    useState(false);
  const [isResending, setIsResending] =
    useState(false);

  const [resetToken, setResetToken] =
    useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [passwordError, setPasswordError] =
    useState<string | null>(null);
  const [confirmError, setConfirmError] =
    useState<string | null>(null);
  const [isResetting, setIsResetting] =
    useState(false);

  const handleRequestCode = async (
    event?: React.FormEvent,
  ) => {
    event?.preventDefault();

    if (!PHONE_PATTERN.test(phone)) {
      setPhoneError(
        "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم داشته باشد.",
      );
      return;
    }

    setIsRequesting(true);
    setPhoneError(null);
    setGlobalError(null);

    try {
      const response =
        await requestParentPasswordReset(phone);

      setOtpInfo(response);
      setOtpOpen(true);
    } catch (error) {
      setGlobalError(
        getParentAuthErrorMessage(error),
      );
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsVerifying(true);
    setOtpError(null);

    try {
      const response =
        await verifyParentPasswordResetOtp(
          phone,
          otp,
        );

      setResetToken(response.reset_token);
      setOtpOpen(false);
      setPhase("password");
    } catch (error) {
      setOtpError(
        getParentAuthErrorMessage(
          error,
          "کد تأیید درست نیست یا اعتبارش تمام شده است.",
        ),
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setOtpError(null);

    try {
      const response =
        await requestParentPasswordReset(phone);
      setOtpInfo(response);
    } catch (error) {
      setOtpError(
        getParentAuthErrorMessage(error),
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleResetPassword = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    let valid = true;

    if (!isValidParentPassword(password)) {
      setPasswordError(
        "رمز عبور باید بین ۸ تا ۷۲ بایت باشد.",
      );
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (confirmPassword !== password) {
      setConfirmError(
        "تکرار رمز عبور یکسان نیست.",
      );
      valid = false;
    } else {
      setConfirmError(null);
    }

    if (!valid || !resetToken) return;

    setIsResetting(true);
    setGlobalError(null);

    try {
      await setParentNewPassword(
        resetToken,
        password,
      );
      setPhase("done");
    } catch (error) {
      setGlobalError(
        getParentAuthErrorMessage(error),
      );
    } finally {
      setIsResetting(false);
    }
  };

  if (phase === "done") {
    return (
      <div className="mx-auto w-full max-w-[620px]">
        <h1 className="text-page-title font-black text-text-primary">
          رمز عبور تغییر کرد
        </h1>

        <AuthNotice
          tone="success"
          className="mt-4"
        >
          رمز جدید با موفقیت ثبت شد. حالا می‌توانی با
          شماره موبایل و رمز جدید وارد شوی.
        </AuthNotice>

        <Link
          to="/parent/login"
          className="btn mt-5 w-full"
          data-variant="primary"
          data-size="md"
          data-color="blue"
          data-full-width="true"
        >
          بازگشت به ورود
        </Link>
      </div>
    );
  }

  if (phase === "password") {
    return (
      <form
        onSubmit={handleResetPassword}
        className="mx-auto w-full max-w-[620px]"
      >
        <h1 className="text-page-title font-black text-text-primary">
          تنظیم رمز عبور جدید
        </h1>
        <p className="mt-1 text-label leading-7 text-text-secondary">
          رمز جدید را وارد کن. با ثبت رمز، نشست‌های قبلی
          حساب باطل می‌شوند.
        </p>

        <div className="mt-5 space-y-4">
          <AuthField
            label="رمز عبور جدید"
            requiredMark
            password
            dir="ltr"
            value={password}
            error={passwordError ?? undefined}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError(null);
            }}
          />

          <AuthField
            label="تکرار رمز عبور جدید"
            requiredMark
            password
            dir="ltr"
            value={confirmPassword}
            error={confirmError ?? undefined}
            onChange={(event) => {
              setConfirmPassword(
                event.target.value,
              );
              setConfirmError(null);
            }}
          />

          <ParentPasswordCriteria
            password={password}
            confirmPassword={confirmPassword}
            showMatch
          />
        </div>

        {globalError ? (
          <AuthNotice tone="error" className="mt-4">
            {globalError}
          </AuthNotice>
        ) : null}

        <Button
          type="submit"
          fullWidth
          loading={isResetting}
          className="mt-5"
        >
          ثبت رمز جدید
        </Button>
      </form>
    );
  }

  return (
    <>
      <form
        onSubmit={handleRequestCode}
        className="mx-auto w-full max-w-[620px]"
      >
        <h1 className="text-page-title font-black text-text-primary">
          فراموشی رمز عبور
        </h1>
        <p className="mt-1 text-label leading-7 text-text-secondary">
          شماره موبایل ثبت‌شده در حساب والد را وارد کن
          تا کد بازیابی برایت پیامک شود.
        </p>

        <div className="mt-5">
          <AuthField
            label="شماره موبایل"
            requiredMark
            type="tel"
            inputMode="tel"
            dir="ltr"
            placeholder="0912 123 4567"
            value={phone}
            error={phoneError ?? undefined}
            onChange={(event) => {
              setPhone(normalizePhone(event.target.value));
              setPhoneError(null);
              setGlobalError(null);
            }}
          />
        </div>

        {globalError ? (
          <AuthNotice tone="error" className="mt-4">
            {globalError}
          </AuthNotice>
        ) : null}

        <Button
          type="submit"
          fullWidth
          loading={isRequesting}
          className="mt-5"
        >
          ارسال کد بازیابی
        </Button>

        <p className="mt-4 text-center text-caption">
          <Link
            to="/parent/login"
            className="font-bold text-action-primary hover:underline"
          >
            رمزم یادم آمد؛ بازگشت به ورود
          </Link>
        </p>
      </form>

      <ParentOtpDialog
        isOpen={otpOpen}
        phone={phone}
        title="کد بازیابی رمز عبور"
        submitLabel="تأیید و ادامه"
        expiresIn={otpInfo?.expires_in ?? 300}
        resendAfter={otpInfo?.resend_after ?? 60}
        error={otpError}
        isLoading={isVerifying}
        isResending={isResending}
        onVerify={handleVerifyOtp}
        onResend={handleResend}
        onEditPhone={() => setOtpOpen(false)}
        onClose={() => setOtpOpen(false)}
      />
    </>
  );
}
