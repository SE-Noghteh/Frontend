import type { EmployerSkillLevel } from "@/types/Employer/employer";

export const SKILL_LEVEL_LABELS: Record<EmployerSkillLevel, string> = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

export const SKILL_LEVEL_OPTIONS = ["تعیین نشده", ...Object.values(SKILL_LEVEL_LABELS)];

export function levelFromLabel(label: string): EmployerSkillLevel | undefined {
  return (Object.keys(SKILL_LEVEL_LABELS) as EmployerSkillLevel[])
    .find(level => SKILL_LEVEL_LABELS[level] === label);
}

export function selectedSkillLevels(skills: string[], levels: Partial<Record<string, EmployerSkillLevel>>) {
  return Object.fromEntries(skills.filter(skill => levels[skill]).map(skill => [skill, levels[skill]]));
}

export function normalizeWeeklyHours(value = ""): string {
  return value.replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[\u200e\u200f\u061c]/g, "").trim().replace(/\s*ساعت$/, "").trim();
}

export function validWeeklyHours(value: string): boolean {
  const normalized = normalizeWeeklyHours(value);
  return /^\d+$/.test(normalized) && Number.isSafeInteger(Number(normalized)) && Number(normalized) >= 1 && Number(normalized) <= 168;
}

export function formatWeeklyHours(value?: string): string {
  return value && validWeeklyHours(value) ? `${Number(normalizeWeeklyHours(value)).toLocaleString("fa-IR")} ساعت` : value || "—";
}

export const MAX_ATTACHMENTS = 5;
export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
export const ATTACHMENT_ACCEPT = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg";

export function validateAttachments(files: readonly File[]): string | undefined {
  if (files.length > MAX_ATTACHMENTS) return "حداکثر ۵ فایل می‌توانید اضافه کنید.";
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    const expected = extension === "pdf" ? "application/pdf" : extension === "png" ? "image/png" : extension === "jpg" || extension === "jpeg" ? "image/jpeg" : undefined;
    if (!expected || (file.type && file.type !== expected)) return `فرمت فایل «${file.name}» مجاز نیست.`;
    if (file.size === 0 || file.size > MAX_ATTACHMENT_BYTES) return `حجم فایل «${file.name}» باید بیشتر از صفر و حداکثر ۱۰ مگابایت باشد.`;
  }
}

export function downloadAttachment(file: File) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
