
import { FileText, Plus } from "lucide-react";

import { AdsEmptyState } from "@/components/features/SeekerAds/AdsEmptyState";
import { ButtonLink } from "@/components/ui/Button";

interface EmployerAdsEmptyStateProps {
  hasAds: boolean;
  onClear: () => void;
}

export function EmployerAdsEmptyState({
  hasAds,
  onClear,
}: EmployerAdsEmptyStateProps) {

  if (hasAds) {
    return <AdsEmptyState onClear={onClear} />;
  }

  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-soft bg-white px-6 py-12 text-center">

      <span className="grid size-16 place-items-center rounded-2xl bg-ocean-8 text-blue">

        <FileText size={30} aria-hidden="true" />

      </span>

      <h2 className="mt-5 text-card-title font-bold text-text-primary">
        هنوز آگهی‌ای ثبت نکرده‌اید
      </h2>

      <p className="mt-2 max-w-sm text-label text-text-secondary">
        اولین آگهی خود را ثبت کنید و همکاری با
        کارجویان را آغاز کنید.
      </p>

      <ButtonLink
        to="/employer/ads/create"
        startIcon={<Plus size={16} />}
        className="mt-5"
      >
        ساخت آگهی جدید
      </ButtonLink>

    </div>
  );
}
