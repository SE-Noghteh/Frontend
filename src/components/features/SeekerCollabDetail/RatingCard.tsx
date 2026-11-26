import { Flag, Star } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import type { CollabRating } from "@/types/Seeker/collab";
import { cn } from "@/utils/cn";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface RatingCardProps {
  rating: CollabRating;
}

const MAX_SCORE = 5;

/** "امتیاز کارفرما": the employer's score and comment after the collaboration. */
export function RatingCard({ rating }: RatingCardProps) {
  return (
    <SectionCard title="امتیاز کارفرما" icon={<Flag size={15} aria-hidden="true" />}>
      <div className="flex items-center gap-3">
        <span className="text-card-title font-bold text-error">
          {toPersianDigits(rating.score)} از {toPersianDigits(MAX_SCORE)}
        </span>
        <span role="img" aria-label={`${rating.score} ستاره از ${MAX_SCORE}`} className="flex gap-1">
          {Array.from({ length: MAX_SCORE }, (_, index) => (
            <Star
              key={index}
              size={16}
              aria-hidden="true"
              className={cn(index < rating.score ? "fill-error text-error" : "text-border-soft")}
            />
          ))}
        </span>
      </div>
      <p className="mt-2 text-label leading-7 text-text-secondary">«{rating.comment}»</p>
    </SectionCard>
  );
}
