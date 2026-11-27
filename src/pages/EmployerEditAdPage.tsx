import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { CreateAdStepper } from "@/components/features/EmployerCreateAd/CreateAdStepper";
import { AdKindStep } from "@/components/features/EmployerCreateAd/AdKindStep";
import { AdDetailsStep } from "@/components/features/EmployerCreateAd/AdDetailsStep";
import { AdConditionsStep } from "@/components/features/EmployerCreateAd/AdConditionsStep";
import { AdReviewStep } from "@/components/features/EmployerCreateAd/AdReviewStep";
import { useCreateEmployerAd } from "@/hooks/useCreateEmployerAd";
import { useEmployerStore } from "@/store/employer/useEmployerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { adToForm, formToAdChanges, getChangedFields } from "@/utils/employerAdEdit";
import { getEffectiveAdStatus, canEditAd } from "@/utils/employerAdStatus";
import { useAdClock } from "@/hooks/useAdClock";
import type { EmployerAd } from "@/types/Employer/employer";

export default function EmployerEditAdPage() {
  const { adId } = useParams<{adId: string}>();
  const navigate = useNavigate();
  const ad = useEmployerStore(state => state.ads.find(item => item.id === adId));
  const today = useAdClock();
  if (!ad || getEffectiveAdStatus(ad, today) !== "published") return <div dir="rtl" className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center">
    <h2 className="font-bold">{ad ? "ویرایش آگهی امکان‌پذیر نیست" : "آگهی پیدا نشد"}</h2>
    {ad && <p className="text-label text-text-secondary">فقط آگهی منتشرشده‌ای که هنوز مهلت دارد قابل ویرایش است.</p>}
    <Button onClick={() => navigate(ad ? `/employer/ads/${ad.id}` : "/employer/ads")}>بازگشت</Button>
  </div>;
  return <EditAdForm key={ad.id} ad={ad} />;
}

function EditAdForm({ ad }: {ad: EmployerAd}) {
  const navigate = useNavigate();
  const updateAd = useEmployerStore(state => state.updateAd);
  const notifyApplicants = useEmployerStore(state => state.notifyApplicants);
  const showToast = useToastStore(state => state.showToast);
  const { step, form, errors, updateField, validateStep, nextStep, previousStep, goToStep } = useCreateEmployerAd(adToForm(ad), true);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const changedFields = getChangedFields(ad, form);
  const detailPath = `/employer/ads/${ad.id}`;
  function handleReview() {
    if (!validateStep()) return;
    if (!changedFields.length) { navigate(detailPath); return; }
    setConfirmOpen(true);
  }
  function handleSave() {
    const latestAd = useEmployerStore.getState().ads.find(item => item.id === ad.id);
    if (!latestAd || !canEditAd(latestAd)) {
      setConfirmOpen(false);
      showToast({tone:"error",title:"ویرایش انجام نشد",description:"آگهی دیگر قابل ویرایش نیست."});
      navigate(detailPath); return;
    }
    if (!validateStep()) { setConfirmOpen(false); return; }
    const changes = getChangedFields(latestAd, form);
    if (!changes.length) { navigate(detailPath); return; }
    updateAd(ad.id, formToAdChanges(form));
    notifyApplicants(ad.id, latestAd.applicants.map(a => a.id), changes);
    setConfirmOpen(false);
    showToast({tone:"success",title:"آگهی به‌روزرسانی شد",description:"تغییرات آگهی با موفقیت ذخیره شد."});
    navigate(detailPath,{replace:true});
  }
  return <div className="flex min-w-0 flex-col gap-4 lg:gap-5">
    <PageHeader breadcrumb={[{label:"آگهی‌ها",to:"/employer/ads"},{label:ad.title,to:detailPath},{label:"ویرایش آگهی"}]} title="ویرایش آگهی" subtitle={`مرحله ${step.toLocaleString("fa-IR")} از ۴`} />
    <CreateAdStepper step={step} onSelect={goToStep} isEdit />
    <section className="rounded-2xl border border-border-soft bg-white p-4 lg:p-6">
      {step === 1 && <AdKindStep value={form.kind} onChange={() => {}} disabled />}
      {step === 2 && <AdDetailsStep form={form} errors={errors} updateField={updateField} />}
      {step === 3 && <AdConditionsStep form={form} errors={errors} updateField={updateField} />}
      {step === 4 && <AdReviewStep form={form} error={errors.acceptedTerms} onAccept={value => updateField("acceptedTerms",value)} onEdit={goToStep} />}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
        <Button variant="secondary" onClick={step > 1 ? previousStep : () => setCancelOpen(true)}>{step > 1 ? "قبل" : "انصراف"}</Button>
        <Button className="flex-1" fullWidth onClick={step === 4 ? handleReview : nextStep}>{step === 4 ? "تأیید و ذخیره تغییرات" : "ادامه"}</Button>
      </div>
    </section>
    <Dialog isOpen={confirmOpen} title="تأیید تغییرات آگهی" onClose={() => setConfirmOpen(false)}>
      <div dir="rtl" className="flex w-full min-w-0 max-w-full flex-col gap-4">
        <p className="text-label">موارد زیر در آگهی شما تغییر کرده‌اند:</p>
        <ul className="list-inside list-disc break-words text-label">{changedFields.map(field => <li key={field}>{field}</li>)}</ul>
        {ad.applicantsCount > 0 && <div className="w-full rounded-xl bg-green-7 p-3 text-caption leading-7">این آگهی دارای {ad.applicantsCount.toLocaleString("fa-IR")} متقاضی است. تغییرات برای اطلاع‌رسانی به متقاضیان ثبت می‌شود.</div>}
        <div className="mt-2 flex w-full min-w-0 flex-col gap-3">
          <Button fullWidth className="w-full" onClick={handleSave}>ذخیره تغییرات</Button>
          <Button variant="secondary" fullWidth className="w-full" onClick={() => setConfirmOpen(false)}>بازگشت</Button>
        </div>
      </div>
    </Dialog>
    <Dialog isOpen={cancelOpen} title="انصراف از ویرایش آگهی" onClose={() => setCancelOpen(false)}>
      <p className="text-label text-text-secondary">تغییرات ذخیره نشده‌اند. آیا از خروج مطمئن هستید؟</p>
      <div className="mt-5 flex flex-col gap-3">
        <Button variant="secondary" fullWidth onClick={() => setCancelOpen(false)}>ادامه ویرایش</Button>
        <Button color="error" fullWidth onClick={() => navigate(detailPath)}>انصراف</Button>
      </div>
    </Dialog>
  </div>;
}
