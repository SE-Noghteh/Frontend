
import { useState } from "react";

import {
  Search,
  UserRound,
  UsersRound,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
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
  onViewApplicant: (id: string) => void;
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
  new: "bg-blue-50 text-blue",
  reviewing: "bg-amber-50 text-amber-700",
  accepted: "bg-green-7 text-green-800",
  rejected: "bg-red-50 text-red-700",
};

export function AdApplicants({
  applicants,
  onViewApplicant,
}: AdApplicantsProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] =
    useState<ApplicantFilter>("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredApplicants = applicants.filter(
    (applicant) => {
      const matchesStatus =
        filter === "all" ||
        applicant.status === filter;

      const searchableText = [
        applicant.name,
        applicant.title,
        ...applicant.skills,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesStatus &&
        searchableText.includes(normalizedQuery)
      );
    },
  );

  return (
    <section
      dir="rtl"
      className="flex min-w-0 flex-col gap-5"
    >
      <div className="flex flex-col gap-4 rounded-xl border border-border-soft bg-white p-4">

        <div className="flex items-center justify-between gap-3">

          <h2 className="text-card-title font-bold">
            متقاضیان آگهی
          </h2>

          <span className="text-caption text-text-secondary">
            {applicants.length.toLocaleString("fa-IR")}
            {" متقاضی"}
          </span>

        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="جست‌وجوی نام یا مهارت متقاضی"
            aria-label="جست‌وجوی متقاضیان"
            className="min-h-11 w-full rounded-lg border border-border-soft bg-white ps-10 pe-3 text-label outline-none focus:border-blue"
          />

        </div>

        <div className="flex flex-wrap gap-2">

          {FILTERS.map((item) => (

            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-lg border px-3 py-2 text-caption transition-colors",
                filter === item.id
                  ? "border-blue bg-blue text-white"
                  : "border-border-soft bg-white hover:bg-green-7",
              )}
            >
              {item.label}
            </button>

          ))}

        </div>

      </div>

      {filteredApplicants.length === 0 ? (

        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-border-soft bg-white p-6 text-center">

          <div className="flex size-16 items-center justify-center rounded-full bg-green-7">

            <UsersRound
              size={30}
              className="text-blue"
            />

          </div>

          <h3 className="font-bold">
            {applicants.length === 0
              ? "هنوز متقاضی ثبت نشده است"
              : "متقاضی موردنظر پیدا نشد"}
          </h3>

          <p className="text-label text-text-secondary">
            {applicants.length === 0
              ? "درخواست‌های کارجویان در این بخش نمایش داده می‌شوند."
              : "عبارت جست‌وجو یا فیلتر انتخابی را تغییر دهید."}
          </p>

        </div>

      ) : (

        <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">

          {filteredApplicants.map((applicant) => (

            <article
              key={applicant.id}
              className="flex min-w-0 flex-col gap-4 rounded-xl border border-border-soft bg-white p-4"
            >

              <div className="flex items-start gap-3">

                {applicant.avatar ? (

                  <img
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />

                ) : (

                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-7">

                    <UserRound
                      size={24}
                      className="text-blue"
                    />

                  </div>

                )}

                <div className="min-w-0 flex-1">

                  <h3 className="break-words font-bold">
                    {applicant.name}
                  </h3>

                  <p className="mt-1 text-caption text-text-secondary">
                    {applicant.title}
                  </p>

                </div>

                <span
                  className={cn(
                    "shrink-0 rounded-lg px-2 py-1 text-caption",
                    STATUS_CLASSES[applicant.status],
                  )}
                >
                  {STATUS_LABELS[applicant.status]}
                </span>

              </div>

              <div className="flex flex-wrap gap-2">

                {applicant.skills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-lg bg-green-7 px-2.5 py-1 text-caption"
                  >
                    {skill}
                  </span>

                ))}

              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-3">

                <span className="text-caption text-text-secondary">
                  {applicant.appliedAt}
                </span>

                <Button
                  variant="text"
                  size="sm"
                  onClick={() =>
                    onViewApplicant(applicant.id)
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

    </section>
  );
}
