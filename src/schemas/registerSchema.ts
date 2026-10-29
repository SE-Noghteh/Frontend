import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .required("کد ملی الزامی است")
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
  gender: yup.string().required("جنسیت الزامی است"),
  province: yup.string().required("استان الزامی است"),
  city: yup.string().required("شهر الزامی است"),
  postalCode: yup.string().required("کد پستی الزامی است"),
  address: yup.string().required("نشانی الزامی است"),
  birthDay: yup.string().required("روز الزامی است"),
  birthMonth: yup.string().required("ماه الزامی است"),
  birthYear: yup.string().required("سال الزامی است"),
  idCardImage: yup.mixed().required("تصویر شناسنامه الزامی است"),
  identityVideo: yup.mixed().required("ویدیو هویت الزامی است"),

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

}).required();

export type RegisterFormValues = yup.InferType<typeof registerSchema>;