import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT_STORY } from "@/data/aboutContent";

export function AboutStory() {
  const { paragraphs } = ABOUT_STORY;
  const lead = paragraphs[0];
  const closing = paragraphs[paragraphs.length - 1];
  const middle = paragraphs.slice(1, -1);

  return (
    <section className="relative overflow-hidden bg-background-page py-14 md:py-24">
      <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-6 md:gap-14 md:grid-cols-[1.35fr_1fr]">
        <Reveal className="text-start">
          <SectionLabel>{ABOUT_STORY.eyebrow}</SectionLabel>
          <h2 className="mt-4 text-section-title leading-[1.7] font-bold md:text-page-title text-text-primary md:text-4xl">
            {ABOUT_STORY.title}
          </h2>

          <p className="mt-8 text-card-title leading-10 font-medium text-text-primary">
            {lead}
          </p>

          {middle.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 text-body leading-9 text-text-secondary"
            >
              {paragraph}
            </p>
          ))}

          <p className="mt-8 border-s-4 border-accent-default ps-5 text-card-title leading-9 font-bold text-text-primary">
            {closing}
          </p>
        </Reveal>

        <Reveal delay={150} className="space-y-5">
          <figure className="relative overflow-hidden rounded-3xl bg-brand-peach-soft p-5 text-start md:rounded-[2rem] md:p-8">
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -end-10 size-44 rounded-full bg-accent-default/50"
            />
            <span
              aria-hidden="true"
              className="absolute top-2 start-6 text-8xl leading-none font-bold text-accent-default"
            >
              ”
            </span>
            <blockquote className="relative pt-8 text-body leading-9 md:pt-10 md:text-section-title md:leading-[1.9] font-bold text-text-primary">
              {ABOUT_STORY.quote}
            </blockquote>
          </figure>

          <div className="rounded-3xl border border-border-decorative bg-white p-5 md:rounded-[2rem] md:p-7 text-start">
            <p className="text-label font-semibold text-interface-secondary">
              {ABOUT_STORY.concernsTitle}
            </p>
            <ul className="mt-4 space-y-4">
              {ABOUT_STORY.concerns.map((concern) => (
                <li key={concern} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-3 size-2.5 shrink-0 rounded-full bg-accent-default"
                  />
                  <span className="leading-7 text-text-primary">{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
