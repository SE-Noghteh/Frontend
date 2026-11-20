/** Job-seeker dashboard: one ad with everything needed to decide, and the apply action. */

import { Check, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { AdApplyPanel } from "@/components/features/SeekerAdDetail/AdApplyPanel";
import { AdConditionsCard } from "@/components/features/SeekerAdDetail/AdConditionsCard";
import { AdDescriptionCard } from "@/components/features/SeekerAdDetail/AdDescriptionCard";
import { AdEmployerCard } from "@/components/features/SeekerAdDetail/AdEmployerCard";
import { AdFilesCard } from "@/components/features/SeekerAdDetail/AdFilesCard";
import { AdSkillsCard } from "@/components/features/SeekerAdDetail/AdSkillsCard";
import { ApplyDialog } from "@/components/features/SeekerAdDetail/ApplyDialog";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { StatusChip } from "@/components/ui/StatusChip";
import { mockParent, mockProfile } from "@/data/mockSeeker";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { parseAdPreviewState, resolveAdState } from "@/utils/resolveAdState";
import { formatJalaliDate } from "@/utils/formatToman";

const ADULT_AGE = 18;

export default function SeekerAdDetailPage() {
  const { adId } = useParams();
  const [searchParams] = useSearchParams();
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const ad = useSeekerStore((state) => state.ads.find((item) => item.id === adId));
  const request = useSeekerStore((state) => state.requests.find((item) => item.adId === adId && !item.demoOnly));
  const toggleSaved = useSeekerStore((state) => state.toggleSaved);
  const showToast = useToastStore((state) => state.showToast);

  if (!ad) return <Navigate to="/seeker/ads" replace />;

  const preview = parseAdPreviewState(searchParams.get("state"));
  const state = resolveAdState(ad.application, preview);
  const isAdult = preview === "adult" || mockProfile.age >= ADULT_AGE;
  const isClosed = state === "expired";

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[{ label: "آگهی‌ها", to: "/seeker/ads" }, { label: "جزئیات آگهی" }]}
        title={ad.title}
        subtitle={`${ad.employerName} · منتشر شده ${formatJalaliDate(ad.publishedAt)}`}
        eyebrow={
          <>
            <AdKindTag kind={ad.kind} />
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
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-5">
        <div className="flex flex-col gap-4">
          <AdDescriptionCard description={ad.description} />
          <AdSkillsCard skills={ad.skills} deliverables={ad.deliverables} deliveryFormat={ad.deliveryFormat} />
          <AdFilesCard files={ad.files} />
        </div>

        <div className="flex flex-col gap-4">
          <AdEmployerCard name={ad.employerName} initial={ad.employerInitial} collabsCount={ad.employerCollabsCount} />
          <AdConditionsCard ad={ad} />
          <AdApplyPanel
            state={state}
            isSaved={ad.saved}
            requestId={request?.id}
            onApply={() => setIsApplyOpen(true)}
            onToggleSave={() => toggleSaved(ad.id)}
            onAddParent={() =>
              showToast({ tone: "success", title: "افزودن والد", description: "این بخش بعداً اضافه می‌شود" })
            }
          />
        </div>
      </div>

      <ApplyDialog
        isOpen={isApplyOpen}
        ad={ad}
        parentName={isAdult ? undefined : mockParent.name}
        needsParent={!isAdult}
        shouldFail={preview === "network-error"}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
