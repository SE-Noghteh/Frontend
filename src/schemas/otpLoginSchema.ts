import * as yup from "yup";

export const otpLoginSchema = yup.object().shape({
  phone: yup
    .string()
    .required("شماره موبایل را وارد کن.")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست. باید با ۰۹ شروع شود و ۱۱ رقم داشته باشد."),
});