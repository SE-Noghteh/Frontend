
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

import { CreateAdStepper } from "@/components/features/EmployerCreateAd/CreateAdStepper";
import { AdKindStep } from "@/components/features/EmployerCreateAd/AdKindStep";
import { AdDetailsStep } from "@/components/features/EmployerCreateAd/AdDetailsStep";
import { AdConditionsStep } from "@/components/features/EmployerCreateAd/AdConditionsStep";
import { AdReviewStep } from "@/components/features/EmployerCreateAd/AdReviewStep";
import { AdPublishStep } from "@/components/features/EmployerCreateAd/AdPublishStep";

import { useCreateEmployerAd } from "@/hooks/useCreateEmployerAd";
import { useEmployerStore } from "@/store/employer/useEmployerStore";
import { useToastStore } from "@/store/ui/useToastStore";

const PUBLISH_FEE = 50000;

export default function EmployerCreateAdPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const addAd = useEmployerStore(
    (state) => state.addAd,
  );

  const showToast = useToastStore(
    (state) => state.showToast,
  );

  const {
    step,
    form,
    errors,
    updateField,
    nextStep,
    previousStep,
    goToStep,
  } = useCreateEmployerAd();

  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [cancelOpen, setCancelOpen] = useState(false);

  const [balance, setBalance] = useState(
    searchParams.get("state") === "insufficient"
      ? 10000
      : 250000,
  );

  const [simulateError, setSimulateError] = useState(
    searchParams.get("state") === "network-error",
  );

  async function publishAd() {
    if (loading || !form.kind || !form.acceptedTerms) return;

    if (balance < PUBLISH_FEE) {
      setPublishError("موجودی کیف پول کافی نیست.");
      return;
    }

    setLoading(true);
    setPublishError("");

    try {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1000),
      );

      if (simulateError) {
        setSimulateError(false);
        throw new Error("network");
      }

      const id = crypto.randomUUID();

      const formattedDeadline =
        new Intl.DateTimeFormat(
          "fa-IR-u-ca-persian",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "UTC",
          },
        ).format(new Date(form.deadline));

      addAd({
        id,
        title: form.title.trim(),
        kind: form.kind,
        status: "published",

        createdAt: new Date().toISOString(),
        deadline: formattedDeadline,

        applicantsCount: 0,
        newApplicantsCount: 0,
        applicants: [],

        description: form.description,
        category: form.category,
        skills: form.skills,
        deliverables: form.deliverables,
        deliveryFormat: form.deliveryFormat,

        deliveryDate: form.deliveryDate,

        budget:
          form.kind === "internship" && !form.hasAllowance
            ? 0
            : Number(form.budget),

        collaborationMode: form.collaborationMode,
        ageRange: form.ageRange,

        internshipDuration: form.internshipDuration,
        weeklyHours: form.weeklyHours,
        hasAllowance: form.hasAllowance,
      });

      setBalance((previous) =>
        previous - PUBLISH_FEE,
      );

      showToast({
        tone: "success",
        title: "آگهی منتشر شد",
        description: "آگهی شما با موفقیت ثبت شد.",
      });

      navigate(`/employer/ads/${id}/published`, {
        replace: true,
      });

    } catch {
      setPublishError(
        "خطایی در انتشار آگهی رخ داد. دوباره تلاش کنید.",
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:gap-5">

      <PageHeader
        breadcrumb={[
          {
            label: "آگهی‌ها",
            to: "/employer/ads",
          },
          {
            label: "آگهی جدید",
          },
        ]}
        title="آگهی جدید"
        subtitle={`مرحله ${step.toLocaleString("fa-IR")} از ۵`}
      />

      <CreateAdStepper
        step={step}
        onSelect={goToStep}
      />

      <section className="rounded-2xl border border-border-soft bg-white p-4 lg:p-6">

        {step === 1 && (
          <AdKindStep
            value={form.kind}
            onChange={(value) =>
              updateField("kind", value)
            }
          />
        )}

        {step === 2 && (
          <AdDetailsStep
            form={form}
            errors={errors}
            updateField={updateField}
          />
        )}

        {step === 3 && (
          <AdConditionsStep
            form={form}
            errors={errors}
            updateField={updateField}
          />
        )}

        {step === 4 && (
          <AdReviewStep
            form={form}
            error={errors.acceptedTerms}
            onAccept={(value) =>
              updateField("acceptedTerms", value)
            }
            onEdit={goToStep}
          />
        )}

        {step === 5 && (
          <AdPublishStep
            fee={PUBLISH_FEE}
            balance={balance}
            error={publishError}
          />
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">

          {step > 1 ? (

            <Button
              variant="secondary"
              onClick={previousStep}
              disabled={loading}
              className="sm:min-w-24"
            >
              قبل
            </Button>

          ) : (

            <Button
              variant="secondary"
              onClick={() => setCancelOpen(true)}
            >
              انصراف
            </Button>

          )}

          <Button
            className="flex-1"
            fullWidth
            loading={loading}
            disabled={
              loading ||
              (step === 1 && !form.kind) ||
              (step === 5 && balance < PUBLISH_FEE)
            }
            onClick={
              step === 5 ? publishAd : nextStep
            }
          >
            {step === 5
              ? "پرداخت و انتشار آگهی"
              : step === 4
                ? "ادامه به پرداخت"
                : "ادامه"}
          </Button>

        </div>

      </section>

      <Dialog
        isOpen={cancelOpen}
        title="انصراف از ساخت آگهی"
        onClose={() => setCancelOpen(false)}
      >

        <p className="text-label text-text-secondary">
          با خروج از این صفحه اطلاعات واردشده از بین می‌روند.
          آیا مطمئن هستید؟
        </p>

        <div className="mt-5 flex gap-3">

          <Button
            variant="secondary"
            fullWidth
            onClick={() => setCancelOpen(false)}
          >
            ادامه ساخت آگهی
          </Button>

          <Button
            color="error"
            fullWidth
            onClick={() =>
              navigate("/employer/ads")
            }
          >
            انصراف
          </Button>

        </div>

      </Dialog>

    </div>
  );
}
