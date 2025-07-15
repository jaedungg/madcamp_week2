import { create } from 'zustand';

interface ProfileState {
  profileImage: string;
  setProfileImage: (url: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileImage: '/images/profile.png',
  setProfileImage: (url: string) => set({ profileImage: url }),
}));
