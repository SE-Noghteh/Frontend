/**
 * FAQ domain types.
 */

export type FaqCategory = "کارجو" | "کارفرما" | "والد" | "پرداخت";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  points?: string[];
}
