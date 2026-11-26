
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";

import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/schemas/resetPasswordSchema";

import { useResetPassword } from "@/hooks/JobSeeker/useResetPassword";

interface ResetPasswordLocationState {
  resetToken?: string;
}

export function JobSeekerResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const locationState =
    location.state as ResetPasswordLocationState | null;

  const resetToken = locationState?.resetToken;

  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isValid,
    },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password", "");

  useEffect(() => {
    if (!resetToken) {
      navigate("/jobseekerlogin/forgot-password", {
        replace: true,
      });
    }
  }, [resetToken, navigate]);

  const onSubmitHandler = async (data: ResetPasswordFormValues) => {
    if (!resetToken) {
      navigate("/jobseekerlogin/forgot-password", {
        replace: true,
      });
      return;
    }

    try {
      setSubmitError(null);

      await resetPasswordMutation.mutateAsync({
        reset_token: resetToken,
        new_password: data.password,
      });

      setShowToast(true);
      navigate("/jobseekerlogin", {
        replace: true,
        state: {
          passwordResetSuccess: true,
        },
      });
    } catch (error) {
      console.error("Reset password error:", error);
      setSubmitError(getErrorMessage(error));
    }
  };

  if (!resetToken) {
    return null;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-6 w-full text-right font-vazirmatn"
        dir="rtl"
        noValidate
      >
        <div className="text-right mb-2">
          <h2
            className="text-card-title font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            تعیین رمز عبور جدید
          </h2>

          <p className="text-label text-text-secondary mt-2 leading-relaxed">
            کد تأیید شماره همراه شما با موفقیت بررسی شد. حالا یک رمز عبور
            جدید برای حساب کاربری خود انتخاب کنید.
          </p>
        </div>

        <PasswordInput
          label="رمز عبور جدید"
          isRequired
          placeholder="رمز عبور جدید را وارد کنید"
          {...register("password")}
          error={errors.password?.message}
          autoComplete="new-password"
        />

        <PasswordInput
          label="تکرار رمز عبور جدید"
          isRequired
          placeholder="رمز عبور را دوباره وارد کنید"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
        />

        {submitError && (
          <p
            className="text-caption text-status-error text-right"
            role="alert"
          >
            {submitError}
          </p>
        )}

        <div className="flex gap-3 sm:gap-4 mt-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1 whitespace-nowrap"
            disabled={!isValid || resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending
              ? "در حال ثبت رمز..."
              : "ثبت رمز عبور جدید"}
          </Button>
        </div>
      </form>
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

  return "تغییر رمز عبور انجام نشد. لطفاً دوباره تلاش کنید.";
}
