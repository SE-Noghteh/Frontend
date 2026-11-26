import { FileText } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";

interface AdDescriptionCardProps {
  description?: string;
}

export function AdDescriptionCard({ description }: AdDescriptionCardProps) {
  const hasDescription = Boolean(description?.trim());

  return (
    <SectionCard title="توضیحات" icon={<FileText size={15} aria-hidden="true" />}>
      {hasDescription ? (
        <p className="text-label leading-8 text-text-primary">{description}</p>
      ) : (
        <p className="text-label leading-8 text-text-secondary">
          توضیحات تکمیلی برای این آگهی در اطلاعات فعلی ثبت نشده است.
        </p>
      )}
    </SectionCard>
  );
}
