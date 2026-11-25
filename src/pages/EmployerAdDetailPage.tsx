
import { useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { FileSearch } from "lucide-react";

import { Button } from "@/components/ui/Button";

import {
  AdDetailHeader,
  type AdDetailTab,
} from "@/components/features/EmployerAdDetail/AdDetailHeader";

import {
  AdOverview,
} from "@/components/features/EmployerAdDetail/AdOverview";

import {
  AdApplicants,
  type AdApplicant,
} from "@/components/features/EmployerAdDetail/AdApplicants";

import {
  AdVersions,
  type AdVersion,
} from "@/components/features/EmployerAdDetail/AdVersions";

import {
  CloseAdModal,
} from "@/components/features/EmployerAdDetail/CloseAdModal";

import {
  useEmployerStore,
} from "@/store/employer/useEmployerStore";

import {
  useToastStore,
} from "@/store/ui/useToastStore";

const STATUS_LABELS: Record<string, string> = {
  published: "منتشرشده",
  active: "فعال",
  collaboration: "در حال همکاری",
  in_progress: "در حال همکاری",
  expired: "منقضی‌شده",
  closed: "بسته‌شده",
  draft: "پیش‌نویس",
  pending: "در انتظار بررسی",
  rejected: "ردشده",
  completed: "تکمیل‌شده",
};

export default function EmployerAdDetailPage() {
  const { adId } = useParams<{
    adId: string;
  }>();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<AdDetailTab>("overview");

  const [closeModalOpen, setCloseModalOpen] =
    useState(false);

  const ads = useEmployerStore(
    (state) => state.ads,
  );

  const setAdStatus = useEmployerStore(
    (state) => state.setAdStatus,
  );

  const showToast = useToastStore(
    (state) => state.showToast,
  );

  const ad = ads.find(
    (item) => String(item.id) === adId,
  );

  // Applicant details will be connected
  // after checking the existing applicant type.
  const applicants: AdApplicant[] = [];

  // Version history will be connected later.
  const versions: AdVersion[] = [];

  if (!ad) {
    return (
      <div
        dir="rtl"
        className="flex min-h-96 flex-col items-center justify-center gap-4 rounded-xl border border-border-soft bg-white p-6 text-center"
      >

        <div className="flex size-20 items-center justify-center rounded-full bg-green-7">

          <FileSearch
            size={36}
            className="text-blue"
          />

        </div>

        <h1 className="text-card-title font-bold">
          آگهی پیدا نشد
        </h1>

        <p className="text-label text-text-secondary">
          آگهی موردنظر وجود ندارد یا حذف شده است.
        </p>

        <Button
          onClick={() =>
            navigate("/employer/ads")
          }
        >
          بازگشت به آگهی‌ها
        </Button>

      </div>
    );
  }

  const applicantsCount =
    ad.applicantsCount ?? 0;

  const newApplicantsCount =
    ad.newApplicantsCount ?? 0;

  const statusLabel =
    STATUS_LABELS[ad.status] ?? ad.status;

  function handleCloseAd() {
    if (!ad || ad.status === "closed") {
      setCloseModalOpen(false);
      return;
    }

    setAdStatus(ad.id, "closed");

    setCloseModalOpen(false);

    showToast({
      tone: "success",
      title: "آگهی بسته شد",
      description:
        "وضعیت آگهی با موفقیت تغییر کرد.",
    });
  }

  function handleOpenCloseModal() {
    if (!ad || ad.status === "closed") {
      return;
    }

    setCloseModalOpen(true);
  }

  return (
    <main
      dir="rtl"
      className="flex min-w-0 flex-col gap-5 pb-6 lg:gap-6"
    >

      <AdDetailHeader
        title={ad.title}
        kind={
          ad.kind === "internship"
            ? "internship"
            : "work"
        }
        statusLabel={statusLabel}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() =>
          navigate("/employer/ads")
        }
        onEdit={() =>
          navigate(
            `/employer/ads/${ad.id}/edit`,
          )
        }
        onClose={handleOpenCloseModal}
      />

      {/* Overview tab */}

      {activeTab === "overview" && (

        <AdOverview
          ad={ad}
          applicantsCount={applicantsCount}
          newApplicantsCount={newApplicantsCount}
          onViewApplicants={() =>
            setActiveTab("applicants")
          }
        />

      )}

      {/* Applicants tab */}

      {activeTab === "applicants" && (

        <>

          {applicantsCount > 0 &&
            applicants.length === 0 ? (

            <div className="rounded-xl border border-border-soft bg-white p-6 text-center">

              <p className="text-label font-medium">
                {applicantsCount.toLocaleString("fa-IR")}
                {" درخواست برای این آگهی ثبت شده است."}
              </p>

              <p className="mt-2 text-caption text-text-secondary">
                اطلاعات جزئی متقاضیان هنوز متصل نشده است.
              </p>

            </div>

          ) : (

            <AdApplicants
              applicants={applicants}
              onViewApplicant={(applicantId) =>
                navigate(
                  `/employer/ads/${ad.id}/applicants/${applicantId}`,
                )
              }
            />

          )}

        </>

      )}

      {/* Versions tab */}

      {activeTab === "versions" && (

        <AdVersions
          versions={versions}
          onViewVersion={(versionId) =>
            navigate(
              `/employer/ads/${ad.id}/versions/${versionId}`,
            )
          }
        />

      )}

      {/* Close ad confirmation */}

      <CloseAdModal
        open={closeModalOpen}
        title={ad.title}
        onCancel={() =>
          setCloseModalOpen(false)
        }
        onConfirm={handleCloseAd}
      />

    </main>
  );
}
