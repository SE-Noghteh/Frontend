import { useQuery } from "@tanstack/react-query";

import { faqKeys } from "@/queryKeys/faqKeys";
import { getFaqs, getFeaturedFaqs } from "@/services/Faq/faqService";
import type { FaqCategory } from "@/types/Faq/faq";

export function useFeaturedFaqs() {
  return useQuery({
    queryKey: faqKeys.featured(),
    queryFn: getFeaturedFaqs,
  });
}

export function useFaqs(category?: FaqCategory) {
  return useQuery({
    queryKey: faqKeys.list(category),
    queryFn: () => getFaqs(category),
  });
}
