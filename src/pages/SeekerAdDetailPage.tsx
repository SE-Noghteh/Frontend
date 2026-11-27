import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Navigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { AdApplyPanel } from "@/components/features/SeekerAdDetail/AdApplyPanel";
import { AdConditionsCard } from "@/components/features/SeekerAdDetail/AdConditionsCard";
import { AdDescriptionCard } from "@/components/features/SeekerAdDetail/AdDescriptionCard";
import { AdEmployerCard } from "@/components/features/SeekerAdDetail/AdEmployerCard";
import { AdFilesCard } from "@/components/features/SeekerAdDetail/AdFilesCard";
import { AdSkillsCard } from "@/components/features/SeekerAdDetail/AdSkillsCard";
import { ApplyDialog } from "@/components/features/SeekerAdDetail/ApplyDialog";
import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { useOpportunity } from "@/hooks/useOpportunity";
import { useOpportunitySave } from "@/hooks/useOpportunitySave";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import type { AdApplicationState } from "@/types/Seeker/seeker";
import { opportunityToSeekerAd } from "@/utils/opportunityToSeekerAd";
import {
  parseAdPreviewState,
  resolveAdState,
} from "@/utils/resolveAdState";
import { formatJalaliDate } from "@/utils/formatToman";

export default function SeekerAdDetailPage() {
  const { adId } = useParams();
  const [searchParams] = useSearchParams();
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const {
    data: opportunity,
    isPending,
    isError,
  } = useOpportunity(adId);

  const request = useSeekerStore((state) =>
    state.requests.find(
      (item) =>
        !item.demoOnly &&
        item.sourceOpportunityId === adId,
    ),
  );

  const submitOpportunityApplication =
    useSeekerStore(
      (state) =>
        state.submitOpportunityApplication,
    );

  const {
    toggleSaved,
    isPending: isSaving,
  } = useOpportunitySave();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (opportunity) {
      setIsSaved(Boolean(opportunity.saved));
    }
  }, [opportunity]);

  if (isPending) {
    return (
      <SectionCard>
        <p className="text-label text-text-secondary">
          در حال دریافت جزئیات آگهی...
        </p>
      </SectionCard>
    );
  }

  if (isError || !opportunity) {
    return <Navigate to="/seeker/ads" replace />;
  }

  const ad = opportunityToSeekerAd(opportunity);
  const preview = parseAdPreviewState(
    searchParams.get("state"),
  );

  const realState: AdApplicationState =
    opportunity.acceptingApplications === false ||
    opportunity.deadlineInDays < 0
      ? "expired"
      : request
        ? "sentToEmployer"
        : "open";

  const state = resolveAdState(realState, preview);
  const isClosed = state === "expired";

  const handleToggleSave = async () => {
    if (isSaving) return;

    const previous = isSaved;
    const next = !previous;
    setIsSaved(next);

    try {
      await toggleSaved({
        id: opportunity.id,
        saved: previous,
      });
    } catch {
      setIsSaved(previous);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[
          {
            label: "آگهی‌ها",
            to: "/seeker/ads",
          },
          { label: "جزئیات آگهی" },
        ]}
        title={opportunity.title}
        subtitle={`${opportunity.employerName} · منتشر شده ${formatJalaliDate(
          opportunity.publishedAt ??
            opportunity.createdAt ??
            "",
        )}`}
        eyebrow={
          <>
            <AdKindTag kind={ad.kind} />
            {isClosed ? (
              <StatusChip
                tone="neutral"
                icon={
                  <X size={12} aria-hidden="true" />
                }
              >
                بسته‌شده
              </StatusChip>
            ) : (
              <StatusChip
                tone="success"
                icon={
                  <Check
                    size={12}
                    aria-hidden="true"
                  />
                }
              >
                در حال دریافت درخواست
              </StatusChip>
            )}
          </>
        }
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-5">
        <div className="flex flex-col gap-4">
          <AdDescriptionCard
            description={opportunity.description}
          />

          <AdSkillsCard
            skills={opportunity.skills}
            deliverables={opportunity.deliverables}
            deliveryFormat={opportunity.deliveryFormat}
          />

          <AdFilesCard files={ad.files} />
        </div>

        <div className="flex flex-col gap-4">
          <AdEmployerCard
            name={opportunity.employerName}
            initial={ad.employerInitial}
            verified={opportunity.employerVerified}
          />

          <AdConditionsCard ad={ad} />

          <AdApplyPanel
            state={state}
            isSaved={isSaved}
            requestId={request?.id}
            onApply={() => setIsApplyOpen(true)}
            onToggleSave={handleToggleSave}
          />
        </div>
      </div>

      <ApplyDialog
        isOpen={isApplyOpen}
        ad={ad}
        shouldFail={preview === "network-error"}
        onSubmit={(message) =>
          submitOpportunityApplication(
            opportunity,
            message,
          )
        }
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
