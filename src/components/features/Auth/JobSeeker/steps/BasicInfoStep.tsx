import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/RadioGroup"; 
import { FileUploadBox } from "../FileUploadBox";
import { SkillsSelector } from "../SkillsSelector";
import { IdentityInstructionsBox } from "../IdentityInstructionsBox"; 
import { VideoUploadBox } from "../VideoUploadBox"; 
import { registerBasicSchema, type RegisterBasicFormValues } from "@/schemas/registerJobSeekerSchema";
import { monthOptions } from "@/data/registerData";
import { useEffect, useRef } from "react";
import { useSignupOptions, useProvinces, useCities } from "@/hooks/JobSeeker/useJobSeekerSignup";
import { FormBirthDateInput } from "@/components/features/Auth/JobSeeker/FormBirthDateInput";
import { DateObject } from "react-multi-date-picker"; 

interface BasicInfoStepProps {
  onNext: (data: RegisterBasicFormValues) => void;
  defaultValues?: Partial<RegisterBasicFormValues>;
}

export function BasicInfoStep({ onNext, defaultValues }: BasicInfoStepProps) {
  const { data: options, isLoading: isLoadingOptions } = useSignupOptions();
  const { data: provinceList, isLoading: isLoadingProvinces } = useProvinces();

  const methods = useForm<RegisterBasicFormValues>({
    resolver: yupResolver(registerBasicSchema),
    mode: "onTouched",
    defaultValues: {
      gender: "",
      province: "",
      city: "",
      birthDateObj: null as any, 
      interests: [],
      ...defaultValues,
    }
  });
  
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = methods;

  const idCardImage = watch("idCardImage");
  const identityVideo = watch("identityVideo");
  const selectedProvince = watch("province");

  const { data: citiesList, isLoading: isLoadingCities } = useCities(selectedProvince);

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  
  const birthDateObj = watch("birthDateObj") as DateObject | null;
  const birthYear = birthDateObj?.year?.toString() || "";
  const birthMonth = birthDateObj?.month?.number?.toString() || "";
  const birthDay = birthDateObj?.day?.toString() || "";

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const monthName = monthOptions.find(m => 
    m.value === birthMonth || 
    m.value === String(Number(birthMonth)) || 
    m.value === birthMonth?.padStart(2, '0')
  )?.label;

  const birthDate = birthDay && monthName && birthYear ? `${birthDay} ${monthName} ${birthYear}` : "";
  const rawCityList = Array.isArray(citiesList) 
  ? citiesList 
  : (citiesList as any)?.data || (citiesList as any)?.cities || [];

  const cityOptions = rawCityList.map((city: any) => 
    typeof city === "string" ? { label: city, value: city } : { label: city.name ?? city.title ?? String(city), value: city.name ?? city.title ?? String(city) }
  );
  const genderOptions = options?.genders.map(gender => ({ 
    label: gender === "male" ? "مرد" : "زن", 
    value: gender 
  })) || [];

  const rawProvinceList = Array.isArray(provinceList) 
  ? provinceList 
  : (provinceList as any)?.data || (provinceList as any)?.provinces || [];

  const provinceOptions = rawProvinceList.map((p: any) =>
    typeof p === "string"
      ? { label: p, value: p }
      : { label: p.name ?? p.title ?? String(p), value: p.name ?? p.title ?? String(p) }
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setValue("city", "");
  }, [selectedProvince, setValue]);

  useEffect(() => {
    if (defaultValues?.idCardImage) setValue("idCardImage", defaultValues.idCardImage);
    if (defaultValues?.identityVideo) setValue("identityVideo", defaultValues.identityVideo);
  }, [defaultValues, setValue]);

  if (isLoadingOptions || isLoadingProvinces) {
    return <div className="text-center p-4">در حال دریافت اطلاعات...</div>; 
  }

  return (
   <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
      <div className="text-right mb-2">
        <h2 className="text-card-title font-bold " style={{ color: "var(--color-text-primary)" }}>اطلاعات پایه</h2>
        <p className="text-label text-text-secondary mt-1">اول کمی از خودت بگو تا فرصت‌های مناسب تو را پیدا کنیم.</p>
        <p className="text-caption text-text-secondary mt-1">فیلدهای ستاره‌دار الزامی‌اند.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="نام" isRequired placeholder="نامت را بنویس" {...register("firstName")} error={errors.firstName?.message} />
        <Input label="نام خانوادگی" isRequired placeholder="نام خانوادگی ات را بنویس" {...register("lastName")} error={errors.lastName?.message} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="استان" isRequired options={provinceOptions} {...register("province")} error={errors.province?.message} />
        <Select label="شهر" isRequired options={cityOptions} disabled={!selectedProvince} {...register("city")} error={errors.city?.message}  />
      </div>
      <p className="text-caption text-text-secondary -mt-2 text-right">با تغییر استان، شهر ناسازگار پاک می‌شود.</p>

      <Input label="نشانی کامل محل سکونت" isRequired {...register("address")} error={errors.address?.message} helperText="نشانی خصوصی است و در پروفایل عمومی نمایش داده نمی‌شود." />
      <Input label="کد پستی" isRequired placeholder="**********" {...register("postalCode")} error={errors.postalCode?.message} helperText="عدد انگلیسی وارد شود"/>
      <Input label="کد ملی" isRequired placeholder="کد ملی ۱۰ رقمی" {...register("nationalCode")} error={errors.nationalCode?.message} helperText="بدون خط تیره و فاصله" />

      <FormBirthDateInput />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <RadioGroup label="جنسیت" isRequired options={genderOptions} value={field.value} onChange={field.onChange} error={errors.gender?.message} />
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
          فرمت مجاز: تصویر JPG یا PNG - حداکثر ۵ مگابایت.<br />تصویر شناسنامه فقط برای بررسی هویت استفاده می‌شود و عمومی نیست.
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <label className="text-label text-text-primary font-medium">ویدیو تایید هویت کارجو <span className="text-status-error">*</span></label>
        <IdentityInstructionsBox fullName={fullName} birthDate={birthDate} />
        <VideoUploadBox value={identityVideo as unknown as File} onChange={(file) => setValue("identityVideo", file as any, { shouldValidate: true })} error={errors.identityVideo?.message} />
        <p className="text-caption text-text-secondary text-right leading-relaxed mt-1">
          ویدیو فقط برای بررسی هویت استفاده می‌شود و عمومی نیست.
        </p>
      </div>

      <Controller
        name="interests"
        control={control}
        render={({ field }) => (
          <SkillsSelector 
            value={field.value || []} 
            onChange={field.onChange} 
            error={errors.interests?.message} 
            options={options?.interests} 
          />
        )}
      />

      <div className="flex items-center gap-4 mt-4">
        <Button type="submit" variant="primary" fullWidth>
          ادامه، اطلاعات حساب
        </Button>
      </div>
      
      <p className="text-caption text-text-secondary text-right mt-2">
        اطلاعات خصوصی است و فقط برای ساخت پروفایل استفاده می‌شود.
      </p>
    </form>
   </FormProvider>
  );
}