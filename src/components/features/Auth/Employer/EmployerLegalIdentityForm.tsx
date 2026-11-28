import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmployerDocumentsForm } from "./EmployerDocumentsForm";
import { useEmployerSignup } from "@/providers/EmployerSignupProvider";
import { useSignupOptions } from "@/hooks/useSignupOptions";

export function EmployerLegalIdentityForm({ onBack }: { onBack: () => void }) {
  const { setLegalIdentity, legalIdentity } = useEmployerSignup();
  const { options, isLoading: isLoadingOptions } = useSignupOptions("legal");

  const [formData, setFormData] = useState({
    companyName: legalIdentity?.companyName || "",
    legalEntityType: legalIdentity?.legalEntityType || "limited_liability",
    companyNationalId: legalIdentity?.companyNationalId || "",
    registrationNumber: legalIdentity?.registrationNumber || "",
    economicCode: legalIdentity?.economicCode || "",
    province: legalIdentity?.province || "",
    city: legalIdentity?.city || "",
    address: legalIdentity?.address || "",
    postalCode: legalIdentity?.postalCode || "",
    representativeFirstName: legalIdentity?.representativeFirstName || "",
    representativeLastName: legalIdentity?.representativeLastName || "",
    representativePosition: legalIdentity?.representativePosition || "ceo",
    representativeGender: legalIdentity?.representativeGender || "female",
    representativeNationalCode: legalIdentity?.representativeNationalCode || "",
    hasTaxFile: legalIdentity?.hasTaxFile || false,
    activities: legalIdentity?.activities || [],
    website: legalIdentity?.website || "",
    requiresActivityLicense: legalIdentity?.requiresActivityLicense || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(2);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleChange = (field: string, value: string | boolean | string[]) => {
    if (typeof value === "string") {
      if (["companyNationalId", "economicCode", "representativeNationalCode", "postalCode", "registrationNumber"].includes(field) && value && !/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, [field]: "این فیلد باید فقط شامل عدد باشد" }));
        return;
      }
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (field === "companyNationalId" && value.length > 0 && value.length < 11) {
        setErrors((prev) => ({ ...prev, companyNationalId: "شناسه ملی باید ۱۱ رقم باشد" })); return;
      }
      if (field === "economicCode" && value.length > 0 && value.length < 12) {
        setErrors((prev) => ({ ...prev, economicCode: "کد اقتصادی باید ۱۲ رقم باشد" })); return;
      }
      if (field === "representativeNationalCode" && value.length > 0 && value.length !== 10) {
        setErrors((prev) => ({ ...prev, representativeNationalCode: "کد ملی باید ۱۰ رقم باشد" })); return;
      }
      if (field === "postalCode" && value.length > 0 && value.length !== 10) {
        setErrors((prev) => ({ ...prev, postalCode: "کد پستی باید ۱۰ رقم باشد" })); return;
      }
      if (field === "registrationNumber" && value.length > 30) {
        setErrors((prev) => ({ ...prev, registrationNumber: "شماره ثبت حداکثر ۳۰ رقم" })); return;
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) newErrors.companyName = "نام شرکت را وارد کنید";
    if (!/^\d{11}$/.test(formData.companyNationalId)) newErrors.companyNationalId = "شناسه ملی باید ۱۱ رقم باشد";
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "شماره ثبت را وارد کنید";
    if (!/^\d{12}$/.test(formData.economicCode)) newErrors.economicCode = "کد اقتصادی باید ۱۲ رقم باشد";
    if (!formData.province) newErrors.province = "استان را انتخاب کنید";
    if (!formData.city) newErrors.city = "شهر را انتخاب کنید";
    if (!formData.address.trim()) newErrors.address = "نشانی را وارد کنید";
    if (!/^\d{10}$/.test(formData.postalCode)) newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    if (!formData.representativeFirstName.trim()) newErrors.representativeFirstName = "نام نماینده را وارد کنید";
    if (!formData.representativeLastName.trim()) newErrors.representativeLastName = "نام خانوادگی نماینده را وارد کنید";
    if (!/^\d{10}$/.test(formData.representativeNationalCode)) newErrors.representativeNationalCode = "کد ملی باید ۱۰ رقم باشد";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLegalIdentity({
      companyName: formData.companyName,
      legalEntityType: formData.legalEntityType,
      companyNationalId: formData.companyNationalId,
      registrationNumber: formData.registrationNumber,
      economicCode: formData.economicCode,
      province: formData.province,
      city: formData.city,
      address: formData.address,
      postalCode: formData.postalCode,
      representativeFirstName: formData.representativeFirstName,
      representativeLastName: formData.representativeLastName,
      representativePosition: formData.representativePosition,
      representativeGender: formData.representativeGender as "female" | "male",
      representativeNationalCode: formData.representativeNationalCode,
      hasTaxFile: formData.hasTaxFile,
      activities: formData.activities,
      website: formData.website,
      requiresActivityLicense: formData.requiresActivityLicense,
    });

    setStep(3);
  };

  if (step === 3) {
    return <EmployerDocumentsForm onBack={() => setStep(2)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full text-right font-vazirmatn pb-12 mt-2" dir="rtl">
      <div className="flex items-center justify-between w-full border-b border-border-decorative pb-3 mb-2 text-[13px] font-medium text-text-secondary">
        <div>نوع کارفرما</div>
        <div className="text-text-primary border-b-2 border-action-primary pb-3 -mb-3.5">اطلاعات هویتی</div>
        <div>مدارک</div>
        <div>حساب کاربری</div>
        <div>پایان</div>
      </div>

      <div className="text-right mb-1 mt-[-10px]">
        <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#262321" }}>
          اطلاعات سازمان و نماینده
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        <p style={{ fontFamily: "Vazirmatn", fontSize: "16px", fontWeight: "bold", color: "#1d3557" }} className="mb-2">اطلاعات شخص حقوقی</p>

        <div className="grid grid-cols-2 gap-4">
          <Input label="نام شرکت یا سازمان" isRequired placeholder=" " value={formData.companyName} onChange={(e) => handleChange("companyName", e.target.value)} error={errors.companyName} />
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">نوع شخص حقوقی <span className="text-status-error">*</span></label>
            <select value={formData.legalEntityType} onChange={(e) => handleChange("legalEntityType", e.target.value)} className="w-full rounded-md border border-[#457b9d] px-3 py-2 text-body text-text-primary focus:outline-none bg-surface-card cursor-pointer">
              <option value="limited_liability">مسئولیت محدود</option>
              <option value="private_joint_stock">سهامی خاص</option>
              <option value="public_joint_stock">سهامی عام</option>
              <option value="cooperative">تعاونی</option>
              <option value="institution">مؤسسه</option>
              <option value="organization">سازمان</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="شناسه ملی شخص حقوقی" isRequired placeholder="***********" value={formData.companyNationalId} onChange={(e) => handleChange("companyNationalId", e.target.value)} error={errors.companyNationalId} />
          <Input label="شماره ثبت" isRequired placeholder=" " value={formData.registrationNumber} onChange={(e) => handleChange("registrationNumber", e.target.value)} error={errors.registrationNumber} />
        </div>

        <Input label="کد اقتصادی" isRequired placeholder="************" value={formData.economicCode} onChange={(e) => handleChange("economicCode", e.target.value)} error={errors.economicCode} />
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <p style={{ fontFamily: "Vazirmatn", fontSize: "16px", fontWeight: "bold", color: "#1d3557" }} className="mb-2">نشانی قانونی</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">استان <span className="text-status-error">*</span></label>
            <select
              value={formData.province}
              onChange={(e) => { handleChange("province", e.target.value); handleChange("city", ""); }}
              className="w-full rounded-md border border-[#457b9d] px-3 py-2 text-body text-text-primary focus:outline-none bg-surface-card cursor-pointer disabled:opacity-50"
              disabled={isLoadingOptions}
            >
              <option value="" disabled>انتخاب کنید</option>
              {options?.provinces.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.province && <p className="text-red-500 text-caption">{errors.province}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">شهر <span className="text-status-error">*</span></label>
            <select
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              disabled={!formData.province || isLoadingOptions}
              className="w-full rounded-md border border-[#457b9d] px-3 py-2 text-body text-text-primary focus:outline-none bg-surface-card cursor-pointer disabled:opacity-50"
            >
              <option value="" disabled>انتخاب کنید</option>
              {formData.province && options?.cities_by_province[formData.province]?.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.city && <p className="text-red-500 text-caption">{errors.city}</p>}
          </div>
        </div>

        <Input label="نشانی قانونی" isRequired placeholder=" " value={formData.address} onChange={(e) => handleChange("address", e.target.value)} error={errors.address} />
        <Input label="کد پستی" isRequired placeholder="**********" value={formData.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} error={errors.postalCode} />
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <p style={{ fontFamily: "Vazirmatn", fontSize: "16px", fontWeight: "bold", color: "#1d3557" }} className="mb-2">نماینده مجاز و مسئول حساب</p>

        <div className="grid grid-cols-2 gap-4">
          <Input label="نام نماینده" isRequired placeholder="" value={formData.representativeFirstName} onChange={(e) => handleChange("representativeFirstName", e.target.value)} error={errors.representativeFirstName} />
          <Input label="نام خانوادگی نماینده" isRequired placeholder="" value={formData.representativeLastName} onChange={(e) => handleChange("representativeLastName", e.target.value)} error={errors.representativeLastName} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">سمت نماینده <span className="text-status-error">*</span></label>
            <select value={formData.representativePosition} onChange={(e) => handleChange("representativePosition", e.target.value)} className="w-full rounded-md border border-[#457b9d] px-3 py-2 text-body text-text-primary focus:outline-none bg-surface-card cursor-pointer">
              <option value="ceo">مدیرعامل</option>
              <option value="authorized_signatory">عضو هیئت‌مدیره / مدیر داخلی</option>
              <option value="attorney">وکیل با وکالت‌نامه</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">جنسیت <span className="text-status-error">*</span></label>
            <div className="flex items-center gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="repGender" checked={formData.representativeGender === "female"} onChange={() => handleChange("representativeGender", "female")} className="w-5 h-5 appearance-none rounded-full border-2 border-action-primary bg-white checked:bg-action-primary cursor-pointer" style={{ boxShadow: formData.representativeGender === "female" ? "inset 0 0 0 3px white" : "none" }} />
                <span className="text-label text-text-primary">زن</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="repGender" checked={formData.representativeGender === "male"} onChange={() => handleChange("representativeGender", "male")} className="w-5 h-5 appearance-none rounded-full border-2 border-action-primary bg-white checked:bg-action-primary cursor-pointer" style={{ boxShadow: formData.representativeGender === "male" ? "inset 0 0 0 3px white" : "none" }} />
                <span className="text-label text-text-primary">مرد</span>
              </label>
            </div>
          </div>
        </div>

        <Input label="کد ملی نماینده" isRequired placeholder="**********" value={formData.representativeNationalCode} onChange={(e) => handleChange("representativeNationalCode", e.target.value)} error={errors.representativeNationalCode} />

        <label className="flex items-center justify-start gap-3 cursor-pointer mt-2 w-full">
          <input type="checkbox" checked={formData.hasTaxFile} onChange={(e) => handleChange("hasTaxFile", e.target.checked)} className="w-5 h-5 appearance-none rounded border-2 border-action-primary bg-white checked:bg-white checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231d3557%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat checked:bg-[length:14px_14px] cursor-pointer" />
          <span className="text-label text-text-primary">تغییرات ثبتی اخیر داریم</span>
        </label>
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <p style={{ fontFamily: "Vazirmatn", fontSize: "16px", fontWeight: "bold", color: "#1d3557" }} className="mb-2">حوزه فعالیت</p>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-label text-text-primary font-medium">
            حوزه‌های فعالیت <span className="text-status-error">*</span>
          </label>
          <select 
            value={formData.activities[0] || ""} 
            onChange={(e) => handleChange("activities", e.target.value ? [e.target.value] : [])} 
            className="w-full rounded-md border border-[#457b9d] px-3 py-2 text-body text-text-primary focus:outline-none bg-surface-card cursor-pointer"
          >
            <option value="" disabled>انتخاب کنید</option>
            <option value="طراحی گرافیک">طراحی گرافیک</option>
            <option value="تولید محتوا">تولید محتوا</option>
            <option value="برنامه‌نویسی">برنامه‌نویسی</option>
            <option value="دیجیتال مارکتینگ">دیجیتال مارکتینگ</option>
            <option value="ترجمه">ترجمه</option>
            <option value="تدریس">تدریس</option>
          </select>
          {errors.activities && <p className="text-red-500 text-caption mt-1">{errors.activities}</p>}
        </div>

        <Input label="وب‌سایت یا صفحه کسب‌وکار" placeholder="https://example.com" type="url" dir="ltr" value={formData.website} onChange={(e) => handleChange("website", e.target.value)} />
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