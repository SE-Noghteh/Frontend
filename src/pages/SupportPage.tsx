/**
 * Support contact page.
 */

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { SupportForm } from "@/components/features/Support/SupportForm";
import { SectionContainer } from "@/components/ui/SectionContainer";

export default function SupportPage() {
  return (
    <SectionContainer maxWidthClassName="max-w-[640px]" className="py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-label font-semibold text-text-secondary hover:text-text-primary"
      >
        <ArrowRight className="size-4" />
        بازگشت به صفحه اصلی
      </Link>
      <h1 className="mt-6 text-[36px] font-black text-text-primary sm:text-[44px]">
        ارتباط با پشتیبانی
      </h1>
      <p className="mt-3 text-body leading-8 text-text-secondary">
        سؤال یا مشکلت رو بنویس. قبل از ارسال، شاید جوابش توی{" "}
        <Link to="/faq" className="font-bold text-blue underline">
          صفحه‌ی سؤال‌ها
        </Link>{" "}
        باشه.
      </p>
      <SupportForm />
    </SectionContainer>
  );
}
