/** Job-seeker dashboard: every request the seeker sent, filtered by its stage. */

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { RequestListItem } from "@/components/features/SeekerRequests/RequestListItem";
import { RequestsEmptyState } from "@/components/features/SeekerRequests/RequestsEmptyState";
import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { TabPills } from "@/components/ui/TabPills";
import { useSeekerStore } from "@/store/seeker/useSeekerStore";
import type { RequestTab, SeekerRequest } from "@/types/Seeker/seeker";
import { toPersianDigits } from "@/utils/toPersianDigits";

const TABS: { value: RequestTab; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "reviewing", label: "بررسی کارفرما" },
  { value: "accepted", label: "پذیرفته" },
  { value: "rejected", label: "ردشده" },
];

const TAB_SUFFIX: Record<RequestTab, string> = {
  all: "",
  reviewing: " در بررسی کارفرما",
  accepted: " پذیرفته‌شده",
  rejected: " ردشده",
};

function matchesTab(request: SeekerRequest, tab: RequestTab): boolean {
  switch (tab) {
    case "all":
      return true;
    case "reviewing":
      return request.employerStatus === "reviewing";
    case "accepted":
      return request.employerStatus === "accepted";
    case "rejected":
      return request.employerStatus === "rejectedByEmployer";
  }
}

export default function SeekerRequestsPage() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<RequestTab>("all");
  const allRequests = useSeekerStore((state) => state.requests);

  const isEmptyPreview = searchParams.get("state") === "empty";
  const requests = isEmptyPreview ? [] : allRequests.filter((request) => !request.demoOnly);
  const visible = requests.filter((request) => matchesTab(request, tab));
  const isFirstTime = requests.length === 0;

  const subtitle = isFirstTime
    ? "هنوز درخواستی نفرستاده‌ای"
    : `${toPersianDigits(visible.length)} درخواست${TAB_SUFFIX[tab]}`;
  const trailLabel = tab === "all" ? "فهرست" : (TABS.find((item) => item.value === tab)?.label ?? "فهرست");

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PageHeader
        breadcrumb={[{ label: "درخواست‌های من", to: "/seeker/requests" }, { label: trailLabel }]}
        title="درخواست‌های من"
        subtitle={subtitle}
        action={
          <ButtonLink to="/seeker/ads" size="sm" className="w-full md:w-auto">
            جست‌وجوی آگهی
          </ButtonLink>
        }
      />

      <TabPills tabs={TABS} value={tab} onChange={setTab} ariaLabel="وضعیت درخواست‌ها" />

      {visible.length === 0 ? (
        <RequestsEmptyState isFirstTime={isFirstTime} />
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((request) => (
            <li key={request.id}>
              <RequestListItem request={request} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
