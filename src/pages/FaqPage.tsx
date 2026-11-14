/**
 * Full FAQ page, filterable by category.
 */

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FaqAccordion } from "@/components/features/Faq/FaqAccordion";
import {
  FaqCategoryTabs,
  type FaqCategoryFilter,
} from "@/components/features/Faq/FaqCategoryTabs";
import { SupportCallout } from "@/components/features/Faq/SupportCallout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useFaqs } from "@/hooks/useFaqs";

export default function FaqPage() {
  const [category, setCategory] = useState<FaqCategoryFilter>("همه");
  const { data: faqs = [] } = useFaqs(category === "همه" ? undefined : category);

  return (
    <SectionContainer maxWidthClassName="max-w-[820px]" className="py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-label font-semibold text-text-secondary hover:text-text-primary"
      >
        <ArrowRight className="size-4" />
        بازگشت به صفحه اصلی
      </Link>
      <h1 className="mt-6 text-[36px] font-black text-text-primary sm:text-[44px]">
        همه‌ی سؤال‌ها
      </h1>
      <div className="mt-8">
        <FaqCategoryTabs value={category} onChange={setCategory} />
      </div>
      <div className="mt-5">
        <FaqAccordion items={faqs} />
      </div>
      <div className="mt-12">
        <SupportCallout />
      </div>
    </SectionContainer>
  );
}
