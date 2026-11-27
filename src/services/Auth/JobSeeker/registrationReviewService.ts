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

  getVideoLink: async (): Promise<{ expires_in: number; url: string }> => {
    const response = await apiClient.get("/job-seekers/documents/video");
    return response.data;
  },

  getSkills: async (): Promise<{ skills: string[] }> => {
    const response = await apiClient.get("/job-seekers/me/skills");
    return response.data;
  }
};