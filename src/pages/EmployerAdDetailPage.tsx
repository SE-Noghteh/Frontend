import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AdDetailHeader, type AdDetailTab } from "@/components/features/EmployerAdDetail/AdDetailHeader";
import { AdOverview } from "@/components/features/EmployerAdDetail/AdOverview";
import { AdApplicants, type AdApplicant } from "@/components/features/EmployerAdDetail/AdApplicants";
import { AdVersions, type AdVersion } from "@/components/features/EmployerAdDetail/AdVersions";
import { CloseAdModal } from "@/components/features/EmployerAdDetail/CloseAdModal";
import { useEmployerStore } from "@/store/employer/useEmployerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { useAdClock } from "@/hooks/useAdClock";
import { getEffectiveAdStatus, canReceiveApplicants, republishPath, collaborationPath } from "@/utils/employerAdStatus";
const EMPTY_APPLICANTS: AdApplicant[] = [];
const versions: AdVersion[] = [];

export default function EmployerAdDetailPage() {
  const { adId } = useParams<{ adId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdDetailTab>("overview");
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const ad = useEmployerStore(state => state.ads.find(item => item.id === adId));
  const applicants = useEmployerStore(state => state.applicantsByAd[adId ?? ""] ?? EMPTY_APPLICANTS);
  const setAdStatus = useEmployerStore(state => state.setAdStatus);
  const setApplicantStatus = useEmployerStore(state => state.setApplicantStatus);
  const showToast = useToastStore(state => state.showToast);
  const today = useAdClock();
  if (!ad) return <div dir="rtl" className="flex min-h-96 flex-col items-center justify-center gap-4 rounded-xl border border-border-soft bg-white p-6 text-center">
    <div className="flex size-20 items-center justify-center rounded-full bg-green-7"><FileSearch size={36} className="text-blue" /></div>
    <h1 className="text-card-title font-bold">آگهی پیدا نشد</h1><p className="text-label text-text-secondary">آگهی موردنظر وجود ندارد یا حذف شده است.</p><Button onClick={() => navigate("/employer/ads")}>بازگشت به آگهی‌ها</Button>
  </div>;
  const status = getEffectiveAdStatus(ad, today);
  const isOpen = status === "published";
  const currentAd = { ...ad, status };
  function handleCloseAd() {
    const latest = useEmployerStore.getState().ads.find(item => item.id === adId);
    setCloseModalOpen(false);
    if (!latest || !canReceiveApplicants(latest)) return;
    setAdStatus(latest.id, "closed");
    showToast({tone:"success",title:"آگهی بسته شد",description:"پذیرش درخواست‌های جدید متوقف شد."});
  }
  return <main dir="rtl" className="flex min-w-0 flex-col gap-5 pb-6 lg:gap-6">
    <AdDetailHeader title={ad.title} kind={ad.kind} status={status} activeTab={activeTab} onTabChange={setActiveTab}
      onBack={() => navigate("/employer/ads")} onEdit={() => navigate(`/employer/ads/${ad.id}/edit`)} onClose={() => setCloseModalOpen(true)}
      republishTo={republishPath(ad.id)} collaborationTo={collaborationPath(ad.id)} />
    {!isOpen && activeTab === "overview" && <p role="status" className="rounded-xl border border-[#D9E5F2] bg-[#F4F8FD] px-4 py-3 text-sm text-[#355070]">پذیرش درخواست جدید متوقف شده است. آمار درخواست‌ها مربوط به سوابق قبلی است.</p>}
    {activeTab === "overview" && <AdOverview ad={currentAd} applicantsCount={ad.applicantsCount} newApplicantsCount={ad.newApplicantsCount} onViewApplicants={() => setActiveTab("applicants")} />}
    {activeTab === "applicants" && <AdApplicants key={ad.id} applicants={applicants} readOnly={!isOpen}
      onStatusChange={(id, nextStatus) => {
        const ok = setApplicantStatus(ad.id, id, nextStatus);
        if (!ok) showToast({tone:"error",title:"عملیات انجام نشد",description:"آگهی دیگر امکان تغییر وضعیت متقاضیان را ندارد."});
        else if (nextStatus === "accepted") showToast({tone:"success",title:"متقاضی انتخاب شد",description:"آگهی وارد مرحله همکاری شد و پذیرش درخواست متوقف شد."});
        return ok;
      }} />}
    {activeTab === "versions" && <AdVersions versions={versions} onViewVersion={id => navigate(`/employer/ads/${ad.id}/versions/${id}`)} />}
    <CloseAdModal open={closeModalOpen && isOpen} title={ad.title} onCancel={() => setCloseModalOpen(false)} onConfirm={handleCloseAd} />
  </main>;
}
