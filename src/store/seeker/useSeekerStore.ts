/**
 * Request/collaboration state remains mock until the backend exposes those
 * endpoints. Opportunity listing/detail itself is now server-backed.
 */

import { create } from "zustand";

import { mockAds, mockRequests } from "@/data/mockSeeker";
import type { Opportunity } from "@/types/Opportunity/opportunity";
import type {
  SeekerAd,
  SeekerRequest,
} from "@/types/Seeker/seeker";
import { opportunityToSeekerAd } from "@/utils/opportunityToSeekerAd";

interface SeekerState {
  ads: SeekerAd[];
  requests: SeekerRequest[];

  toggleSaved: (adId: string) => void;

  /**
   * Legacy mock-ad submit action retained for existing request/collab demos.
   */
  submitApplication: (
    adId: string,
    message: string,
  ) => string;

  /**
   * Creates a mock request from a real backend opportunity.
   */
  submitOpportunityApplication: (
    opportunity: Opportunity,
    message: string,
  ) => string;

  editRequest: (
    requestId: string,
    message: string,
  ) => void;

  cancelRequest: (requestId: string) => void;
}

const TODAY = "1405/08/10";

export const useSeekerStore = create<SeekerState>(
  (set, get) => ({
    ads: mockAds,
    requests: mockRequests,

    toggleSaved: (adId) =>
      set((state) => ({
        ads: state.ads.map((ad) =>
          ad.id === adId
            ? { ...ad, saved: !ad.saved }
            : ad,
        ),
      })),

    submitApplication: (adId, message) => {
      const ad = get().ads.find(
        (item) => item.id === adId,
      );

      if (!ad || ad.application !== "open") {
        return "";
      }

      const existing = get().requests.find(
        (request) =>
          request.adId === adId && !request.demoOnly,
      );

      if (existing) return existing.id;

      const id = `new-${get().requests.length + 1}`;

      const request: SeekerRequest = {
        id,
        adId,
        title: ad.title,
        employerName: ad.employerName,
        sentAt: TODAY,
        message,
        employerStatus: "reviewing",
        timeline: {
          sent: `${TODAY} · ۱۰:۲۰`,
        },
        kind: ad.kind,
        budget: ad.budget,
        stipend: ad.stipend,
        deadline: ad.deadline,
      };

      set((state) => ({
        requests: [request, ...state.requests],
        ads: state.ads.map((item) =>
          item.id === adId
            ? {
                ...item,
                application: "sentToEmployer",
              }
            : item,
        ),
      }));

      return id;
    },

    submitOpportunityApplication: (
      opportunity,
      message,
    ) => {
      if (
        opportunity.acceptingApplications === false ||
        opportunity.deadlineInDays < 0
      ) {
        return "";
      }

      const existing = get().requests.find(
        (request) =>
          !request.demoOnly &&
          request.sourceOpportunityId === opportunity.id,
      );

      if (existing) return existing.id;

      const ad = opportunityToSeekerAd(
        opportunity,
        { forRequestStore: true },
      );

      const id = `backend-request-${Date.now()}`;

      const request: SeekerRequest = {
        id,
        adId: ad.id,
        sourceOpportunityId: opportunity.id,
        title: opportunity.title,
        employerName: opportunity.employerName,
        sentAt: TODAY,
        message,
        employerStatus: "reviewing",
        timeline: {
          sent: `${TODAY} · ۱۰:۲۰`,
        },
        kind: ad.kind,
        budget: ad.budget,
        stipend: ad.stipend,
        deadline: ad.deadline,
      };

      set((state) => ({
        requests: [request, ...state.requests],
        ads: [
          ...state.ads.filter(
            (item) => item.id !== ad.id,
          ),
          {
            ...ad,
            application: "sentToEmployer",
          },
        ],
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
                timeline: {
                  sent: `${TODAY} · ۱۰:۲۰`,
                },
              }
            : request,
        ),
      })),

    cancelRequest: (requestId) =>
      set((state) => {
        const target = state.requests.find(
          (request) => request.id === requestId,
        );

        return {
          requests: state.requests.filter(
            (request) => request.id !== requestId,
          ),
          ads: state.ads.map((ad) =>
            target && ad.id === target.adId
              ? { ...ad, application: "open" }
              : ad,
          ),
        };
      }),
  }),
);
