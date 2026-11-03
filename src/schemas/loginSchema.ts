import * as yup from "yup";

export const loginSchema = yup.object().shape({
  authMethod: yup.string().oneOf(["mobile", "email"]).required(),
  loginMethod: yup.string().oneOf(["password", "otp"]).required(),
  
  email: yup.string().when("authMethod", {
    is: "email",
    then: (schema) => 
      schema
        .required("نشانی ایمیل معتبر نیست. نمونه: name@example.com")
        .email("نشانی ایمیل معتبر نیست. نمونه: name@example.com"),
    otherwise: (schema) => schema.notRequired(),
  }),

  mobile: yup.string().when("authMethod", {
    is: "mobile",
    then: (schema) => 
      schema
        .required("شماره موبایل معتبر نیست. شماره باید با 09 شروع شود و 11 رقم داشته باشد")
        .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست. شماره باید با 09 شروع شود و 11 رقم داشته باشد"),
    otherwise: (schema) => schema.notRequired(),
  }),

  password: yup.string().when(["authMethod", "loginMethod"], {
    is: (authMethod: string, loginMethod: string) => authMethod === "email" && loginMethod === "password",
    then: (schema) => 
      schema
        .required("شماره موبایل و رمز عبور را وارد کن")
        .min(8, "رمز عبور باید حداقل ۱۲ کاراکتر باشد"), 
    otherwise: (schema) => schema.notRequired(),
  }),

  otpCode: yup.string().when("loginMethod", {
    is: "otp",
    then: (schema) => 
      schema
        .required("کد وارد شده نادرست است، دوباره امتحان کن")
        .length(6, "کد وارد شده نادرست است، دوباره امتحان کن"),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  rememberMe: yup.boolean().default(false),
});