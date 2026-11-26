/**
 * FAQ API communication (mock-backed for now).
 */

import { MOCK_ALL_FAQS, MOCK_FEATURED_FAQS } from "@/data/mockFaqs";
import type { FaqCategory, FaqItem } from "@/types/Faq/faq";

export function getFeaturedFaqs(): Promise<FaqItem[]> {
  // TODO: replace with a real API request, e.g. GET /faqs?featured=true
  return Promise.resolve(MOCK_FEATURED_FAQS);
}

export function getFaqs(category?: FaqCategory): Promise<FaqItem[]> {
  // TODO: replace with a real API request, e.g. GET /faqs?category=...
  return Promise.resolve(
    category
      ? MOCK_ALL_FAQS.filter((faq) => faq.category === category)
      : MOCK_ALL_FAQS,
  );
}
