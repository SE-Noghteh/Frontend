import type { EmployerAd, EmployerAdStatus } from "@/types/Employer/employer";
import { jalaliToDate, toJalali } from "@/utils/jalali";
import { getTodayISO, isValidISODate, toISODate } from "@/utils/dateValidation";

// Use the same local calendar day as the existing form validation.
export function normalizeAdDeadline(value?: string): string {
  const normalized = (value ?? "").replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, d => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[\u200e\u200f\u061c]/g, "").trim();
  const match = normalized.match(/^(1[34]\d{2})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (match) {
    const input = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
    if (input.month < 1 || input.month > 12 || input.day < 1 || input.day > 31) return "";
    const date = jalaliToDate(input);
    const check = toJalali(date);
    return check.year === input.year && check.month === input.month && check.day === input.day ? toISODate(date) : "";
  }
  const iso = normalized.slice(0, 10);
  return isValidISODate(iso) ? iso : "";
}

export function hasOpenDeadline(value?: string, today = getTodayISO()): boolean {
  const deadline = normalizeAdDeadline(value);
  return Boolean(deadline && deadline >= today);
}

export function getEffectiveAdStatus(ad: EmployerAd, today = getTodayISO()): EmployerAdStatus {
  return ad.status === "published" && !hasOpenDeadline(ad.deadline, today) ? "expired" : ad.status;
}

export function canReceiveApplicants(ad: EmployerAd): boolean {
  return getEffectiveAdStatus(ad) === "published";
}
export const canEditAd = canReceiveApplicants;
export function canRepublishAd(ad: EmployerAd): boolean {
  const status = getEffectiveAdStatus(ad);
  return status === "expired" || status === "closed";
}
export function canViewCollaboration(ad: EmployerAd): boolean {
  return ad.status === "collaboration";
}
export function formatAdDeadline(value?: string): string {
  const iso = normalizeAdDeadline(value);
  if (!iso) return "—";
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}
export const republishPath = (id: string) => `/employer/ads/create?republish=${encodeURIComponent(id)}`;
export const collaborationPath = (id: string) => `/employer/ads/${encodeURIComponent(id)}/collaboration`;
