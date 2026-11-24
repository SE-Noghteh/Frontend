/** Job-seeker dashboard: list of ads the seeker can apply to. */

import { useState } from "react";

import { AdListItem } from "@/components/features/SeekerAds/AdListItem";
import { AdsEmptyState } from "@/components/features/SeekerAds/AdsEmptyState";
import { AdsFilterDialog } from "@/components/features/SeekerAds/AdsFilterDialog";
import { AdsToolbar } from "@/components/features/SeekerAds/AdsToolbar";
import { RecommendedAds } from "@/components/features/SeekerAds/RecommendedAds";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { Button } from "@/components/ui/Button";
import { TabPills } from "@/components/ui/TabPills";
import { useSeekerAds } from "@/hooks/useSeekerAds";
import type { SeekerAdsTab } from "@/types/Seeker/seeker";

const TABS: { value: SeekerAdsTab; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "recommended", label: "مناسب تو" },
  { value: "work", label: "کاری" },
  { value: "internship", label: "کارآموزی" },
  { value: "saved", label: "ذخیره‌شده" },
];

const TAB_TRAIL: Record<SeekerAdsTab, string> = {
  all: "فهرست",
  recommended: "مناسب تو",
  work: "کاری",
  internship: "کارآموزی",
  saved: "ذخیره‌شده",
};

const TAB_SUBTITLE: Record<SeekerAdsTab, string> = {
  all: "۴۸ آگهی مناسب سن و مهارت‌های تو",
  recommended: "آگهی‌هایی که با سن و مهارت‌های تو می‌خوانند",
  work: "۴۸ آگهی مناسب سن و مهارت‌های تو",
  internship: "۴۸ آگهی مناسب سن و مهارت‌های تو",
  saved: "آگهی‌هایی که ذخیره کرده‌ای",
};

export default function SeekerAdsPage() {
  const {
    ads,
    recommendedAds,
    tab,
    setTab,
    query,
    setQuery,
    sort,
    setSort,
    filters,
    setFilters,
    hasActiveFilters,
    clearFilters,
    toggleSaved,
  } = useSeekerAds();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const showRecommendedBox = tab === "all" && !query && !hasActiveFilters;

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[{ label: "آگهی‌ها", to: "/seeker/ads" }, { label: TAB_TRAIL[tab] }]}
        title="آگهی‌ها"
        subtitle={TAB_SUBTITLE[tab]}
        action={
          <Button variant="secondary" size="sm" fullWidth className="md:w-auto" onClick={() => setIsFilterOpen(true)}>
            فیلترها
          </Button>
        }
      />

      <TabPills tabs={TABS} value={tab} onChange={setTab} ariaLabel="دسته‌بندی آگهی‌ها" />

      <AdsToolbar query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} />

      {showRecommendedBox ? <RecommendedAds ads={recommendedAds} onShowAll={() => setTab("recommended")} /> : null}

      {ads.length === 0 ? (
        <AdsEmptyState onClear={clearFilters} />
      ) : (
        <ul className="flex flex-col gap-3">
          {ads.map((ad) => (
            <li key={ad.id}>
              <AdListItem ad={ad} onToggleSave={toggleSaved} />
            </li>
          ))}
        </ul>
      )}

      <AdsFilterDialog
        isOpen={isFilterOpen}
        filters={filters}
        onApply={(next) => {
          setFilters(next);
          setIsFilterOpen(false);
        }}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
