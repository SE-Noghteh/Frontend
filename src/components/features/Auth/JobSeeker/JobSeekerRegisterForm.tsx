import { useState } from "react";
import { RegisterStepper } from "./RegisterStepper";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { AccountStep } from "./steps/AccountStep";
import { ParentInfoStep } from "./steps/ParentInfoStep";
// import { FinishStep } from "./steps/FinishStep";

export function JobSeekerRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleNextStep = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <RegisterStepper currentStep={currentStep} />
      
      <div className={currentStep === 1 ? "block" : "hidden"}>
        <BasicInfoStep onNext={handleNextStep} defaultValues={formData} />
      </div>
      
      <div className={currentStep === 2 ? "block" : "hidden"}>
        <AccountStep onNext={handleNextStep} onPrev={handlePrevStep} defaultValues={formData} />
      </div> 

      <div className={currentStep === 3 ? "block" : "hidden"}>
        <ParentInfoStep 
          onNext={handleNextStep} 
          onPrev={handlePrevStep} 
          defaultValues={formData} 
          birthYear={formData.birthYear}
          birthMonth={formData.birthMonth}
          birthDay={formData.birthDay}
          userPhone={formData.phone} 
        />
      </div>
      
      {/* 
      {currentStep === 4 && (
        <FinishStep onPrev={handlePrevStep} formData={formData} />
      )} 
      */}
    </div>
  );
}