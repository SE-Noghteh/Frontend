import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmployerDocumentsForm } from "./EmployerDocumentsForm";
import { useEmployerSignup } from "@/providers/EmployerSignupProvider";
import { useSignupOptions } from "@/hooks/useSignupOptions";
import { Calendar } from "@/components/ui/Calendar/Calendar";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { JALALI_MONTH_NAMES } from "@/utils/jalali";

export function EmployerIdentityForm({ onBack }: { onBack: () => void }) {
  const { setIndividualIdentity, individualIdentity } = useEmployerSignup(); 
  const { options, isLoading: isLoadingOptions } = useSignupOptions("real");

  const [formData, setFormData] = useState({
    firstName: individualIdentity?.firstName || "",
    lastName: individualIdentity?.lastName || "",
    fatherName: individualIdentity?.fatherName || "",
    nationalId: individualIdentity?.nationalId || "",
    gender: individualIdentity?.gender || "female",
    birthDay: individualIdentity?.birthDay || "",
    birthMonth: individualIdentity?.birthMonth || "",
    birthYear: individualIdentity?.birthYear || "",
    province: individualIdentity?.province || "",
    city: individualIdentity?.city || "",
    address: individualIdentity?.address || "",
    postalCode: individualIdentity?.postalCode || "",
    businessName: individualIdentity?.businessName || "",
    businessField: individualIdentity?.businessField || "",
    website: individualIdentity?.website || "",
    hasLicense: individualIdentity?.hasLicense || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(2);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    if (field === "nationalId" && typeof value === "string") {
      if (value && !/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, nationalId: "کد ملی باید فقط شامل عدد باشد" }));
      } else if (value && value.length !== 0 && value.length !== 10) {
        setErrors((prev) => ({ ...prev, nationalId: "کد ملی باید دقیقاً ۱۰ رقم باشد" }));
      }
    }
    if (field === "postalCode" && typeof value === "string") {
      if (value && !/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, postalCode: "کد پستی باید فقط شامل عدد باشد" }));
      } else if (value && value.length !== 0 && value.length !== 10) {
        setErrors((prev) => ({ ...prev, postalCode: "کد پستی باید دقیقاً ۱۰ رقم باشد" }));
      }
    }
  };

  const handleDateSelect = (date: Date, jalali: any) => {
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      birthDay: String(jalali.day),
      birthMonth: String(jalali.month),
      birthYear: String(jalali.year),
    }));
    if (errors.birthDate) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.birthDate;
        return newErrors;
      });
    }
    setIsCalendarOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "نام خود را وارد کنید";
    if (!formData.lastName.trim()) newErrors.lastName = "نام خانوادگی خود را وارد کنید";
    if (!formData.fatherName.trim()) newErrors.fatherName = "نام پدر را وارد کنید";
    
    if (!formData.nationalId.trim()) {
      newErrors.nationalId = "کد ملی را وارد کنید";
    } else if (!/^\d{10}$/.test(formData.nationalId)) {
      newErrors.nationalId = "کد ملی باید ۱۰ رقم و فقط شامل عدد باشد";
    } else if (/^(\d)\1{9}$/.test(formData.nationalId)) {
      newErrors.nationalId = "کد ملی نمی‌تواند تکراری باشد (مثل ۱۱۱۱۱۱۱۱۱۱)";
    }

    if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      newErrors.birthDate = "تاریخ تولد را کامل وارد کنید";
    }
    if (!formData.province) newErrors.province = "استان را انتخاب کنید";
    if (!formData.city) newErrors.city = "شهر را انتخاب کنید";
    if (!formData.address.trim()) newErrors.address = "نشانی کامل محل سکونت را وارد کنید";
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "کد پستی را وارد کنید";
    } else if (!/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقم و فقط شامل عدد باشد";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    localStorage.setItem("employerFullName", `${formData.firstName} ${formData.lastName}`);

    setIndividualIdentity({
      firstName: formData.firstName,
      lastName: formData.lastName,
      fatherName: formData.fatherName,
      nationalId: formData.nationalId,
      gender: formData.gender as "female" | "male",
      birthDay: formData.birthDay,
      birthMonth: formData.birthMonth,
      birthYear: formData.birthYear,
      province: formData.province,
      city: formData.city,
      address: formData.address,
      postalCode: formData.postalCode,
      businessName: formData.businessName,
      businessField: formData.businessField,
      website: formData.website,
      hasLicense: formData.hasLicense,
    });

    setStep(3);
  };

  if (step === 3) {
    return <EmployerDocumentsForm onBack={() => setStep(2)} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full text-right font-vazirmatn pb-12 mt-2"
      dir="rtl"
    >
      <div className="flex items-center justify-between w-full border-b border-border-decorative pb-3 mb-2 text-[13px] font-medium text-text-secondary">
        <div>نوع کارفرما</div>
        <div className="text-text-primary border-b-2 border-action-primary pb-3 -mb-3.5">اطلاعات هویتی</div>
        <div>مدارک</div>
        <div>حساب کاربری</div>
        <div>پایان</div>
      </div>

      <div className="text-right mb-1 mt-[-10px]">
        <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#262321" }}>
          کمی از خودتان بگویید
        </h1>
      </div>

      <div className="flex flex-col gap-5 mt-[-20px]">
        <p style={{ fontFamily: "Vazirmatn", fontSize: "16px", fontWeight: "bold", color: "#1d3557" }} className="mb-2">
          هویت فردی
        </p>

        <div className="grid grid-cols-2 gap-4">
          <Input label="نام" isRequired placeholder="" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} error={errors.firstName} />
          <Input label="نام خانوادگی" isRequired placeholder="" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} error={errors.lastName} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="نام پدر" isRequired placeholder=" " value={formData.fatherName} onChange={(e) => handleChange("fatherName", e.target.value)} error={errors.fatherName} />
          <Input label="کد ملی" isRequired type="text" placeholder="**********" value={formData.nationalId} onChange={(e) => handleChange("nationalId", e.target.value)} error={errors.nationalId} />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-label text-text-primary font-medium">جنسیت <span className="text-status-error">*</span></label>
          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" checked={formData.gender === "female"} onChange={() => handleChange("gender", "female")} className="w-5 h-5 appearance-none rounded-full border-2 border-action-primary bg-white checked:bg-action-primary cursor-pointer transition-all" style={{ boxShadow: formData.gender === "female" ? "inset 0 0 0 3px white" : "none" }} />
              <span className="text-label text-text-primary">زن</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" checked={formData.gender === "male"} onChange={() => handleChange("gender", "male")} className="w-5 h-5 appearance-none rounded-full border-2 border-action-primary bg-white checked:bg-action-primary cursor-pointer transition-all" style={{ boxShadow: formData.gender === "male" ? "inset 0 0 0 3px white" : "none" }} />
              <span className="text-label text-text-primary">مرد</span>
            </label>
          </div>
        </div>

        {/* بخش تاریخ تولد با تقویم */}
        <div className="flex flex-col gap-1.5 w-full mt-2 relative">
          <label className="text-label text-text-primary font-medium">تاریخ تولد شمسی <span className="text-status-error">*</span></label>
          
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full text-right rounded-md border px-3 py-2 text-body focus:outline-none transition-colors bg-surface-card ${
              errors.birthDate ? "border-status-error" : "border-[#457b9d]"
            }`}
          >
            {formData.birthYear ? (
              <span className="text-text-primary">
                {toPersianDigits(formData.birthDay)} {JALALI_MONTH_NAMES[parseInt(formData.birthMonth) - 1]} {toPersianDigits(formData.birthYear)}
              </span>
            ) : (
              <span className="text-text-disabled">انتخاب تاریخ تولد...</span>
            )}
          </button>
          
          {errors.birthDate && <p className="text-red-500 text-caption mt-1">{errors.birthDate}</p>}

          {/* تقویم شناور با استایل اصلاح‌شده */}
          {isCalendarOpen && (
            <div className="absolute top-full right-0 mt-2 w-[320px] max-h-[350px] overflow-y-auto bg-white border border-border-decorative rounded-xl shadow-lg z-50 p-2">
               {/* استایل‌های ضروری برای نمایش درست تقویم */}
               <style>{`
                 .cal { width: 100%; font-family: inherit; }
                 .cal__header { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-bottom: 1px solid #e5e7eb; margin-bottom: 0.5rem; }
                 .cal__title { font-weight: bold; font-size: 0.9rem; }
                 .cal__nav { display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 0.375rem; background: transparent; border: none; cursor: pointer; color: #374151; }
                 .cal__nav:hover { background: #f3f4f6; }
                 .cal__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
                 .cal__weekday { font-size: 0.75rem; color: #6b7280; padding: 0.25rem 0; }
                 .cal__cell { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 0.25rem; min-height: 2.5rem; border-radius: 0.375rem; }
                 .cal__cell:hover { background: #f9fafb; }
                 .cal__cell[data-selected="true"] { background: #e0f2fe; }
                 .cal__day { font-size: 0.85rem; font-weight: 500; color: #1f2937; background: transparent; border: none; cursor: pointer; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 0; }
                 .cal__day-number { width: 1.75rem; height: 1.75rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
                 .cal__day-number[data-today="true"] { background: #3b82f6; color: white; }
                 .cal__cell--blank { background: transparent; }
                 .cal__picker { padding: 0.5rem; }
                 .cal__picker-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
                 .cal__picker-item { padding: 0.5rem; font-size: 0.85rem; border-radius: 0.375rem; border: 1px solid transparent; background: #f3f4f6; cursor: pointer; color: #374151; }
                 .cal__picker-item:hover { background: #e5e7eb; }
                 .cal__picker-item[data-active="true"] { background: #3b82f6; color: white; }
                 .cal__legend { display: flex; gap: 0.5rem; font-size: 0.75rem; margin-bottom: 0.5rem; }
                 .cal__legend-item { display: flex; align-items: center; gap: 0.25rem; }
                 .cal__legend-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; }
               `}</style>
               <Calendar
                 selectedDate={selectedDate}
                 onSelectDate={handleDateSelect}
                 yearRange={[1300, 1405]}
                 dayPopup="none"
               />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-0">
        <p style={{ fontFamily: "Vazirmatn", fontSize: "16px", fontWeight: "bold", color: "#1d3557" }} className="mb-2">
          نشانی محل سکونت
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">استان <span className="text-status-error">*</span></label>
            <select
              className="w-full rounded-md border border-[#457b9d] px-3 py-2 text-body text-text-primary focus:outline-none bg-surface-card cursor-pointer disabled:opacity-50"
              value={formData.province}
              onChange={(e) => { handleChange("province", e.target.value); handleChange("city", ""); }}
              disabled={isLoadingOptions}
            >
              <option value="" disabled>انتخاب کنید</option>
              {options?.provinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            {errors.province && <p className="text-red-500 text-caption mt-1">{errors.province}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">شهر <span className="text-status-error">*</span></label>
            <select
              className="w-full rounded-md border border-[#457b9d] px-3 py-2 text-body text-text-primary focus:outline-none bg-surface-card cursor-pointer disabled:opacity-50"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              disabled={!formData.province || isLoadingOptions}
            >
              <option value="" disabled>انتخاب کنید</option>
              {formData.province && options?.cities_by_province[formData.province]?.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-caption mt-1">{errors.city}</p>}
          </div>
        </div>

        <Input label="نشانی کامل محل سکونت" isRequired placeholder="    " value={formData.address} onChange={(e) => handleChange("address", e.target.value)} error={errors.address} />
        <Input label="کد پستی" isRequired placeholder="**********" value={formData.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} error={errors.postalCode} />
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <p style={{ fontFamily: "Vazirmatn", fontSize: "16px", fontWeight: "bold", color: "#1d3557" }} className="mb-2">
          کسب‌وکار شما (اختیاری)
        </p>

        <Input label="نام نمایشی یا برند" placeholder="  " value={formData.businessName} onChange={(e) => handleChange("businessName", e.target.value)} />
        <Input label="حوزه‌های فعالیت" placeholder="   " value={formData.businessField} onChange={(e) => handleChange("businessField", e.target.value)} />
        <Input label="وب‌سایت یا صفحه کسب‌وکار" placeholder="https://example.com" type="url" dir="ltr" value={formData.website} onChange={(e) => handleChange("website", e.target.value)} />

        <label className="flex items-center justify-start gap-3 cursor-pointer group mt-2 w-full">
          <input type="checkbox" checked={formData.hasLicense} onChange={(e) => handleChange("hasLicense", e.target.checked)} className="w-5 h-5 appearance-none rounded border-2 border-action-primary bg-white checked:bg-white checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231d3557%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat checked:bg-[length:14px_14px] cursor-pointer transition-all flex-shrink-0" />
          <span className="text-label text-text-primary text-right">کسب‌وکار دارای جواز دارم</span>
        </label>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button type="button" onClick={onBack} className="w-24 border border-action-primary !text-action-primary bg-transparent hover:bg-surface-hover py-2.5 rounded-lg font-bold transition-colors">
          قبلی
        </Button>
        <Button type="submit" className="flex-1 bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold transition-colors">
          ادامه؛ بارگذاری مدارک
        </Button>
      </div>
    </form>
  );
}