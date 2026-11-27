import { useState } from "react";
import { RegisterStepper } from "../RegisterStepper";
import { BasicInfoStep } from "../steps/BasicInfoStep";
import { AccountStep } from "../steps/AccountStep";
import { ParentInfoStep } from "../steps/ParentInfoStep";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { useNavigate } from "react-router-dom";
import { parseAdminReviewMessage } from "@/utils/adminReviewMapper"; 
import type { JobSeekerMeResponse } from "@/types/Auth/jobSeeker_registrationReview";

interface Props {
  data: JobSeekerMeResponse["data"];
  videoUrl?: string;      
  currentSkills?: string[];
}

export function RegistrationReviewEditForm({ data, videoUrl, currentSkills }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    firstName: data.first_name || "",
    lastName: data.last_name || "",
    phone: data.phone || "",
    interests: currentSkills || [], 
    identityVideo: videoUrl || null,
    nationalCode: "", 
    province: "",
    city: "",
    address: "",
    postalCode: "",
    gender: "",
    parentFirstName: "",
    parentLastName: "",
    parentPhone: "",
  };

  const errors = parseAdminReviewMessage(data.admin_review_message || "");

  const handleNextStep = (stepData: any) => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    setShowToast(true);
    setTimeout(() => {
      navigate("/jobseekerlogin/review");
    }, 3000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <RegisterStepper currentStep={currentStep} />

      <div className="bg-surface-info border border-border-decorative rounded-lg p-4 mt-2">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-status-info shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
          <div className="flex flex-col">
            <span className="text-label font-bold text-action-primary">همه فیلدها قابل ویرایش هستند</span>
            <span className="text-caption text-text-secondary mt-1">
              در این مرحله، حتی اطلاعاتی که از قبل وارد کرده‌اید نمایش داده می‌شوند و می‌توانید آن‌ها را تغییر دهید.
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: currentStep === 1 ? "block" : "none" }} aria-hidden={currentStep !== 1}>
        
        {errors.length > 0 && (
          <div className="flex flex-col gap-3 mb-6">
            {errors.map((err, idx) => (
              <div key={idx} className="bg-surface-error/10 border border-status-error/30 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-status-error shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-label font-bold text-status-error">نیازمند اصلاح</span>
                  <span className="text-caption text-text-secondary mt-1">{err}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <BasicInfoStep 
          key={`edit-step1-${data.id}`} 
          onNext={handleNextStep} 
          defaultValues={defaultValues as any} 
        />
      </div>

      <div style={{ display: currentStep === 2 ? "block" : "none" }} aria-hidden={currentStep !== 2}>
        <AccountStep 
          onNext={handleNextStep} 
          onPrev={handlePrevStep} 
          defaultValues={defaultValues} 
          basicData={defaultValues} 
        />
      </div>

      <div style={{ display: currentStep === 3 ? "block" : "none" }} aria-hidden={currentStep !== 3}>
        <ParentInfoStep 
          onNext={handleNextStep} 
          onPrev={handlePrevStep} 
          defaultValues={defaultValues} 
          userPhone={defaultValues.phone} 
        />
      </div>

      <div style={{ display: currentStep === 4 ? "block" : "none" }} aria-hidden={currentStep !== 4}>
        <div className="flex flex-col gap-6 w-full text-right">
          <div className="text-right mb-2">
            <h2 className="text-card-title font-bold text-text-primary">مرور و ارسال برای ادمین</h2>
            <p className="text-label text-text-secondary mt-1">لطفاً اطلاعات ویرایش شده خود را بررسی کنید.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border border-border-decorative rounded-lg p-4 bg-surface-card">
              <h3 className="text-label font-bold text-text-primary mb-2">اطلاعات پایه</h3>
              <p className="text-caption text-text-secondary">نام، نام خانوادگی، تصویر شناسنامه و ویدیو تایید هویت</p>
            </div>
            <div className="border border-border-decorative rounded-lg p-4 bg-surface-card">
              <h3 className="text-label font-bold text-text-primary mb-2">اطلاعات حساب</h3>
              <p className="text-caption text-text-secondary">شماره همراه تایید شده</p>
            </div>
            <div className="border border-border-decorative rounded-lg p-4 bg-surface-card">
              <h3 className="text-label font-bold text-text-primary mb-2">اطلاعات والد</h3>
              <p className="text-caption text-text-secondary">شماره همراه والد</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="secondary" onClick={handlePrevStep} className="flex-1">
              قبلی
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="flex-1">
              ارسال برای ادمین: نوبت {data.correction_attempts_left || 5} از ۵
            </Button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          title="ارسال انجام شد"
          description="اطلاعات شما برای بررسی مجدد ارسال شد."
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
}