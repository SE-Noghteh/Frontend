import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Toast } from "@/components/ui/Toast";
import { PhoneVerificationModal } from "@/components/features/Auth/JobSeeker/PhoneVerificationModal"; 
import { useOtpLogin } from "@/hooks/useOtpLogin";
import { otpLoginSchema } from "@/schemas/otpLoginSchema";
import type { OtpLoginFormValues } from "@/types/Auth/authTypes";

export function JobSeekerOtpLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpPhone, setOtpPhone] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { sendCode, verifyCode, isSending, isVerifying, error: otpError, setError: setOtpError } = useOtpLogin();

  const { control, handleSubmit, formState: { errors } } = useForm<OtpLoginFormValues>({
    resolver: yupResolver(otpLoginSchema),
    defaultValues: { phone: "" }, 
    mode: "onChange", 
  });

  const onValidSubmit = async (data: OtpLoginFormValues) => {
    setOtpError(null);
    const success = await sendCode(data.phone, "login");
    if (success) {
      setOtpPhone(data.phone);
      setIsModalOpen(true);
    } else {
      setShowToast(true); 
    }
  };

  const onVerifyCode = async (code: string) => {
    const success = await verifyCode(otpPhone, code);
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit(onValidSubmit)} 
        className="flex flex-col gap-6 w-full text-right font-vazirmatn" 
        dir="rtl" 
        noValidate
      >
        <div>
          <h2 className="text-card-title font-bold "
          style={{ color: "var(--color-text-primary)" }}>ورود با کد پیامکی</h2>
          <p className="text-label text-text-secondary leading-relaxed">
            رمز را نمی‌دانی؟ کد یکبارمصرف به شماره‌ات پیامک می‌شود.
          </p>
        </div>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label="شماره موبایل"
              isRequired
              placeholder="09xx xxx xxxx"
              error={errors.phone?.message} 
              value={field.value}
              onChange={field.onChange}
              onSendCode={handleSubmit(onValidSubmit)} 
              isCodeSent={false}
            />
          )}
        />
        
        <div className="flex justify-start">
          <Link to="/jobseekerlogin" className="text-label font-bold text-text-primary hover:underline">
            بازگشت به ورود با رمز عبور
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isSending}
          className="mt-2 w-full bg-action-primary hover:bg-action-hover text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          {isSending ? "در حال ارسال..." : "ورود"}
        </Button>
      </form>

      <PhoneVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEditPhone={() => setIsModalOpen(false)}
        phone={otpPhone}
        onVerify={onVerifyCode}
        isLoading={isVerifying}
        error={otpError}
        onResend={async (onSuccess) => {
          const success = await sendCode(otpPhone, "login");
          if (success) {
            setOtpError(null);
            onSuccess();
          } else {
            setShowToast(true);
          }
        }}
        isResending={isSending}
      />

      {showToast && (
        <Toast
          title="خطا در ارسال کد"
          description={otpError || undefined}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}