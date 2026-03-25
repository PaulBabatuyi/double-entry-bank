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
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <i className="fas fa-university text-3xl text-purple-400"></i>
          <div>
            <h1 className="text-xl font-bold">Double-Entry Ledger</h1>
            <p className="text-xs text-gray-400">Fintech Backend in Go</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">{email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>
      </div>
    </header>
  );
}
