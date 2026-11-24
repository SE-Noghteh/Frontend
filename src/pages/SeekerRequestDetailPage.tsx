/** Job-seeker dashboard: one request, its progress, the parent's decision and the next actions. */

import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { CancelRequestDialog } from "@/components/features/SeekerRequestDetail/CancelRequestDialog";
import { EditRequestDialog } from "@/components/features/SeekerRequestDetail/EditRequestDialog";
import { MyMessageCard } from "@/components/features/SeekerRequestDetail/MyMessageCard";
import { ParentApprovalCard } from "@/components/features/SeekerRequestDetail/ParentApprovalCard";
import { RequestActions } from "@/components/features/SeekerRequestDetail/RequestActions";
import { RequestAdCard } from "@/components/features/SeekerRequestDetail/RequestAdCard";
import { RequestTimelineCard } from "@/components/features/SeekerRequestDetail/RequestTimelineCard";
import { RequestStatusChip } from "@/components/features/SeekerRequests/RequestStatusChips";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { mockParent } from "@/data/mockSeeker";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import type { SeekerRequest } from "@/types/Seeker/seeker";
import { buildRequestTimeline } from "@/utils/buildRequestTimeline";

function getBanner(request: SeekerRequest): { tone: "success" | "error"; text: string } | undefined {
  if (request.employerStatus === "accepted") {
    return { tone: "success", text: "کارفرما درخواستت را پذیرفت؛ شرایط همکاری را بررسی کن" };
  }
  if (request.employerStatus === "rejectedByParent") {
    return { tone: "error", text: "والدت این درخواست را تأیید نکرد؛ می‌توانی متن را اصلاح کنی و دوباره بفرستی" };
  }
  return undefined;
}

export default function SeekerRequestDetailPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const request = useSeekerStore((state) => state.requests.find((item) => item.id === requestId));
  const ad = useSeekerStore((state) => state.ads.find((item) => item.id === request?.adId));
  const cancelRequest = useSeekerStore((state) => state.cancelRequest);
  const showToast = useToastStore((state) => state.showToast);

  if (!request || !ad) return <Navigate to="/seeker/requests" replace />;

  const handleCancel = () => {
    cancelRequest(request.id);
    setIsCancelOpen(false);
    showToast({ tone: "success", title: "درخواست لغو شد", description: "می‌توانی دوباره برای این آگهی درخواست بدهی" });
    navigate("/seeker/requests");
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[{ label: "درخواست‌های من", to: "/seeker/requests" }, { label: "جزئیات درخواست" }]}
        title={request.title}
        subtitle={`درخواست برای ${request.employerName}`}
        eyebrow={<RequestStatusChip status={request.employerStatus} />}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-5">
        <div className="flex flex-col gap-4">
          <RequestTimelineCard steps={buildRequestTimeline(request, mockParent)} banner={getBanner(request)} />
          <MyMessageCard message={request.message} />
        </div>

        <div className="flex flex-col gap-4">
          <ParentApprovalCard parent={mockParent} status={request.parentStatus} note={request.parentNote} />
          <RequestAdCard ad={ad} />
          <RequestActions request={request} onEdit={() => setIsEditOpen(true)} onCancel={() => setIsCancelOpen(true)} />
        </div>
      </div>

      <EditRequestDialog
        key={`${request.id}-${request.message}`}
        isOpen={isEditOpen}
        request={request}
        onClose={() => setIsEditOpen(false)}
      />
      <CancelRequestDialog isOpen={isCancelOpen} onConfirm={handleCancel} onClose={() => setIsCancelOpen(false)} />
    </div>
  );
}
