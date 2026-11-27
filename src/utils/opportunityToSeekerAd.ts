import type { Opportunity } from "@/types/Opportunity/opportunity";
import type {
  SeekerAd,
  SeekerAdCategory,
} from "@/types/Seeker/seeker";

function mapCategory(categoryId: string): SeekerAdCategory {
  if (["graphic", "craft"].includes(categoryId)) return "design";
  if (["video", "audio"].includes(categoryId)) return "video";
  if (["code", "data"].includes(categoryId)) return "programming";
  return "other";
}

export function opportunityToSeekerAd(
  opportunity: Opportunity,
  options?: { forRequestStore?: boolean },
): SeekerAd {
  const kind =
    opportunity.type === "internship" ? "internship" : "work";

  const amountToman = Math.round(opportunity.budget * 1000);
  const storedId = options?.forRequestStore
    ? `backend:${opportunity.id}`
    : opportunity.id;

  return {
    id: storedId,
    sourceOpportunityId: opportunity.id,
    detailPath: `/seeker/ads/${opportunity.id}`,
    title: opportunity.title,
    kind,
    category: mapCategory(opportunity.categoryId),
    employerName: opportunity.employerName,
    employerInitial:
      opportunity.employerInitial ??
      opportunity.employerName.trim().charAt(0) ??
      "؟",
    employerCollabsCount: opportunity.employerCollabsCount,
    budget: kind === "work" ? amountToman : undefined,
    stipend: kind === "internship" ? amountToman : undefined,
    matchPercent: opportunity.matchPercent,
    deadline: opportunity.applyDeadline ?? "",
    publishedAt:
      opportunity.publishedAt ??
      opportunity.createdAt ??
      "",
    saved: Boolean(opportunity.saved),
    description: opportunity.description,
    skills: opportunity.skills,
    deliverables: opportunity.deliverables,
    deliveryFormat: opportunity.deliveryFormat,
    files: opportunity.files?.map((file) => ({
      name: file.name,
      meta: file.meta,
      url: file.url,
    })),
    collabDuration: `${opportunity.durationDays} روز`,
    applicantsCount: opportunity.applicantsCount,
    application:
      opportunity.acceptingApplications === false ||
      opportunity.deadlineInDays < 0
        ? "expired"
        : "open",
  };
}
