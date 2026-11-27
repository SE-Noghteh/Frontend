import axios from "axios";

import {
  MOCK_OPPORTUNITY_CATEGORIES,
  MOCK_TRENDING_SEARCHES,
} from "@/data/mockOpportunityCategories";
import { httpClient } from "@/services/api/httpClient";
import type {
  Opportunity,
  OpportunityAttachment,
  OpportunityCategory,
  OpportunityFilters,
  OpportunityPage,
  OpportunityType,
  WorkMode,
} from "@/types/Opportunity/opportunity";

interface ApiOpportunity {
  id: number;
  title: string;
  employer_name: string;
  category: string;
  opportunity_type: "work" | "internship";
  work_mode: "online" | "onsite" | "hybrid";
  skill_level: "beginner" | "intermediate" | "advanced";
  amount_toman: number;
  duration_days: number;
  apply_deadline: string;
  minimum_age: number;
  maximum_age?: number;
  city?: string;
  created_at?: string;
  match_percent?: number;
  requires_parent_approval?: boolean;
  saved?: boolean;
}

interface ApiOpportunityPage {
  data?: ApiOpportunity[];
  total?: number;
  limit?: number;
  offset?: number;
}

interface ApiAttachment {
  content_type?: string;
  name?: string;
  size?: number;
  url?: string;
}

interface ApiPostingDetails {
  accept_under_18?: boolean;
  apply_deadline?: string;
  budget_toman?: number;
  category?: string;
  deliverables?: string[];
  delivery_deadline?: string;
  delivery_formats?: string[];
  duration_days?: number;
  maximum_age?: number;
  minimum_age?: number;
  opportunity_type?: "work" | "internship";
  requires_parent_approval?: boolean;
  skill_level?: "beginner" | "intermediate" | "advanced";
  skills?: string[];
  work_mode?: "online" | "onsite" | "hybrid";
}

interface ApiOpportunityDetail extends ApiOpportunity {
  accepting_applications?: boolean;
  attachments?: ApiAttachment[];
  description?: string;
  details?: ApiPostingDetails;
  employer_verified?: boolean;
  published_at?: string;
}

interface PageOptions {
  limit?: number;
  offset?: number;
}

const PUBLIC_SORT: Record<OpportunityFilters["sort"], string> = {
  newest: "newest",
  deadline: "closest_deadline",
  budget: "highest_amount",
};

const DURATION_MAP: Record<string, string> = {
  short: "under_3_days",
  week: "up_to_week",
  month: "up_to_month",
  long: "over_month",
};

function toBackendType(type: OpportunityType): string {
  return type === "project" ? "work" : "internship";
}

function toBackendWorkMode(mode: WorkMode): string {
  return mode === "both" ? "hybrid" : mode;
}

function toUiWorkMode(mode: ApiOpportunity["work_mode"]): WorkMode {
  return mode === "hybrid" ? "both" : mode;
}

function toUiType(type: ApiOpportunity["opportunity_type"]): OpportunityType {
  return type === "work" ? "project" : "internship";
}

function safeDate(value?: string): Date | null {
  if (!value) return null;

  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value,
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

function differenceInDays(later: Date, earlier: Date): number {
  const millisecondsPerDay = 86_400_000;
  return Math.round((later.getTime() - earlier.getTime()) / millisecondsPerDay);
}

function daysUntil(value?: string): number {
  const target = safeDate(value);
  if (!target) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return differenceInDays(target, today);
}

function daysAgo(value?: string): number {
  const source = safeDate(value);
  if (!source) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  source.setHours(0, 0, 0, 0);

  return Math.max(0, differenceInDays(today, source));
}

function formatFileSize(size?: number): string {
  if (!size || size <= 0) return "فایل پیوست";

  if (size < 1024) return `${size} بایت`;

  const kb = size / 1024;
  if (kb < 1024) return `${Math.round(kb)} کیلوبایت`;

  const mb = kb / 1024;
  return `${mb.toFixed(mb >= 10 ? 0 : 1)} مگابایت`;
}

function mapAttachment(file: ApiAttachment): OpportunityAttachment {
  return {
    name: file.name || "فایل پیوست",
    meta: formatFileSize(file.size),
    url: file.url,
    contentType: file.content_type,
    size: file.size,
  };
}

export function mapApiOpportunity(api: ApiOpportunity): Opportunity {
  return {
    id: String(api.id),
    title: api.title,
    employerName: api.employer_name,
    categoryId: api.category,
    type: toUiType(api.opportunity_type),
    workMode: toUiWorkMode(api.work_mode),
    level: api.skill_level,
    city: api.city || undefined,
    budget: Number(api.amount_toman ?? 0) / 1000,
    hasStipend: api.opportunity_type === "internship",
    durationDays: Number(api.duration_days ?? 0),
    deadlineInDays: daysUntil(api.apply_deadline),
    applyDeadline: api.apply_deadline,
    minAge: Number(api.minimum_age ?? 0),
    maxAge: api.maximum_age,
    skills: [],
    postedDaysAgo: daysAgo(api.created_at),
    createdAt: api.created_at,
    requiresParentApproval: api.requires_parent_approval,
    saved: api.saved,
    matchPercent: api.match_percent,
  };
}

function mapApiOpportunityDetail(api: ApiOpportunityDetail): Opportunity {
  const summary = mapApiOpportunity(api);
  const details = api.details;

  return {
    ...summary,
    categoryId: details?.category ?? summary.categoryId,
    type: details?.opportunity_type
      ? toUiType(details.opportunity_type)
      : summary.type,
    workMode: details?.work_mode
      ? toUiWorkMode(details.work_mode)
      : summary.workMode,
    level: details?.skill_level ?? summary.level,
    budget:
      Number(details?.budget_toman ?? api.amount_toman ?? 0) / 1000,
    durationDays: Number(details?.duration_days ?? api.duration_days ?? 0),
    applyDeadline: details?.apply_deadline ?? api.apply_deadline,
    deadlineInDays: daysUntil(details?.apply_deadline ?? api.apply_deadline),
    minAge: Number(details?.minimum_age ?? api.minimum_age ?? 0),
    maxAge: details?.maximum_age ?? api.maximum_age,
    skills: details?.skills ?? [],
    publishedAt: api.published_at,
    postedDaysAgo: daysAgo(api.published_at ?? api.created_at),
    requiresParentApproval:
      details?.requires_parent_approval ?? api.requires_parent_approval,
    acceptingApplications: api.accepting_applications,
    employerVerified: api.employer_verified,
    description: api.description || undefined,
    deliverables: details?.deliverables?.join(" · "),
    deliveryFormat: details?.delivery_formats?.join("، "),
    files: api.attachments?.map(mapAttachment) ?? [],
  };
}

function appendMany(params: URLSearchParams, key: string, values: string[]) {
  values.forEach((value) => params.append(key, value));
}

function buildPublicParams(
  filters: OpportunityFilters,
  options: PageOptions,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query.trim()) params.set("q", filters.query.trim());
  params.set("sort", PUBLIC_SORT[filters.sort]);

  appendMany(params, "category", filters.categoryIds);
  appendMany(
    params,
    "work_mode",
    filters.workModes.map(toBackendWorkMode),
  );
  appendMany(
    params,
    "opportunity_type",
    filters.types.map(toBackendType),
  );
  appendMany(params, "skill_level", filters.levels);
  appendMany(
    params,
    "duration",
    filters.durations.map((item) => DURATION_MAP[item] ?? item),
  );

  if (filters.ageGroup) {
    params.append(
      "age_group",
      filters.ageGroup === "under18" ? "under_18" : "18_to_23",
    );
  }

  if (filters.city) params.append("city", filters.city);

  if (filters.budgetMin > 0) {
    params.set("min_amount_toman", String(filters.budgetMin * 1000));
  }

  // The existing slider uses 5000 (= 5,000,000 toman) as "no ceiling".
  if (filters.budgetMax < 5000) {
    params.set("max_amount_toman", String(filters.budgetMax * 1000));
  }

  params.set("limit", String(options.limit ?? 20));
  params.set("offset", String(options.offset ?? 0));

  return params;
}

export async function getOpportunityPage(
  filters: OpportunityFilters,
  options: PageOptions = {},
): Promise<OpportunityPage> {
  const response = await httpClient.get<ApiOpportunityPage>("/opportunities", {
    params: buildPublicParams(filters, options),
  });

  const limit = Number(response.data.limit ?? options.limit ?? 20);
  const offset = Number(response.data.offset ?? options.offset ?? 0);
  const data = (response.data.data ?? []).map(mapApiOpportunity);

  return {
    data,
    total: Number(response.data.total ?? data.length),
    limit,
    offset,
  };
}

/**
 * Backward-compatible list helper used by landing/live-search components.
 * The main search page uses getOpportunityPage directly so it can show `total`.
 */
export async function getOpportunities(
  filters: OpportunityFilters,
): Promise<Opportunity[]> {
  const effectiveFilters =
    filters.isUrgent && filters.sort === "newest"
      ? { ...filters, sort: "deadline" as const }
      : filters;

  const page = await getOpportunityPage(effectiveFilters, {
    limit: 20,
    offset: 0,
  });

  if (filters.isUrgent) {
    return page.data.filter(
      (opportunity) =>
        opportunity.deadlineInDays >= 0 &&
        opportunity.deadlineInDays <= 3,
    );
  }

  return page.data;
}

export async function getOpportunityById(
  id: string,
): Promise<Opportunity | null> {
  try {
    const response = await httpClient.get<ApiOpportunityDetail>(
      `/opportunities/${encodeURIComponent(id)}`,
    );

    return mapApiOpportunityDetail(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

/**
 * Swagger does not currently expose a category-list endpoint, so these labels
 * remain the existing frontend taxonomy.
 */
export function getOpportunityCategories(): Promise<OpportunityCategory[]> {
  return Promise.resolve(MOCK_OPPORTUNITY_CATEGORIES);
}

/**
 * Swagger does not currently expose trending searches.
 */
export function getTrendingSearches(): Promise<string[]> {
  return Promise.resolve(MOCK_TRENDING_SEARCHES);
}
