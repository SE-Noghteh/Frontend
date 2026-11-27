import { BadgeCheck, Star, User } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface AdEmployerCardProps {
  name: string;
  initial?: string;
  collabsCount?: number;
  rating?: number;
  verified?: boolean;
}

export function AdEmployerCard({
  name,
  initial,
  collabsCount,
  rating,
  verified = false,
}: AdEmployerCardProps) {
  const avatarInitial =
    initial || name.trim().charAt(0) || "؟";

  let employerMeta =
    "اطلاعات عملکرد کارفرما ثبت نشده است";

  if (collabsCount !== undefined) {
    employerMeta = `${toPersianDigits(collabsCount)} همکاری موفق`;
  } else if (rating !== undefined) {
    employerMeta = `امتیاز کارفرما ${toPersianDigits(
      rating.toFixed(1),
    )}`;
  } else if (verified) {
    employerMeta = "کارفرمای تأییدشده";
  }

  return (
    <SectionCard
      title="کارفرما"
      icon={<User size={15} aria-hidden="true" />}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ocean-8 font-bold text-ocean-3">
          {avatarInitial}
        </span>

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-body font-bold text-text-primary">
            {name}
            {verified ? (
              <BadgeCheck
                size={15}
                className="text-green-3"
                aria-label="کارفرمای تأییدشده"
              />
            ) : null}
          </p>

          <p className="flex items-center gap-1 text-caption text-text-secondary">
            {rating !== undefined &&
            collabsCount === undefined ? (
              <Star
                size={12}
                className="fill-status-warning text-status-warning"
                aria-hidden="true"
              />
            ) : null}
            {employerMeta}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
