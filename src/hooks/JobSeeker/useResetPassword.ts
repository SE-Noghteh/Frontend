import { useMutation } from "@tanstack/react-query";
import { jobSeekerService } from "@/services/Auth/JobSeeker/jobSeekerService";
import type { ResetPasswordRequest } from "@/types/Auth/authTypes";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      jobSeekerService.resetPassword(data),
  });
};