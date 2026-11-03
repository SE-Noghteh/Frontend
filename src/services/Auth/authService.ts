import type { LoginFormValues, AuthResponse } from "@/types/Auth/authTypes";

export async function login(values: LoginFormValues): Promise<AuthResponse> {
  console.log("Login attempt with:", values);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  if (values.password === "wrong") {
    throw new Error("رمز عبور یا نام کاربری اشتباه است.");
  }

  return {
    user: { id: "1", fullName: "کارآموز", email: values.email || "user@example.com" },
    accessToken: "mock-token-123",
  };
}

export function logout(): Promise<void> {
  return Promise.resolve();
}