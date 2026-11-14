import { Quote, Star } from "lucide-react";

import { ROLE_STYLES } from "@/constants/roles";
import type { Testimonial } from "@/types/Landing/landing";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/** One user quote; tinted by the author's role. */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const style = ROLE_STYLES[testimonial.role];

  return (
    <figure className="relative flex w-[225px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-border-decorative bg-surface-card p-4 sm:w-[400px] sm:p-7">
      <Quote
        className="absolute -top-1 end-5 size-10 rotate-180 text-blue opacity-[.1] sm:size-16"
        strokeWidth={2.2}
      />
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="size-3 fill-status-warning text-status-warning sm:size-4" />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-label leading-7 text-text-primary sm:mt-5 sm:text-body sm:leading-8">
        «{testimonial.text}»
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5 border-t border-border-decorative pt-3 sm:mt-6 sm:gap-3 sm:pt-5">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full text-label font-black sm:size-11 sm:text-body ${style.solid}`}
        >
          {testimonial.authorName[0]}
        </span>
        <div className="min-w-0">
          <div className={`text-caption font-bold sm:text-label ${style.text}`}>
            {testimonial.authorName}
          </div>
          <div className="truncate text-caption text-charcoal-2 sm:text-caption">
            {testimonial.authorMeta}
          </div>
        </div>
        <span
          className={`ms-auto hidden shrink-0 rounded-full px-2.5 py-1 text-caption font-bold sm:block ${style.chip}`}
        >
          {style.name}
        </span>
      </figcaption>
    </figure>
  );
}
