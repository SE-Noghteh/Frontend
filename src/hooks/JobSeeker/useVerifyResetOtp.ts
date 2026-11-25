import { useMutation } from "@tanstack/react-query";
import { jobSeekerService } from "@/services/Auth/JobSeeker/jobSeekerService";
import type { VerifyResetOtpRequest } from "@/types/Auth/authTypes";

export const useVerifyResetOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyResetOtpRequest) =>
      jobSeekerService.verifyResetOtp(data),
  });
};