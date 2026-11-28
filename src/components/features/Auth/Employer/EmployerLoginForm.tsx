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
  const [fieldErrors, setFieldErrors] = useState<{ mobile?: string; password?: string }>({});

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
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setFieldErrors({});

    const newErrors: { mobile?: string; password?: string } = {};
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = "شماره موبایل را وارد کنید";
    } else {
      const mobileRegex = /^09\d{9}$/;
      if (!mobileRegex.test(formData.mobile)) {
        newErrors.mobile = "شماره موبایل معتبر نیست. شماره باید با 09 شروع شود و 11 رقم داشته باشد";
      }
    }

    if (!formData.password?.trim()) {
      newErrors.password = "رمز عبور را وارد کنید";
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    login(formData);
  };

  const errorTitle = globalError ? globalError.split('\n')[0] : null;
  const errorDesc = globalError && globalError.includes('\n') ? globalError.split('\n')[1] : null;

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
        error={fieldErrors.mobile}
      />

      <PasswordInput
        label="رمز عبور"
        isRequired
        placeholder="••••••••"
        helperText="رمز عبور خود را وارد کنید."
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={fieldErrors.password}
      >
        <a
          href="/employer/forgot-password"
          className="text-label font-bold text-action-primary hover:underline mt-2 inline-block"
        >
          فراموشی رمز
        </a>
      </PasswordInput>

      <ErrorBox 
        title={errorTitle || undefined} 
        description={errorDesc || undefined} 
        message={localError || undefined} 
      />

      {/* استفاده از کامپوننت Button جدید */}
      <Button
        type="submit"
        loading={isLoading}
        fullWidth
        className="mt-2"
      >
        {isLoading ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}