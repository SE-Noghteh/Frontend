/** In-memory state of the job-seeker dashboard. Replace with API calls when the backend is ready. */
import { create } from "zustand";
import { getActiveMockAdDates } from "@/data/mockAdDates";
import { mockAds, mockRequests } from "@/data/mockSeeker";
import type { SeekerAd, SeekerRequest } from "@/types/Seeker/seeker";
import { isSeekerAdOpen } from "@/utils/seekerAdAvailability";
import { formatAdDeadline } from "@/utils/employerAdStatus";
import { getTodayISO } from "@/utils/dateValidation";

interface SeekerState {
  ads: SeekerAd[];
  requests: SeekerRequest[];
  toggleSaved: (adId: string) => void;
  submitApplication: (adId: string, message: string, needsParent: boolean) => string;
  editRequest: (requestId: string, message: string) => void;
  cancelRequest: (requestId: string) => void;
}
export const useSeekerStore = create<SeekerState>((set, get) => ({
  ads: mockAds.map(ad => {
    const dates = getActiveMockAdDates(ad.id);
    return dates && ad.application !== "expired" ? { ...ad, deadline: dates.deadline } : ad;
  }),
  requests: mockRequests,
  toggleSaved: (adId) => set(state => ({ads: state.ads.map(ad => ad.id === adId ? {...ad, saved: !ad.saved} : ad)})),
  submitApplication: (adId, message, needsParent) => {
    const ad = get().ads.find(item => item.id === adId);
    // Check again at submission, not only when opening the dialog.
    if (!ad || !isSeekerAdOpen(ad) || !message.trim()) return "";
    const id = `new-${crypto.randomUUID()}`;
    const today = formatAdDeadline(getTodayISO());
    const request: SeekerRequest = {
      id, adId, title: ad.title, employerName: ad.employerName,
      sentAt: today, message,
      parentStatus: needsParent ? "pending" : "notRequired",
      employerStatus: needsParent ? "waitingParent" : "reviewing",
      timeline: {sent: today}, kind: ad.kind, budget: ad.budget, stipend: ad.stipend, deadline: ad.deadline,
    };
    set(state => ({requests:[request,...state.requests], ads:state.ads.map(item => item.id === adId ? {...item, application:needsParent ? "pendingParent" : "sentToEmployer"} : item)}));
    return id;
  },
  editRequest: (requestId, message) => set(state => ({requests:state.requests.map(request => request.id === requestId ? {...request,message,parentStatus:request.parentStatus === "notRequired" ? "notRequired" : "pending",employerStatus:request.parentStatus === "notRequired" ? "reviewing" : "waitingParent",parentNote:undefined} : request)})),
  cancelRequest: (requestId) => set(state => {
    const target = state.requests.find(request => request.id === requestId);
    return {requests:state.requests.filter(request => request.id !== requestId),ads:state.ads.map(ad => target && ad.id === target.adId ? {...ad,application:isSeekerAdOpen(ad) ? "open" : "expired"} : ad)};
  }),
}));
