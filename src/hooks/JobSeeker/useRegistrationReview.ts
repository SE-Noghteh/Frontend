import { useQuery } from "@tanstack/react-query";
import { registrationReviewService } from "@/services/Auth/JobSeeker/registrationReviewService";
import { registrationReviewKeys } from "@/queryKeys/jobSeeker_registrationReviewKeys";

export function useJobSeekerMe() {
  return useQuery({
    queryKey: registrationReviewKeys.me(),
    queryFn: registrationReviewService.getJobSeekerMe,
  });
}

export function useParentApprovalRequest(enabled: boolean = false) {
  return useQuery({
    queryKey: registrationReviewKeys.parentApproval(),
    queryFn: registrationReviewService.getParentApprovalRequest,
    enabled,
  });
}

export function useVideoLink() {
  return useQuery({
    queryKey: ["jobSeeker", "video"],
    queryFn: registrationReviewService.getVideoLink,
  });
}

export function useJobSeekerSkills() {
  return useQuery({
    queryKey: ["jobSeeker", "skills"],
    queryFn: registrationReviewService.getSkills,
  });
}