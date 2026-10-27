// src/hooks/useAuth.ts
import { useState } from "react";
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
    
      if (!values.authMethod || !values.loginMethod) {
        throw new Error("لطفا روش شناسایی و روش ورود را انتخاب کنید.");
      }

     
      const isMobile = values.authMethod === "mobile";
      const primaryValue = isMobile ? values.mobile.trim() : values.email.trim();

      if (!primaryValue) {
        if (isMobile) throw new Error("شماره موبایل را وارد کن");
        else throw new Error("ایمیل را وارد کن");
      }

    
      if (isMobile) {
        const mobileRegex = /^09\d{9}$/;
        if (!mobileRegex.test(primaryValue)) {
          throw new Error("شماره موبایل معتبر نیست.شماره باید با 09 شروع شود و 11 رقم داشته باشد");
        }
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(primaryValue)) {
          throw new Error("نشانی ایمیل معتبر نیست. نمونه: name@example.com");
        }
      }

    
      const isPassword = values.loginMethod === "password";
      
      const secondaryValue = isPassword 
        ? (values.password ?? "").trim() 
        : (values.otpCode ?? "").trim();

      if (!secondaryValue) {
        if (isPassword) throw new Error("رمز عبور را وارد کن");
        else throw new Error("رمز یکبارمصرف را وارد کن");
      }

      const response = await loginService(values);
      setUser(response.user);
      
    } catch (error: any) {
      let errorMessage = "خطایی رخ داده است، لطفا دوباره تلاش کنید";

     if (error.message && !error.response && !error.status) {
        errorMessage = error.message;
      } 
      else {
        const status = error.status || error.response?.status;
        const serverMessage = error.message || "";

        if (status === 401) {
          if (values.loginMethod === "password") {
            errorMessage = "اطلاعات ورود نادرست است،رمز عبور را دوباره بررسی کن"; 
          } else {
            errorMessage = "کد وارد شده نادرست است، دوباره امتحان کن"; 
          }
        } 
        else if (status === 404) {
          errorMessage = "حساب کاربری با این مشخصات پیدا نشد"; 
        } 
        else if (status === 410 || serverMessage.includes("expired")) {
          errorMessage = "اعتبار کد به پایان رسیده است،کد جدید درخواست کن"; 
        } 
        else {
          errorMessage = serverMessage || "خطایی رخ داده است، لطفا دوباره تلاش کنید";
        }
      }

      setGlobalError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { 
    user, 
    isAuthenticated, 
    login, 
    isLoading, 
    globalError 
  };
}