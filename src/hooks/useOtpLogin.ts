import { useState } from "react";
import { isAxiosError } from "axios";
import { jobSeekerService } from "@/services/Auth/JobSeeker/jobSeekerService";
import { useAuthStore } from "@/store/auth/useAuthStore";

export function useOtpLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (phone: string, mode: "login" | "forgot" = "login"): Promise<boolean> => {
    setIsSending(true);
    setError(null);
    try {
      if (mode === "login") {
        await jobSeekerService.loginWithOtp(phone);
      } else {
        await jobSeekerService.forgotPassword(phone);
      }
      return true;
    } catch (err) {
      setError(resolveOtpErrorMessage(err));
      return false;
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = async (phone: string, code: string): Promise<boolean> => {
    setIsVerifying(true);
    setError(null);
    try {
      const response = await jobSeekerService.verifyLoginOtp(phone, code);
      setUser(response.user);
      return true;
    } catch (err) {
      setError(resolveOtpErrorMessage(err));
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  return { sendCode, verifyCode, isSending, isVerifying, error, setError };
}

function resolveOtpErrorMessage(error: unknown): string {
  if (!isAxiosError(error) || !error.response) {
    return "خطا در برقراری ارتباط با سرور. لطفا اتصال خود را بررسی کنید.";
  }

  const { status, data } = error.response;
  const serverMessage = typeof data === "object" && data !== null && "message" in data 
    ? String((data as { message?: unknown }).message ?? "") 
    : "";

  switch (status) {
    case 400:
    case 422:
      return serverMessage || "شماره موبایل یا کد وارد شده معتبر نیست.";
    case 401:
      return "کد وارد شده نادرست است یا منقضی شده است."; 
    case 429:
      return "تعداد تلاش‌ها بیش از حد مجاز است. لطفا بعدا تلاش کنید."; 
    default:
      return serverMessage || "خطایی رخ داده است، لطفا دوباره تلاش کنید.";
  }
}