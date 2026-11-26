import { apiClient } from "@/lib/apiClient";
import type { 
  ParentRegisteredPayload, 
  ParentInvitePayload,
  ParentRegisteredResponse,
  ParentInviteResponse
} from "@/types/Auth/jobSeekerRegister";

export const parentService = {
  connectRegisteredParent: async (payload: ParentRegisteredPayload): Promise<ParentRegisteredResponse> => {
    const response = await apiClient.post<ParentRegisteredResponse>(
      "/job-seekers/parent-approval/registered", 
      payload
    );
    return response.data;
  },

  inviteParent: async (payload: ParentInvitePayload): Promise<ParentInviteResponse> => {
    const response = await apiClient.post<ParentInviteResponse>(
      "/job-seekers/parent-approval/invite", 
      payload
    );
    return response.data;
  }
};