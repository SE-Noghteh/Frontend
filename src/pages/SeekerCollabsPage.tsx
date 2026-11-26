/** Job-seeker dashboard: list of the seeker's collaborations. */

import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { StatusChip } from "@/components/ui/StatusChip";
import { useCollabStore } from "@/store/seeker/useCollabStore";
import { formatJalaliDate, formatToman } from "@/utils/formatToman";
import { getCollabView } from "@/utils/getCollabView";
import { toPersianDigits } from "@/utils/toPersianDigits";

export default function SeekerCollabsPage() {
  const collabs = useCollabStore((state) => state.collabs);

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[{ label: "همکاری‌ها", to: "/seeker/collabs" }, { label: "فهرست" }]}
        title="همکاری‌ها"
        subtitle={`${toPersianDigits(collabs.length)} همکاری`}
      />

      <ul className="flex flex-col gap-3">
        {collabs.map((collab) => {
          const view = getCollabView(collab);
          return (
            <li key={collab.id}>
              <article className="rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-body leading-7 font-bold text-text-primary md:text-card-title">{collab.title}</h3>
                    <p className="mt-0.5 text-caption text-text-secondary">
                      {collab.employerName} · {formatToman(collab.amount)} · تحویل {formatJalaliDate(collab.deliveryDate)}
                    </p>
                  </div>
                  <StatusChip tone={view.chip.tone}>{view.chip.label}</StatusChip>
                </div>
                <div className="mt-3 flex justify-end">
                  <ButtonLink to={`/seeker/collabs/${collab.id}`} variant="secondary" size="sm" className="min-w-28">
                    مشاهده
                  </ButtonLink>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
