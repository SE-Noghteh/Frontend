import type { FaqCategory } from "@/types/Faq/faq";

export const faqKeys = {
  all: ["faqs"] as const,
  featured: () => [...faqKeys.all, "featured"] as const,
  list: (category?: FaqCategory) => [...faqKeys.all, "list", category ?? "all"] as const,
};
