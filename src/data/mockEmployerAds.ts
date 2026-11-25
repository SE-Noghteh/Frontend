
import type { EmployerAd } from "@/types/Employer/employer";

export const mockEmployerAds: EmployerAd[] = [
  {
    id: "1",
    title: "طراحی پست‌های پاییز",
    kind: "work",
    status: "published",
    createdAt: "2026-10-20",
    deadline: "۱۴۰۵/۰۸/۱۵",
    applicantsCount: 12,
    newApplicantsCount: 3,
    applicants: [
      { id: "1", name: "امیر" },
      { id: "2", name: "نیما" },
      { id: "3", name: "سارا" },
    ],
  },
  {
    id: "2",
    title: "تدوین ویدیوی معرفی",
    kind: "work",
    status: "published",
    createdAt: "2026-10-18",
    deadline: "۱۴۰۵/۰۸/۰۸",
    applicantsCount: 8,
    newApplicantsCount: 0,
    applicants: [
      { id: "4", name: "امیر" },
      { id: "5", name: "نیما" },
    ],
  },
  {
    id: "3",
    title: "کارآموزی تولید محتوا",
    kind: "internship",
    status: "collaboration",
    createdAt: "2026-10-15",
    deadline: "",
    applicantsCount: 5,
    newApplicantsCount: 0,
    applicants: [
      { id: "6", name: "امیر" },
      { id: "7", name: "نیما" },
    ],
  },
  {
    id: "4",
    title: "طراحی رابط کاربری اپ",
    kind: "work",
    status: "expired",
    createdAt: "2026-10-10",
    deadline: "۱۴۰۵/۰۷/۲۸",
    applicantsCount: 0,
    newApplicantsCount: 0,
    applicants: [],
  },
  {
    id: "5",
    title: "لوگوی کافه",
    kind: "work",
    status: "closed",
    createdAt: "2026-10-05",
    deadline: "",
    applicantsCount: 6,
    newApplicantsCount: 0,
    applicants: [
      { id: "8", name: "امیر" },
      { id: "9", name: "نیما" },
    ],
  },
];
