import { useState } from "react";
import { RegisterStepper } from "./RegisterStepper";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { AccountStep } from "./steps/AccountStep";
import { ParentInfoStep } from "./steps/ParentInfoStep";
import { FinishStep } from "./steps/FinishStep";
import { useNavigate } from "react-router-dom";
import { getDetailedAge } from "@/utils/getDetailedAge";

export function JobSeekerRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const handleNextStep = (data: Record<string, any>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (currentStep === 2) {
      const birthDateObj = updatedData.birthDateObj;
      
      if (birthDateObj && birthDateObj.year && birthDateObj.month && birthDateObj.day) {
        const { totalYears } = getDetailedAge(
          birthDateObj.year.toString(),
          birthDateObj.month.number.toString(), 
          birthDateObj.day.toString()
        );

        if (totalYears >= 18) {
          setCurrentStep(4); 
        } else {
          setCurrentStep(3); 
        }
      } else {
        setCurrentStep(3);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    if (currentStep === 4) {
      const birthDateObj = formData.birthDateObj;
      
      if (birthDateObj && birthDateObj.year && birthDateObj.month && birthDateObj.day) {
        const { totalYears } = getDetailedAge(
          birthDateObj.year.toString(),
          birthDateObj.month.number.toString(),
          birthDateObj.day.toString()
        );
        
        if (totalYears >= 18) {
          setCurrentStep(2);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
    }
    
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <RegisterStepper currentStep={currentStep} />

      <div style={{ display: currentStep === 1 ? "block" : "none" }} aria-hidden={currentStep !== 1}>
        <BasicInfoStep onNext={handleNextStep} defaultValues={formData} />
      </div>

      <div style={{ display: currentStep === 2 ? "block" : "none" }} aria-hidden={currentStep !== 2}>
        <AccountStep
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          defaultValues={formData}
          basicData={formData}
        />
      </div>

      <div style={{ display: currentStep === 3 ? "block" : "none" }} aria-hidden={currentStep !== 3}>
        <ParentInfoStep
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          defaultValues={formData}
          userPhone={formData.phone}
        />
      </div>

      <div style={{ display: currentStep === 4 ? "block" : "none" }} aria-hidden={currentStep !== 4}>
        <FinishStep
          onPrev={handlePrevStep}
          onDashboard={() => navigate("/dashboard")}
          parentPhone={formData.parentPhone}
        />
      </div>
    </div>
  );
}