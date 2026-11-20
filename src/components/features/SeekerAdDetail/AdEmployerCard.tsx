import { User } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface AdEmployerCardProps {
  name: string;
  initial: string;
  collabsCount: number;
}

export function AdEmployerCard({ name, initial, collabsCount }: AdEmployerCardProps) {
  return (
    <SectionCard title="کارفرما" icon={<User size={15} aria-hidden="true" />}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ocean-8 font-bold text-ocean-3">
          {initial}
        </span>
        <div>
          <p className="text-body font-bold text-text-primary">{name}</p>
          <p className="text-caption text-text-secondary">
            کارفرمای تأییدشده · {toPersianDigits(collabsCount)} همکاری موفق
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
