/**
 * In-memory state of the job-seeker dashboard.
 * Backed by mock data for now; the actions are the seams where API calls will go.
 */

import { create } from "zustand";

import { mockAds, mockRequests } from "@/data/mockSeeker";
import type { SeekerAd, SeekerRequest } from "@/types/Seeker/seeker";

interface SeekerState {
  ads: SeekerAd[];
  requests: SeekerRequest[];
  toggleSaved: (adId: string) => void;
  submitApplication: (adId: string, message: string) => string;
  editRequest: (requestId: string, message: string) => void;
  cancelRequest: (requestId: string) => void;
}

const TODAY = "1405/08/10";

export const useSeekerStore = create<SeekerState>((set, get) => ({
  ads: mockAds,
  requests: mockRequests,

  toggleSaved: (adId) =>
    set((state) => ({
      ads: state.ads.map((ad) => (ad.id === adId ? { ...ad, saved: !ad.saved } : ad)),
    })),

  submitApplication: (adId, message) => {
    const ad = get().ads.find((item) => item.id === adId);
    if (!ad) return "";

    const id = `new-${get().requests.length + 1}`;
    const request: SeekerRequest = {
      id,
      adId,
      title: ad.title,
      employerName: ad.employerName,
      sentAt: TODAY,
      message,
      employerStatus: "reviewing",
      timeline: { sent: `${TODAY} · ۱۰:۲۰` },
      kind: ad.kind,
      budget: ad.budget,
      stipend: ad.stipend,
      deadline: ad.deadline,
    };

    set((state) => ({
      requests: [request, ...state.requests],
      ads: state.ads.map((item) => (item.id === adId ? { ...item, application: "sentToEmployer" } : item)),
    }));

    return id;
  },

  editRequest: (requestId, message) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              message,
              sentAt: TODAY,
              employerStatus: "reviewing",
              timeline: { sent: `${TODAY} · ۱۰:۲۰` },
            }
          : request,
      ),
    })),

  cancelRequest: (requestId) =>
    set((state) => {
      const target = state.requests.find((request) => request.id === requestId);
      return {
        requests: state.requests.filter((request) => request.id !== requestId),
        ads: state.ads.map((ad) => (target && ad.id === target.adId ? { ...ad, application: "open" } : ad)),
      };
    }),
}));
