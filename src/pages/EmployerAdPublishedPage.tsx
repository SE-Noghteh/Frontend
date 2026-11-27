
import { CheckCircle } from "lucide-react";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { EmployerAdStatus } from "@/components/features/EmployerAds/EmployerAdStatus";

import { useEmployerStore } from "@/store/employer/useEmployerStore";

export default function EmployerAdPublishedPage() {
  const { adId } = useParams();
  const { state } = useLocation();
  const local = state?.localPublication === true;
  const draftId = typeof state?.backendDraftId === "number" ? state.backendDraftId : undefined;

  const ad = useEmployerStore((state) =>
    state.ads.find((item) => item.id === adId),
  );

  if (!ad) {
    return <Navigate to="/employer/ads" replace />;
  }

  return (
    <div className="flex flex-col gap-5">

      <PageHeader
        breadcrumb={[
          {
            label: "آگهی‌ها",
            to: "/employer/ads",
          },
          {
            label: local ? "تکمیل مرحله انتشار" : "انتشار موفق",
          },
        ]}
        title={local ? "مرحله انتشار تکمیل شد" : "آگهی منتشر شد"}
        subtitle={local ? "پرداخت و انتشار در نسخه فعلی محلی است." : "آگهی شما با موفقیت ثبت شده است."}
        action={
          <ButtonLink to="/employer/ads">
            بازگشت به آگهی‌ها
          </ButtonLink>
        }
      />

      <div className="flex items-center gap-3 rounded-xl bg-success-soft p-4 text-success">

        <CheckCircle size={20} />

        <p className="text-label">
          {local ? (draftId !== undefined ? `پیش‌نویس با شناسه ${draftId.toLocaleString("fa-IR")} در سرور ثبت شده است. انتشار واقعی هنوز انجام نشده است.` : "آگهی در فرانت‌اند ثبت شده است. انتشار واقعی هنوز انجام نشده است.") : "آگهی شما منتشر شد و کارجویان می‌توانند آن را مشاهده کنند."}
        </p>

      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-white p-5">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <h2 className="text-card-title font-bold">
            {ad.title}
          </h2>

          {local ? <span className="rounded-lg bg-green-7 px-2 py-1 text-caption">{draftId !== undefined ? "پیش‌نویس سرور" : "ثبت محلی"}</span> : <EmployerAdStatus status={ad.status} />}

        </div>

        <div className="flex flex-wrap gap-2">

          <AdKindTag kind={ad.kind} />

          {ad.skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-green-7 px-2 py-1 text-caption"
            >
              {skill}
            </span>
          ))}

        </div>

        <p className="whitespace-pre-wrap text-label text-text-secondary">
          {ad.description}
        </p>

        <div className="flex flex-col gap-3 border-t border-border-soft pt-4 text-label">

          <p>
            بودجه: {Number(ad.budget ?? 0).toLocaleString("fa-IR")} تومان
          </p>

          <p>مهلت درخواست: {ad.deadline}</p>
          <p>نحوه همکاری: {ad.collaborationMode}</p>
          <p>بازه سنی: {ad.ageRange}</p>

        </div>

      </section>

    </div>
  );
}
