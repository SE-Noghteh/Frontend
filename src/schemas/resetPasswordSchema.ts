
import * as yup from "yup";

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("وارد کردن رمز عبور الزامی است.")
    .min(12, "رمز عبور باید حداقل ۱۲ کاراکتر باشد.")
    .matches(/[a-z]/, "رمز عبور باید شامل حرف کوچک انگلیسی باشد.")
    .matches(/[A-Z]/, "رمز عبور باید شامل حرف بزرگ انگلیسی باشد.")
    .matches(/[0-9]/, "رمز عبور باید شامل حداقل یک عدد باشد.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "رمز عبور باید شامل حداقل یک علامت باشد."
    ),

  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور الزامی است.")
    .oneOf([yup.ref("password")], "رمز عبور و تکرار آن یکسان نیستند."),
});

export type ResetPasswordFormValues = yup.InferType<
  typeof resetPasswordSchema
>;
