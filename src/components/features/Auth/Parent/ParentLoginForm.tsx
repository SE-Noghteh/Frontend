import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthField } from "@/components/features/Auth/Parent/AuthField";
import { AuthNotice } from "@/components/features/Auth/Parent/AuthNotice";
import { Button } from "@/components/ui/Button";
import {
  getParentAuthErrorMessage,
  loginParent,
} from "@/services/Auth/Parent/parentAuthService";
import { useParentAuthStore } from "@/store/auth/useParentAuthStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { normalizePhone } from "@/utils/normalizeDigits";

const PHONE_PATTERN = /^09\d{9}$/;

export function ParentLoginForm() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] =
    useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    password?: string;
    global?: string;
  }>({});
  const [isLoading, setIsLoading] =
    useState(false);
  const [loggedIn, setLoggedIn] =
    useState(false);

  const setSession = useParentAuthStore(
    (state) => state.setSession,
  );
  const showToast = useToastStore(
    (state) => state.showToast,
  );

  const validate = () => {
    const next: typeof errors = {};

    if (!PHONE_PATTERN.test(phone)) {
      next.phone =
        "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم داشته باشد.";
    }

    if (!password) {
      next.password = "رمز عبور را وارد کن.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await loginParent(
        phone,
        password,
      );

      setSession(response, rememberMe);
      setLoggedIn(true);

      showToast({
        tone: "success",
        title: "ورود موفق بود",
        description: `خوش آمدی ${response.data.first_name}`,
      });

      navigate("/parent/case", {
        replace: true,
      });
    } catch (error) {
      setErrors({
        global: getParentAuthErrorMessage(
          error,
          "شماره موبایل یا رمز عبور درست نیست.",
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[620px] flex-col gap-4"
    >
      <div>
        <h1 className="text-page-title font-black text-text-primary">
          ورود والد
        </h1>
        <p className="mt-1 text-label leading-7 text-text-secondary">
          با شماره موبایل و رمز عبوری که هنگام ساخت حساب
          ثبت کرده‌ای وارد شو.
        </p>
      </div>

      <AuthField
        label="شماره موبایل"
        requiredMark
        type="tel"
        inputMode="tel"
        dir="ltr"
        placeholder="0912 123 4567"
        value={phone}
        error={errors.phone}
        onChange={(event) => {
          setPhone(normalizePhone(event.target.value));
          setErrors((current) => ({
            ...current,
            phone: undefined,
            global: undefined,
          }));
        }}
      />

      <AuthField
        label="رمز عبور"
        requiredMark
        password
        dir="ltr"
        placeholder="••••••••"
        value={password}
        error={errors.password}
        onChange={(event) => {
          setPassword(event.target.value);
          setErrors((current) => ({
            ...current,
            password: undefined,
            global: undefined,
          }));
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-caption text-text-primary">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) =>
              setRememberMe(event.target.checked)
            }
            className="size-4 accent-action-primary"
          />
          مرا در این دستگاه به خاطر بسپار
        </label>

        <Link
          to="/parent/forgot-password"
          className="text-caption font-bold text-action-primary hover:underline"
        >
          رمز را فراموش کرده‌ای؟
        </Link>
      </div>

      {errors.global ? (
        <AuthNotice tone="error">
          {errors.global}
        </AuthNotice>
      ) : null}

      {loggedIn ? (
        <AuthNotice tone="success">
          ورود با موفقیت انجام شد. تا زمان آماده‌شدن
          داشبورد والد، نشست ورود روی همین دستگاه ذخیره
          شده است.
        </AuthNotice>
      ) : null}

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        className="mt-1"
      >
        ورود
      </Button>

      <p className="text-center text-caption text-text-secondary">
        هنوز حساب والد نداری؟{" "}
        <Link
          to="/parent/signup"
          className="font-bold text-action-primary hover:underline"
        >
          ساخت حساب
        </Link>
      </p>

      <AuthNotice>
        ثبت‌نام والد فقط با کد دعوت معتبر فرزند امکان‌پذیر
        است.
      </AuthNotice>
    </form>
  );
}
