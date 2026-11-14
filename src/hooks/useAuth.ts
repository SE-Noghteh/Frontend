import { useState } from "react";
import { isAxiosError } from "axios";
import { login as loginService } from "@/services/Auth/authService";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { LoginFormValues } from "@/types/Auth/authTypes";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);

  const [globalError, setGlobalError] = useState<string | null>(null);

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setGlobalError(null);

    try {
      const response = await loginService(values);
      setUser(response.user);
    } catch (error) {
      setGlobalError(resolveLoginErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { user, isAuthenticated, login, isLoading, globalError };
}

function resolveLoginErrorMessage(error: unknown): string {
  if (!isAxiosError(error) || !error.response) {
    return "خطا در برقراری ارتباط با سرور. لطفا اتصال اینترنت خود را بررسی کنید.";
  }

  const { status, data } = error.response;
  const serverMessage =
    typeof data === "object" && data !== null && "message" in data
      ? String((data as { message?: unknown }).message ?? "")
      : "";

  switch (status) {
    case 400:
    case 422:
      return serverMessage || "اطلاعات وارد شده معتبر نیست.";
    case 401:
      return "اطلاعات ورود نادرست است، شماره موبایل یا رمز عبور را دوباره بررسی کن.";
    case 404:
      return "حساب کاربری با این مشخصات پیدا نشد.";
    default:
      return serverMessage || "خطایی رخ داده است، لطفا دوباره تلاش کنید.";
  }
}