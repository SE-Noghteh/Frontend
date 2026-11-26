import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { normalizeDigits } from "@/utils/normalizeDigits";
import { parentService } from "@/services/Auth/JobSeeker/parentInfoStepService";
import { Toast } from "@/components/ui/Toast"; 

interface ParentInfoStepProps {
  onNext: (data: Record<string, any>) => void;
  onPrev: () => void;
  defaultValues?: Record<string, any>;
  userPhone?: string;
}

export function ParentInfoStep({
  onNext,
  onPrev,
  defaultValues,
  userPhone,
}: ParentInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [apiErrorToast, setApiErrorToast] = useState<string | null>(null);

  const schema = yup.object({
    parentFirstName: yup.string().trim().required("نام والد را وارد کنید"),
    parentLastName: yup.string().trim().required("نام خانوادگی والد را وارد کنید"),
    parentPhone: yup
      .string()
      .required("شماره همراه والد را وارد کنید")
      .transform((v) => (v ? normalizeDigits(v) : v))
      .matches(/^09\d{9}$/, "شماره همراه والد باید ۱۱ رقم و با ۰۹ شروع شود")
      .test(
        "not-user-phone",
        "این شماره متعلق به خودت است\nشماره همراه دیگری برای والد وارد کن.",
        function (value) {
          if (!value || !userPhone) return true;
          return normalizeDigits(value) !== normalizeDigits(userPhone);
        }
      ),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      parentFirstName: defaultValues?.parentFirstName || "",
      parentLastName: defaultValues?.parentLastName || "",
      parentPhone: defaultValues?.parentPhone || "",
    },
  });

  const onSubmit = async (data: any) => {
    const phone = normalizeDigits(data.parentPhone);
    
    const isFirstNameChanged = data.parentFirstName !== (defaultValues?.parentFirstName || "");
    const isLastNameChanged = data.parentLastName !== (defaultValues?.parentLastName || "");
    const isPhoneChanged = phone !== normalizeDigits(defaultValues?.parentPhone || "");

    if (!isFirstNameChanged && !isLastNameChanged && !isPhoneChanged) {
      if (defaultValues?.parentPhone) {
        onNext({}); 
        return;
      }
    }

    setIsSubmitting(true);
    setApiErrorToast(null); 
  
    try {
      try {
        const inviteResponse = await parentService.inviteParent({
          first_name: data.parentFirstName,
          last_name: data.parentLastName,
          phone: phone,
        });
        
        onNext({ 
          parentPhone: phone, 
          parentFirstName: data.parentFirstName, 
          parentLastName: data.parentLastName,
          parentInvitationCode: inviteResponse.invitation_code
        });
        
      } catch (error: any) {
        if (error.response?.status === 409) {
          await parentService.connectRegisteredParent({ phone });
          
          onNext({ 
            parentPhone: phone, 
            parentFirstName: data.parentFirstName, 
            parentLastName: data.parentLastName,
            parentInvitationCode: undefined
          });
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setApiErrorToast("این والد قبلاً به حساب شما متصل شده است.");
      } else {
        setApiErrorToast(error.response?.data?.message || "خطایی در ارتباط با سرور رخ داد.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onNext({});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="text-right mb-2">
          <h2 className="text-card-title font-bold" style={{ color: "var(--color-text-primary)" }}>
            اطلاعات والد
          </h2>
          <p className="text-label text-text-secondary mt-2">
            برای شروع تجربه کاری، به همراهی و تایید یکی از والدین نیاز داری.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            label="نام والد"
            isRequired
            placeholder="نام والد را بنویس"
            {...register("parentFirstName")}
            error={errors.parentFirstName?.message as string}
            className="flex-1"
          />
          <Input
            label="نام خانوادگی والد"
            isRequired
            placeholder="نام خانوادگی والد را بنویس"
            {...register("parentLastName")}
            error={errors.parentLastName?.message as string}
            className="flex-1"
          />
        </div>

        <Input
          label="شماره همراه والد"
          isRequired
          placeholder="***********"
          {...register("parentPhone")}
          error={errors.parentPhone?.message as string}
        />


        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 sm:gap-4">
            {/* <Button
              type="button"
              variant="secondary"
              onClick={onPrev}
              className="flex-1 whitespace-nowrap"
              disabled={isSubmitting}
            >
              بازگشت
            </Button> */}
            <Button
              type="submit"
              variant="primary"
              className="flex-1 whitespace-nowrap"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت اطلاعات والد و ادامه"}
            </Button>
          </div>
          <Button type="button" variant="secondary" fullWidth onClick={handleSkip} disabled={isSubmitting}>
            بعداً در پروفایل تکمیل می‌کنم
          </Button>
        </div>
      </form>

      {apiErrorToast && (
        <Toast
          title="خطا"
          description={apiErrorToast}
          onClose={() => setApiErrorToast(null)}
          duration={6000}
        />
      )}
    </>
  );
}