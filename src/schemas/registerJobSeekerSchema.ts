import * as yup from "yup";
import { normalizeDigits } from "@/utils/normalizeDigits";

// ==========================================
// 1. Base Fields (Shared)
// ==========================================
export const phoneSchema = yup
  .string()
  .required("شماره همراه را وارد کنید")
  .transform((value) => (value ? normalizeDigits(value) : value))
  .matches(/^09\d{9}$/, "شماره همراه باید ۱۱ رقم و با ۰۹ شروع شود");

export const passwordSchema = yup
  .string()
  .required("رمز عبور را وارد کنید")
  .min(12, "رمز عبور باید حداقل ۱۲ کاراکتر باشد")
  .matches(/[a-z]/, "باید شامل حرف کوچک باشد")
  .matches(/[A-Z]/, "باید شامل حرف بزرگ باشد")
  .matches(/[0-9]/, "باید شامل عدد باشد")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "باید شامل یک نماد باشد");

// ==========================================
// 2. Step 1: Basic Info
// ==========================================
export const registerBasicSchema = yup.object({
  firstName: yup.string().required("نام را وارد کن"),
  lastName: yup.string().required("نام خانوادگی را وارد کن"),

  nationalCode: yup
    .string()
    .required("کد ملی را وارد کن")
    .transform((value) => (value ? normalizeDigits(value) : value))
    .matches(/^\d{10}$/, "کد ملی معتبر ۱۰ رقمی وارد کن"),

  gender: yup.string().required("جنسیت را انتخاب کن"),
  province: yup.string().required("استان را انتخاب کن"),
  city: yup.string().required("شهر را انتخاب کن"),

  postalCode: yup
  .string()
  .required("کد پستی را وارد کن")
  .transform((value) => (value ? normalizeDigits(value) : value))
  .matches(/^\d{10}$/, "کد پستی معتبر ۱۰ رقمی وارد کن"),

  address: yup.string().required("نشانی را وارد کن"),
  birthDay: yup.string().required("تاریخ تولد کامل را انتخاب کن"),
  birthMonth: yup.string().required("تاریخ تولد کامل را انتخاب کن"),
  birthYear: yup
    .string()
    .required("تاریخ تولد کامل را انتخاب کنید")
    .test("is-age-valid", "سن شما باید بین ۱۵ تا ۲۲ سال باشد", function (value) {
      const { birthMonth, birthDay } = this.parent;
      if (!value || !birthMonth || !birthDay) return true;

      const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", { year: "numeric", month: "numeric", day: "numeric" });
      const now = new Date();
      const parts = formatter.formatToParts(now);
      const currentYear = parseInt(parts.find(p => p.type === "year")!.value, 10);
      const currentMonth = parseInt(parts.find(p => p.type === "month")!.value, 10);
      const currentDay = parseInt(parts.find(p => p.type === "day")!.value, 10);

      let age = currentYear - parseInt(value, 10);
      if (currentMonth < parseInt(birthMonth, 10) || (currentMonth === parseInt(birthMonth, 10) && currentDay < parseInt(birthDay, 10))) {
        age--;
      }
      return age >= 15 && age <= 22;
    }),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required(),
        category: yup.string().required(),
      })
    )
    .min(1, "حداقل یک مهارت را انتخاب کنید")
    .required("انتخاب مهارت الزامی است"),
  idCardImage: yup.mixed().required("تصویر شناسنامه الزامی است"),
  identityVideo: yup.mixed().required("ویدیو هویت الزامی است"),
}).required();

export type RegisterBasicFormValues = yup.InferType<typeof registerBasicSchema>;

// ==========================================
// 3. Step 2: Account Info
// ==========================================
export const registerAccountSchema = yup.object({
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور را وارد کنید")
    .oneOf([yup.ref("password")], "رمز عبور و تکرار آن باید یکسان باشند"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "پذیرش قوانین و حریم خصوصی الزامی است")
    .required("پذیرش قوانین الزامی است"),
}).required();

export type RegisterAccountFormValues = yup.InferType<typeof registerAccountSchema>;

// ==========================================
// 4. Step 3: Parent Info
// ==========================================
export const registerParentSchema = yup.object({
  parentFullName: yup.string().trim(),
  parentPhone: yup
    .string()
    .transform((value) => (value ? normalizeDigits(value) : value))
    .test("parent-phone-valid", "شماره همراه والد معتبر نیست", function (value) {
      if (!value) return true; 
      return /^09\d{9}$/.test(value);
    }),
}).required();

export type RegisterParentFormValues = yup.InferType<typeof registerParentSchema>;

// ==========================================
// 4. Step 4: Finish
// ==========================================
export const registerFinishSchema = yup.object({
}).required();

export type RegisterFinishFormValues = yup.InferType<typeof registerFinishSchema>;