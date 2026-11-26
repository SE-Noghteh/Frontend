
import type { EmployerAd } from "@/types/Employer/employer";

export const mockEmployerAds: EmployerAd[] = [
  {
    id: "1",
    title: "طراحی پست‌های پاییز",
    kind: "work",
    status: "published",

    createdAt: "2026-10-20",
    deadline: "۱۴۰۵/۰۸/۱۵",
    deliveryDate: "2026-11-15",

    applicantsCount: 12,
    newApplicantsCount: 3,

    applicants: [
      { id: "1", name: "امیر" },
      { id: "2", name: "نیما" },
      { id: "3", name: "سارا" },
    ],

    category: "طراحی و گرافیک",

    description:
      "برای کمپین پاییزی برند به یک طراح گرافیک خلاق نیاز داریم تا مجموعه‌ای از پست‌ها و استوری‌های اینستاگرام را متناسب با هویت بصری برند طراحی کند.",

    skills: [
      "Photoshop",
      "Illustrator",
      "طراحی پست",
      "طراحی بنر",
    ],

    deliverables:
      "طراحی ۱۰ پست اینستاگرام\nطراحی ۵ استوری\nتحویل فایل‌های لایه‌باز",

    deliveryFormat: "PNG، JPG و PSD",

    budget: 2500000,
    collaborationMode: "دورکاری",
    ageRange: "۱۸ سال به بالا",
  },

  {
    id: "2",
    title: "تدوین ویدیوی معرفی",
    kind: "work",
    status: "published",

    createdAt: "2026-10-18",
    deadline: "۱۴۰۵/۰۸/۰۸",
    deliveryDate: "2026-11-12",

    applicantsCount: 8,
    newApplicantsCount: 0,

    applicants: [
      { id: "4", name: "امیر" },
      { id: "5", name: "نیما" },
    ],

    category: "عکاسی و تدوین",

    description:
      "به دنبال یک تدوینگر خلاق برای ساخت ویدیوی معرفی برند هستیم. فایل‌های خام در اختیار تدوینگر قرار می‌گیرند. تدوین، اصلاح رنگ، صداگذاری و افزودن زیرنویس فارسی از وظایف این پروژه است.",

    skills: [
      "Premiere Pro",
      "After Effects",
      "تدوین ویدیو",
      "اصلاح رنگ",
    ],

    deliverables:
      "یک ویدیوی معرفی ۶۰ تا ۹۰ ثانیه‌ای\nنسخه مناسب شبکه‌های اجتماعی\nتحویل فایل اصلی پروژه",

    deliveryFormat: "MP4، Full HD",

    budget: 3500000,
    collaborationMode: "دورکاری",
    ageRange: "۱۸ سال به بالا",
  },

  {
    id: "3",
    title: "کارآموزی تولید محتوا",
    kind: "internship",
    status: "collaboration",

    createdAt: "2026-10-15",
    deadline: "۱۴۰۵/۰۸/۰۵",
    deliveryDate: "2026-11-01",

    applicantsCount: 5,
    newApplicantsCount: 0,

    applicants: [
      { id: "6", name: "امیر" },
      { id: "7", name: "نیما" },
    ],

    category: "تولید محتوا",

    description:
      "در این دوره کارآموزی با اصول تولید محتوا، برنامه‌ریزی محتوایی، مدیریت شبکه‌های اجتماعی و نگارش متن تبلیغاتی آشنا خواهید شد. فعالیت‌ها با راهنمایی تیم محتوا انجام می‌شوند.",

    skills: [
      "تولید محتوا",
      "نویسندگی",
      "Canva",
      "شبکه‌های اجتماعی",
    ],

    deliverables:
      "آشنایی با اصول تولید محتوا\nطراحی تقویم محتوایی\nمدیریت شبکه‌های اجتماعی\nتهیه گزارش عملکرد",

    deliveryFormat: "PDF و Word",

    budget: 1500000,
    collaborationMode: "ترکیبی",
    ageRange: "۱۸ سال به بالا",

    internshipDuration: "8",
    weeklyHours: "۲۰ ساعت",
    hasAllowance: true,
  },

  {
    id: "4",
    title: "طراحی رابط کاربری اپ",
    kind: "work",
    status: "expired",

    createdAt: "2026-10-10",
    deadline: "۱۴۰۵/۰۷/۲۸",
    deliveryDate: "2026-11-05",

    applicantsCount: 0,
    newApplicantsCount: 0,
    applicants: [],

    category: "طراحی و گرافیک",

    description:
      "طراحی رابط کاربری یک اپلیکیشن موبایل با تمرکز بر تجربه کاربری ساده، دسترسی آسان به امکانات و رعایت اصول طراحی واکنش‌گرا.",

    skills: [
      "Figma",
      "UI Design",
      "UX Design",
      "Prototyping",
    ],

    deliverables:
      "طراحی ۱۲ صفحه اپلیکیشن\nساخت پروتوتایپ تعاملی\nطراحی کامپوننت‌های مشترک",

    deliveryFormat: "Figma",

    budget: 6000000,
    collaborationMode: "دورکاری",
    ageRange: "۱۸ سال به بالا",
  },

  {
    id: "5",
    title: "لوگوی کافه",
    kind: "work",
    status: "closed",

    createdAt: "2026-10-05",
    deadline: "۱۴۰۵/۰۷/۲۵",
    deliveryDate: "2026-10-28",

    applicantsCount: 6,
    newApplicantsCount: 0,

    applicants: [
      { id: "8", name: "امیر" },
      { id: "9", name: "نیما" },
    ],

    category: "طراحی و گرافیک",

    description:
      "به یک طراح گرافیک خلاق برای طراحی لوگوی اختصاصی یک کافه نیاز داریم. سبک طراحی باید مدرن، مینیمال و متناسب با هویت بصری کافه باشد. لوگو باید قابلیت استفاده در تابلو، بسته‌بندی، منو و شبکه‌های اجتماعی را داشته باشد.",

    skills: [
      "Illustrator",
      "Photoshop",
      "طراحی لوگو",
      "هویت بصری",
      "تایپوگرافی",
    ],

    deliverables:
      "ارائه سه اتود اولیه لوگو\nطراحی لوگوی نهایی\nارائه نسخه رنگی و تک‌رنگ\nتحویل فایل لایه‌باز",

    deliveryFormat: "AI، SVG، PNG و PDF",

    budget: 2000000,
    collaborationMode: "دورکاری",
    ageRange: "۱۸ سال به بالا",
  },
];
