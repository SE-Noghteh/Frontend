import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { registerAccountSchema, type RegisterAccountFormValues } from "@/schemas/registerJobSeekerSchema";
import { useState } from "react";
import { PhoneVerificationModal } from "../PhoneVerificationModal"; 
import { PasswordCriteria } from "@/components/features/Auth/JobSeeker/PasswordCriteria";
import { useJobSeekerSignup, useJobSeekerVerifyOtp, useJobSeekerResendOtp } from "@/hooks/JobSeeker/useJobSeekerSignup";

interface AccountStepProps {
  onNext: (data: RegisterAccountFormValues) => void;
  onPrev: () => void;
  defaultValues?: Partial<RegisterAccountFormValues>;
  basicData: any;
}

export function AccountStep({ onNext, onPrev, defaultValues, basicData }: AccountStepProps) {
  const { register, handleSubmit, trigger, getValues, watch, formState: { errors, touchedFields, isValid } } = useForm<RegisterAccountFormValues>({
    resolver: yupResolver(registerAccountSchema),
    mode: "onTouched",
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      ...defaultValues
    }
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [verificationError, setVerificationError] = useState<string | null>(null);
  
  const { mutate: signup } = useJobSeekerSignup();
  const { mutate: verifyOtp, isPending: isVerifying } = useJobSeekerVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useJobSeekerResendOtp();

  const password = watch("password", "");
  const phone = watch("phone", "");

  const handleSendCode = async () => {
    const isPhoneValid = await trigger("phone");
    if (!isPhoneValid) return;

    setVerificationError(null);
    setIsModalOpen(true);

    signup(
      { basicData, accountData: getValues() },
      {
        onSuccess: () => {
          resendOtp(phone, {
            onSuccess: () => {
              setIsCodeSent(true);
            },
            onError: (err: any) => {
              setVerificationError(err.response?.data?.message || "خطا در ارسال پیامک");
            }
          });
        },
        onError: (err: any) => {
          setVerificationError(err.response?.data?.message || "خطا در ثبت اطلاعات");
        }
      }
    );
  };

  const handleVerifyCode = (code: string) => {
    verifyOtp(
      { phone, code },
      {
        onSuccess: () => {
          setIsCodeSent(true);
          setIsModalOpen(false);
          onNext(getValues()); 
        },
        onError: (err: any) => {
          setVerificationError(err.response?.data?.message || "کد وارد شده اشتباه است");
        }
      }
    );
  };

  const handleResendOtp = (onSuccessCallback: () => void) => {
    resendOtp(phone, {
      onSuccess: () => {
        setVerificationError(null);
        onSuccessCallback();
      },
      onError: (err: any) => {
        setVerificationError(err.response?.data?.message || "خطا در ارسال مجدد کد");
      },
    });
  };

  const onSubmitHandler = (data: RegisterAccountFormValues) => {
    if (!isCodeSent) {
      setVerificationError("لطفاً ابتدا شماره همراه خود را با کد پیامکی تأیید کنید.");
      setIsModalOpen(true);
      return;
    }
    onNext(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-6">
        <div className="text-right mb-2">
          <h2 className="text-card-title font-bold" style={{ color: "var(--color-text-primary)" }}>اطلاعات حساب</h2>
          <p className="text-label text-text-secondary mt-2">شماره همراه و یک رمز مطمئن، کلید ورود تو به زدلنسر است.</p>
        </div>

        <PhoneInput
          label="شماره همراه"
          isRequired
          placeholder="شماره همراه ۱۱ رقمی"
          {...register("phone", {
            onChange: () => {
              setVerificationError(null);
              setIsCodeSent(false);
            }
          })}
          value={phone}
          error={verificationError || errors.phone?.message} 
          onSendCode={handleSendCode}
          isCodeSent={isCodeSent}
          helperText="برای تایید شماره، روی ارسال کد کلیک کنید."
        />

        <PasswordInput
          label="رمز عبور"
          isRequired
          placeholder="رمز عبور را با دقت وارد کنید"
          {...register("password")}
          error={errors.password?.message}
        >
           <PasswordCriteria password={password} isTouched={touchedFields.password} />
        </PasswordInput>

        <PasswordInput
          label="تکرار رمز عبور"
          isRequired
          placeholder="رمز عبور را دوباره وارد کنید"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <div className="flex flex-col gap-3 mt-2">
          <Checkbox
            label="قوانین زدلنسر و حریم خصوصی را می‌پذیرم. *"
            hasError={!!errors.termsAccepted} 
            {...register("termsAccepted")}
          />
          
          <div className="flex items-center gap-4 pr-7">
            <a href="#" className="text-label text-interface-secondary hover:underline">
              قوانین زدلنسر
            </a>
            <a href="#" className="text-label text-interface-secondary hover:underline">
              حریم خصوصی
            </a>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4 mt-6">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onPrev} 
            className="flex-1 whitespace-nowrap"
          >
            بازگشت
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="flex-1 whitespace-nowrap"
            disabled={!isValid}
          >
            <span className="inline sm:hidden">ادامه</span>
            <span className="hidden sm:inline">ادامه: اطلاعات والد</span>
          </Button>
        </div>
      </form>

      <PhoneVerificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onEditPhone={() => {
          setIsModalOpen(false);
          setIsCodeSent(false);
        }}
        phone={phone} 
        onVerify={handleVerifyCode} 
        isLoading={isVerifying}
        error={verificationError}
        onResend={handleResendOtp}
        isResending={isResending}
      />
    </>
  );
}