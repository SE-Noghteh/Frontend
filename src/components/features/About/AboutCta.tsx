import { Link } from "react-router-dom";

import { Reveal } from "@/components/ui/Reveal";

export function AboutCta() {
  return (
    <section className="bg-background-page px-6 pt-12 pb-14 md:pt-20 md:pb-24">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue md:rounded-[2rem] flex min-h-0 items-center justify-center px-5 py-10 md:min-h-72 md:px-8 md:py-16 text-center text-white">
          <div
            aria-hidden="true"
            className="absolute -top-20 -start-20 size-72 rounded-full bg-accent-default/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -end-16 size-72 rounded-full bg-green/25 blur-3xl"
          />
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-section-title font-bold text-white md:text-4xl">
              آماده‌ای اولین تجربه‌ات را بسازی؟
            </h2>
            <p className="mt-4 max-w-xl text-center leading-8 text-ocean-8">
              چه نوجوانی با مهارت، چه کارفرمایی با یک پروژه‌ی کوچک، چه والدی که
              همراه فرزندش است؛ زدلنسر جای شماست.
            </p>
            <Link
              to="/"
              className="mt-8 inline-block rounded-xl bg-accent-default px-8 py-3 font-semibold text-charcoal transition hover:-translate-y-0.5 hover:bg-peach-5"
            >
              شروع کن
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
