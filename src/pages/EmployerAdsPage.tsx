
import { Plus } from "lucide-react";

import { EmployerAdCard } from "@/components/features/EmployerAds/EmployerAdCard";
import { EmployerAdsToolbar } from "@/components/features/EmployerAds/EmployerAdsToolbar";
import { EmployerAdsEmptyState } from "@/components/features/EmployerAds/EmployerAdsEmptyState";

import { PageHeader } from "@/components/shared/PageHeader/PageHeader";

import { ButtonLink } from "@/components/ui/Button";
import { TabPills } from "@/components/ui/TabPills";

import { useEmployerAds } from "@/hooks/useEmployerAds";

import type { EmployerAdsTab } from "@/types/Employer/employer";

const TABS: {
  value: EmployerAdsTab;
  label: string;
}[] = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "published",
    label: "منتشرشده",
  },
  {
    value: "collaboration",
    label: "در همکاری",
  },
  {
    value: "inactive",
    label: "بسته یا منقضی",
  },
];

export default function EmployerAdsPage() {

  const {
    ads,
    allAds,
    tab,
    setTab,
    query,
    setQuery,
    sort,
    setSort,
    clearFilters,
  } = useEmployerAds();

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:gap-5">

      <PageHeader
        breadcrumb={[
          {
            label: "آگهی‌ها",
            to: "/employer/ads",
          },
          {
            label: "فهرست",
          },
        ]}
        title="آگهی‌ها"
        subtitle={`${allAds.length.toLocaleString("fa-IR")} آگهی ثبت‌شده`}
        action={
          <ButtonLink
            to="/employer/ads/create"
            startIcon={<Plus size={18} />}
            fullWidth
            className="md:w-auto"
          >
            آگهی جدید
          </ButtonLink>
        }
      />

      <div className="min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        <TabPills
          tabs={TABS}
          value={tab}
          onChange={setTab}
          ariaLabel="وضعیت آگهی‌ها"
        />

      </div>

      <EmployerAdsToolbar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
      />

      {ads.length === 0 ? (

        <EmployerAdsEmptyState
          hasAds={allAds.length > 0}
          onClear={clearFilters}
        />

      ) : (

        <ul className="flex flex-col gap-3 lg:gap-4">

          {ads.map((ad) => (
            <li key={ad.id}>

              <EmployerAdCard ad={ad} />

            </li>
          ))}

        </ul>

      )}

    </div>
  );
}
