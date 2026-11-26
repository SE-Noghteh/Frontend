import { Star, User } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface AdEmployerCardProps {
  name: string;
  initial?: string;
  collabsCount?: number;
  rating?: number;
}

export function AdEmployerCard({
  name,
  initial,
  collabsCount,
  rating,
}: AdEmployerCardProps) {
  const avatarInitial = initial || name.trim().charAt(0) || "؟";

  let employerMeta = "اطلاعات عملکرد کارفرما ثبت نشده است";

  if (collabsCount !== undefined) {
    employerMeta = `کارفرمای تأییدشده · ${toPersianDigits(collabsCount)} همکاری موفق`;
  } else if (rating !== undefined) {
    employerMeta = `امتیاز کارفرما ${toPersianDigits(rating.toFixed(1))}`;
  }

  return (
    <SectionCard title="کارفرما" icon={<User size={15} aria-hidden="true" />}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ocean-8 font-bold text-ocean-3">
          {avatarInitial}
        </span>
        <div className="min-w-0">
          <p className="text-body font-bold text-text-primary">{name}</p>
          <p className="flex items-center gap-1 text-caption text-text-secondary">
            {rating !== undefined && collabsCount === undefined ? (
              <Star size={12} className="fill-status-warning text-status-warning" aria-hidden="true" />
            ) : null}
            {employerMeta}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
