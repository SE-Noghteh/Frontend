import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { EmployerVerifyOtpModal } from "./EmployerVerifyOtpModal";

export function EmployerForgotPasswordForm() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendCode = () => {
    if (!mobile.trim()) {
      setError("شماره موبایل را وارد کنید");
      return;
    }
    const mobileRegex = /^09\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      setError("شماره موبایل معتبر نیست. شماره باید با 09 شروع شود و 11 رقم داشته باشد");
      return;
    }
    setError(null);
    console.log("Sending code to:", mobile);
    
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendCode();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full text-right font-vazirmatn pb-12"
        dir="rtl"
      >
        <div className="text-right mb-3 mt-4">
          <h1 style={{ fontFamily: "Vazirmatn", fontSize: "32px", fontWeight: "bold", color: "#262321" }}>
            ورود با کد پیامکی
          </h1>
          <p className="text-label text-text-secondary leading-relaxed mt-2">
            رمزت را نمی‌دانی؟ کد یکبارمصرف به شماره‌ات پیامک می‌شود.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1">
            <Input
              label="شماره موبایل"
              isRequired
              type="tel"
              dir="rtl"
              placeholder="09xx xxx xxxx"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (error) setError(null);
              }}
            />
          </div>
          <div className="mt-6">
            <Button 
              type="button" 
              onClick={handleSendCode}
              className="bg-action-primary text-white hover:bg-action-hover mt-1.5 px-6 py-2 rounded-md font-bold transition-colors whitespace-nowrap"
            >
              ارسال کد
            </Button>
          </div>
        </div>

        {error && <div className="text-red-500 text-label">{error}</div>}

        <div className="text-right mt-2">
          <a 
            href="/employerlogin" 
            className="text-label font-bold text-action-primary hover:underline"
          >
            رمزم یادم آمد؛ ورود با رمز عبور
          </a>
        </div>

        <Button
          type="submit"
          fullWidth
          className="mt-4 w-full bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          ورود
        </Button>
      </form>

      <EmployerVerifyOtpModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mobile={mobile} 
      />
    </>
  );
}