import { useState } from "react";
import { ApplicantResume } from "./ApplicantResume";

import {
  File,
  UsersRound,
  Briefcase,
  ShieldCheck,
  Download,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { Dropdown } from "@/components/ui/Dropdown";

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

  age?: number;
  match?: number;
  proposedBudget?: number;
  description?: string;
  education?: string;
  projectsCount?: number;
  verified?: boolean;

  about?: string;
  onTimeRate?: number;
  skillLevels?: {
    name: string;
    level: number;
    verified: boolean;
  }[];

  portfolio?: {
    title: string;
    url?: string;
  }[];

  experiences?: {
    title: string;
    employer: string;
    rating: number;
  }[];
}

interface AdApplicantsProps {
  applicants: AdApplicant[];
  onViewApplicant?: (id: string) => void;
  onDownloadResume?: (id: string) => void;
}

type Filter = "all" | "new" | "rejected";
type Sort = "match" | "newest";
type DetailTab = "request" | "resume" | "portfolio";

const FILTERS: {
  value: Filter;
  label: string;
}[] = [
  { value: "all", label: "همه" },
  { value: "new", label: "جدید" },
  { value: "rejected", label: "کنار گذاشته" },
];

const TABS: {
  value: DetailTab;
  label: string;
}[] = [
  { value: "request", label: "درخواست" },
  { value: "resume", label: "رزومه" },
  { value: "portfolio", label: "نمونه‌کار" },
];
const SORT_LABELS: Record<Sort, string> = {
  match: "بیشترین تطابق",
  newest: "جدیدترین درخواست",
};
function formatNumber(value: number) {
  return value.toLocaleString("fa-IR");
}

function ApplicantAvatar({
  applicant,
  large = false,
}: {
  applicant: AdApplicant;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-green-7 font-bold text-green-2",
        large ? "size-16" : "size-11",
      )}
    >
      {applicant.avatar ? (
        <img
          src={applicant.avatar}
          alt={applicant.name}
          className="size-full object-cover"
        />
      ) : (
        applicant.name.charAt(0)
      )}
    </div>
  );
}

function MatchCircle({
  value,
}: {
  value?: number;
}) {
  const score = Math.max(
    0,
    Math.min(100, value ?? 0),
  );

  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative grid size-[76px] shrink-0 place-items-center"
      title="درصد تطابق متقاضی با شرایط آگهی"
    >
      <svg
        viewBox="0 0 76 76"
        className="absolute inset-0 size-full -rotate-90"
      >
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="#E5E2DC"
          strokeWidth="5"
        />

        {value !== undefined && (
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke={
              score >= 90
                ? "#24694F"
                : "#1C3252"
            }
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference * (1 - score / 100)
            }
          />
        )}
      </svg>

      <div className="flex flex-col items-center justify-center gap-0.5">
        <span className="text-base font-bold leading-none text-blue">
          {value === undefined
            ? "—"
            : `${formatNumber(score)}٪`}
        </span>

        <span className="text-[10px] font-medium text-text-secondary">
          تطابق
        </span>
      </div>
    </div>
  );
}
function StatusBadge({
  status,
}: {
  status: ApplicantStatus;
}) {
  if (status === "reviewing") return null;

  const labels = {
    new: "جدید",
    accepted: "انتخاب‌شده",
    rejected: "کنار گذاشته",
  };

  return (
    <span
      className={cn(
        "rounded-lg border px-2 py-1 text-[11px]",
        status === "rejected"
          ? "border-border-soft bg-background-page text-text-secondary"
          : "border-green-3/30 bg-green-7 text-green-2",
      )}
    >
      {labels[status]}
    </span>
  );
}

function SkillTags({
  skills,
}: {
  skills: string[];
}) {
  if (!skills.length) {
    return (
      <p className="text-caption text-text-secondary">
        مهارتی ثبت نشده است.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex min-h-9 items-center justify-center rounded-lg border border-green-3/20 bg-green-7 px-3 py-2 text-caption font-medium leading-5 text-green-2"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function PortfolioItems({
  applicant,
}: {
  applicant: AdApplicant;
}) {
  const items = applicant.portfolio ?? [];

  if (!items.length) {
    return (
      <p className="rounded-xl bg-background-page p-4 text-center text-caption text-text-secondary">
        نمونه‌کاری ثبت نشده است.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border-soft bg-white"
        >
          <div className="grid aspect-[1.7] place-items-center bg-background-page">
            <File
              size={26}
              className="text-text-secondary"
            />
          </div>

          <div className="flex min-h-12 flex-1 items-center justify-center border-t border-border-soft p-3">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="break-words text-center text-caption font-medium text-blue"
              >
                {item.title}
              </a>
            ) : (
              <p className="break-words text-center text-caption font-medium">
                {item.title}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export function AdApplicants({
  applicants,
  onDownloadResume,
}: AdApplicantsProps) {
  const [filter, setFilter] =
    useState<Filter>("all");

  const [sort, setSort] =
    useState<Sort>("match");

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [detailTab, setDetailTab] =
    useState<DetailTab>("request");

  const [statuses, setStatuses] = useState<
    Record<string, ApplicantStatus>
  >({});

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const items = applicants.map((applicant) => ({
    ...applicant,
    status:
      statuses[applicant.id] ??
      applicant.status,
  }));

  const filteredApplicants = items
    .filter(
      (applicant) =>
        filter === "all" ||
        applicant.status === filter,
    )
    .sort((a, b) => {
      if (sort === "match") {
        return (b.match ?? -1) - (a.match ?? -1);
      }

      return b.appliedAt.localeCompare(
        a.appliedAt,
      );
    });

  const selected =
    filteredApplicants.find(
      (applicant) =>
        applicant.id === selectedId,
    ) ??
    filteredApplicants[0] ??
    null;

  function selectApplicant(id: string) {
    setSelectedId(id);
    setDetailTab("request");
    setConfirmOpen(false);
  }

  function changeStatus(
    id: string,
    status: ApplicantStatus,
  ) {
    setStatuses((previous) => ({
      ...previous,
      [id]: status,
    }));

    setConfirmOpen(false);
  }

  return (
    <section
      dir="rtl"
      className="flex min-w-0 flex-col gap-5"
    >

      {/* Filters and sorting */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={
                filter === item.value
              }
              onClick={() => {
                setFilter(item.value);
                setSelectedId(null);
                setDetailTab("request");
                setConfirmOpen(false);
              }}
              className={cn(
                "rounded-lg border px-3 py-2 text-caption transition-colors",
                filter === item.value
                  ? "border-blue bg-blue text-white"
                  : item.value === "new"
                    ? "border-green-3/30 bg-green-7"
                    : "border-border-soft bg-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="w-full min-w-0 sm:w-[220px]">
  <Dropdown
    id="applicant-sort"
    value={SORT_LABELS[sort]}
    options={Object.values(SORT_LABELS)}
    onChange={(value) => {
      const selectedSort = (
        Object.keys(SORT_LABELS) as Sort[]
      ).find(
        (key) => SORT_LABELS[key] === value,
      );

      if (selectedSort) {
        setSort(selectedSort);
      }
    }}
    placeholder="مرتب‌سازی متقاضیان"
  />
</div>

      </div>

      {filteredApplicants.length === 0 ? (

        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border-soft bg-white p-6 text-center">

          <UsersRound
            size={36}
            className="text-blue"
          />

          <h3 className="font-bold">
            متقاضی‌ای در این بخش وجود ندارد
          </h3>

        </div>

      ) : (

        <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.1fr)]">

          {/* Applicant list */}

          <div className="flex min-w-0 flex-col gap-3">

            {filteredApplicants.map((applicant) => (
              <button
                key={applicant.id}
                type="button"
                aria-pressed={
                  selected?.id === applicant.id
                }
                onClick={() =>
                  selectApplicant(applicant.id)
                }
                className={cn(
                  "flex w-full min-w-0 items-center gap-3 rounded-2xl border-2 p-4 text-start transition-colors",
                  selected?.id === applicant.id
                    ? "border-blue bg-green-7/50"
                    : "border-transparent bg-white shadow-sm hover:border-border-soft",
                )}
              >

                <ApplicantAvatar
                  applicant={applicant}
                />

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="break-words text-label font-bold">
                      {applicant.name}
                    </h3>

                    <StatusBadge
                      status={applicant.status}
                    />

                  </div>

                  <p className="mt-1 break-words text-caption text-text-secondary">
                    {applicant.title}

                    {applicant.age !== undefined &&
                      ` · ${formatNumber(applicant.age)} ساله`}
                  </p>

                </div>

                <MatchCircle
                  value={applicant.match}
                />

              </button>
            ))}

          </div>

          {/* Selected applicant details */}

          {selected && (
            <article
              key={selected.id}
              className="flex min-w-0 flex-col gap-5 rounded-2xl bg-white p-4 shadow-sm sm:p-6"
            >

              <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">

                  <ApplicantAvatar
                    applicant={selected}
                    large
                  />

                  <div className="min-w-0 flex-1">

                    <h2 className="break-words text-card-title font-bold">
                      {selected.name}
                    </h2>

                    <p className="mt-1 text-caption text-text-secondary">
                      {selected.title}

                      {selected.age !== undefined &&
                        ` · ${formatNumber(selected.age)} ساله`}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">

                      {selected.verified && (
                        <span className="flex items-center gap-1 rounded-lg bg-green-7 px-2 py-1 text-caption text-green-2">
                          <ShieldCheck size={14} />
                          تأییدشده
                        </span>
                      )}

                      {selected.projectsCount !== undefined && (
                        <span className="flex items-center gap-1 rounded-lg border border-border-soft px-2 py-1 text-caption">
                          <Briefcase size={14} />

                          {formatNumber(
                            selected.projectsCount,
                          )}

                          {" پروژه"}
                        </span>
                      )}

                    </div>

                  </div>

                </div>
                <Button
                  variant="secondary"
                  className="w-full shrink-0 sm:w-auto"
                  disabled={!onDownloadResume}
                  onClick={() => onDownloadResume?.(selected.id)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Download size={17} />
                    دریافت رزومه
                  </span>
                </Button>
              </div>

              {/* Match */}

              <div className="w-full min-w-0 rounded-xl border border-border-soft bg-background-page p-3">
                <p className="font-bold">
                  {selected.match === undefined
                    ? "—"
                    : `${formatNumber(selected.match)}٪`}
                </p>
                <p className="mt-2 text-caption text-text-secondary">
                  تطابق
                </p>
              </div>

              {/* Detail tabs */}

              <div className="flex flex-wrap gap-2">

                {TABS.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    aria-pressed={
                      detailTab === tab.value
                    }
                    onClick={() =>
                      setDetailTab(tab.value)
                    }
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-caption font-medium",
                      detailTab === tab.value
                        ? "border-blue bg-blue text-white"
                        : "border-border-soft bg-white",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}

              </div>

              {/* Request */}

              {detailTab === "request" && (
  <div className="flex min-w-0 flex-col gap-6">

    {/* Request description */}

    <section className="flex flex-col gap-3">
      <h3 className="text-label font-bold text-blue">
        متن درخواست
      </h3>

      <div className="whitespace-pre-wrap break-words rounded-xl bg-background-page p-4 text-label leading-8">
        {selected.description ||
          "متن درخواست ثبت نشده است."}
      </div>
    </section>

    {/* Related portfolio */}

    <section className="flex flex-col gap-4 border-t border-border-soft pt-5">
      <div className="flex items-center justify-between gap-3">

        <h3 className="text-label font-bold text-blue">
          نمونه‌کارهای مرتبط
        </h3>

        <span className="text-caption text-text-secondary">
          {formatNumber(
            selected.portfolio?.length ?? 0,
          )} نمونه‌کار
        </span>

      </div>

      <PortfolioItems applicant={selected} />
    </section>

    {/* Applicant skills */}

    <section className="flex flex-col gap-3 border-t border-border-soft pt-5">

      <h3 className="text-label font-bold text-blue">
        مهارت‌های متقاضی
      </h3>

      <SkillTags skills={selected.skills} />

    </section>

  </div>
)}

              {/* Resume */}

              {detailTab === "resume" && (
  <ApplicantResume applicant={selected} />
)}

              {/* Portfolio */}

              {detailTab === "portfolio" && (
                <PortfolioItems
                  applicant={selected}
                />
              )}

              {/* Applicant actions */}

              {selected.status === "accepted" ? (

                <div className="rounded-xl bg-green-7 p-4 text-center font-bold text-green-2">
                  این متقاضی برای همکاری انتخاب شده است.
                </div>

              ) : selected.status === "rejected" ? (

                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() =>
                    changeStatus(
                      selected.id,
                      "reviewing",
                    )
                  }
                >
                  بازگرداندن به متقاضیان
                </Button>

              ) : (

                <div className="grid w-full min-w-0 grid-cols-1 gap-3 border-t border-border-soft pt-5 sm:grid-cols-2">

  <Button
    fullWidth
    className="h-12 w-full min-w-0"
    onClick={() => setConfirmOpen(true)}
  >
    انتخاب برای همکاری
  </Button>

  <Button
    variant="secondary"
    fullWidth
    className="h-12 w-full min-w-0"
    onClick={() =>
      changeStatus(selected.id, "rejected")
    }
  >
    کنار گذاشتن
  </Button>

</div>

              )}

            </article>
          )}

        </div>

      )}

      {/* Selection confirmation */}

      {confirmOpen && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="تأیید انتخاب متقاضی"
            className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-center justify-between">

              <h3 className="text-card-title font-bold">
                تأیید انتخاب
              </h3>

              <button
                type="button"
                aria-label="بستن"
                onClick={() =>
                  setConfirmOpen(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <p className="text-label leading-7">
              آیا از انتخاب «{selected.name}» برای همکاری مطمئن هستید؟
            </p>

            <div className="flex flex-col gap-3">

              <Button
                fullWidth
                onClick={() =>
                  changeStatus(
                    selected.id,
                    "accepted",
                  )
                }
              >
                تأیید انتخاب
              </Button>

              <Button
                variant="secondary"
                fullWidth
                onClick={() =>
                  setConfirmOpen(false)
                }
              >
                انصراف
              </Button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
