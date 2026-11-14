import { AboutCta } from "@/components/features/About/AboutCta";
import { AboutHero } from "@/components/features/About/AboutHero";
import { AboutStory } from "@/components/features/About/AboutStory";
import { AboutPrinciples } from "@/components/features/About/AboutPrinciples";

export default function AboutPage() {
  return (
    <main className="overflow-x-clip text-start">
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutCta />
    </main>
  );
}
