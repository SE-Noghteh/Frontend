import { ABOUT_HIGHLIGHTS } from "@/data/aboutContent";

import { HeroCollage } from "./HeroCollage";

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-blue text-white">
      <div
        aria-hidden="true"
        className="absolute -top-32 -start-32 size-96 rounded-full bg-ocean-4/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -end-24 size-96 rounded-full bg-accent-default/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:py-28">
        <div className="text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-label backdrop-blur">
            <span className="size-2 rounded-full bg-accent-default" />
            درباره‌ی زدلنسر
          </span>

          <h1 className="mt-6 text-display leading-[1.5] font-bold md:text-5xl md:leading-[1.45]">
            اولین قدم کار،
            <br />
            <span className="bg-gradient-to-l from-accent-default to-green bg-clip-text text-transparent">
              امن، شفاف و قابل‌اعتماد
            </span>
          </h1>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {ABOUT_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="text-section-title font-bold text-accent-default">
                  {item.value}
                </dt>
                <dd className="mt-1 text-caption leading-5 text-ocean-7">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}
