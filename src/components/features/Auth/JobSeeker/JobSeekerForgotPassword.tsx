import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import { PhoneInput } from "@/components/ui/PhoneInput";
import { Button } from "@/components/ui/Button";
import { PhoneVerificationModal } from "@/components/features/Auth/JobSeeker/PhoneVerificationModal";

import { otpLoginSchema } from "@/schemas/otpLoginSchema";
import type { OtpLoginFormValues } from "@/types/Auth/authTypes";

import { useForgotPassword } from "@/hooks/JobSeeker/useForgotPassword";
import { useVerifyResetOtp } from "@/hooks/JobSeeker/useVerifyResetOtp";

export function JobSeekerForgotPassword() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpPhone, setOtpPhone] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const forgotPasswordMutation = useForgotPassword();
  const verifyResetOtpMutation = useVerifyResetOtp();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OtpLoginFormValues>({
    resolver: yupResolver(otpLoginSchema),
    defaultValues: {
      phone: "",
    },
    mode: "onChange",
  });

  const onValidSubmit = async (data: OtpLoginFormValues) => {
    try {
      setVerificationError(null);

      await forgotPasswordMutation.mutateAsync({
        phone: data.phone,
      });

      setOtpPhone(data.phone);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Forgot password error:", error);
      setVerificationError(getErrorMessage(error));
    }
  };

  const handleVerifyResetOtp = async (otp: string) => {
    try {
      setVerificationError(null);

      const result = await verifyResetOtpMutation.mutateAsync({
        phone: otpPhone,
        otp,
      });

      if (!result.reset_token) {
        throw new Error("توکن بازیابی از سرور دریافت نشد.");
      }

      setIsModalOpen(false);

      navigate("/jobseekerlogin/reset-password", {
        state: {
          resetToken: result.reset_token,
        },
      });
    } catch (error) {
      console.error("Verify reset OTP error:", error);

      setVerificationError(getErrorMessage(error));
      throw error;
    }
  };

  const handleResendCode = async (onSuccess: () => void) => {
    try {
      setVerificationError(null);

      await forgotPasswordMutation.mutateAsync({
        phone: otpPhone,
      });

      onSuccess();
    } catch (error) {
      console.error("Resend reset OTP error:", error);
      setVerificationError(getErrorMessage(error));
    }
  };

  const isSendingCode = forgotPasswordMutation.isPending;
  const isVerifyingCode = verifyResetOtpMutation.isPending;

  return (
    <>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        className="flex flex-col gap-6 w-full text-right font-vazirmatn"
        dir="rtl"
        noValidate
      >
        <div className="text-right mb-2">
          <h2
            className="text-card-title font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            فراموشی رمز عبور
          </h2>

          <p className="text-label text-text-secondary mt-2 leading-relaxed">
            شماره همراهی که با آن در زدلنسر ثبت‌نام کرده‌ای وارد کن تا کد
            بازیابی رمز عبور برایت پیامک شود.
          </p>
        </div>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label="شماره همراه"
              isRequired
              placeholder="شماره همراه ۱۱ رقمی"
              value={field.value}
              onChange={field.onChange}
              error={errors.phone?.message}
              onSendCode={handleSubmit(onValidSubmit)}
              isCodeSent={false}
              isSendCodeDisabled={!isValid || isSendingCode}
              helperText="شماره همراه ثبت‌شده در حساب کاربری خود را وارد کنید."
            />
          )}
        />

        <div className="flex justify-start">
          <Link
            to="/jobseekerlogin"
            className="text-label font-bold text-text-primary hover:underline"
          >
            بازگشت به ورود با رمز عبور
          </Link>
        </div>

        {/* <Button
          type="submit"
          fullWidth
          disabled={!isValid || isSendingCode}
          className="mt-2 w-full bg-action-primary hover:bg-action-hover text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          {isSendingCode ? "در حال ارسال کد..." : "ارسال کد بازیابی"}
        </Button> */}
      </form>

      <PhoneVerificationModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isVerifyingCode) {
            setIsModalOpen(false);
            setVerificationError(null);
          }
        }}
        onEditPhone={() => {
          if (!isVerifyingCode) {
            setIsModalOpen(false);
            setVerificationError(null);
          }
        }}
        phone={otpPhone}
        onVerify={handleVerifyResetOtp}
        isLoading={isVerifyingCode}
        error={verificationError}
        onResend={handleResendCode}
        isResending={isSendingCode}
      />
    </>
  );
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (error as {
      response?: {
        data?: {
          message?: string;
        };
      };
    }).response;

    if (response?.data?.message) {
      return response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "خطایی رخ داد. لطفاً دوباره تلاش کنید.";
}