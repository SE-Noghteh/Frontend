
import { Check } from "lucide-react";

import { cn } from "@/utils/cn";
import type { CreateAdStep } from "@/types/Employer/createAd";

const STEPS = [
  "نوع آگهی",
  "مشخصات",
  "زمان و شرایط",
  "مرور",
  "پرداخت و انتشار",
];

interface CreateAdStepperProps {
  step: CreateAdStep;
  onSelect: (step: CreateAdStep) => void;
  isEdit?: boolean;
}

export function CreateAdStepper({
  step,
  onSelect,
  isEdit = false,
}: CreateAdStepperProps) {
  const steps = isEdit
    ? STEPS.slice(0, 4)
    : STEPS;
  return (
    <div className="rounded-2xl border border-border-soft bg-white p-4 lg:p-6">

      <div className="flex items-start">

        {steps.map((label, index) => {
          const number = index + 1;
          const completed = number < step;
          const active = number === step;

          return (
            <div
              key={label}
              className="relative flex min-w-0 flex-1 flex-col items-center"
            >

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute start-1/2 top-4 h-px w-full",
                    completed
                      ? "bg-blue"
                      : "bg-border-soft",
                  )}
                />
              )}

              <button
                type="button"
                disabled={!completed}
                aria-current={active ? "step" : undefined}
                onClick={() =>
                  onSelect(number as CreateAdStep)
                }
                className={cn(
                  "relative z-10 grid size-8 place-items-center rounded-full border text-label font-bold",
                  completed
                    ? "border-blue bg-blue text-white"
                    : active
                      ? "border-blue bg-white text-blue"
                      : "border-border-soft bg-background-page text-text-secondary",
                )}
              >
                {completed ? (
                  <Check size={16} />
                ) : (
                  number.toLocaleString("fa-IR")
                )}
              </button>

              <span
                className={cn(
                  "mt-2 text-center text-[10px] md:text-label",
                  active
                    ? "font-bold text-blue"
                    : "text-text-secondary",
                )}
              >
                {label}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}
