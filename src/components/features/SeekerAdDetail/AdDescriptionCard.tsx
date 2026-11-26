import { FileText } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";

interface AdDescriptionCardProps {
  description: string;
}

export function AdDescriptionCard({ description }: AdDescriptionCardProps) {
  return (
    <SectionCard title="توضیحات" icon={<FileText size={15} aria-hidden="true" />}>
      <p className="text-label leading-8 text-text-primary">{description}</p>
    </SectionCard>
  );
}
