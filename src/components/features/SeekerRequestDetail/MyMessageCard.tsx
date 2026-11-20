import { FileText } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";

interface MyMessageCardProps {
  message: string;
}

export function MyMessageCard({ message }: MyMessageCardProps) {
  return (
    <SectionCard title="درخواست من" icon={<FileText size={15} aria-hidden="true" />}>
      <p className="text-label leading-8 text-text-primary">{message}</p>
    </SectionCard>
  );
}
