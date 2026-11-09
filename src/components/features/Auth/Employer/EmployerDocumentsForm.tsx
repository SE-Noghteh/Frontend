import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function EmployerDocumentsForm({ onBack }: { onBack: () => void }) {
  const [nationalCard, setNationalCard] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ارسال به سرور
    console.log({ nationalCard, businessLicense, videoFile });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full text-right font-vazirmatn pb-12 mt-2"
      dir="rtl"
    >
      {/* استپر مراحل */}
      <div className="flex items-center justify-between w-full border-b border-border-decorative pb-3 mb-2 text-[13px] font-medium text-text-secondary">
        <div>نوع کارفرما</div>
        <div>اطلاعات هویتی</div>
        <div className="text-text-primary border-b-2 border-action-primary pb-3 -mb-3.5">مدارک</div>
        <div>حساب کاربری</div>
        <div>پایان</div>
      </div>

      <div className="text-right mb-1 mt-2">
        <h1 style={{ fontFamily: "Vazirmatn", fontSize: "28px", fontWeight: "bold", color: "#262321" }}>
          مدارک نمونه را آماده کنید
        </h1>
      </div>

      {/* کارت آپلود شناسنامه */}
      <div className="relative p-5 rounded-xl border border-border-decorative bg-white">
        <span className="absolute top-4 right-5 bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1 rounded-full">الزامی</span>
        
        <h2 className="text-body font-bold text-text-primary mt-6">صفحه اول شناسنامه</h2>
        <p className="text-caption text-text-secondary mt-1 mb-4 leading-relaxed">
          نام و کد ملی با ثبت احوال و شماره‌ی همراه با شاهکار تطبیق داده می‌شود.
        </p>

        <label className="flex items-center justify-between border-2 border-dashed border-[#b5cad8] rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-label text-text-secondary">
            {nationalCard ? nationalCard.name : "فایل را اینجا بیندازید · JPG / PNG / PDF · ۵ تا ۵ مگابایت"}
          </span>
          <span className="border border-action-primary text-action-primary px-4 py-1.5 rounded-md text-sm font-medium bg-white">
            انتخاب فایل
          </span>
          <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, setNationalCard)} />
        </label>
      </div>

      {/* کارت آپلود جواز کسب */}
      <div className="relative p-5 rounded-xl border border-border-decorative bg-white">
        <span className="absolute top-4 right-5 bg-yellow-50 text-yellow-700 text-[11px] font-bold px-3 py-1 rounded-full">مشروط</span>
        
        <h2 className="text-body font-bold text-text-primary mt-6">جواز کسب یا پروانه فعالیت</h2>
        <p className="text-caption text-text-secondary mt-1 mb-4 leading-relaxed">
          فقط برای کسب‌وکار دارای جواز؛ شماره‌ی جواز از سامانه‌ی اتحادیه استعلام می‌شود.
        </p>

        <label className="flex items-center justify-between border-2 border-dashed border-[#b5cad8] rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-label text-text-secondary">
            {businessLicense ? businessLicense.name : "فایل را اینجا بیندازید · JPG / PNG / PDF · ۵ تا ۵ مگابایت"}
          </span>
          <span className="border border-action-primary text-action-primary px-4 py-1.5 rounded-md text-sm font-medium bg-white">
            انتخاب فایل
          </span>
          <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, setBusinessLicense)} />
        </label>
      </div>

      {/* بخش ویدیو */}
      <div className="flex flex-col gap-3 mt-2">
        <h2 className="text-body font-bold text-text-primary">ویدیوی تایید هویت کارفرما <span className="text-status-error">*</span></h2>
        
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className="text-label text-text-primary leading-relaxed">
            <span className="font-bold block mb-1">این جمله را واضح و با صدای بلند بگو:</span>
            «من رها نمونه‌پور، به‌عنوان کارفرما در زدلنسر، قوانین را می‌پذیرم و مسئول درستی اطلاعاتم هستم.»
            <p className="text-caption text-text-secondary mt-2">نام و تاریخ تولد خودکار از فرم‌های بالا پر می‌شود.</p>
          </div>
        </div>

        <div className="relative border-2 border-dashed border-[#b5cad8] rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
            <svg className="w-6 h-6 text-action-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p className="text-label font-bold text-text-primary mb-1">ضبط کن یا فایل ویدیو را اینجا بینداز</p>
          <p className="text-caption text-text-secondary mb-4">فرمت مجاز: MP4 یا MOV · بین ۵ تا ۲۰ ثانیه · حداکثر ۵۰ مگابایت</p>
          
          <div className="flex gap-3 w-full">
            <label className="flex-1">
              <span className="w-full border border-action-primary text-action-primary bg-white hover:bg-surface-hover py-2 rounded-md text-sm font-bold transition-colors flex items-center justify-center cursor-pointer">
                آپلود فایل ویدیو
              </span>
              <input type="file" className="hidden" accept="video/mp4,video/quicktime" onChange={(e) => handleFileChange(e, setVideoFile)} />
            </label>
            <Button type="button" className="flex-1 bg-action-primary hover:bg-action-hover text-white py-2 rounded-md text-sm font-bold transition-colors">
              ضبط با دوربین
            </Button>
          </div>
        </div>
        
        <p className="text-caption text-text-secondary mt-1">
          فرمت مجاز: MP4 یا MOV · بین ۵ تا ۲۰ ثانیه · حداکثر ۵۰ مگابایت
        </p>
        <p className="text-caption text-text-secondary">
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
    </form>
  );
}