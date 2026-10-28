import type { User } from "@/types/User/user";

export type AuthMethod = "mobile" | "email";
export type LoginMethod = "password" | "otp";

export interface LoginFormValues {
  authMethod: AuthMethod;
  loginMethod: LoginMethod;
  
  mobile: string;
  email: string;
  
  password?: string;
  otpCode?: string;
  rememberMe: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}