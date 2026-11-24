/** Job-seeker dashboard: one collaboration, from agreed terms to payout. */

import { FileText, ArrowLeftRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { AddStageDialog } from "@/components/features/SeekerCollabDetail/AddStageDialog";
import { CancelCollabDialog } from "@/components/features/SeekerCollabDetail/CancelCollabDialog";
import { ChangeTermsDialog } from "@/components/features/SeekerCollabDetail/ChangeTermsDialog";
import { CollabActionsCard } from "@/components/features/SeekerCollabDetail/CollabActionsCard";
import { CollabBanner } from "@/components/features/SeekerCollabDetail/CollabBanner";
import { CollabEmployerCard } from "@/components/features/SeekerCollabDetail/CollabEmployerCard";
import { CollabParentCard } from "@/components/features/SeekerCollabDetail/CollabParentCard";
import { CollabStepper } from "@/components/features/SeekerCollabDetail/CollabStepper";
import { CollabTermsCard } from "@/components/features/SeekerCollabDetail/CollabTermsCard";
import { DeliveryDialog } from "@/components/features/SeekerCollabDetail/DeliveryDialog";
import { DeliveryFilesCard } from "@/components/features/SeekerCollabDetail/DeliveryFilesCard";
import { EarningsCard } from "@/components/features/SeekerCollabDetail/EarningsCard";
import { FlowCard } from "@/components/features/SeekerCollabDetail/FlowCard";
import { ParentMessageCard } from "@/components/features/SeekerCollabDetail/ParentMessageCard";
import { RatingCard } from "@/components/features/SeekerCollabDetail/RatingCard";
import { RevisionCard } from "@/components/features/SeekerCollabDetail/RevisionCard";
import { SettlementCard } from "@/components/features/SeekerCollabDetail/SettlementCard";
import { SplitCard } from "@/components/features/SeekerCollabDetail/SplitCard";
import { TextInfoCard } from "@/components/features/SeekerCollabDetail/TextInfoCard";
import { WorkProgressCard } from "@/components/features/SeekerCollabDetail/WorkProgressCard";
import { WorkStagesCard } from "@/components/features/SeekerCollabDetail/WorkStagesCard";
import { AdKindTag } from "@/components/features/SeekerAds/AdKindTag";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { StatusChip } from "@/components/ui/StatusChip";
import { mockParent } from "@/data/mockSeeker";
import { useCollabStore } from "@/store/seeker/useCollabStore";
import { useToastStore } from "@/store/ui/useToastStore";
import type { CollabActionId, CollabBlock, SeekerCollab } from "@/types/Seeker/collab";
import type { TimelineStep } from "@/utils/buildRequestTimeline";
import { getCollabView } from "@/utils/getCollabView";

type OpenDialog = "stage" | "delivery" | "cancel" | "terms" | null;

const DAYS_LEFT = 4;

const PAYOUT_STEPS: TimelineStep[] = [
  { label: "تأیید کارفرما", state: "done", date: "۱۴۰۵/۰۹/۱۲" },
  { label: "بررسی ادمین", state: "current", hint: "تا ۴۸ ساعت" },
  { label: "واریز به کیف پول", state: "upcoming" },
];

const DISPUTE_STEPS: TimelineStep[] = [
  { label: "ثبت اختلاف توسط کارفرما", state: "done", date: "۱۴۰۵/۰۹/۱۲" },
  { label: "پاسخ تو", state: "current", hint: "تا ۲۴ ساعت" },
  { label: "تصمیم ادمین", state: "upcoming" },
];

function maxPercent(collab: SeekerCollab): number {
  return collab.stages.reduce((max, stage) => Math.max(max, stage.percent), 0);
}

export default function SeekerCollabDetailPage() {
  const { collabId } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);

  const collab = useCollabStore((state) => state.collabs.find((item) => item.id === collabId));
  const setCollabState = useCollabStore((state) => state.setState);
  const showToast = useToastStore((state) => state.showToast);

  if (!collab) return <Navigate to="/seeker/collabs" replace />;

  const view = getCollabView(collab);
  const closeDialog = () => setOpenDialog(null);
  const notifyLater = () => showToast({ tone: "success", title: "به‌زودی", description: "این بخش بعداً اضافه می‌شود" });

  const handleAction = (id: CollabActionId) => {
    switch (id) {
      case "acceptTerms":
        setCollabState(collab.id, "paymentWaiting");
        showToast({ tone: "success", title: "شرایط پذیرفته شد", description: "منتظر پرداخت کارفرما هستیم." });
        break;
      case "startWork":
        setCollabState(collab.id, "workInProgress");
        showToast({ tone: "success", title: "کار شروع شد", description: "پیشرفت را مرحله‌به‌مرحله ثبت کن." });
        break;
      case "startRevision":
        setCollabState(collab.id, "revisionInProgress");
        break;
      case "requestContractEdit":
        setOpenDialog("terms");
        break;
      case "addStage":
        setOpenDialog("stage");
        break;
      case "submitDelivery":
        setOpenDialog("delivery");
        break;
      case "cancelCollab":
        setOpenDialog("cancel");
        break;
      case "searchAds":
        navigate("/seeker/ads");
        break;
      default:
        notifyLater();
    }
  };

  const confirmCancel = () => {
    setCollabState(collab.id, "cancelledBySeeker");
    closeDialog();
    showToast({ tone: "success", title: "همکاری لغو شد" });
  };

  const renderBlock = (block: CollabBlock) => {
    switch (block) {
      case "parent":
        return <CollabParentCard parent={mockParent} collab={collab} />;
      case "earnings":
        return <EarningsCard amount={collab.amount} />;
      case "whyWait":
        return (
          <TextInfoCard title="چرا منتظر بمانم؟" icon={<ShieldCheck size={15} aria-hidden="true" />}>
            کار بعد از پرداخت کارفرما شروع می‌شود. پول در امانت زدلنسر می‌ماند و بعد از تأیید تحویل به کیف پولت واریز می‌شود.
          </TextInfoCard>
        );
      case "progress":
        return <WorkProgressCard deliveryDate={collab.deliveryDate} percent={maxPercent(collab)} daysLeft={DAYS_LEFT} />;
      case "stages": {
        const canAdd = collab.state === "workInProgress" || collab.state === "workLate";
        return <WorkStagesCard stages={collab.stages} onAddStage={canAdd ? () => setOpenDialog("stage") : undefined} />;
      }
      case "delivery":
        return <DeliveryFilesCard files={collab.deliveryFiles} />;
      case "revision":
        return (
          <RevisionCard
            items={collab.revisionItems}
            onStart={() => handleAction("startRevision")}
            onViewPrevious={notifyLater}
          />
        );
      case "payoutFlow":
        return <FlowCard title="روند واریز" icon={<ArrowLeftRight size={15} aria-hidden="true" />} steps={PAYOUT_STEPS} />;
      case "disputeFlow":
        return <FlowCard title="روند بررسی" icon={<FileText size={15} aria-hidden="true" />} steps={DISPUTE_STEPS} />;
      case "rating":
        return collab.rating ? <RatingCard rating={collab.rating} /> : null;
      case "split":
        return <SplitCard amount={collab.amount} />;
      case "refundReason":
        return (
          <TextInfoCard title="دلیل تصمیم" icon={<FileText size={15} aria-hidden="true" />}>
            خروجی‌ها با شرح آگهی مطابقت نداشت و در دو نوبت اصلاح هم رفع نشد.
          </TextInfoCard>
        );
      case "settlement":
        return <SettlementCard amount={collab.amount} />;
      case "parentMessage":
        return (
          <ParentMessageCard
            message={collab.parentNote ?? ""}
            onEdit={() => handleAction("requestContractEdit")}
            onCancel={() => setOpenDialog("cancel")}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[{ label: "همکاری‌ها", to: "/seeker/collabs" }, { label: "جزئیات همکاری" }]}
        title={collab.title}
        subtitle={`همکاری با ${collab.employerName}`}
        eyebrow={
          <>
            <AdKindTag kind="work" />
            <StatusChip tone={view.chip.tone}>{view.chip.label}</StatusChip>
          </>
        }
      />

      <CollabStepper steps={view.steps} />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-5">
        <div className="flex flex-col gap-4">
          {view.banner ? <CollabBanner tone={view.banner.tone} text={view.banner.text} /> : null}
          {view.main.map((block) => (
            <div key={block}>{renderBlock(block)}</div>
          ))}
          <CollabActionsCard actions={view.actions} onAction={handleAction} />
        </div>

        <div className="flex flex-col gap-4">
          <CollabEmployerCard name={collab.employerName} initial={collab.employerInitial} onChat={notifyLater} />
          {view.hideTerms ? null : (
            <CollabTermsCard collab={collab} action={view.termsAction} onAction={() => setOpenDialog("terms")} />
          )}
        </div>
      </div>

      <AddStageDialog key={`stage-${collab.id}`} isOpen={openDialog === "stage"} collabId={collab.id} onClose={closeDialog} />
      <DeliveryDialog
        key={`delivery-${collab.id}`}
        isOpen={openDialog === "delivery"}
        collabId={collab.id}
        onClose={closeDialog}
      />
      <ChangeTermsDialog key={`terms-${collab.id}`} isOpen={openDialog === "terms"} collab={collab} onClose={closeDialog} />
      <CancelCollabDialog isOpen={openDialog === "cancel"} onConfirm={confirmCancel} onClose={closeDialog} />
    </div>
  );
}
