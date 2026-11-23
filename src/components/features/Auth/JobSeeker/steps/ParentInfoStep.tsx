import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { normalizeDigits } from "@/utils/normalizeDigits";

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
  const schema = yup.object({
    parentFullName: yup.string().trim().required("نام و نام خانوادگی والد را وارد کنید"),
    parentPhone: yup
      .string()
      .required("شماره همراه والد را وارد کنید")
      .transform((v) => (v ? normalizeDigits(v) : v))
      .matches(/^09\d{9}$/, "شماره همراه والد باید ۱۱ رقم و با ۰۹ شروع شود")
      .test(
        "not-user-phone",
        "این شماره متعلق به خودت است\nشماره همراه دیگری برای والد وارد کن، دعوت نامه هنوز ارسال نشده است",
        function (value) {
          if (!value || !userPhone) return true;
          return normalizeDigits(value) !== normalizeDigits(userPhone);
        }
      ),
  }).required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      parentFullName: "",
      parentPhone: "",
      ...defaultValues,
    },
  });

  const parentPhone = watch("parentPhone");

  const handleSkip = () => {
    onNext({});
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-6">
      <div className="text-right mb-2">
        <h2
          className="text-card-title font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          اطلاعات والد
        </h2>
        <p className="text-label text-text-secondary mt-2">
          برای شروع تجربه کاری، به همراهی و تایید یکی از والدین نیاز داری.
        </p>
      </div>

      <Input
        label="نام و نام خانوادگی والد"
        isRequired
        placeholder="نام و نام خانوادگی والد را بنویس"
        {...register("parentFullName")}
        error={errors.parentFullName?.message as string}
        helperText="اطلاعات پدر، مادر یا سرپرست قانونی"
      />

      <Input
        label="شماره همراه والد"
        isRequired
        placeholder="***********"
        {...register("parentPhone")}
        value={parentPhone}
        error={errors.parentPhone?.message as string}
        helperText="پیامک دعوت به این شماره ارسال می‌شود. والد شماره خود را هنگام ساخت حساب تایید می‌کند."
      />

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex gap-3 sm:gap-4">
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
            ثبت اطلاعات والد و ادامه
          </Button>
        </div>
        <Button type="button" variant="secondary" fullWidth onClick={handleSkip}>
          بعداً در پروفایل تکمیل می‌کنم
        </Button>
      </div>
    </form>
  );
}