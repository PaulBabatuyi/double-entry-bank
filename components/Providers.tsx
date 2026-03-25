/**
 * Providers Component
 * Client-side providers for state hydration and initialization
 */

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((state) => state.hydrate);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    // Hydrate auth store from localStorage on mount
    hydrate();

    // Listen for auth logout events (e.g., from 401 responses)
    const handleLogout = () => {
      useAuthStore.getState().logout();
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [hydrate]);

  // Don't render until hydration is complete
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
    );
  }

  return <>{children}</>;
}
