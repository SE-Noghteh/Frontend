interface RegisterStepperProps {
  currentStep?: number;
}

const steps = [
  { id: 1, label: "اطلاعات پایه" },
  { id: 2, label: "حساب کاربری" },
  { id: 3, label: "اطلاعات والد" },
  { id: 4, label: "پایان" },
];

const toPersianDigits = (num: number | string) => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};

export function RegisterStepper({ currentStep = 1 }: RegisterStepperProps) {
  const totalSteps = steps.length;
  const currentLabel = steps.find((s) => s.id === currentStep)?.label || "";

  return (
    <div className="w-full mb-8">
    
      <div className="flex flex-col lg:hidden w-full gap-2">
        <div className="text-right text-label font-medium text-text-primary">
          مرحله {toPersianDigits(currentStep)} از {toPersianDigits(totalSteps)} · {currentLabel}
        </div>
        <div className="flex w-full gap-1.5">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`h-1.5 flex-1 rounded-full ${
                step.id === currentStep
                  ? "bg-action-primary" 
                  : "bg-border-subtle" 
              }`}
            />
          ))}
        </div>
      </div>

      
      <div className="hidden lg:flex w-full relative pt-4">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border-subtle z-0" />
        
        <div 
          className="absolute bottom-0 right-0 h-[2px] bg-action-primary z-0 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />

        <div className="flex w-full justify-between relative z-10">
          {steps.map((step) => {
            const isActive = step.id === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <span
                  className={`text-label mb-3 transition-colors ${
                    isActive
                      ? "text-action-primary font-bold" 
                      : "text-text-secondary font-medium" 
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}