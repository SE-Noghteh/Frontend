import { INITIAL_CREATE_AD_FORM, type CreateAdForm } from "@/types/Employer/createAd";
import { draftInput, type DraftInput, type DraftReview } from "./workDraftApi";
import type { DraftHint } from "./draftRegistry";
import { selectedSkillLevels } from "@/utils/employerAdFields";
const modeLabels = {online:"آنلاین", onsite:"حضوری", hybrid:"ترکیبی"} as const;
function ageLabel(min: number, max: number) {
  if (min === 15 && max === 18) return "۱۵ تا ۱۸ سال";
  if (min === 18 && max === 100) return "۱۸ سال به بالا";
  if (min === 14 && max === 100) return "همه افراد واجد شرایط";
  return "";
}
export function reviewToForm(r: DraftReview, levels?: DraftHint["skillLevels"]): CreateAdForm {
  const d = r.details;
  const skills = Array.isArray(d.skills) ? [...d.skills] : [];
  const base: CreateAdForm = {...INITIAL_CREATE_AD_FORM, kind:d.opportunity_type, title:r.title, description:r.description, category:d.category ?? "", skills, skillLevels:selectedSkillLevels(skills, levels ?? {}), attachments:[], deadline:d.apply_deadline ?? "", collaborationMode:modeLabels[d.work_mode] ?? "", ageRange:ageLabel(d.minimum_age, d.maximum_age)};
  if (d.opportunity_type === "work") return {...base, deliveryDate:d.delivery_deadline, budget:String(d.budget_toman), deliverables:(d.deliverables ?? []).join("\n"), deliveryFormat:(d.delivery_formats ?? []).join("، ")};
  const i = d.internship;
  return {...base, deliveryDate:i.start_date, budget:String(i.monthly_stipend_toman ?? 0), hasAllowance:Boolean(i.has_monthly_stipend), internshipDuration:String(i.duration_months), weeklyHours:String(i.hours_per_week), deliverables:i.learning_outcomes, deliveryFormat:i.prerequisites ?? ""};
}
// Preserve documented server-side fields not editable in the existing form.
export function editDraftInput(form: CreateAdForm, original: DraftReview, initial: CreateAdForm): DraftInput {
  const input = draftInput(form, initial);
  const old = original.details;
  if (input.details.opportunity_type !== old.opportunity_type) throw new Error("نوع آگهی قابل تغییر نیست.");
  if (old.skill_level !== undefined) input.details.skill_level = old.skill_level;
  if (input.details.opportunity_type === "work" && old.opportunity_type === "work") {
    if (form.deliverables === initial.deliverables) input.details.deliverables = [...(old.deliverables ?? [])];
    if (form.deliveryFormat === initial.deliveryFormat) input.details.delivery_formats = [...(old.delivery_formats ?? [])];
    if (old.duration_days !== undefined && form.deadline === initial.deadline && form.deliveryDate === initial.deliveryDate) input.details.duration_days = old.duration_days;
  } else if (input.details.opportunity_type === "internship" && old.opportunity_type === "internship") {
    if (old.internship.issues_certificate !== undefined) input.details.internship.issues_certificate = old.internship.issues_certificate;
    if (old.internship.responsibilities && old.internship.responsibilities !== original.description) input.details.internship.responsibilities = old.internship.responsibilities;
  }
  return input;
}
export function sameAttachmentMetadata(a: DraftReview["attachments"], b: DraftReview["attachments"]) {
  return a.length === b.length && a.every((x,i) => x.name === b[i].name && x.size === b[i].size && x.content_type === b[i].content_type);
}
export function attachmentUrl(value: string): string {
  const u = new URL(value);
  if (!["http:", "https:"].includes(u.protocol) || u.username || u.password) throw new Error("آدرس دانلود معتبر نیست.");
  return u.href;
}
