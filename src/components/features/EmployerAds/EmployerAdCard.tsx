import { CalendarDays, ChevronLeft, Users } from "lucide-react";
import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { EmployerAdStatus } from "./EmployerAdStatus";
import { ButtonLink } from "@/components/ui/Button";
import { InitialAvatar } from "@/components/ui/InitialAvatar";
import type { EmployerAd } from "@/types/Employer/employer";
import { getEffectiveAdStatus, formatAdDeadline, collaborationPath, republishPath } from "@/utils/employerAdStatus";

export function EmployerAdCard({ ad }: { ad: EmployerAd }) {
  const status = getEffectiveAdStatus(ad);
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-white p-4 transition-shadow hover:shadow-sm lg:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-card-title font-bold text-text-primary">{ad.title}</h2>
        <EmployerAdStatus status={status} />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-caption text-text-secondary">
        <AdKindTag kind={ad.kind} />
        {ad.deadline && <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" />مهلت: {formatAdDeadline(ad.deadline)}</span>}
      </div>
      <div className="flex flex-col gap-4 border-t border-border-soft pt-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {ad.applicants.length > 0 && <div className="flex items-center">
            {ad.applicants.slice(0, 3).map((applicant, index) => <div key={applicant.id} className={index > 0 ? "-ms-2" : ""}><InitialAvatar name={applicant.name} role="seeker" className="size-8 border-2 border-white text-caption bg-green-7! text-text-primary!" /></div>)}
          </div>}
          <span className="inline-flex items-center gap-1.5 text-label text-text-secondary"><Users size={15} aria-hidden="true" />{ad.applicantsCount.toLocaleString("fa-IR")} درخواست</span>
          {ad.newApplicantsCount > 0 && <span className="rounded-lg bg-success-soft px-2 py-1 text-caption font-medium text-success">{ad.newApplicantsCount.toLocaleString("fa-IR")} {status === "published" ? "جدید" : "بررسی‌نشده"}</span>}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ButtonLink to={`/employer/ads/${ad.id}`} variant="secondary" size="sm" fullWidth className="sm:w-auto" endIcon={<ChevronLeft size={16} />}>مشاهده آگهی</ButtonLink>
          {status === "collaboration" && <ButtonLink to={collaborationPath(ad.id)} size="sm" fullWidth className="sm:w-auto">مشاهده همکاری</ButtonLink>}
          {(status === "expired" || status === "closed") && <ButtonLink to={republishPath(ad.id)} size="sm" fullWidth className="sm:w-auto">انتشار دوباره</ButtonLink>}
        </div>
      </div>
    </article>
  );
}
