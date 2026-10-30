import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup.string().required("نام را وارد کن"),
  lastName: yup.string().required("نام خانوادگی را وارد کن"),
  nationalCode: yup.string().required("کد ملی را وارد کن").matches(/^\d{10}$/, "کد ملی معتبر ۱۰ رقمی وارد کن"),
  gender: yup.string().required("جنسیت را انتخاب کن"),
  province: yup.string().required("استان را انتخاب کن"),
  city: yup.string().required("شهر را انتخاب کن"),
  postalCode: yup.string().required("کد پستی را وارد کن"),
  address: yup.string().required("نشانی را وارد کن"),
  birthDay: yup.string().required("تاریخ تولد کامل را انتخاب کن"),
  birthMonth: yup.string().required("تاریخ تولد کامل را انتخاب کن"),
  birthYear: yup.string().required("تاریخ تولد کامل را انتخاب کن"),
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

export type RegisterFormValues = yup.InferType<typeof registerSchema>;