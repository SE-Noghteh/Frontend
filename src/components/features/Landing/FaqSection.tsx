import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
          {/* TODO: replace both links with the shared Button component. */}
          <Link
            to="/faq"
            className="group inline-flex items-center gap-2 rounded-xl bg-action-primary px-7 py-3.5 text-label font-bold text-white transition-colors hover:bg-action-hover"
          >
            دیدن همه‌ی سؤال‌ها
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link
            to="/support"
            className="rounded-xl border border-blue-8 bg-surface-card px-7 py-3.5 text-label font-bold text-text-primary transition-colors hover:border-blue"
          >
            ارتباط با پشتیبانی
          </Link>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
