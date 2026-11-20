import type { ReactNode } from "react";

import { SectionCard } from "@/components/ui/SectionCard";

interface TextInfoCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

/** Card with a title and a short paragraph ("چرا منتظر بمانم؟", "دلیل تصمیم"). */
export function TextInfoCard({ title, icon, children }: TextInfoCardProps) {
  return (
    <SectionCard title={title} icon={icon}>
      <p className="text-label leading-8 text-text-primary">{children}</p>
    </SectionCard>
  );
}
