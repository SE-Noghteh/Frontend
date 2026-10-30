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

export type RegisterFormValues = yup.InferType<typeof registerSchema>;