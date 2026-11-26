import { ROLE_STYLES } from "@/constants/roles";
import type { RoleGuideContent, UserRole } from "@/types/Landing/landing";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface RoleStepListProps {
  role: UserRole;
  steps: RoleGuideContent["steps"];
}

/** Numbered vertical steps joined by a thin line. */
export function RoleStepList({ role, steps }: RoleStepListProps) {
  const style = ROLE_STYLES[role];

  return (
    <ol className="relative mt-8">
      <span className="absolute inset-y-3 start-[15px] w-px bg-border-decorative" />
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
          <span
            className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-label font-extrabold ${style.solid}`}
          >
            {toPersianDigits(index + 1)}
          </span>
          <div>
            <div className="text-body font-bold text-text-primary">{step.title}</div>
            <div className="mt-1 max-w-[440px] text-label leading-7 text-text-secondary">
              {step.description}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
