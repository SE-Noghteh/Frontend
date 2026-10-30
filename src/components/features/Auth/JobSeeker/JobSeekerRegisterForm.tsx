import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/RadioGroup"; 
import { FileUploadBox } from "./FileUploadBox";
import { RegisterStepper } from "./RegisterStepper";
import { SkillsSelector } from "./SkillsSelector";
import { IdentityInstructionsBox } from "./IdentityInstructionsBox"; 
import { VideoUploadBox } from "./VideoUploadBox";
import { AgeStatusBox } from "./AgeStatusBox";
import { registerSchema, type RegisterFormValues } from "@/schemas/registerSchema";
import { genderOptions, provinceOptions, cityOptions, dayOptions, monthOptions, yearOptions } from "@/data/registerData";
import { useEffect } from "react";

export function JobSeekerRegisterForm() {
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      gender: "",
      province: "",
      city: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      skills: [],
    }
  });

  const idCardImage = watch("idCardImage");
  const identityVideo = watch("identityVideo");
  const selectedProvince = watch("province");

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const birthDay = watch("birthDay");
  const birthMonth = watch("birthMonth");
  const birthYear = watch("birthYear");

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const monthName = monthOptions.find(m => m.value === birthMonth)?.label;
  const birthDate = birthDay && monthName && birthYear ? `${birthDay} ${monthName} ${birthYear}` : "";

  useEffect(() => {
    setValue("city", "");
  }, [selectedProvince, setValue]);

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form Data:", data);
  };

  const currentCityOptions = selectedProvince ? cityOptions[selectedProvince] || [] : [];

  return (
    <div className="w-full flex flex-col gap-6">
      <RegisterStepper currentStep={1} />
      
      <div className="text-right mb-2">
        <h2 className="text-card-title font-bold" style={{ color: "var(--color-text-primary)" }}>اطلاعات پایه</h2>
        <p className="text-label text-text-secondary mt-1">اول کمی از خودت بگو تا فرصت‌های مناسب تو را پیدا کنیم.</p>
        <p className="text-caption text-text-secondary mt-1">فیلدهای ستاره‌دار الزامی‌اند.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="نام" isRequired placeholder="نامت را بنویس" {...register("firstName")} error={errors.firstName?.message} />
          <Input label="نام خانوادگی" isRequired placeholder="نام خانوادگی ات را بنویس" {...register("lastName")} error={errors.lastName?.message} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="استان" isRequired options={provinceOptions} {...register("province")} error={errors.province?.message} />
          <Select label="شهر" isRequired options={currentCityOptions} disabled={!selectedProvince} {...register("city")} error={errors.city?.message}  />
        </div>
        <p className="text-caption text-text-secondary -mt-2 text-right">با تغییر استان، شهر ناسازگار پاک می‌شود.</p>

        <Input 
          label="نشانی کامل محل سکونت" 
          isRequired 
          {...register("address")} 
          error={errors.address?.message}
          helperText="نشانی خصوصی است و در پروفایل عمومی نمایش داده نمی‌شود." 
        />

        <Input 
          label="کد پستی" 
          isRequired 
          placeholder="**********" 
          {...register("postalCode")} 
          error={errors.postalCode?.message} 
        />

        <Input 
          label="کد ملی" 
          isRequired 
          placeholder="کد ملی ۱۰ رقمی" 
          {...register("nationalCode")} 
          error={errors.nationalCode?.message}
          helperText="بدون خط تیره و فاصله" 
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-label text-text-primary font-medium mb-1">
            تاریخ تولد شمسی <span className="text-status-error">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <Select label="روز" options={dayOptions} {...register("birthDay")} error={errors.birthDay?.message ? " " : ""} />
            <Select label="ماه" options={monthOptions} {...register("birthMonth")} error={errors.birthMonth?.message ? " " : ""} />
            <Select label="سال" options={yearOptions} {...register("birthYear")} error={errors.birthYear?.message ? " " : ""} />
          </div>
          {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
            <p className="text-caption text-status-error mt-1">تاریخ تولد کامل را انتخاب کنید.</p>
          )}

          <AgeStatusBox 
            year={birthYear} 
            month={birthMonth} 
            day={birthDay} 
          />
        </div>

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label="جنسیت"
              isRequired
              options={genderOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.gender?.message}
            />
          )}
        />

        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-label text-text-primary font-medium">تصویر صفحه اول شناسنامه کارجو <span className="text-status-error">*</span></label>
          <FileUploadBox 
            title="تصویر صفحه اول شناسنامه کارجو" 
            description="تصویر را اینجا بکش یا انتخاب کن" 
            subDescription="تصویر خوانا، بدون برش و بدون انعکاس نور" 
            buttonText="انتخاب تصویر" 
            accept="image/*"
            value={idCardImage as unknown as File}
            onChange={(file) => setValue("idCardImage", file as any, { shouldValidate: true })}
            error={errors.idCardImage?.message}
          />
          <p className="text-caption text-text-secondary text-right leading-relaxed mt-1">
            فرمت مجاز: تصویر جی‌پی‌جی یا پی‌ان‌جی - حداکثر ۵ مگابایت.
            <br />
            تصویر شناسنامه فقط برای بررسی هویت استفاده می‌شود و عمومی نیست.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <label className="text-label text-text-primary font-medium">
            ویدیو تایید هویت کارجو <span className="text-status-error">*</span>
          </label>
          
          <IdentityInstructionsBox 
            fullName={fullName} 
            birthDate={birthDate} 
          />

          <VideoUploadBox
            value={identityVideo as unknown as File}
            onChange={(file) => setValue("identityVideo", file as any, { shouldValidate: true })}
            error={errors.identityVideo?.message}
          />

          <p className="text-caption text-text-secondary text-right leading-relaxed mt-1">
            فرمت مجاز: MP4 یا MOV - بین ۵ تا ۲۰ ثانیه - حداکثر ۵۰ مگابایت.
            <br />
            ویدیو فقط برای بررسی هویت استفاده می‌شود و عمومی نیست.
          </p>
          {errors.identityVideo && (
            <p className="text-caption text-status-error mt-1">{errors.identityVideo.message}</p>
          )}
        </div>


        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <SkillsSelector
              value={field.value || []}
              onChange={field.onChange}
              error={errors.skills?.message}
            />
          )}
        />

        <div className="flex items-center gap-4 mt-4">
          <Button type="submit" variant="primary" fullWidth>
            ادامه: اطلاعات حساب
          </Button>
        </div>
        
        <p className="text-caption text-text-secondary text-right mt-2">
          اطلاعات خصوصی است و فقط برای ساخت پروفایل استفاده می‌شود.
        </p>
      </form>
    </div>
  );
}