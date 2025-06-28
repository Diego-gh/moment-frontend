import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserType } from '../types/User';

interface AuthStateType {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  removeCurrentUser: () => void;
}

const authStore = create<AuthStateType>()(
  devtools((set) => ({
    currentUser: null,
    setCurrentUser: (user: UserType) => set({ currentUser: user }),
    removeCurrentUser: () => set({ currentUser: null }),
  }))
);

export default authStore;
