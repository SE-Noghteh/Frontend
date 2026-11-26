import { create } from "zustand";

import { mockEmployerAds } from "@/data/mockEmployerAds";

import type {
  EmployerAd,
  EmployerAdStatus,
} from "@/types/Employer/employer";

export interface AdUpdateNotification {
  id: string;
  adId: string;
  applicantId: string;
  title: string;
  message: string;
  changedFields: string[];
  createdAt: string;
  read: boolean;
}

interface EmployerState {
  ads: EmployerAd[];

  notifications: AdUpdateNotification[];

  addAd: (ad: EmployerAd) => void;

  updateAd: (
    id: string,
    changes: Partial<Omit<EmployerAd, "id">>,
  ) => void;

  notifyApplicants: (
    adId: string,
    applicantIds: string[],
    changedFields: string[],
  ) => void;

  setAdStatus: (
    id: string,
    status: EmployerAdStatus,
  ) => void;

  removeAd: (id: string) => void;
}

export const useEmployerStore = create<EmployerState>(
  (set) => ({
    ads: mockEmployerAds,

    notifications: [],

    addAd: (ad) =>
      set((state) => ({
        ads: [ad, ...state.ads],
      })),

    updateAd: (id, changes) =>
      set((state) => ({
        ads: state.ads.map((ad) =>
          ad.id === id
            ? { ...ad, ...changes }
            : ad,
        ),
      })),

    notifyApplicants: (
      adId,
      applicantIds,
      changedFields,
    ) =>
      set((state) => {
        const ad = state.ads.find(
          (item) => item.id === adId,
        );

        if (!ad || changedFields.length === 0) {
          return state;
        }

        const notifications = [
          ...new Set(applicantIds),
        ].map((applicantId) => ({
          id: crypto.randomUUID(),
          adId,
          applicantId,

          title: "تغییر اطلاعات آگهی",

          message:
            `اطلاعات آگهی «${ad.title}» تغییر کرده است. ` +
            `موارد تغییرکرده: ${changedFields.join("، ")}. ` +
            "لطفاً شرایط جدید آگهی را بررسی کنید.",

          changedFields: [...changedFields],
          createdAt: new Date().toISOString(),
          read: false,
        }));

        return {
          notifications: [
            ...notifications,
            ...state.notifications,
          ],
        };
      }),

    setAdStatus: (id, status) =>
      set((state) => ({
        ads: state.ads.map((ad) =>
          ad.id === id
            ? { ...ad, status }
            : ad,
        ),
      })),

    removeAd: (id) =>
      set((state) => ({
        ads: state.ads.filter(
          (ad) => ad.id !== id,
        ),
      })),
  }),
);