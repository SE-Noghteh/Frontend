import { ArrowLeft } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useFeaturedFaqs } from "@/hooks/useFaqs";

import { FaqAccordion } from "../Faq/FaqAccordion";

/** The four most common questions, with links to the full FAQ and support pages. */
export function FaqSection() {
  const { data: faqs = [] } = useFeaturedFaqs();

  return (
    <section id="faq" className="bg-background-page py-16 sm:py-28">
      <SectionContainer maxWidthClassName="max-w-[820px]">
        <SectionHeading maxWidthClassName="max-w-none">
          چهار سؤالی که تقریباً همه اول می‌پرسن
        </SectionHeading>
        <Reveal delay={80} className="mt-10">
          <FaqAccordion items={faqs} />
        </Reveal>
        <Reveal delay={120} className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/faq" endIcon={<ArrowLeft />}>
            دیدن همه‌ی سؤال‌ها
          </ButtonLink>
          <ButtonLink to="/support" variant="secondary">
            ارتباط با پشتیبانی
          </ButtonLink>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
