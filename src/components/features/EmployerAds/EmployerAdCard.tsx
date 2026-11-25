
import {
  CalendarDays,
  ChevronLeft,
  Users,
} from "lucide-react";

import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { EmployerAdStatus } from "./EmployerAdStatus";

import { ButtonLink } from "@/components/ui/Button";
import { InitialAvatar } from "@/components/ui/InitialAvatar";

import type { EmployerAd } from "@/types/Employer/employer";

interface EmployerAdCardProps {
  ad: EmployerAd;
}

export function EmployerAdCard({
  ad,
}: EmployerAdCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-white p-4 transition-shadow hover:shadow-sm lg:p-5">

      {/* Ad title and status */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <h2 className="text-card-title font-bold text-text-primary">
          {ad.title}
        </h2>

        <EmployerAdStatus status={ad.status} />

      </div>

      {/* Ad information */}

      <div className="flex flex-wrap items-center gap-3 text-caption text-text-secondary">

        <AdKindTag kind={ad.kind} />

        {ad.deadline && (
          <span className="inline-flex items-center gap-1.5">

            <CalendarDays
              size={15}
              aria-hidden="true"
            />

            مهلت: {ad.deadline}

          </span>
        )}

      </div>

      {/* Applicants and actions */}

      <div className="flex flex-col gap-4 border-t border-border-soft pt-4 md:flex-row md:items-center md:justify-between">

        <div className="flex flex-wrap items-center gap-3">

          {ad.applicants.length > 0 && (
            <div className="flex items-center">

              {ad.applicants.slice(0, 3).map(
                (applicant, index) => (
                  <div
                    key={applicant.id}
                    className={index > 0 ? "-ms-2" : ""}
                  >
                    <InitialAvatar
                      name={applicant.name}
                      role="seeker"
                      className="size-8 border-2 border-white text-caption"
                    />
                  </div>
                ),
              )}

            </div>
          )}

          <span className="inline-flex items-center gap-1.5 text-label text-text-secondary">

            <Users size={15} aria-hidden="true" />

            {ad.applicantsCount.toLocaleString("fa-IR")}
            {" درخواست"}

          </span>

          {ad.newApplicantsCount > 0 && (
            <span className="rounded-lg bg-success-soft px-2 py-1 text-caption font-medium text-success">

              {ad.newApplicantsCount.toLocaleString("fa-IR")}
              {" جدید"}

            </span>
          )}

        </div>

        <ButtonLink
          to={`/employer/ads/${ad.id}`}
          variant="secondary"
          size="sm"
          fullWidth
          className="md:w-auto"
          endIcon={<ChevronLeft size={16} />}
        >
          مشاهده آگهی
        </ButtonLink>

      </div>

    </article>
  );
}
