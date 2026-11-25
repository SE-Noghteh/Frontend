
import { create } from "zustand";

import { mockEmployerAds } from "@/data/mockEmployerAds";

import type {
  EmployerAd,
  EmployerAdStatus,
} from "@/types/Employer/employer";

interface EmployerState {
  ads: EmployerAd[];

  addAd: (ad: EmployerAd) => void;

  updateAd: (
    id: string,
    changes: Partial<Omit<EmployerAd, "id">>,
  ) => void;

  setAdStatus: (
    id: string,
    status: EmployerAdStatus,
  ) => void;

  removeAd: (id: string) => void;
}

export const useEmployerStore = create<EmployerState>((set) => ({
  ads: mockEmployerAds,

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
      ads: state.ads.filter((ad) => ad.id !== id),
    })),
}));
