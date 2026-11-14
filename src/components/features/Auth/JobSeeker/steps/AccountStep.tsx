import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { registerAccountSchema, type RegisterAccountFormValues } from "@/schemas/registerJobSeekerSchema";
import { useState, useEffect } from "react";
import { PhoneVerificationModal } from "../PhoneVerificationModal"; 
import {PasswordCriteria} from "@/components/features/Auth/JobSeeker/PasswordCriteria";
import { useJobSeekerSignup, useJobSeekerVerifyOtp, useJobSeekerResendOtp } from "@/hooks/JobSeeker/useJobSeekerSignup";


interface AccountStepProps {
  onNext: (data: RegisterAccountFormValues) => void;
  onPrev: () => void;
  defaultValues?: Partial<RegisterAccountFormValues>;
  basicData: any;
}

export function AccountStep({ onNext, onPrev, defaultValues, basicData }: AccountStepProps & { basicData: any }) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitted, touchedFields, isValid } } = useForm<RegisterAccountFormValues>({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingAccountData, setPendingAccountData] = useState<RegisterAccountFormValues | null>(null);
  const { mutate: signup, isPending: isSigningUp, error: signupError } = useJobSeekerSignup();
  const { mutate: verifyOtp, isPending: isVerifying } = useJobSeekerVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useJobSeekerResendOtp();

  useEffect(() => {
    setIsSubmitting(false);
  }, []);
  
  const password = watch("password", "");
  const phone = watch("phone", "");

  const handleSendCode = () => {
    if (phone.length === 11) {
      setIsModalOpen(true); 
    } else {
    }
  };

  const handleVerifyCode = (code: string) => {
    verifyOtp(
      { phone, code },
      {
        onSuccess: () => {
          setIsCodeSent(true);
          setIsModalOpen(false);
          if (pendingAccountData) {
            onNext(pendingAccountData);
          }
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
        onSuccessCallback();
      },
      onError: (err: any) => {
        console.error("Resend error:", err);
      }
    });
  };

  const getGlobalErrors = () => {
    const errorMessages: string[] = [];
    if (isSubmitted || Object.keys(errors).length > 0) {
      if (errors.phone) errorMessages.push("شماره همراه معتبر نیست یا وارد نشده است.");
      if (errors.password) errorMessages.push("رمز عبور با قوانین مطابقت ندارد.");
      if (errors.confirmPassword) errorMessages.push("تکرار رمز عبور با رمز عبور یکسان نیست.");
      if (errors.termsAccepted) errorMessages.push("پذیرش قوانین و حریم خصوصی الزامی است.");
    }
    return errorMessages;
  };

  const onSubmitHandler = (data: RegisterAccountFormValues) => {
    if (!isCodeSent) {
      setVerificationError("شماره همراه باید با کد پیامکی تأیید شود.");
      return;
    }
    setVerificationError(null);
    
    setPendingAccountData(data);

    signup(
      { basicData, accountData: data },
      {
        onSuccess: () => {
          setIsModalOpen(true);
        },
        onError: (err: any) => {
          setVerificationError(err.response?.data?.message || "خطا در ثبت‌نام. لطفا دوباره تلاش کنید.");
        }
      }
    );
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
          onSendCode={() => {
            setVerificationError(null); 
            handleSendCode();
          }}
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
            disabled={isSigningUp}  
            className="flex-1 whitespace-nowrap"
          >
            بازگشت
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="flex-1 whitespace-nowrap"
            disabled={!isValid || isSigningUp}
            leftIcon={
              isSigningUp  ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null
            }
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