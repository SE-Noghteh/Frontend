import { httpClient } from "@/services/api/httpClient";
import { mapApiOpportunity } from "@/services/Opportunity/opportunityService";
import type {
  BudgetBucket,
  SeekerAd,
  SeekerAdCategory,
  SeekerAdsSort,
  SeekerAdsTab,
} from "@/types/Seeker/seeker";
import { opportunityToSeekerAd } from "@/utils/opportunityToSeekerAd";

interface ApiOpportunityPage {
  data?: Parameters<typeof mapApiOpportunity>[0][];
  total?: number;
  limit?: number;
  offset?: number;
}

export interface SeekerOpportunityQuery {
  tab: SeekerAdsTab;
  query: string;
  sort: SeekerAdsSort;
  category: SeekerAdCategory | null;
  budget: BudgetBucket | null;
  limit?: number;
  offset?: number;
}

export interface SeekerOpportunityPage {
  data: SeekerAd[];
  total: number;
  limit: number;
  offset: number;
}

const TAB_MAP: Record<SeekerAdsTab, string> = {
  all: "all",
  recommended: "for_me",
  work: "work",
  internship: "internship",
  saved: "saved",
};

const SORT_MAP: Record<SeekerAdsSort, string> = {
  newest: "newest",
  deadline: "closest_deadline",
  match: "best_match",
};

const CATEGORY_MAP: Record<SeekerAdCategory, string[]> = {
  design: ["graphic", "craft"],
  video: ["video", "audio"],
  programming: ["code", "data"],
  other: [],
};

function appendBudget(params: URLSearchParams, budget: BudgetBucket | null) {
  if (budget === "under1") {
    params.set("max_amount_toman", "999999");
  } else if (budget === "from1to3") {
    params.set("min_amount_toman", "1000000");
    params.set("max_amount_toman", "3000000");
  } else if (budget === "over3") {
    params.set("min_amount_toman", "3000001");
  }
}

export async function getSeekerOpportunityPage(
  query: SeekerOpportunityQuery,
): Promise<SeekerOpportunityPage> {
  const params = new URLSearchParams();

  params.set("tab", TAB_MAP[query.tab]);

  if (query.query.trim()) params.set("q", query.query.trim());

  const effectiveSort =
    query.tab === "recommended" && query.sort === "newest"
      ? "best_match"
      : SORT_MAP[query.sort];

  params.set("sort", effectiveSort);

  if (query.category) {
    CATEGORY_MAP[query.category].forEach((category) =>
      params.append("category", category),
    );
  }

  appendBudget(params, query.budget);

  params.set("limit", String(query.limit ?? 100));
  params.set("offset", String(query.offset ?? 0));

  const response = await httpClient.get<ApiOpportunityPage>(
    "/job-seekers/opportunities",
    { params },
  );

  const data = (response.data.data ?? [])
    .map(mapApiOpportunity)
    .map(opportunityToSeekerAd);

  return {
    data,
    total: Number(response.data.total ?? data.length),
    limit: Number(response.data.limit ?? query.limit ?? 100),
    offset: Number(response.data.offset ?? query.offset ?? 0),
  };
}

export async function saveOpportunity(id: string): Promise<void> {
  await httpClient.put(
    `/job-seekers/opportunities/${encodeURIComponent(id)}/saved`,
  );
}

export async function unsaveOpportunity(id: string): Promise<void> {
  await httpClient.delete(
    `/job-seekers/opportunities/${encodeURIComponent(id)}/saved`,
  );
}
