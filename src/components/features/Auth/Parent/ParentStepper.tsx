import { cn } from "@/utils/cn";

const STEPS = [
  "کد دعوت",
  "اطلاعات و مدارک",
  "تأیید موبایل",
] as const;

interface ParentStepperProps {
  step: 1 | 2 | 3;
}

export function ParentStepper({
  step,
}: ParentStepperProps) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-caption font-medium text-text-secondary sm:hidden">
        مرحله {step} از {STEPS.length} ·{" "}
        {STEPS[step - 1]}
      </p>

      <div className="grid grid-cols-3 gap-1.5">
        {STEPS.map((label, index) => {
          const itemStep = index + 1;
          const done = itemStep < step;
          const active = itemStep === step;

          return (
            <div key={label}>
              <div
                className={cn(
                  "h-1.5 rounded-full",
                  done || active
                    ? "bg-action-primary"
                    : "bg-green-7",
                )}
              />
              <p
                className={cn(
                  "mt-2 hidden text-center text-caption sm:block",
                  active
                    ? "font-bold text-action-primary"
                    : "text-text-secondary",
                )}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
