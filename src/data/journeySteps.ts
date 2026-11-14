/**
 * Static marketing content for the landing "journey" section.
 */

import type { JourneyStepContent } from "@/types/Landing/landing";

export const JOURNEY_STEPS: JourneyStepContent[] = [
  {
    title: "ثبت‌نام",
    description:
      "نوجوان‌های زیر ۱۸ سال همراه والدشون ثبت‌نام می‌کنن. شماره و مشخصات کارفرماها هم قبل از انتشار آگهی بررسی می‌شه.",
    roles: ["seeker", "parent"],
    mainRole: "seeker",
    previewId: "signup",
  },
  {
    title: "ساخت رزومه و نمونه‌کار",
    description:
      "مهارت‌ها، علاقه‌مندی‌ها و نمونه‌کارهات رو اضافه کن. با هر پروژه، نظر و امتیاز کارفرما هم به رزومه‌ت اضافه می‌شه.",
    roles: ["seeker"],
    mainRole: "seeker",
    previewId: "resume",
  },
  {
    title: "جستجو و درخواست",
    description:
      "آگهی‌ها رو با فیلتر پیدا کن و درخواست بده. برای زیر ۱۸ سال، والد خلاصه فرصت رو می‌بینه و تأیید می‌کنه.",
    roles: ["seeker", "parent"],
    mainRole: "parent",
    previewId: "consent",
  },
  {
    title: "توافق‌نامه و پرداخت امن",
    description:
      "کارفرما درخواستت رو می‌پذیره، مبلغ و مهلت رو با هم نهایی می‌کنید و پول قبل از شروع توی کیف پول امانت می‌مونه.",
    roles: ["employer", "seeker"],
    mainRole: "employer",
    previewId: "agreement",
  },
  {
    title: "انجام کار، چت و تقویم",
    description:
      "توی فضای مشترک پروژه چت کنید، اصلاحیه بدید و مهلت‌ها رو توی تقویم ببینید. والد هم می‌تونه پیگیر باشه.",
    roles: ["seeker", "employer", "parent"],
    mainRole: "employer",
    previewId: "workspace",
  },
  {
    title: "تحویل، پرداخت و امتیاز",
    description:
      "خروجی رو آپلود کن. با تأیید کارفرما پول به کیف پول تو آزاد می‌شه و پروژه به پاسپورت مهارتی‌ت اضافه می‌شه.",
    roles: ["employer", "seeker"],
    mainRole: "seeker",
    previewId: "wallet",
  },
];
