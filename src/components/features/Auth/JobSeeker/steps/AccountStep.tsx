import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { registerAccountSchema, type RegisterAccountFormValues } from "@/schemas/registerJobSeekerSchema";
import { useState } from "react";
import { PhoneVerificationModal } from "../PhoneVerificationModal"; 
import {PasswordCriteria} from "@/components/features/Auth/JobSeeker/PasswordCriteria";


interface AccountStepProps {
  onNext: (data: RegisterAccountFormValues) => void;
  onPrev: () => void;
  defaultValues?: Partial<RegisterAccountFormValues>;
}

export function AccountStep({ onNext, onPrev, defaultValues }: AccountStepProps) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitted, touchedFields } } = useForm<RegisterAccountFormValues>({
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
  
  const password = watch("password", "");
  const phone = watch("phone", "");

  const handleSendCode = () => {
    if (phone.length === 11) {
      setIsModalOpen(true); 
    } else {
    }
  };

  const handleVerifyCode = (code: string) => {
    // API 
    console.log("Code submitted:", code);
    setIsCodeSent(true);
    setIsModalOpen(false);
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

  return (
    <>
      <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-6">
        <div className="text-right mb-2">
          <h2 className="text-card-title font-bold" style={{ color: "var(--color-text-primary)" }}>اطلاعات حساب</h2>
          <p className="text-label text-text-secondary mt-2">شماره همراه و یک رمز مطمئن، کلید ورود تو به زدلنسر است.</p>
        </div>


        <PhoneInput
          label="شماره همراه"
          isRequired
          placeholder="شماره همراه ۱۱ رقمی"
          {...register("phone")}
          error={errors.phone?.message}
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

        <div className="flex gap-4 mt-6">
          <Button type="button" variant="secondary" onClick={onPrev} className="flex-1">
            بازگشت
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            ادامه: اطلاعات والد
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
      />
    </>
  );
}