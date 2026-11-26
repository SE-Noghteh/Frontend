import { create } from "zustand";

export type ToastTone = "success" | "error";

export interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastState {
  toast: ToastMessage | null;
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  hideToast: () => void;
}

let nextId = 1;

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (toast) => set({ toast: { ...toast, id: nextId++ } }),
  hideToast: () => set({ toast: null }),
}));
