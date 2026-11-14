import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Toast } from "@/components/ui/Toast";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/schemas/loginSchema";
import type { LoginFormValues } from "@/types/Auth/authTypes";
import { useState, useEffect } from "react";

export function JobSeekerLoginForm() {
  const { login, isLoading, globalError } = useAuth();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (globalError) {
      setShowToast(true);
    }
  }, [globalError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { mobile: "", password: "" },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((values) => login(values))}
        className="flex flex-col gap-4 w-full text-right font-vazirmatn"
        dir="rtl"
        noValidate
      >
        <div className="text-right mb-2">
          <h2 className="text-card-title font-bold "
          style={{ color: "var(--color-text-primary)" }}>ورود به زدلنسر</h2>
          <p className="text-label text-text-secondary leading-relaxed">
            با شماره موبایل وارد شو و فرصت‌های مناسب با مهارتت را ببین.
          </p>
        </div>

        <Input
          label="شماره موبایل"
          isRequired
          type="tel"
          dir="rtl"
          placeholder="09xx xxx xxxx"
          error={errors.mobile?.message}
          {...register("mobile")}
        />

        <PasswordInput
          label="رمز عبور"
          isRequired
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex justify-start">
          <a
            href="/forgot-password"
            className="text-label font-bold text-text-primary hover:underline"
          >
            فراموشی رمز
          </a>
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          className="mt-2 w-full bg-action-primary hover:bg-action-hover text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          {isLoading ? "در حال ورود..." : "ورود"}
        </Button>
      </form>

      {showToast && (
        <Toast
          title="ورود انجام نشد"
          description={globalError || undefined}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}