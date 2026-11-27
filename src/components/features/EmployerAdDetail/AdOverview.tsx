
import {
  Bell,
  Check,
  UserRound,
} from "lucide-react";

import { SKILL_LEVEL_LABELS, formatWeeklyHours, downloadAttachment } from "@/utils/employerAdFields";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

import type {
  EmployerAd,
} from "@/types/Employer/employer";

interface AdOverviewProps {
  ad: EmployerAd;
  applicantsCount: number;
  newApplicantsCount: number;
  onViewApplicants: () => void;
}

function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    )
    .replace(/[\u200e\u200f\u061c]/g, "")
    .trim();
}

function formatNumber(value: number): string {
  return value.toLocaleString("fa-IR");
}

function formatDate(value?: string): string {
  if (!value) return "—";

  const normalized = normalizeDigits(value);

  // Already stored as a Jalali date
  const jalaliMatch = normalized.match(
    /^(1[34]\d{2})[/-](\d{1,2})[/-](\d{1,2})$/,
  );

  if (jalaliMatch) {
    const [, year, month, day] = jalaliMatch;

    return [
      Number(year).toLocaleString("fa-IR", {
        useGrouping: false,
      }),
      Number(month).toLocaleString("fa-IR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      Number(day).toLocaleString("fa-IR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    ].join("/");
  }

  // Gregorian date
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    },
  ).format(date);
}

function getDeadlineTimestamp(
  value?: string,
): number | null {
  if (!value) return null;

  const normalized = normalizeDigits(value);

  const jalaliMatch = normalized.match(
    /^(1[34]\d{2})[/-](\d{1,2})[/-](\d{1,2})$/,
  );

  if (!jalaliMatch) {
    const date = new Date(normalized);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    );
  }

  const year = Number(jalaliMatch[1]);
  const month = Number(jalaliMatch[2]);
  const day = Number(jalaliMatch[3]);

  const target = [
    String(year),
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("/");

  const formatter = new Intl.DateTimeFormat(
    "en-US-u-ca-persian-nu-latn",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    },
  );

  const start = Date.UTC(year + 621, 0, 1);
  const end = Date.UTC(year + 623, 0, 1);

  const dayMs = 86400000;

  for (
    let timestamp = start;
    timestamp < end;
    timestamp += dayMs
  ) {
    const parts = formatter.formatToParts(
      new Date(timestamp),
    );

    const currentYear = parts.find(
      (part) => part.type === "year",
    )?.value;

    const currentMonth = parts.find(
      (part) => part.type === "month",
    )?.value;

    const currentDay = parts.find(
      (part) => part.type === "day",
    )?.value;

    const current = [
      currentYear,
      currentMonth,
      currentDay,
    ].join("/");

    if (current === target) {
      return timestamp;
    }
  }

  return null;
}

function getRemainingDays(
  deadline?: string,
): number | null {
  const end = getDeadlineTimestamp(deadline);

  if (end === null) return null;

  const today = new Date();

  const todayTimestamp = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return Math.round(
    (end - todayTimestamp) / 86400000,
  );
}

export function AdOverview({
  ad,
  applicantsCount,
  newApplicantsCount,
  onViewApplicants,
}: AdOverviewProps) {
  const isInternship = ad.kind === "internship";
  console.log("Employer Ad Data:", ad);

  const remainingDays = getRemainingDays(
    ad.deadline,
  );

  const deadlineLabel =
    remainingDays === null
      ? "نامشخص"
      : remainingDays < 0
        ? "مهلت به پایان رسیده"
        : remainingDays === 0
          ? "آخرین روز درخواست"
          : `${formatNumber(remainingDays)} روز مانده`;

  const deliverables = [
    ...(ad.deliverables ?? "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),

    ...((ad.deliveryFormat ?? "").trim()
      ? [ad.deliveryFormat]
      : []),
  ];

  const skills = ad.skills ?? [];

  const dateRows = [
    {
      label: "مهلت درخواست",
      value: formatDate(ad.deadline),
    },
    {
      label: isInternship
        ? "تاریخ شروع دوره"
        : "مهلت تحویل",
      value: formatDate(ad.deliveryDate),
    },
    ...(isInternship
      ? [
          {
            label: "مدت دوره",
            value: ad.internshipDuration
  ? `${Number(ad.internshipDuration).toLocaleString("fa-IR")} ماه`
  : "—",
          },
          {
            label: "ساعت کار هفتگی",
            value: formatWeeklyHours(ad.weeklyHours),
          },
        ]
      : []),
  ];

  const conditionRows = [
    {
      label: isInternship
        ? "کمک‌هزینه ماهانه"
        : "بودجه",

      value:
        isInternship && ad.hasAllowance === false
          ? "بدون کمک‌هزینه"
          : ad.budget != null
            ? `${formatNumber(Number(ad.budget))} تومان`
            : "—",
    },
    {
      label: "نحوه همکاری",
      value: ad.collaborationMode,
    },
    {
      label: "بازه سنی",
      value: ad.ageRange,
    },
    
  ];

  return (
    <div
      dir="rtl"
      className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
    >

      {/* Main information */}

      <div className="flex min-w-0 flex-col gap-4">

        <SectionCard
          title={
            isInternship
              ? "شرح کارآموزی"
              : "شرح کار"
          }
        >

          <p className="whitespace-pre-wrap break-words text-label leading-8 text-text-primary">
            {ad.description || "—"}
          </p>

          {skills.length > 0 && (

            <div className="mt-5 flex flex-col gap-3">

              <h3 className="text-label font-bold">
                مهارت‌های موردنیاز
              </h3>

              <ul className="flex flex-wrap gap-2">

                {skills.map((skill) => (

                  <li
                    key={skill}
                    className="rounded-lg bg-green-7 px-3 py-1.5 text-caption text-text-primary"
                  >
                    {skill}{ad.skillLevels?.[skill] ? ` (${SKILL_LEVEL_LABELS[ad.skillLevels[skill]!]})` : ""}
                  </li>

                ))}

              </ul>

            </div>

          )}

        </SectionCard>

        {/* Deliverables */}

        <SectionCard
          title={
            isInternship
              ? "اهداف یادگیری"
              : "خروجی‌های مورد انتظار"
          }
        >

          {deliverables.length > 0 ? (

            <ul className="flex flex-col gap-3">

              {deliverables.map((item, index) => (

                <li
                  key={`${index}-${item}`}
                  className="flex items-start gap-3 text-label leading-7"
                >

                  <Check
                    size={18}
                    className="mt-1 shrink-0 text-green-2"
                    aria-hidden="true"
                  />

                  <span className="min-w-0 break-words">
                    {item}
                  </span>

                </li>

              ))}

            </ul>

          ) : (

            <p className="text-label text-text-secondary">
              موردی ثبت نشده است.
            </p>

          )}

        </SectionCard>

        {!isInternship && (ad.attachments?.length ?? 0) > 0 && (
          <SectionCard title="پیوست‌های آگهی">
            <ul className="flex flex-col gap-2">
              {ad.attachments?.map((file, index) => (
                <li key={`${index}-${file.name}`} className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border-soft p-3">
                  <span className="min-w-0 break-all text-label">{file.name}</span>
                  <Button variant="secondary" size="sm" onClick={() => downloadAttachment(file)}>دانلود</Button>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {/* Dates and conditions */}

        <SectionCard title="زمان و شرایط">

          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">

            {[dateRows, conditionRows].map(
              (rows, index) => (

                <dl
                  key={index}
                  className="flex min-w-0 flex-col gap-3"
                >

                  {rows.map(({ label, value }) => (

                    <div
                      key={label}
                      className="grid min-w-0 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-3 text-caption"
                    >

                      <dt className="break-words text-text-secondary">
                        {label}
                      </dt>

                      <dd className="min-w-0 break-words font-medium text-text-primary">
                        {value || "—"}
                      </dd>

                    </div>

                  ))}

                </dl>

              ),
            )}

          </div>

        </SectionCard>

      </div>

      {/* Applicants statistics */}

      <aside className="min-w-0 rounded-2xl border border-border-soft bg-white p-5">

        <div className="grid grid-cols-2 gap-3">

          <div className="flex items-center justify-center gap-3">

            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-7">

              <Bell
                size={20}
                className="text-blue"
              />

            </span>

            <div className="flex flex-col gap-1">

              <strong className="text-2xl font-bold">
                {formatNumber(newApplicantsCount)}
              </strong>

              <span className="text-caption text-text-secondary">
                جدید
              </span>

            </div>

          </div>

          <div className="flex items-center justify-center gap-3">

            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-7">

              <UserRound
                size={20}
                className="text-blue"
              />

            </span>

            <div className="flex flex-col gap-1">

              <strong className="text-2xl font-bold">
                {formatNumber(applicantsCount)}
              </strong>

              <span className="text-caption text-text-secondary">
                درخواست
              </span>

            </div>

          </div>

        </div>

        <div className="my-5 border-t border-border-soft" />

        {/* Deadline */}

        <div className="mb-5">

          <div className="flex flex-wrap items-center justify-between gap-2 text-caption">

            <span className="text-text-secondary">
              مهلت درخواست
            </span>

            <strong className="text-blue">
              {deadlineLabel}
            </strong>

          </div>

        </div>

        <Button
          fullWidth
          onClick={onViewApplicants}
        >
          مشاهده متقاضیان
        </Button>

      </aside>

    </div>
  );
}
