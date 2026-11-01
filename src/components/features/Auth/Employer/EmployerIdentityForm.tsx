import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { iranProvinces } from "@/data/iranProvinces";

export function EmployerIdentityForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    nationalId: "",
    gender: "female",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    businessName: "",
    businessField: "",
    website: "",
    hasLicense: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full text-right font-vazirmatn pb-12 mt-2"
      dir="rtl"
    >
      {/* استپر مراحل */}
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

      {/* بخش هویت فردی */}
      <div className="flex flex-col gap-5 mt-[-20px]">
        <p 
          style={{ 
            fontFamily: "Vazirmatn", 
            fontSize: "16px", 
            fontWeight: "bold",
            color: "#1d3557" 
          }}
          className="mb-2"
        >
          هویت فردی
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="نام" isRequired placeholder="رها" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
          <Input label="نام خانوادگی" isRequired placeholder="نمونه‌پور" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="نام پدر" isRequired placeholder="نام نمونه" value={formData.fatherName} onChange={(e) => handleChange("fatherName", e.target.value)} />
          <Input label="کد ملی" isRequired type="text" placeholder="**********" value={formData.nationalId} onChange={(e) => handleChange("nationalId", e.target.value)} />
        </div>

        {/* جنسیت */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-label text-text-primary font-medium">جنسیت <span className="text-status-error">*</span></label>
          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="gender" 
                checked={formData.gender === "female"} 
                onChange={() => handleChange("gender", "female")} 
                className="w-5 h-5 appearance-none rounded-full border-2 border-action-primary bg-white checked:bg-action-primary focus:outline-none focus:ring-2 focus:ring-action-primary/50 cursor-pointer transition-all"
                style={{
                  boxShadow: formData.gender === "female" ? "inset 0 0 0 3px white" : "none"
                }}
              />
              <span className="text-label text-text-primary">زن</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="gender" 
                checked={formData.gender === "male"} 
                onChange={() => handleChange("gender", "male")} 
                className="w-5 h-5 appearance-none rounded-full border-2 border-action-primary bg-white checked:bg-action-primary focus:outline-none focus:ring-2 focus:ring-action-primary/50 cursor-pointer transition-all"
                style={{
                  boxShadow: formData.gender === "male" ? "inset 0 0 0 3px white" : "none"
                }}
              />
              <span className="text-label text-text-primary">مرد</span>
            </label>
          </div>
        </div>

        {/* تاریخ تولد */}
        <div className="flex flex-col gap-1.5 w-full mt-2">
          <label className="text-label text-text-primary font-medium">تاریخ تولد شمسی <span className="text-status-error">*</span></label>
          <div className="grid grid-cols-3 gap-3">
            <select className="w-full rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none border-border-decorative bg-surface-card cursor-pointer" onChange={(e) => handleChange("birthDay", e.target.value)}>
              <option value="">روز</option>
              {Array.from({ length: 31 }, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
            <select className="w-full rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none border-border-decorative bg-surface-card cursor-pointer" onChange={(e) => handleChange("birthMonth", e.target.value)}>
              <option value="">ماه</option>
              {["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select className="w-full rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none border-border-decorative bg-surface-card cursor-pointer" onChange={(e) => handleChange("birthYear", e.target.value)}>
              <option value="">سال</option>
              {Array.from({ length: 16 }, (_, i) => <option key={1395-i} value={1395-i}>{1395-i}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-0">
        <p 
          style={{ 
            fontFamily: "Vazirmatn", 
            fontSize: "16px", 
            fontWeight: "bold",
            color: "#1d3557" 
          }}
          className="mb-2"
        >
         نشانی محل سکونت
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {/* فیلد استان */}
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">
              استان <span className="text-status-error">*</span>
            </label>
            <select 
              className="w-full rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none focus:ring-1 focus:ring-action-primary focus:border-action-primary transition-colors border-border-decorative bg-surface-card cursor-pointer"
              value={formData.province}
              onChange={(e) => {
                handleChange("province", e.target.value);
                handleChange("city", "");
              }}
            >
              <option value="" disabled>انتخاب کنید</option>
              {iranProvinces.map((province) => (
                <option key={province.name} value={province.name}>{province.name}</option>
              ))}
            </select>
          </div>

          {/* فیلد شهر */}
          <div className="flex flex-col gap-1.5">
            <label className="text-label text-text-primary font-medium">
              شهر <span className="text-status-error">*</span>
            </label>
            <select 
              className="w-full rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none focus:ring-1 focus:ring-action-primary focus:border-action-primary transition-colors border-border-decorative bg-surface-card cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              disabled={!formData.province}
            >
              <option value="" disabled>انتخاب کنید</option>
              {formData.province && iranProvinces.find((p) => p.name === formData.province)?.cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <Input label="نشانی کامل محل سکونت" isRequired placeholder="تهران، خیابان نمونه، پلاک آزمایشی" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
        <Input label="کد پستی" isRequired placeholder="**********" value={formData.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} />
      </div>

      {/* بخش کسب‌وکار (اختیاری) */}
      <div className="flex flex-col gap-5 mt-2">
        <p 
          style={{ 
            fontFamily: "Vazirmatn", 
            fontSize: "16px", 
            fontWeight: "bold",
            color: "#1d3557" 
          }}
          className="mb-2"
        >
         کسب‌وکار شما (اختیاری)
        </p>
        
        <Input label="نام نمایشی یا برند" placeholder="استودیوی نمونه سپیدار" value={formData.businessName} onChange={(e) => handleChange("businessName", e.target.value)} />
        <Input label="حوزه‌های فعالیت" placeholder="طراحی گرافیک، تولید محتوا" value={formData.businessField} onChange={(e) => handleChange("businessField", e.target.value)} />
        <Input label="وب‌سایت یا صفحه کسب‌وکار" placeholder="https://example.com" type="url" dir="ltr" value={formData.website} onChange={(e) => handleChange("website", e.target.value)} />
        
        {/* چک‌باکس جواز - تیک سمت راست، متن راست‌چین */}
        <label className="flex items-center justify-start gap-3 cursor-pointer group mt-2 w-full">
          <input 
            type="checkbox" 
            checked={formData.hasLicense} 
            onChange={(e) => handleChange("hasLicense", e.target.checked)} 
            className="w-5 h-5 appearance-none rounded border-2 border-action-primary bg-white checked:bg-white checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231d3557%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat checked:bg-[length:14px_14px] focus:outline-none focus:ring-2 focus:ring-action-primary/50 cursor-pointer transition-all flex-shrink-0" 
          />
          <span className="text-label text-text-primary text-right">کسب‌وکار دارای جواز دارم</span>
        </label>
      </div>

      {/* دکمه‌ها */}
      <div className="flex items-center gap-3 mt-6">
        <Button 
          type="button" 
          onClick={onBack} 
          className="w-24 border border-action-primary !text-action-primary bg-transparent hover:bg-surface-hover py-2.5 rounded-lg font-bold transition-colors"
        >
          قبلی
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold transition-colors"
        >
          ادامه؛ بارگذاری مدارک
        </Button>
      </div>
    </form>
  );
}