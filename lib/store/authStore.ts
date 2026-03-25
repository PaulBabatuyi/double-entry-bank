/**
 * Auth Store - Zustand
 * Centralized state management for authentication and user data
 */

"use client";

import { create } from "zustand";
import type { Account, User } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/config";
import { normalizeAccounts } from "@/lib/utils";

export interface AuthStore {
  // State
  user: User | null;
  accounts: Account[];
  isHydrated: boolean;

  // Actions
  setToken: (token: string) => void;
  setEmail: (email: string) => void;
  setAccounts: (accounts: Account[]) => void;
  hydrate: () => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accounts: [],
  isHydrated: false,

  setToken: (token: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, token } : { email: "", token },
    }));
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      // Also set in cookies for server-side middleware/proxy
      document.cookie = `token=${token}; path=/; SameSite=Lax`;
    }
  },

  setEmail: (email: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, email } : { email, token: "" },
    }));
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.EMAIL, email);
    }
  },

  setAccounts: (accounts: Account[]) => {
    set({ accounts: normalizeAccounts(accounts) });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const email = localStorage.getItem(STORAGE_KEYS.EMAIL);

    if (token && email) {
      set({
        user: { token, email },
        isHydrated: true,
      });
    } else {
      set({ isHydrated: true });
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.EMAIL);
      // Clear cookie
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    set({
      user: null,
      accounts: [],
    });
  },

  isAuthenticated: () => {
    const { user } = get();
    return !!user?.token;
  },
}));
