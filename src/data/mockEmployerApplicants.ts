
import type {
  AdApplicant,
} from "@/components/features/EmployerAdDetail/AdApplicants";

const APPLICANTS: AdApplicant[] = [
  {
    id: "1",
    name: "سارا محمدی",
    title: "طراح گرافیک",
    age: 16,
    match: 94,
    proposedBudget: 2400000,
    status: "new",
    appliedAt: "2026-11-20",
    projectsCount: 4,
    verified: true,
    education: "دانش‌آموز، پایه دهم",

    about:
      "دانش‌آموز علاقه‌مند به طراحی پست و پوستر با تجربه کار با ایلوستریتور و فتوشاپ و آماده همکاری در پروژه‌های کوتاه‌مدت.",

    onTimeRate: 93,

    skills: [
      "تایپوگرافی",
      "ایلوستریتور",
      "طراحی شبکه‌های اجتماعی",
    ],

    skillLevels: [
      {
        name: "ایلوستریتور",
        level: 90,
        verified: true,
      },
      {
        name: "طراحی پست",
        level: 85,
        verified: true,
      },
      {
        name: "فتوشاپ",
        level: 70,
        verified: true,
      },
      {
        name: "برندینگ",
        level: 55,
        verified: false,
      },
      {
        name: "تایپوگرافی",
        level: 80,
        verified: true,
      },
    ],

    description:
      "تجربه طراحی کمپین‌های فصلی دارم و می‌توانم همه پست‌ها را در دو اندازه تحویل بدهم. نمونه‌کارهای مرتبط پایین است.",

    portfolio: [
      { title: "طراحی پوستر" },
      { title: "کمپین پاییزی" },
      { title: "پست اینستاگرام" },
    ],

    experiences: [
      {
        title: "طراحی کاور پادکست",
        employer: "استودیو نیلوفر",
        rating: 4.9,
      },
      {
        title: "پست‌های کمپین تابستان",
        employer: "کافه رز",
        rating: 4.7,
      },
      {
        title: "طراحی پوستر تبلیغاتی",
        employer: "آموزشگاه مسیر",
        rating: 4.8,
      },
    ],
  },

  {
    id: "2",
    name: "نیما رضایی",
    title: "طراح بصری",
    age: 20,
    match: 91,
    proposedBudget: 2600000,
    status: "new",
    appliedAt: "2026-11-19",
    projectsCount: 6,
    verified: true,
    education: "دانشجوی کارشناسی گرافیک",

    about:
      "طراح بصری با تجربه طراحی هویت برند، محتوای تبلیغاتی و شبکه‌های اجتماعی. علاقه‌مند به همکاری با کسب‌وکارهای نوپا و تیم‌های خلاق.",

    onTimeRate: 96,

    skills: [
      "Photoshop",
      "Illustrator",
      "طراحی بصری",
    ],

    skillLevels: [
      {
        name: "فتوشاپ",
        level: 95,
        verified: true,
      },
      {
        name: "ایلوستریتور",
        level: 85,
        verified: true,
      },
      {
        name: "طراحی هویت بصری",
        level: 90,
        verified: true,
      },
      {
        name: "فیگما",
        level: 65,
        verified: false,
      },
    ],

    description:
      "در زمینه طراحی محتوای تبلیغاتی و هویت بصری فعالیت می‌کنم و امکان تحویل پروژه در زمان تعیین‌شده را دارم.",

    portfolio: [
      { title: "طراحی بنر" },
      { title: "هویت بصری برند" },
      { title: "طراحی لوگو" },
    ],

    experiences: [
      {
        title: "طراحی هویت بصری فروشگاه",
        employer: "فروشگاه آبان",
        rating: 4.9,
      },
      {
        title: "طراحی بنر تبلیغاتی",
        employer: "استودیو آرت",
        rating: 4.8,
      },
      {
        title: "طراحی لوگوی مجموعه",
        employer: "مجموعه سپهر",
        rating: 5,
      },
    ],
  },

  {
    id: "3",
    name: "آوا مرادی",
    title: "تصویرساز",
    age: 18,
    match: 88,
    proposedBudget: 2300000,
    status: "reviewing",
    appliedAt: "2026-11-18",
    projectsCount: 3,
    verified: true,
    education: "دیپلم هنر",

    about:
      "تصویرساز علاقه‌مند به طراحی دیجیتال، خلق شخصیت و تولید تصاویر تبلیغاتی با تمرکز بر خلاقیت و جزئیات بصری.",

    onTimeRate: 90,

    skills: [
      "تصویرسازی",
      "طراحی دیجیتال",
      "Photoshop",
    ],

    skillLevels: [
      {
        name: "تصویرسازی",
        level: 92,
        verified: true,
      },
      {
        name: "طراحی دیجیتال",
        level: 85,
        verified: true,
      },
      {
        name: "فتوشاپ",
        level: 78,
        verified: true,
      },
      {
        name: "طراحی شخصیت",
        level: 65,
        verified: false,
      },
    ],

    description:
      "علاقه‌مند به همکاری در پروژه‌های خلاقانه هستم و تجربه طراحی تصاویر تبلیغاتی دارم.",

    portfolio: [
      { title: "تصویرسازی دیجیتال" },
      { title: "طراحی شخصیت" },
      { title: "تصویرسازی کتاب" },
    ],

    experiences: [
      {
        title: "تصویرسازی جلد کتاب",
        employer: "انتشارات باران",
        rating: 4.8,
      },
      {
        title: "طراحی تصاویر تبلیغاتی",
        employer: "استودیو رنگ",
        rating: 4.6,
      },
    ],
  },

  {
    id: "4",
    name: "علی کریمی",
    title: "طراح",
    age: 19,
    match: 82,
    proposedBudget: 2000000,
    status: "reviewing",
    appliedAt: "2026-11-17",
    projectsCount: 2,
    verified: true,
    education: "دانشجوی کارشناسی",

    about:
      "علاقه‌مند به طراحی رابط کاربری و طراحی گرافیک. در حال توسعه مهارت‌های طراحی و کسب تجربه در پروژه‌های واقعی هستم.",

    onTimeRate: 100,

    skills: [
      "Figma",
      "طراحی گرافیک",
    ],

    skillLevels: [
      {
        name: "فیگما",
        level: 85,
        verified: true,
      },
      {
        name: "طراحی رابط کاربری",
        level: 75,
        verified: true,
      },
      {
        name: "طراحی گرافیک",
        level: 70,
        verified: false,
      },
      {
        name: "تایپوگرافی",
        level: 50,
        verified: false,
      },
    ],

    description:
      "آماده همکاری در پروژه طراحی و تولید محتوای بصری هستم.",

    portfolio: [
      { title: "طراحی صفحه وب" },
      { title: "طراحی رابط اپلیکیشن" },
    ],

    experiences: [
      {
        title: "طراحی رابط کاربری وب‌سایت",
        employer: "تیم توسعه آوا",
        rating: 4.5,
      },
      {
        title: "طراحی صفحه فرود",
        employer: "مجموعه نوین",
        rating: 4.7,
      },
    ],
  },

  {
    id: "5",
    name: "مینا احمدی",
    title: "طراح گرافیک",
    age: 17,
    match: 79,
    proposedBudget: 1800000,
    status: "reviewing",
    appliedAt: "2026-11-16",
    projectsCount: 1,
    verified: false,
    education: "دانش‌آموز، پایه یازدهم",

    about:
      "علاقه‌مند به طراحی گرافیک و تولید محتوای شبکه‌های اجتماعی. به دنبال فرصت‌های همکاری برای افزایش تجربه و تقویت مهارت‌های طراحی هستم.",

    onTimeRate: 100,

    skills: [
      "Canva",
      "Photoshop",
    ],

    skillLevels: [
      {
        name: "کانوا",
        level: 85,
        verified: true,
      },
      {
        name: "طراحی پست",
        level: 75,
        verified: true,
      },
      {
        name: "فتوشاپ",
        level: 55,
        verified: false,
      },
      {
        name: "طراحی استوری",
        level: 70,
        verified: false,
      },
    ],

    description:
      "در طراحی پست و استوری تجربه دارم و علاقه‌مند به کسب تجربه بیشتر هستم.",

    portfolio: [
      { title: "طراحی پست اینستاگرام" },
      { title: "طراحی استوری تبلیغاتی" },
    ],

    experiences: [
      {
        title: "طراحی پست شبکه‌های اجتماعی",
        employer: "فروشگاه بهار",
        rating: 4.5,
      },
    ],
  },
];

function createApplicants(
  adId: string,
  count: number,
  newCount: number,
): AdApplicant[] {
  return Array.from(
    { length: count },
    (_, index) => {
      const source =
        APPLICANTS[index % APPLICANTS.length];

      return {
        ...source,

        id: `${adId}-${index + 1}`,

        status:
          index < newCount
            ? "new"
            : "reviewing",
      };
    },
  );
}

export const mockEmployerApplicants: Record<
  string,
  AdApplicant[]
> = {
  "1": createApplicants("1", 12, 3),
  "2": createApplicants("2", 8, 0),
  "3": createApplicants("3", 5, 0),
  "4": [],
  "5": createApplicants("5", 6, 0),
};
