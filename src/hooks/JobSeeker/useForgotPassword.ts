import { useMutation } from "@tanstack/react-query";
import { jobSeekerService } from "@/services/Auth/JobSeeker/jobSeekerService";
import type { ForgotPasswordRequest } from "@/types/Auth/authTypes";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      jobSeekerService.forgotPassword(data),
  });
};