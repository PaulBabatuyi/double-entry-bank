/**
 * Header Component
 * Navigation header with user info and logout
 */

"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";

export function Header() {
  const router = useRouter();
  const email = useAuthStore((state) => state.user?.email);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useToastStore((state) => state.showToast);

  const handleLogout = () => {
    logout();
    showToast("Logged out", "Come back soon!", "info");
    router.push("/auth");
  };

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        {/* Header Layout - Logo on left, Email & Logout on right */}
        <div className="flex justify-between items-start md:items-center gap-3">
          {/* Logo & Title Section */}
          <div className="flex items-center space-x-2 min-w-0">
            <i className="fas fa-university text-2xl md:text-3xl text-purple-400 flex-shrink-0"></i>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold truncate">
                Double-Entry Ledger
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Fintech Backend in Go
              </p>
            </div>
          </div>

          {/* Email & Logout Section - Stacked on mobile, horizontal on desktop */}
          <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-3">
            <span className="text-xs md:text-sm text-gray-300 truncate">
              {email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500/80 hover:bg-red-600 px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition flex-shrink-0 whitespace-nowrap"
              title="Logout"
            >
              <i className="fas fa-sign-out-alt mr-1 hidden sm:inline"></i>
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden text-xs">Exit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
