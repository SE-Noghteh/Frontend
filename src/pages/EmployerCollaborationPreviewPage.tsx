import { useParams, Navigate } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { useEmployerStore } from "@/store/employer/useEmployerStore";

// Temporary destination until the real collaboration pages are implemented.
export default function EmployerCollaborationPreviewPage() {
  const { adId } = useParams();
  const ad = useEmployerStore(state => state.ads.find(item => item.id === adId));
  const applicant = useEmployerStore(state => state.applicantsByAd[adId ?? ""]?.find(item => item.status === "accepted"));
  if (!ad || ad.status !== "collaboration") return <Navigate to="/employer/ads" replace />;
  const detailPath = `/employer/ads/${ad.id}`;
  return <div dir="rtl" className="flex min-w-0 flex-col gap-5">
    <PageHeader breadcrumb={[{label:"آگهی‌ها",to:"/employer/ads"},{label:ad.title,to:detailPath},{label:"همکاری"}]} title="همکاری" subtitle={ad.title} />
    <section className="flex flex-col items-center gap-4 rounded-2xl border border-border-soft bg-white p-6 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-green-7 text-blue"><BriefcaseBusiness size={30}/></div>
      <h2 className="text-card-title font-bold">{ad.title}</h2>
      {applicant && <p className="text-label">همکار انتخاب‌شده: {applicant.name}</p>}
      <p className="text-label text-text-secondary">صفحه مدیریت همکاری هنوز در حال توسعه است. پذیرش درخواست جدید برای این آگهی متوقف شده است.</p>
      <ButtonLink to={detailPath} variant="secondary">بازگشت به آگهی</ButtonLink>
    </section>
  </div>;
}
