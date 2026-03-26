/**
 * Auth Page
 * Login and registration form
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";
import { login, register } from "@/lib/api";
import { getAPIBaseURL } from "@/lib/config";

export default function AuthPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setEmail = useAuthStore((state) => state.setEmail);
  const showToast = useToastStore((state) => state.showToast);

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [authMessage, setAuthMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthMessage("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { response, data } = await login(email, password);

      if (response.ok && data && data.token) {
        setToken(data.token);
        setEmail(email);
        showToast("Welcome back!", "Login successful", "success");
        router.push("/dashboard");
      } else if (response.status === 401) {
        setAuthMessage("Invalid email or password. Please try again.");
      } else {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as Record<string, unknown>).error === "string"
            ? (data as Record<string, unknown>).error
            : "Login failed. Please try again.";
        setAuthMessage(errorMessage as string);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Network error. Check your connection and try again.";
      setAuthMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthMessage("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("register-email") as string;
    const password = formData.get("register-password") as string;

    try {
      const { response, data } = await register(email, password);

      if (response.ok && data && data.token) {
        setToken(data.token);
        setEmail(email);
        showToast(
          "Account created!",
          "Welcome to the banking system",
          "success",
        );
        router.push("/dashboard");
      } else if (response.status === 409) {
        setAuthMessage("An account with this email already exists.");
      } else {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as Record<string, unknown>).error === "string"
            ? (data as Record<string, unknown>).error
            : "Registration failed. Please try again.";
        setAuthMessage(errorMessage as string);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Network error. Check your connection and try again.";
      setAuthMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center space-x-2 md:space-x-3">
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
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-md flex-1">
        <div className="glass rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
          <div className="text-center mb-6 md:mb-8">
            <i className="fas fa-university text-4xl md:text-5xl text-purple-400 mb-3 md:mb-4"></i>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Banking Ledger System
            </h2>
            <p className="text-gray-300 text-xs md:text-sm">
              Production-grade double-entry bookkeeping
            </p>
          </div>

          {/* Auth Tabs */}
          <div className="flex space-x-2 md:space-x-4 mb-5 md:mb-6">
            <button
              onClick={() => {
                setActiveTab("login");
                setAuthMessage("");
              }}
              className={`flex-1 py-2 md:py-2 rounded-lg font-semibold text-sm md:text-base transition ${
                activeTab === "login" ? "auth-tab-active" : "auth-tab-inactive"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab("register");
                setAuthMessage("");
              }}
              className={`flex-1 py-2 md:py-2 rounded-lg font-semibold text-sm md:text-base transition ${
                activeTab === "register"
                  ? "auth-tab-active"
                  : "auth-tab-inactive"
              }`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isLoading}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-sm md:text-base text-white placeholder-gray-500 disabled:opacity-50 transition"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  disabled={isLoading}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-sm md:text-base text-white placeholder-gray-500 disabled:opacity-50 transition"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block">
                    <span className="spinner inline-block mr-2"></span>
                    Logging in...
                  </span>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2 hidden sm:inline"></i>
                    Login
                  </>
                )}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="register-email"
                  required
                  disabled={isLoading}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-sm md:text-base text-white placeholder-gray-500 disabled:opacity-50 transition"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="register-password"
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-sm md:text-base text-white placeholder-gray-500 disabled:opacity-50 transition"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Password must be at least 6 characters
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block">
                    <span className="spinner inline-block mr-2"></span>
                    Creating Account...
                  </span>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2 hidden sm:inline"></i>
                    Create Account
                  </>
                )}
              </button>
            </form>
          )}

          {authMessage && (
            <div className="mt-4 p-3 rounded-lg text-xs md:text-sm text-center bg-red-500/20 border border-red-500/50 text-red-200">
              {authMessage}
            </div>
          )}
        </div>

        {/* Tech Stack Info */}
        <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-gray-400">
          <p className="mb-2">🚀 Built with Go, PostgreSQL, SQLC & JWT</p>
          <p className="px-2">
            Double-entry bookkeeping • Atomic transactions • Audit trail
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 md:px-6 py-6 md:py-8 text-center text-xs md:text-sm text-gray-300 border-t border-white/10">
        <div className="space-y-3">
          {/* API Links */}
          <p className="break-words">
            Learn the backend API in Swagger:
            <a
              href={`${getAPIBaseURL()}/swagger/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline ml-1 md:ml-2 inline-block"
            >
              Open API Docs
            </a>
            <span className="text-gray-600"> • </span>
            <a
              href={`${getAPIBaseURL()}/health`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-green-200 underline"
            >
              Health Check
            </a>
          </p>

          {/* GitHub Link */}
          <p>
            <a
              href="https://github.com/paulbabatuyi/double-entry-bank"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition group"
            >
              <i className="fab fa-github text-lg group-hover:scale-110 transition"></i>
              <span>View on GitHub</span>
            </a>
          </p>

          {/* Copyright */}
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Paul Babatuyi. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
