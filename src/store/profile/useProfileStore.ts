/**
 * SAMPLE FILE
 *
 * Global profile-related state belongs in this store.
 */

import { create } from "zustand";
import type { UserProfile } from "@/types/User/user";

interface ProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,

  setProfile: (profile) => {
    set({ profile });
  },
}));