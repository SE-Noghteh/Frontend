import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

interface RevisionCardProps {
  items: string[];
  onStart: () => void;
  onViewPrevious: () => void;
}

/** "موارد اصلاح": what the employer asked to change, with the buttons to start the revision. */
export function RevisionCard({ items, onStart, onViewPrevious }: RevisionCardProps) {
  return (
    <SectionCard title="موارد اصلاح" icon={<Pencil size={15} aria-hidden="true" />}>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center justify-between gap-3 rounded-xl bg-background-page px-3 py-2.5">
            <div className="min-w-0 text-start">
              <p className="text-label font-bold text-text-primary">{item}</p>
              <p className="text-caption text-text-secondary">نوبت اول اصلاح</p>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-warning-soft text-warning">
              <Pencil size={14} aria-hidden="true" />
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2 md:flex-row-reverse md:justify-end">
        <Button className="md:min-w-32" onClick={onStart}>
          شروع اصلاح
        </Button>
        <Button variant="secondary" className="md:min-w-36" onClick={onViewPrevious}>
          مشاهده‌ی تحویل قبلی
        </Button>
      </div>
    </SectionCard>
  );
}
