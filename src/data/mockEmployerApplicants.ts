
import type {
  AdApplicant,
} from "@/components/features/EmployerAdDetail/AdApplicants";

const names = [
  "امیر محمدی",
  "نیما احمدی",
  "سارا رضایی",
  "محمد کریمی",
  "نگار حسینی",
  "علی مرادی",
  "مریم اکبری",
  "پارسا موسوی",
  "آرمان صادقی",
  "نازنین رحیمی",
  "رضا محمودی",
  "هستی عباسی",
];

const profiles = {
  design: [
    {
      title: "طراح گرافیک",
      skills: ["Photoshop", "Illustrator", "طراحی بنر"],
    },
    {
      title: "طراح رابط کاربری",
      skills: ["Figma", "UI Design", "طراحی بصری"],
    },
    {
      title: "طراح محتوای بصری",
      skills: ["Canva", "Photoshop", "تایپوگرافی"],
    },
  ],

  video: [
    {
      title: "تدوینگر ویدیو",
      skills: ["Premiere Pro", "After Effects", "تدوین"],
    },
    {
      title: "موشن گرافیست",
      skills: ["After Effects", "Photoshop", "موشن گرافیک"],
    },
    {
      title: "تولیدکننده محتوای ویدیویی",
      skills: ["DaVinci Resolve", "CapCut", "تصحیح رنگ"],
    },
  ],

  content: [
    {
      title: "کارآموز تولید محتوا",
      skills: ["نویسندگی", "Canva", "تولید محتوا"],
    },
    {
      title: "کارآموز شبکه‌های اجتماعی",
      skills: ["Instagram", "کپی‌رایتینگ", "بازاریابی"],
    },
  ],
};

type ProfileKind = keyof typeof profiles;

function createMockApplicants(
  adId: string,
  count: number,
  newCount: number,
  profileKind: ProfileKind,
  firstNames: { id: string; name: string }[],
  firstDay: number,
): AdApplicant[] {
  const availableProfiles = profiles[profileKind];

  return Array.from({ length: count }, (_, index) => {
    const profile =
      availableProfiles[index % availableProfiles.length];

    const existing = firstNames[index];

    const status: AdApplicant["status"] =
      index < newCount
        ? "new"
        : index % 4 === 0
          ? "accepted"
          : index % 4 === 3
            ? "rejected"
            : "reviewing";

    const day = Math.max(1, firstDay - index);

    return {
      id: existing?.id ?? `${adId}-applicant-${index + 1}`,

      name: existing?.name
        ? names.find((name) =>
            name.startsWith(`${existing.name} `),
          ) ?? existing.name
        : names[index % names.length],

      title: profile.title,

      skills: [...profile.skills],

      appliedAt: `۱۴۰۵/۰۸/${day.toLocaleString("fa-IR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`,

      status,
    };
  });
}

export const mockEmployerApplicants: Record<
  string,
  AdApplicant[]
> = {
  "1": createMockApplicants(
    "1",
    12,
    3,
    "design",
    [
      { id: "1", name: "امیر" },
      { id: "2", name: "نیما" },
      { id: "3", name: "سارا" },
    ],
    15,
  ),

  "2": createMockApplicants(
    "2",
    8,
    0,
    "video",
    [
      { id: "4", name: "امیر" },
      { id: "5", name: "نیما" },
    ],
    8,
  ),

  "3": createMockApplicants(
    "3",
    5,
    0,
    "content",
    [
      { id: "6", name: "امیر" },
      { id: "7", name: "نیما" },
    ],
    5,
  ),

  "4": [],

  "5": createMockApplicants(
    "5",
    6,
    0,
    "design",
    [
      { id: "8", name: "امیر" },
      { id: "9", name: "نیما" },
    ],
    1,
  ),
};
