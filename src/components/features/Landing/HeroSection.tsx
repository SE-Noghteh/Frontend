import { motion } from "framer-motion";
import { ArrowLeft, Lock, ShieldCheck, Star } from "lucide-react";

import { EASE_OUT } from "@/constants/motion";

import { HeroFloatingBadge } from "./HeroFloatingBadge";
import { HeroIllustration } from "./illustrations/HeroIllustration";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
});

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pt-20 lg:pb-32">
      <div className="hero-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000,transparent)]" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border-decorative bg-surface-card px-3.5 py-1.5 text-caption font-semibold text-text-secondary"
          >
            <ShieldCheck className="size-4 text-green-3" />
            ویژه‌ی ۱۵ تا ۲۳ ساله‌ها · زیر ۱۸ سال با همراهی والدین
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-[34px] font-black leading-[1.3] tracking-tight text-text-primary sm:text-[58px]"
          >
            <span className="text-highlight-ocean">یاد بگیر،</span>{" "}
            <span className="text-highlight-peach">کار کن،</span>
            <br />
            <span className="text-highlight">دیده شو.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-[580px] text-body leading-8 text-text-secondary sm:text-body sm:leading-9"
          >
            زدلنسر فرصت‌های کاری و کارآموزی رو با سن، مهارت و وقت آزادت هماهنگ می‌کنه. هر کارفرما
            قبل از انتشار آگهی بررسی می‌شه، مبلغ و مهلت پروژه توی یک توافق‌نامه شفاف ثبت می‌شه و
            پول تا لحظه‌ی تحویل و تأیید کار توی کیف پول امن امانت می‌مونه. برای زیر ۱۸ سال، والد یا
            سرپرست هم از اول کنارته و هر همکاری فقط با رضایت اون شروع می‌شه؛ پس می‌تونی با خیال راحت
            اولین تجربه کاری‌ت رو بسازی.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            {/* TODO: replace both links with the shared Button component. */}
            <a
              href="#search"
              className="group inline-flex items-center gap-2 rounded-xl bg-action-primary px-7 py-4 text-body font-bold text-white transition-colors hover:bg-action-hover"
            >
              دیدن فرصت‌ها
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#employers"
              className="inline-flex items-center rounded-xl border border-blue-8 bg-surface-card px-7 py-4 text-body font-bold text-text-primary transition-colors hover:border-blue"
            >
              کارفرما هستم
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[460px]">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <HeroIllustration className="w-full" />
          </motion.div>

          <HeroFloatingBadge
            className="start-[-8px] top-[70px] sm:start-[-36px]"
            parallaxDepth={-30}
            delay={0.5}
            icon={<ShieldCheck className="size-[18px]" />}
            title="رضایت والد ثبت شد"
            subtitle="همین الان"
          />
          <HeroFloatingBadge
            className="end-[-8px] top-[250px] sm:end-[-40px]"
            parallaxDepth={-60}
            delay={0.7}
            icon={<Lock className="size-[18px]" />}
            title="۱٬۲۰۰٬۰۰۰ تومان"
            subtitle="در امانت تا تحویل"
          />
          <HeroFloatingBadge
            className="bottom-[40px] start-[-8px] sm:start-[-30px]"
            parallaxDepth={-20}
            delay={0.9}
            icon={<Star className="size-[18px] fill-blue" />}
            title="۴٫۸ · ۱۴ همکاری"
            subtitle="پاسپورت مهارتی"
          />
        </div>
      </div>
    </section>
  );
}
