import type { EmployerAd } from "@/types/Employer/employer";
import type { SeekerAd } from "@/types/Seeker/seeker";
import { useEmployerStore } from "@/store/employer/useEmployerStore";
import { canReceiveApplicants, hasOpenDeadline } from "@/utils/employerAdStatus";

// Explicit mapping of the shared demo opportunities. ID 4 represents different
// opportunities in the two fixtures and must not be linked by ID alone.
export const LINKED_DEMO_AD_IDS = new Set(["1", "2", "3", "5"]);
export function isSeekerAdOpen(ad: SeekerAd, today?: string, employerAds: EmployerAd[] = useEmployerStore.getState().ads): boolean {
  if (ad.application === "expired" || !hasOpenDeadline(ad.deadline, today)) return false;
  if (!LINKED_DEMO_AD_IDS.has(ad.id)) return true;
  const employerAd = employerAds.find(item => item.id === ad.id);
  return Boolean(employerAd && canReceiveApplicants(employerAd));
}
