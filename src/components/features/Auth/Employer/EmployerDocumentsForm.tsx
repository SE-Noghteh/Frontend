import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { VideoRecorder } from "./VideoRecorder";
import { EmployerAccountForm } from "./EmployerAccountForm"; // ← اضافه شد

export function EmployerDocumentsForm({ onBack }: { onBack: () => void }) {
  const [nationalCard, setNationalCard] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [step, setStep] = useState(3); // ← استیت مرحله

  const nationalCardRef = useRef<HTMLInputElement>(null);
  const businessLicenseRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const fullName = localStorage.getItem("employerFullName") || "نگار محمدی";

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    fieldName: string,
    allowedTypes: string[],
    maxSizeMB: number
  ) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, [fieldName]: "فرمت فایل مجاز نیست. لطفاً از JPG، PNG یا PDF استفاده کنید." }));
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, [fieldName]: `حجم فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد` }));
        return;
      }

      setter(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nationalCard) newErrors.nationalCard = "صفحه اول شناسنامه الزامی است";
    if (!videoFile) newErrors.video = "ویدیوی تایید هویت الزامی است";

    const previousErrors = { ...errors };
    const finalErrors = { ...newErrors, ...previousErrors };

    setErrors(finalErrors);
    return Object.keys(finalErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep(4); // ← رفتن به مرحله ۴
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 بایت";
    const k = 1024;
    const sizes = ["بایت", "کیلوبایت", "مگابایت"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // شرط نمایش مرحله ۴
  if (step === 4) {
    return <EmployerAccountForm onBack={() => setStep(3)} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full text-right font-vazirmatn pb-12 mt-2"
      dir="rtl"
    >
      {/* استپر مراحل */}
      <div className="flex items-center justify-between w-full border-b border-border-decorative pb-3 mb-0 text-[13px] font-medium text-text-secondary">
        <div>نوع کارفرما</div>
        <div>اطلاعات هویتی</div>
        <div className="text-text-primary border-b-2 border-action-primary pb-3 -mb-3.5">مدارک</div>
        <div>حساب کاربری</div>
        <div>پایان</div>
      </div>

      <div className="text-right -mb-4 -mt-4">
        <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#000000" }}>
          مدارک نمونه را آماده کنید
        </h1>
      </div>

      {/* کارت آپلود شناسنامه */}
      <div className={`relative p-6 rounded-xl border bg-white ${errors.nationalCard ? "border-status-error" : "border-[#b5c98a]"}`}>
        <span className="absolute top-4 left-5 bg-[#eef3f8] text-[#315f86] text-[13px] font-medium px-4 py-1.5 rounded-full">الزامی</span>
        
        <h2 className="text-label font-bold mt-6 mb-1 font-vazirmatn" style={{ color: "#000000", fontFamily: "Vazirmatn, sans-serif" }}>صفحه اول شناسنامه</h2>
        <p className="text-sm text-text-secondary mb-8">
          نام و کد ملی با ثبت احوال و شماره‌ی همراه با شاهکار تطبیق داده می‌شود.
        </p>

        {!nationalCard ? (
          <label className={`flex items-center justify-center gap-4 border-2 border-dashed rounded-lg p-4 mt-2 cursor-pointer hover:bg-gray-50 transition-colors ${errors.nationalCard ? "border-status-error" : "border-[#8fb0c4]"}`}>
            <span className="text-label text-text-secondary">
              فایل را اینجا بیندازید · JPG / PNG / PDF · تا ۵ مگابایت
            </span>
            <span className="border border-[#457b9d] text-[#457b9d] px-6 py-2 rounded-md text-label font-medium bg-white">
              انتخاب فایل
            </span>
            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, setNationalCard, "nationalCard", ["image/jpeg", "image/png", "application/pdf"], 5)} ref={nationalCardRef} />
          </label>
        ) : (
          <div className="flex items-center justify-between border border-border-decorative rounded-lg p-4 bg-gray-50">
            <div className="flex flex-col">
              <span className="text-label font-bold text-text-primary">{nationalCard.name}</span>
              <span className="text-caption text-green-600 font-medium">✓ بارگذاری شد · {formatFileSize(nationalCard.size)}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => nationalCardRef.current?.click()} className="text-[#457b9d] text-label font-bold hover:underline px-3 py-1 border border-[#457b9d] rounded-md">جایگزینی</button>
              <button type="button" onClick={() => setNationalCard(null)} className="text-red-500 text-label font-bold hover:underline px-3 py-1 border border-red-200 rounded-md">حذف</button>
            </div>
            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, setNationalCard, "nationalCard", ["image/jpeg", "image/png", "application/pdf"], 5)} ref={nationalCardRef} />
          </div>
        )}
        {errors.nationalCard && <p className="text-red-500 text-caption mt-2">{errors.nationalCard}</p>}
      </div>

      {/* کارت آپلود جواز */}
      <div className={`relative p-6 rounded-xl border bg-white ${errors.businessLicense ? "border-status-error" : "border-[#b5c98a]"}`}>
        <span className="absolute top-4 left-5 bg-[#fbf4e5] text-[#795413] text-[13px] font-medium px-4 py-1.5 rounded-full">مشروط</span>
        
        <h2 className="text-label font-bold mt-6 mb-1 font-vazirmatn" style={{ color: "#000000", fontFamily: "Vazirmatn, sans-serif" }}>جواز کسب یا پروانه فعالیت</h2>
        <p className="text-sm text-text-secondary mb-8">
          فقط برای کسب‌وکار دارای جواز؛ شماره‌ی جواز از سامانه‌ی اتحادیه استعلام می‌شود.
        </p>

        {!businessLicense ? (
          <label className={`flex items-center justify-center gap-4 border-2 border-dashed rounded-lg p-4 mt-2 cursor-pointer hover:bg-gray-50 transition-colors ${errors.businessLicense ? "border-status-error" : "border-[#8fb0c4]"}`}>
            <span className="text-label text-text-secondary">
              فایل را اینجا بیندازید · JPG / PNG / PDF · تا ۵ مگابایت
            </span>
            <span className="border border-[#457b9d] text-[#457b9d] px-6 py-2 rounded-md text-label font-medium bg-white">
              انتخاب فایل
            </span>
            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, setBusinessLicense, "businessLicense", ["image/jpeg", "image/png", "application/pdf"], 5)} ref={businessLicenseRef} />
          </label>
        ) : (
          <div className="flex items-center justify-between border border-border-decorative rounded-lg p-4 bg-gray-50">
            <div className="flex flex-col">
              <span className="text-label font-bold text-text-primary">{businessLicense.name}</span>
              <span className="text-caption text-green-600 font-medium">✓ بارگذاری شد · {formatFileSize(businessLicense.size)}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => businessLicenseRef.current?.click()} className="text-[#457b9d] text-label font-bold hover:underline px-3 py-1 border border-[#457b9d] rounded-md">جایگزینی</button>
              <button type="button" onClick={() => setBusinessLicense(null)} className="text-red-500 text-label font-bold hover:underline px-3 py-1 border border-red-200 rounded-md">حذف</button>
            </div>
            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, setBusinessLicense, "businessLicense", ["image/jpeg", "image/png", "application/pdf"], 5)} ref={businessLicenseRef} />
          </div>
        )}
        {errors.businessLicense && <p className="text-red-500 text-caption mt-2">{errors.businessLicense}</p>}
      </div>

      {/* بخش ویدیو */}
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="text-label font-bold font-vazirmatn" style={{ color: "#000000", fontFamily: "Vazirmatn, sans-serif" }}>ویدیوی تایید هویت کارفرما <span className="text-status-error">*</span></h2>
        
        <div className="bg-[#eef3f8] border border-[#d2d7dd] rounded-xl p-4 flex gap-3">
          <svg className="w-6 h-6 text-[#315f86] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <div className="text-label text-text-primary leading-relaxed">
            <span className="font-bold block mb-1 text-sm text-[#457b9d]">این جمله را واضح و با صدای بلند بگو</span>
            <span className="text-[13px] font-bold">
              «من {fullName}، به‌عنوان کارفرما در زدلنسر، قوانین را می‌پذیرم و مسئول درستی اطلاعاتم هستم.»
            </span>
            <p className="text-sm text-text-secondary mt-1">نام و تاریخ تولد خودکار از فرم‌های بالا پر می‌شود.</p>
          </div>
        </div>

        {!videoFile ? (
          <div className={`relative border rounded-xl p-4 bg-white shadow-sm ${errors.video ? "border-status-error" : "border-[#8fb0c4]"}`}>
            <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50/30 mb-4 ${errors.video ? "border-status-error" : "border-[#8fb0c4]"}`}>
              <div className="w-12 h-12 bg-[#eef3f8] rounded-full flex items-center justify-center shadow-sm mb-3">
                <svg className="w-7 h-7 text-[#457b9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p className="text-label font-bold text-text-primary mb-1">ضبط کن یا فایل ویدیو را اینجا بینداز</p>
              <p className="text-caption text-text-secondary">فرمت مجاز: MP4 یا MOV · بین ۵ تا ۲۰ ثانیه · حداکثر ۵۰ مگابایت</p>
            </div>
            
            <div className="flex gap-3 w-full">
              <label className="flex-1">
                <span className="w-full border border-[#457b9d] text-[#457b9d] bg-white hover:bg-surface-hover h-[42px] rounded-md text-sm font-bold transition-colors flex items-center justify-center cursor-pointer">
                  آپلود فایل ویدیو
                </span>
                <input type="file" className="hidden" accept="video/mp4,video/quicktime" onChange={(e) => handleFileChange(e, setVideoFile, "video", ["video/mp4", "video/quicktime"], 50)} ref={videoRef} />
              </label>
              <Button type="button" onClick={() => setIsRecorderOpen(true)} className="flex-1 h-[42px] bg-action-primary hover:bg-action-hover text-white py-0 rounded-md text-sm font-bold transition-colors">
                ضبط با دوربین
              </Button>
            </div>
          </div>
        ) : (
          <div className={`relative border rounded-xl p-4 bg-white shadow-sm flex flex-col gap-4 ${errors.video ? "border-status-error" : "border-border-decorative"}`}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-label font-bold text-text-primary">{videoFile.name}</span>
                <span className="text-caption text-green-600 font-medium">✓ بارگذاری شد · {formatFileSize(videoFile.size)}</span>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-action-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => videoRef.current?.click()} className="text-[#457b9d] text-label font-bold hover:underline px-4 py-1.5 border border-[#457b9d] rounded-md">ضبط دوباره</button>
              <button type="button" onClick={() => setVideoFile(null)} className="text-red-500 text-label font-bold hover:underline px-4 py-1.5 border border-red-200 rounded-md">حذف</button>
              <button type="button" className="bg-action-primary text-white text-label font-bold px-4 py-1.5 rounded-md hover:bg-action-hover">استفاده از این ویدیو</button>
            </div>
            <input type="file" className="hidden" accept="video/mp4,video/quicktime" onChange={(e) => handleFileChange(e, setVideoFile, "video", ["video/mp4", "video/quicktime"], 50)} ref={videoRef} />
          </div>
        )}
        {errors.video && <p className="text-red-500 text-caption mt-1">{errors.video}</p>}
        
        <p className="text-sm text-text-secondary mt-1">
          فرمت مجاز: MP4 یا MOV · بین ۵ تا ۲۰ ثانیه · حداکثر ۵۰ مگابایت
        </p>
        <p className="text-sm text-text-secondary">
          ویدیو فقط برای بررسی هویت استفاده می‌شود و عمومی نیست.
        </p>
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
          ادامه؛ اطلاعات حساب
        </Button>
      </div>

      {/* کامپوننت ضبط ویدیو */}
      {isRecorderOpen && (
        <VideoRecorder 
          onClose={() => setIsRecorderOpen(false)} 
          onRecordingComplete={(file) => setVideoFile(file)} 
        />
      )}
    </form>
  );
}