
import {
  Briefcase,
  Star,
  UserRound,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

import type { AdApplicant } from "./AdApplicants";

interface ApplicantResumeProps {
  applicant: AdApplicant;
}

function formatNumber(value: number) {
  return value.toLocaleString("fa-IR");
}

export function ApplicantResume({
  applicant,
}: ApplicantResumeProps) {
  const experiences = applicant.experiences ?? [];

  const averageRating = experiences.length
    ? experiences.reduce(
        (sum, item) => sum + item.rating,
        0,
      ) / experiences.length
    : undefined;

  const stats = [
    {
      label: "همکاری تکمیل‌شده",
      value:
        applicant.projectsCount !== undefined
          ? formatNumber(applicant.projectsCount)
          : "—",
    },
    {
      label: "میانگین امتیاز",
      value:
        averageRating !== undefined
          ? `${averageRating.toLocaleString("fa-IR", {
              maximumFractionDigits: 1,
            })} از ۵`
          : "—",
    },
    {
      label: "تحویل به‌موقع",
      value:
        applicant.onTimeRate !== undefined
          ? `${formatNumber(applicant.onTimeRate)}٪`
          : "—",
    },
  ];

  return (
    <div
      dir="rtl"
      className="flex min-w-0 flex-col gap-5"
    >
      {/* Statistics */}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-border-soft bg-background-page px-2 py-4 text-center"
          >
            <span className="text-lg font-bold text-blue">
              {stat.value}
            </span>

            <span className="text-caption text-text-secondary">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* About */}

      <section className="flex flex-col gap-3 rounded-xl border border-border-soft p-4">
        <div className="flex items-center gap-2 text-blue">
          <UserRound size={17} />

          <h3 className="text-label font-bold">
            درباره متقاضی
          </h3>
        </div>

        <p className="break-words text-caption leading-7 text-text-secondary">
          {applicant.about ||
            "توضیحی درباره متقاضی ثبت نشده است."}
        </p>

        {applicant.education && (
          <div className="flex items-center gap-2 border-t border-border-soft pt-3 text-caption">
            <GraduationCap
              size={17}
              className="shrink-0 text-blue"
            />

            {applicant.education}
          </div>
        )}
      </section>

      {/* Skill passport */}

      <section className="flex flex-col gap-4 rounded-xl border border-border-soft p-4">
        <div className="flex items-center gap-2 text-blue">
          <CheckCircle2 size={17} />

          <h3 className="text-label font-bold">
            پاسپورت مهارتی
          </h3>
        </div>

        {applicant.skillLevels?.length ? (
          applicant.skillLevels.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-caption font-medium">
                  {skill.name}
                </span>

                <span
                  className={
                    skill.verified
                      ? "rounded-md bg-green-7 px-2 py-1 text-[10px] text-green-2"
                      : "rounded-md bg-background-page px-2 py-1 text-[10px] text-text-secondary"
                  }
                >
                  {skill.verified
                    ? "✓ تأییدشده"
                    : "ادعای خود فرد"}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E2DC]">
                <div
                  className="h-full rounded-full bg-blue"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, skill.level),
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-wrap gap-2">
            {applicant.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-green-7 px-3 py-2 text-caption text-green-2"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Recent experiences */}

      <section className="flex flex-col gap-3 rounded-xl border border-border-soft p-4">
        <div className="flex items-center gap-2 text-blue">
          <Briefcase size={17} />

          <h3 className="text-label font-bold">
            سوابق همکاری اخیر
          </h3>
        </div>

        {experiences.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex min-w-0 items-center justify-between gap-3 rounded-xl bg-background-page p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="break-words text-caption font-bold">
                {item.title}
              </p>

              <p className="mt-1 text-caption text-text-secondary">
                {item.employer}
              </p>
            </div>

            <span className="flex shrink-0 items-center gap-1 rounded-lg bg-green-7 px-2 py-1 text-caption text-green-2">
              <Star size={13} />

              {formatNumber(item.rating)}
            </span>
          </div>
        ))}

        {!experiences.length && (
          <p className="text-caption text-text-secondary">
            سابقه همکاری ثبت نشده است.
          </p>
        )}
      </section>
    </div>
  );
}
