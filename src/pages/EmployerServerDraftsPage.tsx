import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Dialog } from "@/components/ui/Dialog";
import { CreateAdStepper } from "@/components/features/EmployerCreateAd/CreateAdStepper";
import { AdKindStep } from "@/components/features/EmployerCreateAd/AdKindStep";
import { AdDetailsStep } from "@/components/features/EmployerCreateAd/AdDetailsStep";
import { AdConditionsStep } from "@/components/features/EmployerCreateAd/AdConditionsStep";
import { AdReviewStep } from "@/components/features/EmployerCreateAd/AdReviewStep";
import { useCreateEmployerAd } from "@/hooks/useCreateEmployerAd";
import { useToastStore } from "@/store/ui/useToastStore";
import { ATTACHMENT_ACCEPT, MAX_ATTACHMENT_BYTES, validateAttachments, SKILL_LEVEL_LABELS } from "@/utils/employerAdFields";
import { checkEmployer, clearEmployerSession, deleteDraft, DraftApiError, draftErrorMessage, getDraft, loginEmployer, logoutEmployer, ownerKey, readEmployerSession, replaceWorkAttachments, updateDraft, type DraftRef, type DraftReview, type EmployerSession, type EmployerType } from "@/services/Employer/workDraftApi";
import { knownDrafts, rememberDraft, forgetDraft, draftHint } from "@/services/Employer/draftRegistry";
import { attachmentUrl, editDraftInput, reviewToForm, sameAttachmentMetadata } from "@/services/Employer/draftReviewForm";
import type { CreateAdForm } from "@/types/Employer/createAd";

const FIELD = "min-w-0 rounded-lg border border-border-soft bg-white px-3 py-2 text-label";
const PANEL = "flex min-w-0 flex-col gap-4 rounded-2xl border border-border-soft bg-white p-4 lg:p-6";
const fa = (n: number) => n.toLocaleString("fa-IR");
const kindLabel = (kind: DraftRef["kind"]) => kind === "work" ? "کاری" : "کارآموزی";
const refKey = (ref: DraftRef) => `${ref.owner}:${ref.kind}:${ref.id}`;
type Selected = { ref: DraftRef; data: DraftReview };

export default function EmployerServerDraftsPage() {
  const [params] = useSearchParams();
  const [session, setSession] = useState(readEmployerSession);
  const [type, setType] = useState<EmployerType>("individual");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const requestedKind = params.get("kind");
  const requestedId = params.get("id");
  const [revision, setRevision] = useState(0);
  const [selected, setSelected] = useState<Selected | null>(null);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const lock = useRef(false);
  const toast = useToastStore(s => s.showToast);
  const refreshList = () => setRevision(n => n + 1);

  function activeSession(ref?: DraftRef): EmployerSession {
    const current = readEmployerSession();
    if (!current || !session || ownerKey(current) !== ownerKey(session) || (ref && ownerKey(current) !== ref.owner)) {
      setSession(null); setSelected(null); setEditing(false);
      throw new Error("نشست معتبر نیست. دوباره وارد شوید.");
    }
    return current;
  }
  async function run(action: () => Promise<void>) {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError(""); setNotice("");
    try { await action(); }
    catch (e) {
      if (e instanceof DraftApiError && e.status === 401) { clearEmployerSession(); setSession(null); setSelected(null); setEditing(false); }
      setError(draftErrorMessage(e));
    } finally { lock.current = false; setBusy(false); }
  }
  async function login() {
    await run(async () => {
      try { const s = await loginEmployer(type, phone, password); try { await checkEmployer(s); } catch (error) { clearEmployerSession(); throw error; } setSession(s); setSelected(null); }
      finally { setPassword(""); }
    });
  }
  async function logout() {
    await run(async () => {
      const s = activeSession();
      await logoutEmployer(s); setSession(null); setSelected(null); setEditing(false);
    });
  }
  function load(ref: DraftRef) {
    void run(async () => {
      setSelected(null); setEditing(false);
      const data = await getDraft(activeSession(ref), ref);
      rememberDraft(ref); setSelected({ref,data});
    });
  }
  function saveEdit(form: CreateAdForm, initial: CreateAdForm) {
    if (!selected) return;
    const {ref,data} = selected;
    void run(async () => {
      const s = activeSession(ref);
      const input = editDraftInput(form, data, initial);
      // Do not overwrite a draft changed after opening the edit form.
      const latest = await getDraft(s, ref);
      if (latest.status !== "draft" || latest.updated_at !== data.updated_at) throw new Error("پیش‌نویس تغییر کرده است. انصراف دهید و پیش‌نویس را دوباره باز کنید.");
      await updateDraft(s, ref, input);
      rememberDraft(ref, form.skillLevels);
      setEditing(false); setSelected(null);
      refreshList();
      toast({tone:"success", title:"پیش‌نویس ویرایش شد", description:"تغییرات ذخیره شد."});
      try { setSelected({ref, data:await getDraft(s, ref)}); }
      catch (e) { setNotice("ویرایش ذخیره شد. برای مشاهده نسخه جدید، پیش‌نویس را دوباره باز کنید."); throw e; }
    });
  }
  function remove() {
    if (!selected) return;
    const {ref,data} = selected;
    setConfirmDelete(false);
    void run(async () => {
      const s = activeSession(ref);
      const latest = await getDraft(s, ref);
      if (latest.status !== "draft" || latest.updated_at !== data.updated_at) throw new Error("پیش‌نویس تغییر کرده است؛ ابتدا پیش‌نویس را دوباره باز کنید.");
      await deleteDraft(s, ref);
      forgetDraft(ref); setSelected(null); refreshList();
      toast({tone:"success", title:"پیش‌نویس حذف شد", description:"پیش‌نویس حذف شد."});
    });
  }
  function download(index: number) {
    if (!selected) return;
    const {ref,data} = selected;
    void run(async () => {
      const latest = await getDraft(activeSession(ref), ref);
      if (!sameAttachmentMetadata(data.attachments, latest.attachments)) { setSelected({ref,data:latest}); throw new Error("فهرست پیوست‌ها تغییر کرده است؛ دوباره فایل را انتخاب کنید."); }
      const a = latest.attachments[index];
      if (!a) throw new Error("پیوست پیدا نشد.");
      const link = document.createElement("a");
      link.href = attachmentUrl(a.url); link.target = "_blank"; link.rel = "noopener noreferrer";
      document.body.appendChild(link); link.click(); link.remove();
    });
  }
  function saveAttachments(keep: number[], files: File[]) {
    if (!selected) return;
    const {ref,data} = selected;
    void run(async () => {
      const s = activeSession(ref);
      const latest = await getDraft(s, ref);
      if (latest.status !== "draft" || latest.updated_at !== data.updated_at || !sameAttachmentMetadata(data.attachments,latest.attachments)) {
        setSelected({ref,data:latest}); throw new Error("پیوست‌ها یا پیش‌نویس تغییر کرده‌اند؛ دوباره انتخاب کنید.");
      }
      if (keep.length + files.length > 5) throw new Error("حداکثر ۵ پیوست مجاز است.");
      const retained: File[] = [];
      for (const index of keep) {
        const a = latest.attachments[index];
        if (!a || a.size > MAX_ATTACHMENT_BYTES) throw new Error("پیوست قبلی معتبر نیست.");
        try {
          const response = await fetch(attachmentUrl(a.url), {credentials:"omit", cache:"no-store", signal:AbortSignal.timeout(30000)});
          if (!response.ok) throw new Error("download failed");
          const blob = await response.blob();
          if (blob.size !== a.size) throw new Error("unexpected size");
          retained.push(new File([blob],a.name,{type:a.content_type}));
        } catch { throw new Error("دریافت یکی از پیوست‌های قبلی ممکن نیست. هیچ پیوستی تغییر نکرد. دوباره تلاش کنید یا همه فایل‌ها را مجدداً انتخاب کنید."); }
      }
      const all = [...retained,...files];
      const validation = validateAttachments(all); if (validation) throw new Error(validation);
      await replaceWorkAttachments(s,ref,all);
      setSelected(null); refreshList(); toast({tone:"success",title:"پیوست‌ها به‌روزرسانی شدند",description:"تغییرات ذخیره شد."});
      try { setSelected({ref,data:await getDraft(s,ref)}); }
      catch (e) { setNotice("پیوست‌ها ذخیره شدند؛ برای مشاهده اطلاعات جدید، پیش‌نویس را دوباره باز کنید."); throw e; }
    });
  }

  return <div dir="rtl" className="flex min-w-0 flex-col gap-4 lg:gap-5">
    <PageHeader breadcrumb={[{label:"آگهی‌ها",to:"/employer/ads"},{label:"پیش‌نویس‌ها"}]} title="پیش‌نویس‌ها" subtitle="مدیریت پیش‌نویس‌های آگهی" action={<ButtonLink to="/employer/ads" variant="secondary">بازگشت به آگهی‌ها</ButtonLink>} />
    <section className={PANEL}>
      {!session ? <>
        <h2 className="text-card-title font-bold">ورود کارفرما</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Dropdown value={type === "individual" ? "حقیقی" : "حقوقی"} options={["حقیقی","حقوقی"]} onChange={v=>setType(v === "حقیقی" ? "individual" : "legal")} disabled={busy} />
          <input className={FIELD} aria-label="شماره موبایل" type="tel" autoComplete="username" placeholder="شماره موبایل" value={phone} onChange={e=>setPhone(e.target.value)} disabled={busy}/>
          <input className={FIELD} aria-label="رمز عبور" type="password" autoComplete="current-password" placeholder="رمز عبور" value={password} onChange={e=>setPassword(e.target.value)} disabled={busy}/>
          <Button disabled={busy || !phone || !password} loading={busy} onClick={login}>ورود</Button>
        </div>
      </> : <>
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-card-title font-bold">پیش‌نویس‌های من</h2><Button variant="text" size="sm" disabled={busy || editing} onClick={logout}>تغییر حساب</Button></div>
        <DraftList key={`${ownerKey(session)}:${revision}`} session={session} requestedKind={requestedKind} requestedId={requestedId} disabled={busy || editing} selected={selected?.ref} onSelect={load}/>
      </>}
      {error && <p role="alert" className="break-words text-label text-error">{error}</p>}
      {notice && <p role="status" className="text-label text-text-secondary">{notice}</p>}
    </section>
    {selected && !editing && <>
      <DraftDetails selected={selected} busy={busy} onEdit={()=>setEditing(true)} onDelete={()=>setConfirmDelete(true)} />
      {selected.ref.kind === "work" && <AttachmentEditor key={`${refKey(selected.ref)}:${selected.data.updated_at}`} data={selected.data} busy={busy} onDownload={download} onSave={saveAttachments} />}
    </>}
    {selected && editing && <DraftEdit key={`${refKey(selected.ref)}:${selected.data.updated_at}`} selected={selected} busy={busy} onSave={saveEdit} onCancel={()=>{setEditing(false);setError("");}} />}
    <Dialog isOpen={confirmDelete && !!selected} title="حذف پیش‌نویس" onClose={()=>setConfirmDelete(false)}>
      <p className="text-label">پیش‌نویس «{selected?.data.title}» و پیوست‌های آن حذف می‌شوند. این عملیات قابل بازگشت نیست و نسخه ثبت‌شده در فهرست آگهی‌های محلی را تغییر نمی‌دهد.</p>
      <div className="mt-4 flex flex-col gap-3"><Button color="error" disabled={busy} onClick={remove}>تأیید حذف</Button><Button variant="secondary" onClick={()=>setConfirmDelete(false)}>انصراف</Button></div>
    </Dialog>
  </div>;
}

function DraftList({session, requestedKind, requestedId, disabled, selected, onSelect}: {
  session: EmployerSession;
  requestedKind: string | null;
  requestedId: string | null;
  disabled: boolean;
  selected?: DraftRef;
  onSelect: (ref: DraftRef) => void;
}) {
  const [items, setItems] = useState<Selected[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    async function fetchItems() {
      setLoading(true); setFailed(false); setItems([]);
      const known = knownDrafts(ownerKey(session));
      const refs: DraftRef[] = [...known];
      // Preserve direct links without exposing a manual ID entry field.
      const id = Number(requestedId);
      if (requestedId && /^\d+$/.test(requestedId) && Number.isSafeInteger(id) && id > 0 && (requestedKind === "work" || requestedKind === "internship")) {
        const ref: DraftRef = {id,kind:requestedKind,owner:ownerKey(session)};
        if (!refs.some(r => refKey(r) === refKey(ref))) refs.unshift(ref);
      }
      const next: Selected[] = [];
      let failure = false;
      for (const ref of refs) {
        if (cancelled) return;
        try {
          const data = await getDraft(session,ref);
          if (cancelled) return;
          if (data.status === "draft") {
            next.push({ref,data});
            if (!known.some(r => refKey(r) === refKey(ref))) rememberDraft(ref);
          }
        } catch (e) {
          if (cancelled) return;
          if (e instanceof DraftApiError && e.status === 404) continue;
          failure = true;
          if (e instanceof DraftApiError && (e.status === 401 || e.status === 403)) break;
        }
      }
      if (!cancelled) { setItems(next); setFailed(failure); setLoading(false); }
    }
    void fetchItems();
    return () => { cancelled = true; };
  },[session,requestedKind,requestedId,attempt]);
  if (loading) return <p role="status" className="text-label text-text-secondary">در حال دریافت پیش‌نویس‌ها…</p>;
  return <div className="flex min-w-0 flex-col gap-3">
    {items.map(({ref,data}) => <div key={refKey(ref)} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-soft p-3">
      <div className="min-w-0 flex-1"><p className="break-words font-bold text-label">{data.title}</p><p className="mt-1 text-caption text-text-secondary">{kindLabel(ref.kind)}</p></div>
      <Button variant="secondary" size="sm" disabled={disabled} onClick={() => onSelect(ref)}>{selected && refKey(selected) === refKey(ref) ? "مشاهده مجدد" : "مشاهده"}</Button>
    </div>)}
    {!items.length && !failed && <p className="text-label text-text-secondary">پیش‌نویسی برای نمایش در این مرورگر وجود ندارد.</p>}
    {failed && <div className="flex flex-wrap items-center gap-2"><p role="alert" className="text-label text-error">دریافت بعضی پیش‌نویس‌ها ممکن نشد.</p><Button variant="secondary" size="sm" disabled={disabled} onClick={() => setAttempt(n=>n+1)}>تلاش مجدد</Button></div>}
    <ButtonLink to="/employer/ads/create" variant="secondary" size="sm">آگهی جدید</ButtonLink>
  </div>;
}

function DraftDetails({selected,busy,onEdit,onDelete}:{selected:Selected;busy:boolean;onEdit:()=>void;onDelete:()=>void}) {
  const {ref,data}=selected;
  const d=data.details;
  const form=reviewToForm(data,draftHint(ref)?.skillLevels);
  const rows: [string,string][] = [["نوع آگهی",kindLabel(ref.kind)],["شرح",data.description],["دسته‌بندی",d.category],["مهارت‌ها",form.skills.map(s=>form.skillLevels[s]?`${s} (${SKILL_LEVEL_LABELS[form.skillLevels[s]!]})`:s).join("، ")],["نحوه همکاری",form.collaborationMode],["بازه سنی",`${fa(d.minimum_age)} تا ${fa(d.maximum_age)} سال`],["مهلت درخواست (میلادی)",d.apply_deadline]];
  if(d.opportunity_type === "work") rows.push(["مهلت تحویل (میلادی)",d.delivery_deadline],["بودجه",`${fa(d.budget_toman)} تومان`],["خروجی‌ها",(d.deliverables??[]).join("\n")],["فرمت تحویل",(d.delivery_formats??[]).join("، ")]);
  else rows.push(["تاریخ شروع (میلادی)",d.internship.start_date],["مدت دوره",`${fa(d.internship.duration_months)} ماه`],["ساعت هفتگی",fa(d.internship.hours_per_week)],["کمک‌هزینه ماهانه",d.internship.has_monthly_stipend?`${fa(d.internship.monthly_stipend_toman??0)} تومان`:"بدون کمک‌هزینه"],["اهداف یادگیری",d.internship.learning_outcomes],["مسئولیت‌ها",d.internship.responsibilities],["پیش‌نیازها",d.internship.prerequisites??""],["صدور گواهی",d.internship.issues_certificate?"بله":"خیر"]);
  return <section className={PANEL}>
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-card-title font-bold break-words">{data.title}</h2><span className="rounded-lg bg-green-7 px-3 py-1.5 text-caption">{data.status === "draft"?"پیش‌نویس":data.status}</span></div>
    <dl className="grid gap-3 md:grid-cols-2">{rows.map(([label,value])=><div className="min-w-0 rounded-xl bg-background-page p-3" key={label}><dt className="text-caption text-text-secondary">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-label">{value||"—"}</dd></div>)}</dl>
    <div className="flex flex-wrap gap-3"><Button disabled={busy||data.status!=="draft"} onClick={onEdit}>ویرایش پیش‌نویس</Button><Button color="error" variant="secondary" disabled={busy||data.status!=="draft"} onClick={onDelete}>حذف پیش‌نویس</Button></div>
  </section>;
}

function DraftEdit({selected,busy,onSave,onCancel}:{selected:Selected;busy:boolean;onSave:(form:CreateAdForm,initial:CreateAdForm)=>void;onCancel:()=>void}) {
  const [initial] = useState(()=>reviewToForm(selected.data,draftHint(selected.ref)?.skillLevels));
  const {step,form,errors,updateField,validateStep,nextStep,previousStep,goToStep}=useCreateEmployerAd(initial,true);
  return <>
    <CreateAdStepper step={step} onSelect={s=>{if(!busy)goToStep(s);}} isEdit/>
    <section className={PANEL}>
      <h2 className="text-card-title font-bold">ویرایش پیش‌نویس</h2>
      {!initial.ageRange && <p className="text-caption text-text-secondary">بازه سنی ذخیره‌شده با گزینه‌های فعلی فرم متفاوت است. برای ویرایش، یک گزینه را آگاهانه انتخاب کنید.</p>}
      <fieldset disabled={busy} className="flex min-w-0 flex-col gap-3">
        {step===1&&<AdKindStep value={form.kind} onChange={()=>{}} disabled/>}
        {step===2&&<AdDetailsStep form={form} errors={errors} updateField={updateField} hideAttachments/>}
        {step===3&&<AdConditionsStep form={form} errors={errors} updateField={updateField}/>}
        {step===4&&<AdReviewStep form={form} error={errors.acceptedTerms} onAccept={v=>updateField("acceptedTerms",v)} onEdit={goToStep} hideAttachments/>}
      </fieldset>
      <p className="text-caption text-text-secondary">ویرایش اطلاعات، پیوست‌های قبلی را تغییر نمی‌دهد. پیوست‌ها در بخش جداگانه مدیریت می‌شوند.</p>
      <div className="flex flex-wrap gap-3"><Button variant="secondary" disabled={busy} onClick={step>1?previousStep:onCancel}>{step>1?"قبل":"انصراف"}</Button><Button className="flex-1" disabled={busy} loading={busy} onClick={()=>{if(step===4){if(validateStep())onSave(form,initial);}else nextStep();}}>{step===4?"ذخیره تغییرات":"ادامه"}</Button>{step>1&&<Button variant="secondary" disabled={busy} onClick={onCancel}>انصراف</Button>}</div>
    </section>
  </>;
}

function AttachmentEditor({data,busy,onDownload,onSave}:{data:DraftReview;busy:boolean;onDownload:(index:number)=>void;onSave:(keep:number[],files:File[])=>void}) {
  const [keep,setKeep]=useState(()=>data.attachments.map((_,i)=>i));
  const [files,setFiles]=useState<File[]>([]);
  const [error,setError]=useState("");
  const [confirm,setConfirm]=useState(false);
  const changed=keep.length!==data.attachments.length||files.length>0;
  function add(next:File[]) {
    const all=[...files,...next];
    const e=validateAttachments(all)??(keep.length+all.length>5?"مجموع فایل‌های قبلی و جدید باید حداکثر ۵ باشد.":undefined);
    if(e){setError(e);return;} setError("");setFiles(all);
  }
  const editable=data.status==="draft";
  return <section className={PANEL}>
    <h2 className="text-card-title font-bold">پیوست‌ها</h2>
    {data.attachments.length===0&&<p className="text-label text-text-secondary">پیوستی ثبت نشده است.</p>}
    {data.attachments.map((a,i)=><div key={`${i}-${a.name}`} className="flex flex-wrap items-center gap-3 rounded-xl border border-border-soft p-3">
      {editable&&<input type="checkbox" aria-label={`حفظ ${a.name}`} checked={keep.includes(i)} disabled={busy} onChange={e=>{setError("");setKeep(old=>e.target.checked?[...old,i].sort((x,y)=>x-y):old.filter(x=>x!==i));}}/>}
      <div className="min-w-0 flex-1"><p className="break-all text-label">{a.name}</p><p className="text-caption text-text-secondary">{fa(a.size)} بایت{editable&&!keep.includes(i)?" · حذف در ذخیره بعدی":""}</p></div>
      <Button variant="secondary" size="sm" disabled={busy} onClick={()=>onDownload(i)}>دانلود</Button>
    </div>)}
    {editable&&<>
      <p className="text-caption text-text-secondary">تیک فایل‌هایی که باید باقی بمانند را نگه دارید. برای حذف همه، همه تیک‌ها را بردارید. </p>
      <input type="file" multiple accept={ATTACHMENT_ACCEPT} disabled={busy} aria-label="افزودن پیوست" onChange={e=>{add(Array.from(e.currentTarget.files??[]));e.currentTarget.value="";}} className="w-full min-w-0 text-label"/>
      {files.map((f,i)=><div key={`${i}-${f.name}`} className="flex items-center gap-2 rounded-lg border border-border-soft p-3"><span className="min-w-0 flex-1 break-all text-label">{f.name}</span><Button size="sm" variant="secondary" disabled={busy} onClick={()=>{setFiles(old=>old.filter((_,j)=>j!==i));setError("");}}>حذف</Button></div>)}
      {error&&<p role="alert" className="text-label text-error">{error}</p>}
      <Button disabled={busy||!changed||keep.length+files.length>5} onClick={()=>setConfirm(true)}>ذخیره پیوست‌ها</Button>
      <Dialog isOpen={confirm} title="تأیید جایگزینی پیوست‌ها" onClose={()=>setConfirm(false)}><p className="text-label">پس از ذخیره، مجموعاً {fa(keep.length+files.length)} فایل باقی می‌ماند. فایل‌های انتخاب‌نشده حذف می‌شوند.</p><div className="mt-4 flex flex-col gap-3"><Button disabled={busy} onClick={()=>{setConfirm(false);onSave(keep,files);}}>تأیید ذخیره</Button><Button variant="secondary" onClick={()=>setConfirm(false)}>انصراف</Button></div></Dialog>
    </>}
  </section>;
}
