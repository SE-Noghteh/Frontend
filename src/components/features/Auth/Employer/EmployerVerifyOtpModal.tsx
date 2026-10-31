import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";

interface EmployerVerifyOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  mobile: string;
}

export function EmployerVerifyOtpModal({ isOpen, onClose, mobile }: EmployerVerifyOtpModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    console.log("OTP confirmed:", otp.join(""));
  };

  const maskedMobile = mobile.length === 11 
    ? `${mobile.slice(0, 4)} *** ${mobile.slice(-4)}` 
    : mobile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-card-title font-bold text-text-primary mb-2 mt-2">
          تایید شماره‌ی همراه
        </h2>
        <p className="text-label text-text-secondary mb-6">
          کد شش‌رقمی به شماره‌ی {maskedMobile} پیامک شد.
        </p>

        <button 
          onClick={onClose}
          className="text-label font-bold text-action-primary hover:underline mb-6 block"
        >
          ویرایش شماره
        </button>

        <div className="mb-2 text-right">
          <label className="text-label font-medium text-text-primary">
            کد تایید شش‌رقمی <span className="text-status-error">*</span>
          </label>
        </div>

        <div className="flex justify-between gap-2 mb-4" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-bold border border-border-decorative rounded-lg focus:outline-none focus:ring-2 focus:ring-action-primary bg-surface-card text-text-primary"
            />
          ))}
        </div>

        <p className="text-caption text-text-secondary mb-6">
          می‌توانی تا ۰۱:۴۲ دیگر کد جدید بگیری.
        </p>

        <Button
          type="button"
          fullWidth
          onClick={handleConfirm}
          className="w-full bg-action-primary hover:bg-action-hover text-white py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          تایید و ورود
        </Button>
      </div>
    </div>
  );
}