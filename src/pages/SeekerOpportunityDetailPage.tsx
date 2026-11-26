import { ArrowRight, Check, X } from "lucide-react";
import { useParams } from "react-router-dom";

import { AdConditionsCard } from "@/components/features/SeekerAdDetail/AdConditionsCard";
import { AdDescriptionCard } from "@/components/features/SeekerAdDetail/AdDescriptionCard";
import { AdEmployerCard } from "@/components/features/SeekerAdDetail/AdEmployerCard";
import { AdFilesCard } from "@/components/features/SeekerAdDetail/AdFilesCard";
import { AdSkillsCard } from "@/components/features/SeekerAdDetail/AdSkillsCard";
import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { useOpportunity } from "@/hooks/useOpportunity";
import { useOpportunityCategories } from "@/hooks/useOpportunityCategories";
import type { Opportunity } from "@/types/Opportunity/opportunity";
import { formatBudget } from "@/utils/formatBudget";
import { toPersianDigits } from "@/utils/toPersianDigits";

function getPublishedLabel(daysAgo: number): string {
  if (daysAgo <= 0) return "امروز منتشر شده";
  return `${toPersianDigits(daysAgo)} روز پیش منتشر شده`;
}

function getDeadlineLabel(daysRemaining: number): string {
  if (daysRemaining <= 0) return "مهلت به پایان رسیده";
  return `${toPersianDigits(daysRemaining)} روز دیگر`;
}

function getConditionsRows(opportunity: Opportunity) {
  const amountLabel = opportunity.hasStipend ? "کمک‌هزینه" : "بودجه";
  const amount = `${formatBudget(opportunity.budget)} تومان`;

  return [
    {
      label: amountLabel,
      value: opportunity.hasStipend ? `${amount} / ماه` : amount,
    },
    {
      label: "مهلت درخواست",
      value: getDeadlineLabel(opportunity.deadlineInDays),
    },
    {
      label: "مدت همکاری",
      value: `${toPersianDigits(opportunity.durationDays)} روز`,
    },
    {
      label: "درخواست‌ها",
      value: `${toPersianDigits(opportunity.applicantsCount)} نفر`,
    },
  ];
}

function OpportunityNotFound() {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[
          { label: "جستجوی فرصت‌ها", to: "/search" },
          { label: "جزئیات آگهی" },
        ]}
        title="آگهی پیدا نشد"
        subtitle="این فرصت در فهرست آگهی‌های موجود نیست یا شناسه آن معتبر نیست."
        action={
          <ButtonLink
            to="/search"
            variant="secondary"
            size="sm"
            startIcon={<ArrowRight size={16} />}
          >
            بازگشت به جستجو
          </ButtonLink>
        }
      />
      <SectionCard>
        <p className="text-label leading-7 text-text-secondary">
          ممکن است آگهی حذف شده باشد یا دیگر در دسترس نباشد.
        </p>
      </SectionCard>
    </div>
  );
}

/**
 * Search-result detail page.
 * It deliberately reuses the same detail cards and two-column layout as
 * SeekerAdDetailPage so both detail routes have the same visual structure.
 */
export default function SeekerOpportunityDetailPage() {
  const { opportunityId } = useParams();
  const { data: opportunity, isPending, isError } = useOpportunity(opportunityId);
  const { data: categories = [] } = useOpportunityCategories();

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 lg:gap-5">
        <PageHeader
          breadcrumb={[
            { label: "جستجوی فرصت‌ها", to: "/search" },
            { label: "جزئیات آگهی" },
          ]}
          title="در حال دریافت جزئیات آگهی"
        />
        <SectionCard>
          <p className="text-label text-text-secondary">لطفاً کمی صبر کن...</p>
        </SectionCard>
      </div>
    );
  }

  if (isError || !opportunity) {
    return <OpportunityNotFound />;
  }

  const categoryTitle =
    categories.find((category) => category.id === opportunity.categoryId)?.title;

  const isClosed = opportunity.deadlineInDays <= 0;
  const kind = opportunity.type === "internship" ? "internship" : "work";

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[
          { label: "جستجوی فرصت‌ها", to: "/search" },
          { label: "جزئیات آگهی" },
        ]}
        title={opportunity.title}
        subtitle={[
          opportunity.employerName,
          categoryTitle,
          getPublishedLabel(opportunity.postedDaysAgo),
        ]
          .filter(Boolean)
          .join(" · ")}
        eyebrow={
          <>
            <AdKindTag kind={kind} />
            {isClosed ? (
              <StatusChip tone="neutral" icon={<X size={12} aria-hidden="true" />}>
                بسته‌شده
              </StatusChip>
            ) : (
              <StatusChip tone="success" icon={<Check size={12} aria-hidden="true" />}>
                در حال دریافت درخواست
              </StatusChip>
            )}
          </>
        }
        action={
          <ButtonLink
            to="/search"
            variant="secondary"
            size="sm"
            startIcon={<ArrowRight size={16} />}
          >
            بازگشت به جستجو
          </ButtonLink>
        }
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-5">
        <div className="flex flex-col gap-4">
          <AdDescriptionCard description={opportunity.description} />
          <AdSkillsCard
            skills={opportunity.skills}
            deliverables={opportunity.deliverables}
            deliveryFormat={opportunity.deliveryFormat}
          />
          <AdFilesCard files={opportunity.files} />
        </div>

        <div className="flex flex-col gap-4">
          <AdEmployerCard
            name={opportunity.employerName}
            initial={opportunity.employerInitial}
            collabsCount={opportunity.employerCollabsCount}
            rating={opportunity.employerRating}
          />
          <AdConditionsCard rows={getConditionsRows(opportunity)} />
          <SectionCard>
            <p className="text-caption leading-7 text-text-secondary">
              این جزئیات از همان فرصتی نمایش داده می‌شود که در صفحه جستجو انتخاب کرده‌ای.
            </p>
            <ButtonLink
              to="/search"
              variant="secondary"
              size="sm"
              fullWidth
              className="mt-3"
              startIcon={<ArrowRight size={16} />}
            >
              بازگشت به فرصت‌ها
            </ButtonLink>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
