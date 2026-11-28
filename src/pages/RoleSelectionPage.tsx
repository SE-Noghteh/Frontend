import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button, ButtonLink, type ButtonColor } from "@/components/ui/Button";
import { RoleIcon } from "@/components/ui/RoleIcon";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ROLE_ORDER, ROLE_STYLES } from "@/constants/roles";
import type { UserRole } from "@/types/Landing/landing";

interface RoleSelectionPageProps {
  destinations?: Partial<Record<UserRole, string>>;
}

const ROLE_CONTENT: Record<
  UserRole,
  { title: string; description: string; color: ButtonColor }
> = {
  seeker: {
    title: "کارجو هستم",
    description: "جست‌وجوی کار و کارآموزی",
    color: "peach",
  },
  employer: {
    title: "کارفرما هستم",
    description: "ثبت آگهی و جذب نیرو",
    color: "blue",
  },
  parent: {
    title: "والد هستم",
    description: "پیگیری و نظارت بر همکاری فرزند",
    color: "green",
  },
};

const DEFAULT_DESTINATIONS: Partial<Record<UserRole, string>> = {
  seeker: "/jobseekerlogin",
};

export default function RoleSelectionPage({
  destinations = DEFAULT_DESTINATIONS,
}: RoleSelectionPageProps = {}) {
  return (
    <section
      dir="rtl"
      className="relative isolate overflow-hidden pt-6 pb-16 sm:pt-8 sm:pb-24"
    >
      <div
        aria-hidden="true"
        className="hero-dot-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_72%)]"
      />

      <SectionContainer maxWidthClassName="max-w-[1100px]">
        <ButtonLink
          to="/"
          variant="text"
          size="sm"
          startIcon={<ArrowRight size={17} />}
        >
          بازگشت به خانه
        </ButtonLink>

        <div className="mx-auto mt-3 flex max-w-[660px] flex-col gap-2 text-center">
          <h1 className="!my-0 !text-[28px] font-black leading-[1.4] text-text-primary sm:!text-[36px]">
            به زدلنسر خوش آمدید
          </h1>

          <p className="text-body leading-7 text-text-secondary">
            برای ورود یا ثبت‌نام، نقش خود را انتخاب کنید.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 items-stretch gap-3 sm:mt-6 md:grid-cols-3 md:gap-5">
          {ROLE_ORDER.map((role) => {
            const content = ROLE_CONTENT[role];
            const style = ROLE_STYLES[role];
            const destination = destinations[role];

            return (
              <article
                key={role}
                className="flex min-w-0 flex-col gap-3 rounded-[20px] border border-border-decorative bg-surface-card p-4 shadow-sm transition-shadow md:gap-4 md:p-5"
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <RoleIcon
                    role={role}
                    className="size-12 md:size-14"
                  />

                  <div className="min-w-0">
                    <h2 className="!my-0 !text-[18px] font-bold leading-7 text-text-primary">
                      {content.title}
                    </h2>
                  </div>
                </div>

                <p className="flex-1 text-label leading-6 text-text-secondary">
                  {content.description}
                </p>

                {destination ? (
                  <ButtonLink
                    to={destination}
                    color={content.color}
                    fullWidth
                    endIcon={<ArrowLeft size={17} />}
                    aria-label={`ورود به عنوان ${style.name}`}
                  >
                    ورود
                  </ButtonLink>
                ) : (
                  <Button
                    color={content.color}
                    fullWidth
                    disabled
                    endIcon={<ArrowLeft size={17} />}
                    aria-label={`ورود به عنوان ${style.name}`}
                  >
                    ورود
                  </Button>
                )}
              </article>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}