/**
 * In-memory state of the seeker's collaborations (mock data for now).
 * Each action is where an API call will go once the backend exists.
 */

import { create } from "zustand";

import { mockCollabs } from "@/data/mockCollabs";
import type { CollabState, CollabWorkStage, SeekerCollab } from "@/types/Seeker/collab";
import type { SeekerAdFile } from "@/types/Seeker/seeker";

interface CollabStoreState {
  collabs: SeekerCollab[];
  setState: (collabId: string, state: CollabState) => void;
  /** Final acceptance sends the agreement to a parent only when approval is required. */
  acceptTerms: (collabId: string, requiresParentApproval: boolean) => void;
  addStage: (collabId: string, stage: Omit<CollabWorkStage, "id" | "date">) => void;
  submitDelivery: (collabId: string, files: SeekerAdFile[]) => void;
}

const TODAY = "1405/09/12";

export const useCollabStore = create<CollabStoreState>((set) => ({
  collabs: mockCollabs,

  setState: (collabId, state) =>
    set((current) => ({
      collabs: current.collabs.map((collab) => (collab.id === collabId ? { ...collab, state } : collab)),
    })),

  acceptTerms: (collabId, requiresParentApproval) =>
    set((current) => ({
      collabs: current.collabs.map((collab) =>
        collab.id === collabId
          ? {
              ...collab,
              state: requiresParentApproval ? "agreementWaitingParent" : "paymentWaiting",
              parentStatus: requiresParentApproval ? "pending" : "notRequired",
              parentSentAt: requiresParentApproval ? TODAY : "",
              parentNote: undefined,
            }
          : collab,
      ),
    })),

  addStage: (collabId, stage) =>
    set((current) => ({
      collabs: current.collabs.map((collab) =>
        collab.id === collabId
          ? {
              ...collab,
              stages: [{ ...stage, id: `stage-${collab.stages.length + 1}`, date: TODAY }, ...collab.stages],
            }
          : collab,
      ),
    })),

  submitDelivery: (collabId, files) =>
    set((current) => ({
      collabs: current.collabs.map((collab) =>
        collab.id === collabId ? { ...collab, state: "deliveryWaiting", deliveryFiles: files } : collab,
      ),
    })),
}));
