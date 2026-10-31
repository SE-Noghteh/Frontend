import type { LoginFormValues, AuthResponse } from "@/types/Auth/authTypes";

export async function login(values: LoginFormValues): Promise<AuthResponse> {
  console.log("Login attempt with:", values);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const registeredMobile = "09123456789";
  const correctPassword = "password123";

  if (values.mobile !== registeredMobile) {
    const error = new Error("حساب کاربری با این مشخصات پیدا نشد");
    (error as any).status = 404;
    throw error;
  }

  if (values.password !== correctPassword) {
    const error = new Error("رمز عبور یا نام کاربری اشتباه است.");
    (error as any).status = 401;
    throw error;
  }

  return {
    user: { id: "1", fullName: "کارفرمای تست", email: "test@example.com" },
    accessToken: "mock-token-123",
  };
}

export function logout(): Promise<void> {
  return Promise.resolve();
}