import { apiClient } from "@/lib/apiClient";
import type { LoginFormValues, AuthResponse } from "@/types/Auth/authTypes";
import type { User } from "@/types/User/user";

export async function login(values: LoginFormValues): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/job-seekers/login", {
    mobile: values.mobile,
    password: values.password,
  });
  
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }
  
  return data;
}

export async function getCurrentUser() {
  const { data } = await apiClient.get<User>("/job-seekers/me");
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/job-seekers/logout");
  localStorage.removeItem("accessToken");
}