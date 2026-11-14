import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROLE_ORDER } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

import { RolePathCard } from "./RolePathCard";

const PATHS: Record<UserRole, { text: string; ctaLabel: string }> = {
  seeker: {
    text: "پروژه‌های کوچک و واقعی پیدا کن و رزومه‌ت رو با هر کار قوی‌تر کن.",
    ctaLabel: "شروع به‌عنوان کارجو",
  },
  employer: {
    text: "آگهی بذار، رزومه‌ها رو مقایسه کن و پول رو فقط بعد از تأیید کار آزاد کن.",
    ctaLabel: "ثبت آگهی کارفرما",
  },
  parent: {
    text: "کنار فرزندت بمون، رضایت بده و توافق‌ها و مهلت‌ها رو ببین.",
    ctaLabel: "ساخت حساب والد",
  },
};

/** Final section: one call-to-action per role. */
export function CallToActionSection() {
  return (
    <section className="bg-background-page px-6">
      <div className="mx-auto max-w-[1100px] py-14 sm:py-24">
        <SectionHeading
          align="center"
          maxWidthClassName="max-w-[720px]"
          titleClassName="text-page-title leading-[1.45] text-text-primary sm:text-[44px]"
        >
          آماده‌ای اولین پروژه‌ت رو شروع کنی؟
        </SectionHeading>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
          {ROLE_ORDER.map((role, index) => (
            <RolePathCard
              key={role}
              role={role}
              text={PATHS[role].text}
              ctaLabel={PATHS[role].ctaLabel}
              delay={index * 80}
              hasDivider={index > 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
