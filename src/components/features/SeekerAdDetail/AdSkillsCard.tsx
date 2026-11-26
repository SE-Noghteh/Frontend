import { CircleCheck } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";

interface AdSkillsCardProps {
  skills: string[];
  deliverables?: string;
  deliveryFormat?: string;
}

const NOT_PROVIDED = "در اطلاعات آگهی ثبت نشده";

export function AdSkillsCard({ skills, deliverables, deliveryFormat }: AdSkillsCardProps) {
  return (
    <SectionCard title="مهارت‌ها و خروجی‌ها" icon={<CircleCheck size={15} aria-hidden="true" />}>
      {skills.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-lg bg-ocean-8 px-3 py-1.5 text-caption font-medium text-ocean-3"
            >
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-caption text-text-secondary">مهارتی برای این آگهی ثبت نشده است.</p>
      )}

      <dl className="mt-4 divide-y divide-border-soft border-t border-border-soft text-caption">
        <div className="flex items-center justify-between gap-4 py-2.5">
          <dt className="text-text-secondary">خروجی‌ها</dt>
          <dd className="text-start font-bold text-text-primary">{deliverables || NOT_PROVIDED}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 pt-2.5">
          <dt className="text-text-secondary">قالب تحویل</dt>
          <dd className="text-start font-bold text-text-primary">{deliveryFormat || NOT_PROVIDED}</dd>
        </div>
      </dl>
    </SectionCard>
  );
}
