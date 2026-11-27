import type { CreateAdForm } from "@/types/Employer/createAd";
import { validateAdDates } from "@/utils/dateValidation";
import { validateAttachments, normalizeWeeklyHours, validWeeklyHours } from "@/utils/employerAdFields";

// Existing Vite proxy forwards /v1 to the backend. Keep employer auth separate
// from the job-seeker accessToken in the shared client.
export type EmployerType = "individual" | "legal";
export interface EmployerSession {
  type: EmployerType;
  id: number;
  token: string;
  expiresAt?: string;
}
interface Identity { id: number; employer_type: EmployerType; review_status: string; }
interface LoginResponse { access_token: string; expires_at?: string; data: Identity; }
export interface WorkDraftInput {
  title: string;
  description: string;
  details: {
    opportunity_type: "work";
    category: string;
    skills: string[];
    work_mode: "online" | "onsite" | "hybrid";
    minimum_age: number;
    maximum_age: number;
    accept_under_18: boolean;
    requires_parent_approval: boolean;
    apply_deadline: string;
    delivery_deadline: string;
    budget_toman: number;
    deliverables: string[];
    delivery_formats: string[];
  };
}
export interface InternshipDraftInput {
  title: string;
  description: string;
  details: Omit<WorkDraftInput["details"], "opportunity_type" | "delivery_deadline" | "budget_toman" | "deliverables" | "delivery_formats"> & {
    opportunity_type: "internship";
    internship: {
      duration_months: number;
      hours_per_week: number;
      learning_outcomes: string;
      responsibilities: string;
      prerequisites: string;
      start_date: string;
      has_monthly_stipend: boolean;
      monthly_stipend_toman: number;
    };
  };
}
export type DraftInput = WorkDraftInput | InternshipDraftInput;
export interface DraftRef { id: number; owner: string; kind: "work" | "internship"; }
const KEY = "noghteh.employer.work-draft.session.v1";
export class DraftApiError extends Error {
  constructor(public readonly status: number, message: string) { super(message); this.name = "DraftApiError"; }
}
export function readEmployerSession(): EmployerSession | null {
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as EmployerSession | null;
    if (!s || !["individual", "legal"].includes(s.type) || !Number.isSafeInteger(s.id) || s.id < 1 || typeof s.token !== "string" || !s.token) return null;
    if (s.expiresAt && Date.parse(s.expiresAt) <= Date.now()) { clearEmployerSession(); return null; }
    return s;
  } catch { return null; }
}
export function clearEmployerSession() { sessionStorage.removeItem(KEY); }
export function ownerKey(s: EmployerSession) { return `${s.type}:${s.id}`; }
function authPath(type: EmployerType) { return type === "individual" ? "/individual-employers" : "/legal-employers"; }
async function request<T>(path: string, init: RequestInit = {}, session?: EmployerSession): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (session) headers.set("Authorization", `Bearer ${session.token}`);
  if (init.body && !(init.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const response = await fetch(`/v1${path}`, { ...init, headers, credentials: "omit", cache: "no-store", signal: AbortSignal.timeout(30000) });
  if (!response.ok) {
    const data = await response.json().catch(() => null) as { message?: unknown } | null;
    throw new DraftApiError(response.status, typeof data?.message === "string" ? data.message : `HTTP ${response.status}`);
  }
  if (response.status === 204) return undefined as T;
  return await response.json() as T;
}
export function draftErrorMessage(error: unknown): string {
  if (error instanceof DraftApiError) {
    const messages: Record<number, string> = {400:"اطلاعات درخواست معتبر نیست.",401:"ورود معتبر نیست؛ دوباره وارد شوید.",403:"حساب کارفرما باید مورد تأیید مدیر باشد.",404:"پیش‌نویس پیدا نشد یا متعلق به این حساب نیست.",413:"حجم پیوست بیش از حد مجاز است.",429:"تعداد تلاش‌ها بیش از حد مجاز است.",500:"خطای سرور.",503:"سرویس موقتاً در دسترس نیست."};
    return `${messages[error.status] ?? "درخواست ناموفق بود."} (${error.status})${error.message === `HTTP ${error.status}` ? "" : ` — ${error.message}`}`;
  }
  if (error instanceof TypeError || (error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name))) return "ارتباط با سرور برقرار نشد یا زمان درخواست به پایان رسید.";
  return error instanceof Error ? error.message : "خطای غیرمنتظره.";
}
const digits = (s: string) => s.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, d => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
export async function loginEmployer(type: EmployerType, phone: string, password: string): Promise<EmployerSession> {
  const normalized = digits(phone).replace(/\s/g, "");
  if (!/^09\d{9}$/.test(normalized) || !password) throw new Error("شماره موبایل و رمز عبور را وارد کنید.");
  const result = await request<LoginResponse>(`${authPath(type)}/login`, {method:"POST", body:JSON.stringify({phone: normalized, password})});
  if (!result?.access_token || !Number.isSafeInteger(result.data?.id) || result.data.id < 1 || result.data.employer_type !== type) throw new Error("پاسخ ورود معتبر نیست.");
  const session = {type, id:result.data.id, token:result.access_token, expiresAt:result.expires_at};
  if (result.data.review_status !== "approved") throw new Error("حساب کارفرما هنوز مورد تأیید مدیر نیست.");
  sessionStorage.setItem(KEY, JSON.stringify(session));
  return session;
}
export async function checkEmployer(session: EmployerSession) {
  const r = await request<{data: Identity}>(`${authPath(session.type)}/me`, {}, session);
  if (r?.data?.id !== session.id || r.data.employer_type !== session.type) throw new Error("هویت کارفرما با نشست فعلی مطابقت ندارد.");
  if (r.data.review_status !== "approved") throw new Error("حساب کارفرما هنوز مورد تأیید مدیر نیست.");
}
export async function logoutEmployer(session: EmployerSession) {
  await request<void>(`${authPath(session.type)}/logout`, {method:"POST"}, session);
  clearEmployerSession();
}
const modes: Record<string, WorkDraftInput["details"]["work_mode"]> = {"آنلاین":"online", "دورکاری":"online", "حضوری":"onsite", "ترکیبی":"hybrid"};
// Keep the current Persian labels. 14 and 100 are the API's age limits.
const ages: Record<string, readonly [number, number]> = {"۱۵ تا ۱۸ سال":[15,18], "۱۸ سال به بالا":[18,100], "همه افراد واجد شرایط":[14,100]};
const lines = (s: string) => s.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
const formats = (s: string) => s.split(/[\n،,]+/).map(x => x.trim()).filter(Boolean);
export function workDraftInput(form: CreateAdForm): WorkDraftInput {
  if (form.kind !== "work") throw new Error("در این مرحله فقط آگهی کاری به سرور ارسال می‌شود.");
  const title = form.title.trim(), description = form.description.trim(), category = form.category.trim();
  if (!title || [...title].length > 255 || !category || [...category].length > 200) throw new Error("عنوان و دسته‌بندی را بررسی کنید (حداکثر ۲۵۵ و ۲۰۰ نویسه).");
  if (!description || new TextEncoder().encode(description).length > 50000) throw new Error("شرح آگهی الزامی و حداکثر ۵۰٬۰۰۰ بایت است.");
  const skills = [...new Set(form.skills.map(s => s.trim()).filter(Boolean))];
  if (skills.length > 30 || skills.some(s => [...s].length > 100)) throw new Error("حداکثر ۳۰ مهارت با حداکثر ۱۰۰ نویسه مجاز است.");
  const budget = digits(form.budget).trim();
  if (!/^\d+$/.test(budget) || !Number.isSafeInteger(Number(budget)) || Number(budget) < 1) throw new Error("بودجه باید عدد صحیح مثبت به تومان باشد.");
  const age = ages[form.ageRange], mode = modes[form.collaborationMode];
  if (!age || !mode) throw new Error("بازه سنی و نحوه همکاری را بررسی کنید.");
  const dateErrors = validateAdDates(form.deadline, form.deliveryDate, false);
  if (dateErrors.deadline || dateErrors.deliveryDate) throw new Error(dateErrors.deadline ?? dateErrors.deliveryDate);
  const attachmentError = validateAttachments(form.attachments);
  if (attachmentError) throw new Error(attachmentError);
  if (!form.acceptedTerms) throw new Error("اطلاعات آگهی را تأیید کنید.");
  // Per-skill levels have no corresponding field; do not collapse them into skill_level.
  return {title, description, details:{opportunity_type:"work", category, skills, work_mode:mode, minimum_age:age[0], maximum_age:age[1], accept_under_18:age[0]<18, requires_parent_approval:age[0]<18, apply_deadline:form.deadline, delivery_deadline:form.deliveryDate, budget_toman:Number(budget), deliverables:lines(form.deliverables), delivery_formats:formats(form.deliveryFormat)}};
}
export function internshipDraftInput(form: CreateAdForm): InternshipDraftInput {
  if (form.kind !== "internship") throw new Error("نوع آگهی کارآموزی نیست.");
  const title = form.title.trim(), description = form.description.trim(), category = form.category.trim();
  if (!title || [...title].length > 255 || !category || [...category].length > 200) throw new Error("عنوان و دسته‌بندی را بررسی کنید (حداکثر ۲۵۵ و ۲۰۰ نویسه).");
  if (!description || new TextEncoder().encode(description).length > 50000) throw new Error("شرح کارآموزی الزامی و حداکثر ۵۰٬۰۰۰ بایت است.");
  const skills = [...new Set(form.skills.map(s => s.trim()).filter(Boolean))];
  if (skills.length > 30 || skills.some(s => [...s].length > 100)) throw new Error("حداکثر ۳۰ مهارت با حداکثر ۱۰۰ نویسه مجاز است.");
  const age = ages[form.ageRange], mode = modes[form.collaborationMode];
  if (!age || !mode) throw new Error("بازه سنی و نحوه همکاری را بررسی کنید.");
  const dateErrors = validateAdDates(form.deadline, form.deliveryDate, true);
  if (dateErrors.deadline || dateErrors.deliveryDate) throw new Error(dateErrors.deadline ?? dateErrors.deliveryDate);
  const duration = digits(form.internshipDuration).trim();
  if (!/^\d+$/.test(duration) || Number(duration) < 1 || Number(duration) > 24) throw new Error("مدت دوره باید عدد صحیح بین ۱ تا ۲۴ ماه باشد.");
  if (!validWeeklyHours(form.weeklyHours)) throw new Error("ساعت هفتگی باید عدد صحیح بین ۱ تا ۱۶۸ باشد.");
  const stipend = form.hasAllowance ? digits(form.budget).trim() : "0";
  if (!/^\d+$/.test(stipend) || !Number.isSafeInteger(Number(stipend)) || (form.hasAllowance && Number(stipend) < 1)) throw new Error("کمک‌هزینه ماهانه باید عدد صحیح مثبت به تومان باشد.");
  if (!form.deliverables.trim()) throw new Error("اهداف یادگیری را در مرحله مشخصات کارآموزی وارد کنید.");
  if (!form.acceptedTerms) throw new Error("اطلاعات آگهی را تأیید کنید.");
  return {title, description, details:{opportunity_type:"internship", category, skills, work_mode:mode, minimum_age:age[0], maximum_age:age[1], accept_under_18:age[0]<18, requires_parent_approval:age[0]<18, apply_deadline:form.deadline, internship:{duration_months:Number(duration), hours_per_week:Number(normalizeWeeklyHours(form.weeklyHours)), learning_outcomes:form.deliverables.trim(), responsibilities:description, prerequisites:form.deliveryFormat.trim(), start_date:form.deliveryDate, has_monthly_stipend:form.hasAllowance, monthly_stipend_toman:Number(stipend)}}};
}
export function draftInput(form: CreateAdForm): DraftInput {
  if (form.kind === "work") return workDraftInput(form);
  if (form.kind === "internship") return internshipDraftInput(form);
  throw new Error("نوع آگهی را انتخاب کنید.");
}
function collection(kind: DraftRef["kind"]) {
  return kind === "work" ? "/employer/job-postings" : "/employer/internship-postings";
}
function draftPath(ref: DraftRef) {
  if (!Number.isSafeInteger(ref.id) || ref.id < 1) throw new Error("شناسه پیش‌نویس معتبر نیست.");
  return `${collection(ref.kind)}/${ref.id}`;
}
export async function createDraft(s: EmployerSession, input: DraftInput): Promise<DraftRef> {
  const kind = input.details.opportunity_type;
  const result = await request<{id:number;status:string}>(collection(kind),{method:"POST",body:JSON.stringify(input)},s);
  if (!Number.isSafeInteger(result?.id) || result.id < 1 || result.status !== "draft") throw new Error("پاسخ ایجاد پیش‌نویس نامعتبر است. پیش از تلاش مجدد، وضعیت ثبت را با بک‌اند بررسی کنید.");
  return {id:result.id,owner:ownerKey(s),kind};
}
export async function updateDraft(s: EmployerSession, ref: DraftRef, input: DraftInput) {
  if (ownerKey(s) !== ref.owner) throw new Error("برای ویرایش پیش‌نویس با همان حساب قبلی وارد شوید.");
  if (input.details.opportunity_type !== ref.kind) throw new Error("نوع پیش‌نویس ثبت‌شده قابل تغییر نیست.");
  await request<void>(draftPath(ref), {method:"PUT",body:JSON.stringify(input)},s);
}
export async function replaceWorkAttachments(s: EmployerSession, ref: DraftRef, files: File[]) {
  if (ownerKey(s) !== ref.owner) throw new Error("برای ارسال پیوست با همان حساب قبلی وارد شوید.");
  if (ref.kind !== "work") throw new Error("پیوست فقط برای آگهی کاری پشتیبانی می‌شود.");
  const error = validateAttachments(files);
  if (error) throw new Error(error);
  const body = new FormData();
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase();
    const mime = ext === "pdf" ? "application/pdf" : ext === "png" ? "image/png" : "image/jpeg";
    body.append("attachments", file.type ? file : new Blob([file],{type:mime}), file.name);
  }
  await request<void>(`${draftPath(ref)}/attachments`, {method:"PUT",body},s);
}
