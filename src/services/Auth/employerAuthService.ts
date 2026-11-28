import { axiosInstance } from "@/services/api/axiosInstance";
import type { IndividualIdentityData, LegalIdentityData, DocumentsData } from "@/providers/EmployerSignupProvider";

function buildSignupFormData(
  accountType: "real" | "legal",
  identity: IndividualIdentityData | LegalIdentityData,
  documents: DocumentsData,
  account: { mobile: string; email: string; password: string }
): FormData {
  const formData = new FormData();

  formData.append("phone", account.mobile);
  formData.append("password", account.password);
  if (account.email) formData.append("email", account.email);

  if (accountType === "real") {
    const data = identity as IndividualIdentityData;
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("father_name", data.fatherName);
    formData.append("national_code", data.nationalId);
    formData.append("gender", data.gender);
    formData.append("birth_year", data.birthYear);
    formData.append("birth_month", data.birthMonth);
    formData.append("birth_day", data.birthDay);
    formData.append("province", data.province);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("postal_code", data.postalCode);
    if (data.businessName) formData.append("business_name", data.businessName);
    if (data.businessField) formData.append("business_activity", data.businessField);
    if (data.website) formData.append("website", data.website);
    formData.append("has_legal_guardian", "false");
    if (documents.nationalCard) formData.append("identity_document", documents.nationalCard);
    if (documents.businessLicense) formData.append("business_license", documents.businessLicense);
    if (documents.videoFile) formData.append("verification_video", documents.videoFile);
  } else {
    const data = identity as LegalIdentityData;
    formData.append("company_name", data.companyName);
    formData.append("legal_entity_type", data.legalEntityType);
    formData.append("company_national_id", data.companyNationalId);
    formData.append("registration_number", data.registrationNumber);
    formData.append("economic_code", data.economicCode);
    formData.append("province", data.province);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("postal_code", data.postalCode);
    formData.append("representative_first_name", data.representativeFirstName);
    formData.append("representative_last_name", data.representativeLastName);
    formData.append("representative_position", data.representativePosition);
    formData.append("representative_gender", data.representativeGender);
    formData.append("representative_national_code", data.representativeNationalCode);
    formData.append("has_tax_file", String(data.hasTaxFile));
    formData.append("requires_activity_license", String(data.requiresActivityLicense));
    if (data.website) formData.append("website", data.website);
    data.activities.forEach((activity) => formData.append("activities", activity));
    
    // 🔥 فایل‌های حقوقی جداگانه ارسال می‌شن
    if (documents.establishmentDocument) {
      formData.append("establishment_document", documents.establishmentDocument);
    }
    if (documents.nationalCard) {
      formData.append("identity_document", documents.nationalCard);
    }
    if (documents.businessLicense) {
      formData.append("business_license", documents.businessLicense);
    }
    if (documents.videoFile) {
      formData.append("verification_video", documents.videoFile);
    }
  }

  return formData;
}

export async function signupIndividual(
  identity: IndividualIdentityData,
  documents: DocumentsData,
  account: { mobile: string; email: string; password: string }
) {
  const formData = buildSignupFormData("real", identity, documents, account);
  const response = await axiosInstance.post("/individual-employers/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function signupLegal(
  identity: LegalIdentityData,
  documents: DocumentsData,
  account: { mobile: string; email: string; password: string }
) {
  const formData = buildSignupFormData("legal", identity, documents, account);
  const response = await axiosInstance.post("/legal-employers/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function verifyOtp(phone: string, otp: string, accountType: "real" | "legal") {
  const endpoint = accountType === "real"
    ? "/individual-employers/verify-otp"
    : "/legal-employers/verify-otp";
  const response = await axiosInstance.post(endpoint, { phone, otp });
  return response.data;
}

export async function resendOtp(phone: string, accountType: "real" | "legal") {
  const endpoint = accountType === "real"
    ? "/individual-employers/otp"
    : "/legal-employers/otp";
  const response = await axiosInstance.post(endpoint, { phone });
  return response.data;
}

// ========== فراموشی رمز ==========

export async function forgotPassword(phone: string, accountType: "real" | "legal") {
  const endpoint = accountType === "real"
    ? "/individual-employers/forgot-password"
    : "/legal-employers/forgot-password";
  const response = await axiosInstance.post(endpoint, { phone });
  return response.data;
}

export async function verifyResetOtp(phone: string, otp: string, accountType: "real" | "legal") {
  const endpoint = accountType === "real"
    ? "/individual-employers/verify-reset-otp"
    : "/legal-employers/verify-reset-otp";
  const response = await axiosInstance.post(endpoint, { phone, otp });
  return response.data; // { reset_token, expires_in }
}

export async function resetPassword(resetToken: string, newPassword: string, accountType: "real" | "legal") {
  const endpoint = accountType === "real"
    ? "/individual-employers/reset-password"
    : "/legal-employers/reset-password";
  const response = await axiosInstance.post(endpoint, { reset_token: resetToken, new_password: newPassword });
  return response.data;
}

// ========== توابع ترجمه و مدیریت خطا ==========

export function getBackendFieldErrors(error: any): { field?: string, message: string } {
  const data = error.response?.data;
  
  if (!data) {
    return { message: error.message || "خطای شبکه یا سرور. لطفاً دوباره تلاش کنید." };
  }

  const translations: Record<string, { title: string, desc: string }> = {
    "invalid phone number or password": { title: "ورود ناموفق", desc: "اطلاعات ورود نادرست است؛ رمز عبور را دوباره بررسی کنید." },
    "Invalid credentials": { title: "ورود ناموفق", desc: "شماره موبایل یا رمز عبور نادرست است." },
    "No active account found with the given credentials": { title: "حساب پیدا نشد", desc: "حساب کاربری با این مشخصات پیدا نشد." },
    "invalid form fields": { title: "خطای اعتبارسنجی", desc: "اطلاعات وارد شده نامعتبر است. لطفاً فیلدها را بررسی کنید." },
    "phone or national code already registered": { title: " ", desc: "کد ملی یا شماره همراه تکراری است. " },
    "OTP expired": { title: "کد منقضی شده", desc: "کد تایید منقضی شده است. لطفاً کد جدید بگیرید." },
    "Invalid OTP": { title: "کد نادرست", desc: "کد تایید وارد شده نادرست است." },
    "invalid or expired OTP": { title: " ", desc: "کد وارد شده نادرست است یا زمان آن به پایان رسیده است. لطفاً دوباره تلاش کنید." },
    "wait before requesting another OTP": { title: " ", desc: "برای دریافت کد بعدی، کمی صبر کنید و دوباره تلاش کنید." },
    "This field is required.": { title: "فیلد الزامی", desc: "این فیلد الزامی است." },
    "This field may not be blank.": { title: "فیلد خالی", desc: "این فیلد نمی‌تواند خالی باشد." },
    "Enter a valid phone number.": { title: "شماره نامعتبر", desc: "شماره موبایل وارد شده معتبر نیست." },
    "user with this phone already exists.": { title: "کاربر تکراری", desc: "کاربری با این شماره موبایل قبلاً ثبت‌نام کرده است." },
    "national code is not valid.": { title: "کد ملی نامعتبر", desc: "کد ملی وارد شده معتبر نیست." },
    "too many login attempts; try again in 15 minutes": { title: "تلاش بیش از حد", desc: "تعداد تلاش‌های ناموفق زیاد بوده است. لطفاً ۱۵ دقیقه دیگر دوباره امتحان کنید." },
  };

  if (typeof data === "object" && !data.message && !data.detail) {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const firstField = keys[0];
      const errorMsg = Array.isArray(data[firstField]) ? data[firstField][0] : data[firstField];
      
      const translatedMsg = translations[errorMsg]?.desc || errorMsg; 
      
      const fieldMap: Record<string, string> = {
        "phone": "mobile",
        "national_code": "nationalId",
        "postal_code": "postalCode",
        "password": "password",
        "email": "email",
        "registration_number": "registrationNumber",
        "company_national_id": "companyNationalId",
        "representative_national_code": "representativeNationalCode"
      };

      return { field: fieldMap[firstField] || firstField, message: translatedMsg };
    }
  }

  const globalMsg = data.message || data.detail || "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
  const translation = translations[globalMsg];
  
  if (translation) {
    return { message: `${translation.title}\n${translation.desc}` };
  }
  
  return { message: globalMsg };
}