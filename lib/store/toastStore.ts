/**
 * Toast Store - Zustand
 * Manages toast notifications state
 */

"use client";

import { create } from "zustand";
import { TOAST_DURATION } from "@/lib/config";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

export interface ToastStore {
  toasts: Toast[];
  showToast: (title: string, description?: string, type?: ToastType) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (
    title: string,
    description?: string,
    type: ToastType = "info",
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { id, title, description, type };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-hide after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, TOAST_DURATION);
  },

  hideToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));
