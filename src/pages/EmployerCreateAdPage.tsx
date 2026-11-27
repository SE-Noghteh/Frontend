import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { CreateAdStepper } from "@/components/features/EmployerCreateAd/CreateAdStepper";
import { AdKindStep } from "@/components/features/EmployerCreateAd/AdKindStep";
import { AdDetailsStep } from "@/components/features/EmployerCreateAd/AdDetailsStep";
import { AdConditionsStep } from "@/components/features/EmployerCreateAd/AdConditionsStep";
import { AdReviewStep } from "@/components/features/EmployerCreateAd/AdReviewStep";
import { WalletTopUpDialog } from "@/components/features/EmployerWallet/WalletTopUpDialog";
import { AdPublishStep } from "@/components/features/EmployerCreateAd/AdPublishStep";
import { useCreateEmployerAd } from "@/hooks/useCreateEmployerAd";
import { useEmployerStore, PUBLISH_FEE } from "@/store/employer/useEmployerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { adToForm, formToAdChanges } from "@/utils/employerAdEdit";
import { canRepublishAd, formatAdDeadline } from "@/utils/employerAdStatus";
import { validateAdDates } from "@/utils/dateValidation";
import { INITIAL_CREATE_AD_FORM } from "@/types/Employer/createAd";
import type { EmployerAd } from "@/types/Employer/employer";

export default function EmployerCreateAdPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sourceId = params.get("republish");
  const source = useEmployerStore(state => state.ads.find(ad => ad.id === sourceId));
  if (sourceId !== null && (!source || !canRepublishAd(source))) return (
    <div dir="rtl" className="flex flex-col items-center gap-4 rounded-2xl border border-border-soft bg-white p-8 text-center">
      <h1 className="text-card-title font-bold">انتشار دوباره امکان‌پذیر نیست</h1>
      <p className="text-label text-text-secondary">فقط آگهی‌های بسته‌شده یا منقضی‌شده قابل انتشار دوباره هستند.</p>
      <Button onClick={() => navigate("/employer/ads")}>بازگشت به آگهی‌ها</Button>
    </div>
  );
  return <CreateForm key={`${sourceId ?? "new"}:${params.get("state") ?? ""}`} source={source} preview={params.get("state")} />;
}

function CreateForm({ source, preview }: { source?: EmployerAd; preview: string | null }) {
  const navigate = useNavigate();
  const publishAdWithFee = useEmployerStore(state => state.publishAdWithFee);
  const walletBalance = useEmployerStore(state => state.walletBalance);
  const showToast = useToastStore(state => state.showToast);
  const isRepublish = Boolean(source);
  const title = isRepublish ? "انتشار دوباره آگهی" : "آگهی جدید";
  const returnTo = source ? `/employer/ads/${source.id}` : "/employer/ads";
  const { step, form, errors, updateField, nextStep, previousStep, goToStep } = useCreateEmployerAd(
    source ? { ...adToForm(source), deadline: "", deliveryDate: "", acceptedTerms: false,
      collaborationMode: source.collaborationMode === "دورکاری" ? "آنلاین" : (source.collaborationMode ?? "") } : INITIAL_CREATE_AD_FORM,
  );
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [cancelOpen, setCancelOpen] = useState(false);
  const [simulateError, setSimulateError] = useState(preview === "network-error");
  const [topUpOpen, setTopUpOpen] = useState(false);
  const publishing = useRef(false);
  const balance = walletBalance;
  const insufficient = balance < PUBLISH_FEE;

  async function publishAd() {
    if (publishing.current || loading || step !== 5 || !form.kind || !form.acceptedTerms) return;
    if (useEmployerStore.getState().walletBalance < PUBLISH_FEE) { setPublishError("موجودی کیف پول کافی نیست."); setTopUpOpen(true); return; }
    const kind = form.kind;
    const dateErrors = validateAdDates(form.deadline, form.deliveryDate, kind === "internship");
    if (dateErrors.deadline || dateErrors.deliveryDate) {
      goToStep(3);
      showToast({ tone: "error", title: "تاریخ‌ها را بررسی کنید", description: dateErrors.deadline ?? dateErrors.deliveryDate ?? "" });
      return;
    }
    publishing.current = true;
    setLoading(true);
    setPublishError("");
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      if (simulateError) { setSimulateError(false); throw new Error("network"); }
      const id = crypto.randomUUID();
      const success = publishAdWithFee({
        ...formToAdChanges(form), id, kind, status: "published", createdAt: new Date().toISOString(),
        deadline: formatAdDeadline(form.deadline), applicantsCount: 0, newApplicantsCount: 0, applicants: [],
        ...(kind === "work" ? { internshipDuration: undefined, weeklyHours: undefined, hasAllowance: undefined } : {}),
      }, source?.id);
      if (!success) { setPublishError("انتشار انجام نشد. موجودی کیف پول، تاریخ‌ها و وضعیت آگهی را بررسی کنید."); return; }
      showToast({ tone: "success", title: "آگهی منتشر شد", description: isRepublish ? "نسخه جدید آگهی منتشر شد. سوابق آگهی قبلی محفوظ است." : "آگهی شما با موفقیت ثبت شد." });
      navigate(`/employer/ads/${id}/published`, { replace: true });
    } catch {
      setPublishError("خطایی در انتشار آگهی رخ داد. دوباره تلاش کنید.");
    } finally { publishing.current = false; setLoading(false); }
  }

  return <div className="flex min-w-0 flex-col gap-4 lg:gap-5">
    <PageHeader breadcrumb={[{ label: "آگهی‌ها", to: "/employer/ads" }, ...(source ? [{ label: source.title, to: returnTo }] : []), { label: title }]} title={title} subtitle={`مرحله ${step.toLocaleString("fa-IR")} از ۵`} />
    {source && <div className="rounded-xl border border-border-soft bg-green-7 p-4 text-label leading-7">
      اطلاعات آگهی قبلی در فرم قرار گرفته است. مهلت درخواست و تحویل جدید را تعیین کنید. پس از پرداخت، آگهی جدید بدون متقاضی منتشر می‌شود و آگهی قبلی محفوظ می‌ماند.
    </div>}
    <CreateAdStepper step={step} onSelect={target => { if (!loading) goToStep(target); }} />
    <section className="rounded-2xl border border-border-soft bg-white p-4 lg:p-6">
      {step === 1 && <AdKindStep value={form.kind} onChange={value => updateField("kind", value)} />}
      {step === 2 && <AdDetailsStep form={form} errors={errors} updateField={updateField} />}
      {step === 3 && <AdConditionsStep form={form} errors={errors} updateField={updateField} />}
      {step === 4 && <AdReviewStep form={form} error={errors.acceptedTerms} onAccept={value => updateField("acceptedTerms", value)} onEdit={goToStep} />}
      {step === 5 && <>
        <AdPublishStep fee={PUBLISH_FEE} balance={balance} error={publishError} />
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border-soft bg-background-page p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption leading-6 text-text-secondary">{insufficient ? `برای انتشار به ${(PUBLISH_FEE - balance).toLocaleString("fa-IR")} تومان شارژ بیشتر نیاز دارید. پس از شارژ به همین مرحله برمی‌گردید.` : "می‌توانید قبل از پرداخت، کیف پول خود را شارژ کنید."}</p>
          <Button variant="secondary" disabled={loading} className="shrink-0" onClick={() => setTopUpOpen(true)}>شارژ کیف پول</Button>
        </div>
      </>}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
        {step > 1 ? <Button variant="secondary" onClick={previousStep} disabled={loading} className="sm:min-w-24">قبل</Button> : <Button variant="secondary" onClick={() => setCancelOpen(true)}>انصراف</Button>}
        <Button className="flex-1" fullWidth loading={loading} disabled={loading || (step === 1 && !form.kind) || (step === 5 && insufficient)} onClick={step === 5 ? publishAd : nextStep}>
          {step === 5 ? (isRepublish ? "پرداخت و انتشار دوباره" : "پرداخت و انتشار آگهی") : step === 4 ? "ادامه به پرداخت" : "ادامه"}
        </Button>
      </div>
    </section>
    <WalletTopUpDialog isOpen={topUpOpen} onClose={() => setTopUpOpen(false)} onSuccess={() => setPublishError("")} minimumNeeded={Math.max(0, PUBLISH_FEE - balance)} />
    <Dialog isOpen={cancelOpen} title="انصراف از انتشار آگهی" onClose={() => setCancelOpen(false)}>
      <p className="text-label text-text-secondary">با خروج از این صفحه اطلاعات واردشده ذخیره نمی‌شوند. آیا مطمئن هستید؟</p>
      <div className="mt-5 flex flex-col gap-3">
        <Button variant="secondary" fullWidth onClick={() => setCancelOpen(false)}>ادامه</Button>
        <Button color="error" fullWidth onClick={() => navigate(returnTo)}>انصراف</Button>
      </div>
    </Dialog>
  </div>;
}
