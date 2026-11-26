import type { SeekerAd } from "@/types/Seeker/seeker";

import { formatToman } from "./formatToman";

type AmountSource = Pick<SeekerAd, "kind" | "budget" | "stipend">;

/** "۲٬۴۰۰٬۰۰۰ تومان" for work, "کمک‌هزینه … / ماه" or "بدون کمک‌هزینه" for internships. */
export function formatAdAmount({ kind, budget, stipend }: AmountSource): string {
  if (kind === "work") return formatToman(budget ?? 0);
  return stipend ? `کمک‌هزینه ${formatToman(stipend)} / ماه` : "بدون کمک‌هزینه";
}
