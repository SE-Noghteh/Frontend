import * as yup from "yup";

export const loginSchema = yup.object().shape({
  authMethod: yup.string().oneOf(["mobile", "email"]).required(),
  loginMethod: yup.string().oneOf(["password", "otp"]).required(),
  
  email: yup.string().when("authMethod", {
    is: "email",
    then: (schema) => schema.email("فرمت ایمیل معتبر نیست").required("ایمیل الزامی است"),
    otherwise: (schema) => schema.notRequired(),
  }),

  mobile: yup.string().when("authMethod", {
    is: "mobile",
    then: (schema) => 
      schema
        .required("شماره موبایل الزامی است")
        .matches(/^09\d{9}$/, "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"),
    otherwise: (schema) => schema.notRequired(),
  }),

  password: yup.string().when(["authMethod", "loginMethod"], {
    is: (authMethod: string, loginMethod: string) => authMethod === "email" && loginMethod === "password",
    then: (schema) => schema.required("رمز عبور الزامی است").min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    otherwise: (schema) => schema.notRequired(),
  }),

  otpCode: yup.string().when("loginMethod", {
    is: "otp",
    then: (schema) => schema.required("کد تایید الزامی است").length(6, "کد تایید باید ۶ رقمی باشد"),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  rememberMe: yup.boolean().default(false),
});