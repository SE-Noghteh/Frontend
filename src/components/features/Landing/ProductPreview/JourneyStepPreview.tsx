import type { JourneyPreviewId } from "@/types/Landing/landing";

import { AgreementPreview } from "./AgreementPreview";
import { CalendarPreview } from "./CalendarPreview";
import { ChatPreview } from "./ChatPreview";
import { ConsentPreview } from "./ConsentPreview";
import { ResumePreview } from "./ResumePreview";
import { SignupPreview } from "./SignupPreview";
import { WalletPreview } from "./WalletPreview";

interface JourneyStepPreviewProps {
  previewId: JourneyPreviewId;
}

/** Picks the product UI sample that illustrates a journey step. */
export function JourneyStepPreview({ previewId }: JourneyStepPreviewProps) {
  switch (previewId) {
    case "signup":
      return <SignupPreview />;
    case "resume":
      return <ResumePreview />;
    case "consent":
      return <ConsentPreview />;
    case "agreement":
      return <AgreementPreview />;
    case "workspace":
      return (
        <div className="space-y-3">
          <ChatPreview />
          <CalendarPreview />
        </div>
      );
    case "wallet":
      return <WalletPreview />;
  }
}
