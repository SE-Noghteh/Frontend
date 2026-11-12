import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Button } from "@/components/ui/Button";
import { getDetailedAge } from "@/utils/getDetailedAge";
import { normalizeDigits } from "@/utils/normalizeDigits";

interface ParentInfoStepProps {
  onNext: (data: Record<string, any>) => void;
  onPrev: () => void;
  defaultValues?: Record<string, any>;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  userPhone?: string;
}

export function ParentInfoStep({
  onNext,
  onPrev,
  defaultValues,
  birthYear,
  birthMonth,
  birthDay,
  userPhone,
}: ParentInfoStepProps) {
  const { years, months, days, totalYears } = getDetailedAge(birthYear, birthMonth, birthDay);
  
  const isRequired = totalYears >= 15 && totalYears < 18;

  const ageText = `${years} سال و ${months} ماه و ${days} روز`;

  const schema = yup.object({
    parentFullName: isRequired
      ? yup.string().trim().required("نام و نام خانوادگی والد را وارد کنید")
      : yup.string().trim(),
      parentPhone: isRequired
      ? yup
          .string()
          .required("شماره همراه والد را وارد کنید")
          .transform((v) => (v ? normalizeDigits(v) : v))
          .matches(/^09\d{9}$/, "شماره همراه والد باید ۱۱ رقم و با ۰۹ شروع شود")
          .test("not-user-phone", "این شماره متعلق به خودت است\nشماره همراه دیگری برای والد وارد کن، دعوت نامه هنوز ارسال نشده است", function (value) {
            if (!value || !userPhone) return true;
            return normalizeDigits(value) !== normalizeDigits(userPhone);
          })
      : yup
          .string()
          .transform((v) => (v ? normalizeDigits(v) : v))
          .test("parent-phone-valid", "شماره همراه والد معتبر نیست", (v) =>
            !v ? true : /^09\d{9}$/.test(v)
          )
          .test("not-user-phone", "این شماره متعلق به خودت است\nشماره همراه دیگری برای والد وارد کن، دعوت نامه هنوز ارسال نشده است", function (value) {
            if (!value || !userPhone) return true;
            return normalizeDigits(value) !== normalizeDigits(userPhone);
          }),
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

  const parentPhone = watch("parentPhone", "");
  const canContinue = isRequired ? isValid : true;

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
          {isRequired 
            ? "برای شروع تجربه کاری، به همراهی و تایید یکی از والدین نیاز داری."
            : " برای گروه سنی ۱۸ تا ۲۲ سال، تکمیل اطلاعات والد کاملاً اختیاری است."}
        </p>
      </div>

      {isRequired ? (
        <div className="w-full p-4 rounded-md flex items-start gap-3 border-r-4 text-right mt-2 bg-[#fdf8eb] border-[#e5c07b] text-[#8c6b22]">
          <div className="mt-0.5 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-label font-bold">تأیید والد برای سن تو لازم است</span>
            <span className="text-caption leading-relaxed">
              {ageText} داری. می‌توانی این مرحله را بعداً کامل کنی؛ تا تأیید والد، فعالیت کاری‌ات محدود می‌ماند.
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full p-4 rounded-md flex items-start gap-3 border-r-4 text-right mt-2 bg-[#f0f6fa] border-[#a8c4d9] text-[#3d6a8f]">
          <div className="mt-0.5 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-label font-bold">می‌توانی این مرحله را رد کنی</span>
            <span className="text-caption leading-relaxed">
              تکمیل‌نکردن اطلاعات والد هیچ محدودیتی برای حساب  تو ایجاد نمی‌کند. هر زمان خواستی، از پنل تکمیلش کن.
            </span>
          </div>
        </div>
      )}

      <Input
        label="نام و نام خانوادگی والد"
        isRequired={isRequired}
        placeholder="نام و نام خانوادگی والد را بنویس"
        {...register("parentFullName")}
        error={errors.parentFullName?.message as string}
        helperText="اطلاعات پدر، مادر یا سرپرست قانونی"
      />

      <Input
        label="شماره همراه والد"
        isRequired={isRequired}
        placeholder="***********"
        {...register("parentPhone")}
        value={parentPhone}
        error={errors.parentPhone?.message as string}
        helperText="پیامک دعوت به این شماره ارسال می‌شود .والد شماره خود را هنگام ساخت حساب تایید میکند."
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
            disabled={!canContinue}
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