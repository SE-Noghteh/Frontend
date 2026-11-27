import { normalizeWeeklyHours, selectedSkillLevels } from "@/utils/employerAdFields";
import type { EmployerAd } from "@/types/Employer/employer";

import {
  INITIAL_CREATE_AD_FORM,
  type CreateAdForm,
} from "@/types/Employer/createAd";

import { jalaliToDate, toJalali } from "@/utils/jalali";
import { toISODate } from "@/utils/dateValidation";

function normalizeDate(value?: string): string {
  if (!value) return "";

  const normalized = value
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    )
    .replace(/[\u200e\u200f\u061c]/g, "")
    .trim();

  const match = normalized.match(
    /^(1[34]\d{2})[/-](\d{1,2})[/-](\d{1,2})$/,
  );

  if (match) {
    const [, year, month, day] = match;

    const input = {
      year: Number(year),
      month: Number(month),
      day: Number(day),
    };

    const date = jalaliToDate(input);
    const converted = toJalali(date);

    if (
      converted.year !== input.year ||
      converted.month !== input.month ||
      converted.day !== input.day
    ) {
      return "";
    }

    return toISODate(date);
  }

  return normalized.slice(0, 10);
}

export function adToForm(ad: EmployerAd): CreateAdForm {
  return {
    ...INITIAL_CREATE_AD_FORM,

    kind: ad.kind,
    title: ad.title,
    category: ad.category ?? "",
    skills: [...(ad.skills ?? [])],
    skillLevels: selectedSkillLevels(ad.skills ?? [], ad.skillLevels ?? {}),
    attachments: ad.kind === "work" ? [...(ad.attachments ?? [])] : [],
    description: ad.description ?? "",
    deliverables: ad.deliverables ?? "",
    deliveryFormat: ad.deliveryFormat ?? "",

    deadline: normalizeDate(ad.deadline),
    deliveryDate: normalizeDate(ad.deliveryDate),

    budget: String(ad.budget ?? ""),
    collaborationMode: ad.collaborationMode ?? "",
    ageRange: ad.ageRange ?? "",

    internshipDuration: ad.internshipDuration ?? "",
    weeklyHours: normalizeWeeklyHours(ad.weeklyHours),
    hasAllowance: ad.hasAllowance ?? false,

    acceptedTerms: false,
  };
}

export function formToAdChanges(form: CreateAdForm) {
  return {
    title: form.title.trim(),
    description: form.description,
    category: form.category,
    skills: [...form.skills],
    skillLevels: selectedSkillLevels(form.skills, form.skillLevels),
    attachments: form.kind === "work" ? [...form.attachments] : [],
    deliverables: form.deliverables,
    deliveryFormat: form.deliveryFormat,

    deadline: form.deadline,
    deliveryDate: form.deliveryDate,

    budget:
      form.kind === "internship" && !form.hasAllowance
        ? 0
        : Number(form.budget),

    collaborationMode: form.collaborationMode,
    ageRange: form.ageRange,

    internshipDuration: form.internshipDuration,
    weeklyHours: normalizeWeeklyHours(form.weeklyHours),
    hasAllowance: form.hasAllowance,
  };
}

const FIELD_LABELS: Partial<
  Record<keyof CreateAdForm, string>
> = {
  title: "عنوان آگهی",
  category: "دسته‌بندی",
  skills: "مهارت‌ها",
  skillLevels: "سطح مهارت‌ها",
  attachments: "پیوست‌ها",
  description: "شرح آگهی",
  deliverables: "خروجی‌های مورد انتظار",
  deliveryFormat: "فرمت تحویل",
  deadline: "مهلت درخواست",
  deliveryDate: "تاریخ تحویل یا شروع دوره",
  budget: "بودجه یا کمک‌هزینه",
  collaborationMode: "نحوه همکاری",
  ageRange: "بازه سنی",
  internshipDuration: "مدت دوره",
  weeklyHours: "ساعت کار هفتگی",
  hasAllowance: "شرایط کمک‌هزینه",
};

function comparable(value: unknown): string {
  if (Array.isArray(value)) {
    return JSON.stringify([...value].sort());
  }
  if (value && typeof value === "object") {
    return JSON.stringify(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)));
  }

  return String(value ?? "").trim();
}

export function getChangedFields(
  previous: EmployerAd,
  form: CreateAdForm,
): string[] {
  const oldForm = adToForm(previous);

  return (
    Object.keys(FIELD_LABELS) as (keyof CreateAdForm)[]
  )
    .filter(
      (key) => {
        if (key === "attachments") {
          return oldForm.attachments.length !== form.attachments.length ||
            oldForm.attachments.some((file, index) => file !== form.attachments[index]);
        }
        return comparable(oldForm[key]) !== comparable(form[key]);
      },
    )
    .map((key) => FIELD_LABELS[key]!);
}