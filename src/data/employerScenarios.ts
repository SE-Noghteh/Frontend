/**
 * Static marketing content for the landing "employers" section.
 */

import type { EmployerScenario } from "@/types/Landing/landing";

export const EMPLOYER_SCENARIOS: EmployerScenario[] = [
  {
    id: "shop",
    tabLabel: "فروشگاه آنلاین",
    lead: "پست و استوری تبلیغاتی، بنر و لوگوی ساده بدون استخدام طراح تمام‌وقت.",
    points: [
      "خروجی، مهلت، مبلغ و تعداد اصلاحات رو دقیق تعریف کن",
      "متقاضی‌ها رو با نمونه‌کار و پاسپورت مهارتی مقایسه کن",
      "وظایف، فایل‌ها و بازخورد رو توی یک فضای مشترک پیش ببر",
      "پول با تأیید خروجی آزاد می‌شه، نه قبل‌تر",
    ],
    previewProjectTitle: "طراحی ۵ تصویر تبلیغاتی برای اینستاگرام",
    previewApplicantsCount: 18,
    previewApplicants: [
      { name: "نیلوفر رضایی", age: 17, skill: "تصویرسازی", matchPercent: 92, rating: 4.8, completedProjects: 14 },
      { name: "آرین موسوی", age: 19, skill: "فتوشاپ", matchPercent: 85, rating: 4.7, completedProjects: 8 },
      { name: "هستی کریمی", age: 15, skill: "کارآموز", matchPercent: 74, rating: 0, completedProjects: 2 },
    ],
  },
  {
    id: "academy",
    tabLabel: "آموزشگاه",
    lead: "کلیپ معرفی دوره، تدوین جلسه‌ها و ساخت محتوای شبکه‌های اجتماعی.",
    points: [
      "نمونه‌کارهای ویدئویی هر متقاضی رو قبل از انتخاب ببین",
      "نسخه‌های تحویلی رو با کامنت روی همون نسخه بازبینی کن",
      "مهلت‌ها خودکار توی تقویم دو طرف ثبت می‌شن",
      "بعد از پروژه، امتیاز و نظرت به رزومه کارجو اضافه می‌شه",
    ],
    previewProjectTitle: "تدوین کلیپ ۳۰ ثانیه‌ای معرفی دوره",
    previewApplicantsCount: 11,
    previewApplicants: [
      { name: "پارسا نیک‌خواه", age: 18, skill: "تدوین ویدئو", matchPercent: 90, rating: 4.9, completedProjects: 11 },
      { name: "مانی صادقی", age: 20, skill: "کپ‌کات", matchPercent: 86, rating: 4.6, completedProjects: 6 },
      { name: "ریحانه آقایی", age: 16, skill: "موشن‌گرافی", matchPercent: 79, rating: 4.5, completedProjects: 3 },
    ],
  },
  {
    id: "office",
    tabLabel: "دفتر خدماتی",
    lead: "ورود اطلاعات، مرتب‌سازی جدول و ساخت فرم‌های ساده با دقت قابل‌اتکا.",
    points: [
      "فقط اطلاعات غیرحساس رو به کارجو بسپار",
      "حجم و معیار پذیرش کار توی توافق‌نامه ثبت می‌شه",
      "درخواست‌های اصلاح رو با شماره نسخه پیگیری کن",
      "اگه اختلافی پیش اومد، پرونده توسط پشتیبانی بررسی می‌شه",
    ],
    previewProjectTitle: "ورود اطلاعات ۲۰۰ فاکتور در اکسل",
    previewApplicantsCount: 27,
    previewApplicants: [
      { name: "سینا قاسمی", age: 19, skill: "اکسل", matchPercent: 94, rating: 4.9, completedProjects: 17 },
      { name: "الناز وکیلی", age: 17, skill: "ورود داده", matchPercent: 88, rating: 4.7, completedProjects: 9 },
      { name: "امیر حیدری", age: 22, skill: "گوگل شیت", matchPercent: 81, rating: 4.4, completedProjects: 5 },
    ],
  },
  {
    id: "event",
    tabLabel: "رویداد و نمایشگاه",
    lead: "کارهای سبک حضوری که پیش از انتشار، ایمنی و مجوزشون بررسی می‌شه.",
    points: [
      "آگهی‌های حضوری فقط پس از بررسی ایمنی منتشر می‌شن",
      "برای زیر ۱۸ سال، رضایت والد ثبت و نسخه‌بندی می‌شه",
      "مکان، ساعت و شرایط کار از اول در توافق‌نامه هست",
      "ثبت شروع و پایان فعالیت حضوری روی تقویم",
    ],
    previewProjectTitle: "راهنمایی مهمان‌ها در نمایشگاه کتاب",
    previewApplicantsCount: 14,
    previewApplicants: [
      { name: "مهسا سلیمانی", age: 21, skill: "ارتباط مؤثر", matchPercent: 91, rating: 4.8, completedProjects: 7 },
      { name: "کیان فرهادی", age: 20, skill: "پذیرش", matchPercent: 84, rating: 4.6, completedProjects: 4 },
      { name: "دینا اکبری", age: 18, skill: "زبان انگلیسی", matchPercent: 77, rating: 4.5, completedProjects: 2 },
    ],
  },
];
