import type { User } from "@/types/User/user";

export interface LoginFormValues {
  mobile: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  access_token?: string;
}

export interface OtpLoginFormValues {
  phone: string;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface ForgotPasswordResponse {
  expires_in: number;
  message: string;
  resend_after: number;
}

export interface VerifyResetOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyResetOtpResponse {
  expires_in: number;
  reset_token: string;
}

export interface ResetPasswordRequest {
  new_password: string;
  reset_token: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ApiErrorResponse {
  message: string;
}