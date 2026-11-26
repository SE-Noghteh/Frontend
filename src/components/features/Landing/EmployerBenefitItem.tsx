import type { LucideIcon } from "lucide-react";

interface EmployerBenefitItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** One cell of the employer benefits grid (on the dark blue section). */
export function EmployerBenefitItem({
  icon: Icon,
  title,
  description,
}: EmployerBenefitItemProps) {
  return (
    <div className="bg-blue p-6">
      <Icon className="size-5 text-white/80" />
      <div className="mt-3 text-body font-bold">{title}</div>
      <div className="mt-1 text-label leading-6 text-white/65">{description}</div>
    </div>
  );
}
