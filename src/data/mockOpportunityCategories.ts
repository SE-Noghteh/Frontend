/**
 * MOCK DATA - replace with real backend data.
 */

import type { OpportunityCategory } from "@/types/Opportunity/opportunity";

export const MOCK_OPPORTUNITY_CATEGORIES: OpportunityCategory[] = [
  { id: "graphic", title: "گرافیک و تصویرسازی", shortTitle: "گرافیک", requiresSpecialReview: false },
  { id: "video", title: "عکاسی، ویدئو و انیمیشن", shortTitle: "ویدئو و عکس", requiresSpecialReview: false },
  { id: "code", title: "برنامه‌نویسی، بازی و سه‌بعدی", shortTitle: "برنامه‌نویسی", requiresSpecialReview: false },
  { id: "writing", title: "نویسندگی، ترجمه و خدمات متنی", shortTitle: "نویسندگی", requiresSpecialReview: false },
  { id: "audio", title: "صدا، گویندگی و موسیقی", shortTitle: "صدا و موسیقی", requiresSpecialReview: false },
  { id: "tutoring", title: "آموزش، تدریس و راهنمایی", shortTitle: "آموزش", requiresSpecialReview: false },
  { id: "data", title: "داده، اسناد و دیجیتالی‌سازی", shortTitle: "داده و اسناد", requiresSpecialReview: false },
  { id: "craft", title: "صنایع دستی و محصولات خلاقانه", shortTitle: "صنایع دستی", requiresSpecialReview: false },
  { id: "kids", title: "فعالیت‌های کودک و سرگرمی", shortTitle: "کودک", requiresSpecialReview: true },
  { id: "pets", title: "خدمات حیوانات خانگی", shortTitle: "حیوانات", requiresSpecialReview: true },
  { id: "garden", title: "گل، گیاه و باغبانی سبک", shortTitle: "گل و گیاه", requiresSpecialReview: false },
  { id: "store", title: "خدمات فروشگاهی و بسته‌بندی", shortTitle: "فروشگاه", requiresSpecialReview: true },
  { id: "events", title: "رویدادها و نمایشگاه‌ها", shortTitle: "رویداد", requiresSpecialReview: true },
];

export const MOCK_TRENDING_SEARCHES = [
  "طراحی لوگو",
  "تدوین ویدئو",
  "محتوانویسی",
  "ورود اطلاعات",
  "گویندگی",
  "کمک‌درسی",
  "سایت ساده",
  "کاردستی",
];
