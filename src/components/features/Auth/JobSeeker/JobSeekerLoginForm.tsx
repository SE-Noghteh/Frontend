import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormValues } from "@/types/Auth/authTypes";

export function JobSeekerLoginForm() {
  const { login, isLoading, globalError, fieldErrors } = useAuth();

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 w-full text-right font-vazirmatn pb-12" 
      dir="rtl"
    >
      
      <div className="text-right mb-2">
        <h1 
          className="text-card-title font-bold mb-3" 
          style={{ color: "var(--color-blue-4)" }}
        >
          ورود به زدلنسر
        </h1>
        <p className="text-label text-text-secondary leading-relaxed">
          با شماره موبایل یا ایمیلت وارد شو و فرصت‌های مناسب با مهارتت را ببین.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-label font-medium text-text-primary">روش شناسایی</label>
        <div className="w-full">
          <SegmentedToggle
            options={[
              { label: "موبایل", value: "mobile" },
              { label: "ایمیل", value: "email" },
            ]}
            value={formData.authMethod}
            onChange={(val) => handleChange("authMethod", val)}
          />
        </div>
      </div>

      {formData.authMethod === "mobile" ? (
        <Input
          label="شماره موبایل"
          isRequired
          type="tel"
          placeholder="09xx xxx xxxx"
          helperText="شماره با ۰۹ شروع می‌شود."
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          error={fieldErrors.mobile}
        />
      ) : (
        <Input
          label="ایمیل"
          isRequired
          type="email"
          placeholder="name@example.com"
          helperText="ایمیل مرتبط با حساب را وارد کن."
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={fieldErrors.email}
        />
      )}

      <div className="flex flex-col gap-2 w-full mt-1">
        <label className="text-label font-medium text-text-primary">روش ورود</label>
        <div className="w-full">
          <SegmentedToggle
            options={[
              { label: "با رمز عبور", value: "password" },
              { label: "با کد یکبارمصرف", value: "otp" },
            ]}
            value={formData.loginMethod}
            onChange={(val) => handleChange("loginMethod", val)}
          />
        </div>
      </div>

      {formData.loginMethod === "password" ? (
        <PasswordInput
          label="رمز عبور"
          isRequired
          placeholder="••••••••"
          helperText="رمز را فراموش کردی؟"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={fieldErrors.password}
        />
      ) : (
        <Input
          label="کد تایید"
          isRequired
          type="text"
          placeholder="کد ۶ رقمی"
          helperText="کد شش‌رقمی به شماره تو ارسال می‌شود."
          value={formData.otpCode}
          onChange={(e) => handleChange("otpCode", e.target.value)}
          error={fieldErrors.otpCode}
        />
      )}

      <div className="flex items-center w-full mt-2">
        <Checkbox
          label="مرا در این دستگاه به خاطر بسپار"
          description="در دستگاه عمومی این گزینه را خاموش کن."
          checked={formData.rememberMe}
          onChange={(e) => handleChange("rememberMe", e.target.checked)}
          className="w-full"
        />
      </div>

      {globalError && (
        <div className="bg-surface-error border border-status-error text-status-error text-label p-3 rounded-md text-right w-full">
          {globalError}
        </div>
      )}

      <Button 
        type="submit" 
        fullWidth 
        disabled={isLoading} 
        className="mt-2 w-full bg-action-primary hover:bg-action-hover text-white py-3 rounded-lg font-bold transition-colors"
      >
        {isLoading ? "در حال ورود..." : formData.loginMethod === "password" ? "ورود" : "تایید کد و ورود"}
      </Button>

      <div className="text-center text-label text-text-secondary mt-4 w-full">
        حساب نداری؟{" "}
        <a href="#" className="text-blue-4 hover:underline font-bold">
          ساخت حساب
        </a>
      </div>
    </form>
  );
}