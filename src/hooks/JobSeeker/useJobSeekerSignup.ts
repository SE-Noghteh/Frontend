import { useMutation, useQuery } from "@tanstack/react-query";
import { jobSeekerService } from "@/services/Auth/JobSeeker/jobSeekerService";
import type { RegisterBasicInfo } from "@/types/Auth/register";
import type { RegisterAccountFormValues } from "@/schemas/registerJobSeekerSchema";

interface SignupPayload {
  basicData: RegisterBasicInfo;
  accountData: RegisterAccountFormValues;
}

export function useJobSeekerSignup() {
  return useMutation({
    mutationFn: ({ basicData, accountData }: SignupPayload) => 
      jobSeekerService.signup(basicData, accountData),
  });
}

export function useJobSeekerVerifyOtp() {
    return useMutation({
      mutationFn: ({ phone, code }: { phone: string; code: string }) => 
        jobSeekerService.verifyOtp(phone, code),
    });
}

export function useJobSeekerResendOtp() {
    return useMutation({
      mutationFn: (phone: string) => jobSeekerService.resendOtp(phone),
    });
}

export function useSignupOptions() {
  return useQuery({
    queryKey: ["signup-options"],
    queryFn: () => jobSeekerService.getSignupOptions(),
    staleTime: 1000 * 60 * 60, 
  });
}