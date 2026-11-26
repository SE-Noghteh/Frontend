export const registrationReviewKeys = {
    all: ["registrationReview"] as const,
    me: () => [...registrationReviewKeys.all, "me"] as const,
    parentApproval: () => [...registrationReviewKeys.all, "parentApproval"] as const,
  };