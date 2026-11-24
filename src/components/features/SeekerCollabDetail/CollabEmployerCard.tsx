import { User } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

interface CollabEmployerCardProps {
  name: string;
  initial: string;
  onChat: () => void;
}

export function CollabEmployerCard({ name, initial, onChat }: CollabEmployerCardProps) {
  return (
    <SectionCard title="کارفرما" icon={<User size={15} aria-hidden="true" />}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ocean-8 font-bold text-ocean-3">
          {initial}
        </span>
        <div>
          <p className="text-body font-bold text-text-primary">{name}</p>
          <p className="text-caption text-text-secondary">کارفرمای تأییدشده</p>
        </div>
      </div>
      <Button variant="secondary" size="sm" fullWidth className="mt-4" onClick={onChat}>
        گفت‌وگو با کارفرما
      </Button>
    </SectionCard>
  );
}
