
import { useState } from "react";

import {
  Search,
  UsersRound,
  ChevronLeft,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { InitialAvatar } from "@/components/ui/InitialAvatar";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/utils/cn";

export type ApplicantStatus =
  | "new"
  | "reviewing"
  | "accepted"
  | "rejected";

export interface AdApplicant {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  skills: string[];
  appliedAt: string;
  status: ApplicantStatus;
}

interface AdApplicantsProps {
  applicants: AdApplicant[];
}

type ApplicantFilter = "all" | ApplicantStatus;

const FILTERS: {
  id: ApplicantFilter;
  label: string;
}[] = [
  { id: "all", label: "همه" },
  { id: "new", label: "جدید" },
  { id: "reviewing", label: "در حال بررسی" },
  { id: "accepted", label: "پذیرفته‌شده" },
  { id: "rejected", label: "ردشده" },
];

const STATUS_LABELS: Record<ApplicantStatus, string> = {
  new: "جدید",
  reviewing: "در حال بررسی",
  accepted: "پذیرفته‌شده",
  rejected: "ردشده",
};

const STATUS_CLASSES: Record<ApplicantStatus, string> = {
  new: "bg-success-soft text-success",
  reviewing: "bg-amber-50 text-amber-700",
  accepted: "bg-green-7 text-green-800",
  rejected: "bg-red-50 text-red-700",
};

function normalizeSearch(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ");
}

export function AdApplicants({
  applicants,
}: AdApplicantsProps) {
  const [query, setQuery] = useState("");

  const [filter, setFilter] =
    useState<ApplicantFilter>("all");

  const [selectedApplicant, setSelectedApplicant] =
    useState<AdApplicant | null>(null);

  const normalizedQuery = normalizeSearch(query);

  const filteredApplicants = applicants.filter(
    (applicant) => {
      const matchesStatus =
        filter === "all" ||
        applicant.status === filter;

      const searchableText = normalizeSearch(
        [
          applicant.name,
          applicant.title,
          ...applicant.skills,
        ].join(" "),
      );

      return (
        matchesStatus &&
        searchableText.includes(normalizedQuery)
      );
    },
  );

  return (
    <section
      dir="rtl"
      className="flex min-w-0 flex-col gap-4"
    >

      {/* Toolbar */}

      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-border-soft bg-white p-4 lg:p-5">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <h2 className="text-card-title font-bold text-text-primary">
            متقاضیان آگهی
          </h2>

          <span className="rounded-lg bg-green-7 px-3 py-1.5 text-caption font-medium">
            {applicants.length.toLocaleString("fa-IR")}
            {" متقاضی"}
          </span>

        </div>

        {/* Search */}

        <div className="relative w-full lg:max-w-sm">

          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="جست‌وجوی نام یا مهارت متقاضی"
            aria-label="جست‌وجوی متقاضیان"
            className="h-11 w-full rounded-xl border border-border-soft bg-white ps-10 pe-3 text-label outline-none transition-colors focus:border-blue"
          />

        </div>

        {/* Status filters */}

        <div className="flex flex-wrap items-center gap-2">

          {FILTERS.map((item) => {
            const count =
              item.id === "all"
                ? applicants.length
                : applicants.filter(
                    (applicant) =>
                      applicant.status === item.id,
                  ).length;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "flex min-h-10 items-center gap-2 rounded-xl border px-3 py-2 text-caption transition-colors",
                  filter === item.id
                    ? "border-blue bg-blue font-bold text-white"
                    : "border-border-soft bg-white text-text-primary hover:bg-green-7",
                )}
              >

                {item.label}

                <span>
                  ({count.toLocaleString("fa-IR")})
                </span>

              </button>
            );
          })}

        </div>

      </div>

      {/* Empty state */}

      {filteredApplicants.length === 0 ? (

        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border-soft bg-white p-6 text-center">

          <div className="flex size-16 items-center justify-center rounded-full bg-green-7">

            <UsersRound
              size={30}
              className="text-blue"
            />

          </div>

          <h3 className="font-bold text-text-primary">
            {applicants.length === 0
              ? "هنوز متقاضی ثبت نشده است"
              : "متقاضی موردنظر پیدا نشد"}
          </h3>

          <p className="text-label text-text-secondary">
            {applicants.length === 0
              ? "درخواست‌های کارجویان در این بخش نمایش داده می‌شوند."
              : "عبارت جست‌وجو یا فیلتر انتخابی را تغییر دهید."}
          </p>

          {applicants.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
            >
              حذف فیلترها
            </Button>
          )}

        </div>

      ) : (

        <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">

          {filteredApplicants.map((applicant) => (

            <article
              key={applicant.id}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-border-soft bg-white p-4 transition-shadow hover:shadow-sm lg:p-5"
            >

              {/* Applicant information */}

              <div className="flex flex-wrap items-start gap-3">

                {applicant.avatar ? (

                  <img
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />

                ) : (

                  <InitialAvatar
                    name={applicant.name}
                    role="seeker"
                    className="size-12 bg-green-7! text-lg text-text-primary!"
                  />

                )}

                <div className="min-w-0 flex-1">

                  <h3 className="wrap-break-word font-bold text-text-primary">
                    {applicant.name}
                  </h3>

                  <p className="mt-1 text-caption text-text-secondary">
                    {applicant.title}
                  </p>

                </div>

                <span
                  className={cn(
                    "shrink-0 rounded-lg px-2.5 py-1 text-caption font-medium",
                    STATUS_CLASSES[applicant.status],
                  )}
                >
                  {STATUS_LABELS[applicant.status]}
                </span>

              </div>

              {/* Skills */}

              <div className="flex flex-wrap gap-2">

                {applicant.skills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-lg bg-green-7 px-3 py-1.5 text-caption text-text-primary"
                  >
                    {skill}
                  </span>

                ))}

              </div>

              {/* Footer */}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-4">

                <span className="inline-flex items-center gap-1.5 text-caption text-text-secondary">

                  <CalendarDays
                    size={15}
                    aria-hidden="true"
                  />

                  {applicant.appliedAt}

                </span>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setSelectedApplicant(applicant)
                  }
                >
                  مشاهده درخواست
                  <ChevronLeft size={16} />
                </Button>

              </div>

            </article>

          ))}

        </div>

      )}

      {/* Applicant details dialog */}

      <Dialog
        isOpen={selectedApplicant !== null}
        title="جزئیات درخواست"
        onClose={() => setSelectedApplicant(null)}
      >

        {selectedApplicant && (

          <div
            dir="rtl"
            className="flex min-w-0 flex-col gap-5"
          >

            <div className="flex items-center gap-3">

              <InitialAvatar
                name={selectedApplicant.name}
                role="seeker"
                className="size-14 bg-green-7! text-xl text-text-primary!"
              />

              <div className="min-w-0">

                <h3 className="font-bold text-text-primary">
                  {selectedApplicant.name}
                </h3>

                <p className="mt-1 text-caption text-text-secondary">
                  {selectedApplicant.title}
                </p>

              </div>

            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-border-soft bg-background-page p-4">

              <div className="flex flex-wrap items-center justify-between gap-2 text-label">

                <span className="text-text-secondary">
                  تاریخ ارسال درخواست
                </span>

                <strong>
                  {selectedApplicant.appliedAt}
                </strong>

              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-label">

                <span className="text-text-secondary">
                  وضعیت درخواست
                </span>

                <span
                  className={cn(
                    "rounded-lg px-3 py-1 text-caption",
                    STATUS_CLASSES[selectedApplicant.status],
                  )}
                >
                  {STATUS_LABELS[selectedApplicant.status]}
                </span>

              </div>

            </div>

            <div className="flex flex-col gap-3">

              <h4 className="font-bold text-text-primary">
                مهارت‌ها
              </h4>

              <div className="flex flex-wrap gap-2">

                {selectedApplicant.skills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-lg bg-green-7 px-3 py-1.5 text-caption"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={() =>
                setSelectedApplicant(null)
              }
            >
              بستن
            </Button>

          </div>

        )}

      </Dialog>

    </section>
  );
}
