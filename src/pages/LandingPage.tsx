/**
 * Public landing page. Rendered inside PublicLayout (Header / Footer come from the layout).
 */

import { CallToActionSection } from "@/components/features/Landing/CallToActionSection";
import { EmployersSection } from "@/components/features/Landing/EmployersSection";
import { FaqSection } from "@/components/features/Landing/FaqSection";
import { FeaturesSection } from "@/components/features/Landing/FeaturesSection";
import { HeroSection } from "@/components/features/Landing/HeroSection";
import { JourneySection } from "@/components/features/Landing/JourneySection";
import { OpportunitySearchSection } from "@/components/features/Landing/OpportunitySearchSection";
import { RolesSection } from "@/components/features/Landing/RolesSection";
import { StatsSection } from "@/components/features/Landing/StatsSection";
import { TestimonialsSection } from "@/components/features/Landing/TestimonialsSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <OpportunitySearchSection />
      <StatsSection />
      <JourneySection />
      <RolesSection />
      <EmployersSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />
      <CallToActionSection />
    </>
  );
}
