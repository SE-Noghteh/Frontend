import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTestimonials } from "@/hooks/useTestimonials";

import { TestimonialCard } from "./TestimonialCard";

/** Endless marquee of user testimonials. */
export function TestimonialsSection() {
  const { data: testimonials = [] } = useTestimonials();

  return (
    <section className="overflow-hidden bg-background-page py-16 sm:py-28">
      <SectionContainer>
        <SectionHeading maxWidthClassName="max-w-[640px]">نظر کاربران</SectionHeading>
      </SectionContainer>

      {/* The list is rendered twice so the loop is seamless (see .marquee-track). */}
      <SectionContainer className="mt-12">
        <div className="marquee overflow-hidden">
          <div className="marquee-track flex w-max gap-5 py-2">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-5" aria-hidden={copy === 1}>
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={`${copy}-${testimonial.id}`} testimonial={testimonial} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
