import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT_PRINCIPLES } from "@/data/aboutContent";
import type { AboutSideTone } from "@/types/About/about";

import { PrincipleIcon } from "./PrincipleIcon";

const CARD_TONES: Record<AboutSideTone, { card: string; icon: string }> = {
  peach: { card: "bg-brand-peach-soft", icon: "bg-accent-default text-charcoal" },
  blue: { card: "bg-ocean-8", icon: "bg-ocean-blue text-white" },
  green: { card: "bg-green-7", icon: "bg-green text-charcoal" },
};

/** Desktop: two rows of two cards; widths differ but each card hugs its text. */
const CARD_WIDTHS = [
  "md:w-[27rem]",
  "md:w-[20rem]",
  "md:w-[20rem]",
  "md:w-[27rem]",
];

export function AboutPrinciples() {
  return (
    <section className="relative isolate overflow-hidden bg-blue py-14 text-white md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -end-24 size-80 rounded-full bg-accent-default/20 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-start">
          <SectionLabel isOnDark>اصول ما</SectionLabel>
        </Reveal>

        <div className="mt-8 flex flex-col items-center gap-3 md:mx-auto md:mt-10 md:max-w-[49rem] md:flex-row md:flex-wrap md:items-start md:justify-center md:gap-4">
          {ABOUT_PRINCIPLES.map((principle, index) => {
            const tone = CARD_TONES[principle.tone];
            return (
              <Reveal
                key={principle.id}
                delay={index * 100}
                className={`w-[84%] ${CARD_WIDTHS[index]}`}
              >
                <div
                  className={`group relative overflow-hidden rounded-2xl p-4 text-start md:p-5 text-text-primary transition duration-300 hover:-translate-y-1 ${tone.card}`}
                >
                  <PrincipleIcon
                    name={principle.icon}
                    className="pointer-events-none absolute -bottom-5 -end-3 size-20 md:-bottom-6 md:-end-4 md:size-28 text-white/60 transition duration-500 group-hover:rotate-6 group-hover:scale-105"
                  />
                  <span
                    className={`relative flex size-9 items-center justify-center rounded-lg md:size-10 ${tone.icon}`}
                  >
                    <PrincipleIcon name={principle.icon} className="size-5" />
                  </span>
                  <h3 className="relative mt-3 text-body font-bold">
                    {principle.title}
                  </h3>
                  <p className="relative mt-1 max-w-md text-caption leading-6 md:text-label text-text-secondary">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
