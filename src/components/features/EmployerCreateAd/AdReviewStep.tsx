
import { SKILL_LEVEL_LABELS, formatWeeklyHours } from "@/utils/employerAdFields";
import { Button } from "@/components/ui/Button";

import {
  parseCalendarDate,
  toJalali,
} from "@/utils/jalali";

import {
  isValidISODate,
} from "@/utils/dateValidation";

import type {
  CreateAdForm,
  CreateAdStep,
} from "@/types/Employer/createAd";

interface AdReviewStepProps {
  form: CreateAdForm;
  error?: string;
  onAccept: (value: boolean) => void;
  onEdit: (step: CreateAdStep) => void;
}

function formatDate(value: string): string {
  if (!isValidISODate(value)) return "—";

  const { year, month, day } = toJalali(
    parseCalendarDate(value),
  );

  return [year, month, day]
    .map((number) =>
      number.toLocaleString("fa-IR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    )
    .join("/");
}

export function AdReviewStep({
  form,
  error,
  onAccept,
  onEdit,
}: AdReviewStepProps) {
  const isInternship =
    form.kind === "internship";

  const details = [
    ["عنوان", form.title],
    ["دسته‌بندی", form.category],
    ["مهارت‌ها", form.skills.map(skill => {
      const level = form.skillLevels[skill];
      return level ? `${skill} (${SKILL_LEVEL_LABELS[level]})` : skill;
    }).join("، ")],
    ["شرح", form.description],
    ["خروجی", form.deliverables],
    ["فرمت تحویل", form.deliveryFormat],
    ...(!isInternship ? [["پیوست‌ها", form.attachments.map(file => file.name).join("\n")]] : []),
  ];

  const conditions = [
    [
      "مهلت درخواست",
      formatDate(form.deadline),
    ],
    [
      isInternship
        ? "تاریخ شروع دوره"
        : "مهلت تحویل",
      formatDate(form.deliveryDate),
    ],
    [
      isInternship
        ? "کمک‌هزینه ماهانه"
        : "بودجه",
      isInternship && !form.hasAllowance
        ? "بدون کمک‌هزینه"
        : `${Number(form.budget).toLocaleString("fa-IR")} تومان`,
    ],
    [
      "نحوه همکاری",
      form.collaborationMode,
    ],
    [
      "بازه سنی",
      form.ageRange,
    ],
    
    ...(isInternship
      ? [
          [
  "مدت دوره",
  `${Number(form.internshipDuration).toLocaleString("fa-IR")} ماه`,
],
          [
            "ساعت هفتگی",
            formatWeeklyHours(form.weeklyHours),
          ],
        ]
      : []),
  ];

  const sections = [
    {
      title: "مشخصات",
      rows: details,
      step: 2 as const,
    },
    {
      title: "زمان و شرایط",
      rows: conditions,
      step: 3 as const,
    },
  ];

  return (
    <div
      dir="rtl"
      className="flex min-w-0 flex-col gap-5"
    >
      {/* Page title */}

      <h2 className="text-card-title font-bold">
        مرور و تأیید
      </h2>

      {/* Review cards */}

      <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-2">

        {sections.map((section) => (

          <section
            key={section.title}
            className="min-w-0 rounded-xl border border-border-soft bg-background-page p-4"
          >

            {/* Card header */}

            <div className="mb-3 flex items-center justify-between gap-3 border-b border-border-soft pb-3">

              <h3 className="font-bold text-text-primary">
                {section.title}
              </h3>

              <Button
                variant="text"
                size="sm"
                onClick={() =>
                  onEdit(section.step)
                }
              >
                ویرایش
              </Button>

            </div>

            {/* Card information */}

            <dl className="flex flex-col gap-2">

              {section.rows.map(
                ([label, value]) => (

                  <div
                    key={label}
                    className="grid min-w-0 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-3 py-1 text-label"
                  >

                    <dt className="min-w-0 break-words text-text-secondary">
                      {label}
                    </dt>

                    <dd className="min-w-0 whitespace-pre-wrap break-words text-start font-medium leading-relaxed text-text-primary">
                      {value || "—"}
                    </dd>

                  </div>

                ),
              )}

            </dl>

          </section>

        ))}

      </div>

      {/* Confirmation */}

      <label className="flex cursor-pointer items-center gap-2 text-label">

        <input
          type="checkbox"
          checked={form.acceptedTerms}
          onChange={(event) =>
            onAccept(event.target.checked)
          }
          className="size-4 shrink-0 cursor-pointer accent-blue"
        />

        اطلاعات آگهی را بررسی و تأیید می‌کنم.

      </label>

      {/* Validation error */}

      {error && (
        <p
          role="alert"
          className="text-caption text-error"
        >
          {error}
        </p>
      )}

    </div>
  );
}
