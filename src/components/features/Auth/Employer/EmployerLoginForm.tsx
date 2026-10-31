import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormValues } from "@/types/Auth/authTypes";

export function EmployerLoginForm() {
  const { login, isLoading, globalError } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const [formData, setFormData] = useState<LoginFormValues>({
    authMethod: "mobile",
    loginMethod: "password",
    mobile: "",
    email: "",
    password: "",
    otpCode: "",
    rememberMe: false,
  });

  const handleChange = (field: keyof LoginFormValues, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (localError) setLocalError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.mobile.trim() || !formData.password?.trim()) {
      setLocalError("شماره موبایل و رمز عبور را وارد کنید");
      return;
    }

    const mobileRegex = /^09\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setLocalError("شماره موبایل معتبر نیست. شماره باید با 09 شروع شود و 11 رقم داشته باشد");
      return;
    }

    login(formData);
  };

  const displayError = (() => {
    if (localError) return localError;
    if (globalError) {
      if (
        globalError.includes("رمز") || 
        globalError.includes("نادرست") || 
        globalError.includes("اطلاعات ورود")
      ) {
        return "اطلاعات ورود نادرست است؛ رمز عبور را دوباره بررسی کنید";
      }
      return globalError;
    }
    return null;
  })();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full text-right font-vazirmatn pb-12"
      dir="rtl"
    >
      <div className="text-right mb-3">
        <h1 style={{ fontFamily: "Vazirmatn", fontSize: "32px", fontWeight: "bold", color: "#262321" }}>
          ورود کارفرما
        </h1>
        <p className="text-label text-text-secondary leading-relaxed">
          با شمارهٔ موبایل و رمز عبور وارد پنل کارفرما شو و آگهی‌ها و همکاری‌هایت را مدیریت کن.
        </p>
      </div>

      <Input
        label="شماره موبایل"
        isRequired
        type="tel"
        dir="rtl"
        placeholder="09xx xxx xxxx"
        helperText="شماره موبایل خود را وارد کنید." 
        value={formData.mobile}
        onChange={(e) => handleChange("mobile", e.target.value)}
      />

      <PasswordInput
        label="رمز عبور"
        isRequired
        placeholder="••••••••"
        helperText="رمز عبور خود را وارد کنید."
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
      >
        <a
          href="/employer/forgot-password"
          className="text-label font-bold text-action-primary hover:underline mt-2 inline-block"
        >
          فراموشی رمز
        </a>
      </PasswordInput>

      <ErrorBox message={displayError} />

      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        className={`mt-2 w-full flex items-center justify-center gap-2 text-white py-2.5 rounded-lg font-bold transition-all ${
          isLoading 
            ? "bg-action-primary/80 cursor-not-allowed disabled:!bg-action-primary/80 disabled:!text-white" 
            : "bg-action-primary hover:bg-action-hover disabled:opacity-50"
        }`}
      >
        {isLoading && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isLoading ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}