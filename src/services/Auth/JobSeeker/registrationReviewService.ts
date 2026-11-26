import { apiClient } from "@/lib/apiClient"; 
import type { JobSeekerMeResponse, ParentApprovalRequestResponse } from "@/types/Auth/jobSeeker_registrationReview";

export const registrationReviewService = {
  getJobSeekerMe: async (): Promise<JobSeekerMeResponse> => {
    const response = await apiClient.get("/job-seekers/me");
    return response.data;
  },

  getParentApprovalRequest: async (): Promise<ParentApprovalRequestResponse> => {
    const response = await apiClient.get("/job-seekers/parent-approval/request");
    return response.data;
  },
};