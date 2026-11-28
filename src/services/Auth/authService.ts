import { axiosInstance } from "@/services/api/axiosInstance";
import type { LoginFormValues, AuthResponse } from "@/types/Auth/authTypes";
import { getBackendFieldErrors } from "./employerAuthService"; // استفاده از تابع جدید

export async function login(values: LoginFormValues): Promise<AuthResponse> {
  const payload = {
    phone: values.mobile,
    password: values.password,
  };

  try {
    // ۱. اول تلاش می‌کنیم به عنوان کارفرمای حقیقی لاگین کنیم
    const res = await axiosInstance.post("/individual-employers/login", payload);
    return mapResponseToAuthResponse(res.data);
  } catch (error: any) {
    // ۲. اگه بک گفت کاربر پیدا نشد (404) یا رمز اشتباهه (401)، شاید کاربر حقوقی باشه
    if (error.response?.status === 401 || error.response?.status === 404) {
      try {
        const resLegal = await axiosInstance.post("/legal-employers/login", payload);
        return mapResponseToAuthResponse(resLegal.data);
      } catch (legalError: any) {
        // گرفتن پیام خطای دقیق و ترجمه شده از بک
        const translated = getBackendFieldErrors(legalError);
        throw new Error(translated.message);
      }
    }
    // برای بقیه خطاها (مثل 500) هم پیام دقیق می‌دیم
    const translated = getBackendFieldErrors(error);
    throw new Error(translated.message);
  }
}

// تابع برای تبدیل پاسخ بک به ساختار فرانت‌اند و ذخیره توکن
function mapResponseToAuthResponse(data: any): AuthResponse {
  // بک توکن رو در کلید access_token برمی‌گردونه
  const token = data?.access_token;
  
  if (token) {
    localStorage.setItem("employerAccessToken", token);
    console.log("✅ توکن لاگین با موفقیت در Local Storage ذخیره شد.");
  } else {
    console.warn("⚠️ توکن در پاسخ لاگین پیدا نشد. ساختار پاسخ:", data);
  }

  // اطلاعات کاربر در کلید data هست
  const userData = data?.data || data;

  return {
    user: {
      id: String(userData?.id || ""),
      fullName: `${userData?.first_name || ""} ${userData?.last_name || ""}`.trim() || "کاربر",
      email: userData?.email || "",
    },
    accessToken: token || "",
  };
}

export function logout(): Promise<void> {
  localStorage.removeItem("employerAccessToken");
  return Promise.resolve();
}