/**
 * Providers Component
 * Client-side providers for state hydration and initialization
 */

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    // Hydrate auth store from localStorage on mount (client-side only)
    hydrate();

    // Listen for auth logout events (e.g., from 401 responses)
    const handleLogout = () => {
      useAuthStore.getState().logout();
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [hydrate]);

  // Always render children - hydration happens in useEffect above
  // The page component will handle displaying loading state if needed
  return <>{children}</>;
}
