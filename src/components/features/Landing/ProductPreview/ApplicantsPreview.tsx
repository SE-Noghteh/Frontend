import { BadgeCheck } from "lucide-react";

import { InitialAvatar } from "@/components/ui/InitialAvatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";
import type { EmployerScenario } from "@/types/Landing/landing";
import { toPersianDigits } from "@/utils/toPersianDigits";

import { PreviewCard } from "./PreviewCard";

const BAR_COLORS = ["bg-blue", "bg-green-3", "bg-brand-peach"];

interface ApplicantsPreviewProps {
  scenario: EmployerScenario;
}

/** Employer's view of the applicants of one opportunity. */
export function ApplicantsPreview({ scenario }: ApplicantsPreviewProps) {
  return (
    <PreviewCard className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-caption text-charcoal-2">متقاضی‌های آگهی</div>
          <div className="mt-0.5 text-label font-extrabold text-text-primary">
            {scenario.previewProjectTitle}
          </div>
        </div>
        <StatusPill tone="success">
          {toPersianDigits(scenario.previewApplicantsCount)} درخواست
        </StatusPill>
      </div>

      <div className="mt-4 space-y-2.5">
        {scenario.previewApplicants.map((applicant, index) => (
          <div
            key={applicant.name}
            className="rounded-xl border border-border-decorative p-3"
          >
            <div className="flex items-center gap-3">
              <InitialAvatar name={applicant.name} role="seeker" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-label font-bold text-text-primary">
                  {applicant.name}
                  <BadgeCheck className="size-3.5 text-green-3" />
                </div>
                <div className="text-caption text-charcoal-2">
                  {toPersianDigits(applicant.age)} ساله · {applicant.skill}
                  {applicant.rating
                    ? ` · ${toPersianDigits(applicant.rating)} ★ · ${toPersianDigits(applicant.completedProjects)} همکاری`
                    : " · کارآموز تازه‌کار"}
                </div>
              </div>
              <div className="text-label font-extrabold text-text-primary">
                {toPersianDigits(applicant.matchPercent)}٪
              </div>
            </div>
            <div className="mt-2.5">
              <ProgressBar
                value={applicant.matchPercent}
                fillClassName={BAR_COLORS[index % BAR_COLORS.length]}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-caption text-charcoal-2">
        درصد تطابق بر اساس مهارت‌های تأییدشده، وقت آزاد و سابقه کار محاسبه می‌شه.
      </p>
    </PreviewCard>
  );
}
