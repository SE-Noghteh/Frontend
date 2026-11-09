import { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  onVerify: (code: string) => void;
}

export function PhoneVerificationModal({ isOpen, onClose, phone, onVerify }: PhoneVerificationModalProps) {
  const [code, setCode] = useState<string[]>(Array(5).fill(""));
  const [timeLeft, setTimeLeft] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    
    setCode(Array(5).fill(""));
    setTimeLeft(120);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length === 5) {
      onVerify(fullCode);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-full" dir="rtl">
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-card-title font-bold text-text-primary">تایید شماره همراه</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary p-1 rounded-full border border-border-decorative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <p className="text-label text-text-secondary mb-6">
          کد ۵ رقمی به شماره <span dir="ltr">{phone}</span> پیامک شد.
        </p>

        <button 
          onClick={() => { setTimeLeft(120); setCode(Array(5).fill("")); }}
          className="text-label text-action-primary hover:underline text-right mb-4 w-fit"
        >
          ویرایش شماره
        </button>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-label text-text-primary font-medium">
            کد تایید ۵ رقمی <span className="text-status-error">*</span>
          </label>
          
          <div className="flex justify-between gap-2" dir="ltr">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-section-title font-bold rounded-md border border-border-decorative focus:outline-none focus:ring-1 focus:ring-focus-ring bg-surface-card text-text-primary"
              />
            ))}
          </div>
          
          <p className="text-caption text-text-secondary mt-2">
            کد را از چپ به راست وارد کنید: اعتبار کد ۲ دقیقه است.<br/>
            اگر دریافت نکردی، تا ۰۲:۰۰ دوباره تلاش کن.
          </p>
        </div>

        <Button 
          onClick={handleSubmit} 
          variant="primary" 
          fullWidth 
          disabled={code.join("").length !== 5 || timeLeft === 0}
        >
          تایید و ادامه
        </Button>
        
        <p className="text-caption text-center text-text-secondary mt-4">
          زمان باقی‌مانده: {formatTime(timeLeft)}
        </p>
      </div>
    </Modal>
  );
}