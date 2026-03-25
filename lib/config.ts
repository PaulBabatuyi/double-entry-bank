/**
 * Application Configuration
 * Contains API base URL resolution and constants
 */

// API Base URL resolution
// Uses NEXT_PUBLIC_API_BASE_URL environment variable in production
// Falls back to same-origin or defaults to Render backend
export function getAPIBaseURL(): string {
  // In production/Vercel, use environment variable
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // If running in Node (SSR), use env var if available
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // In browser, use same-origin by default
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isVercelHost = host.endsWith(".vercel.app");
    const isCustomFrontendDomain = host === "golangbank.app";

    if (isVercelHost || isCustomFrontendDomain) {
      return "https://double-entry-bank-go.onrender.com";
    }

    return window.location.origin;
  }

  // Server-side fallback
  return "https://double-entry-bank-go.onrender.com";
}

export const API_BASE_URL = getAPIBaseURL();

// API Endpoints
export const API_ENDPOINTS = {
  REGISTER: "/register",
  LOGIN: "/login",
  ACCOUNTS: "/accounts",
  DEPOSIT: (accountId: string) => `/accounts/${accountId}/deposit`,
  WITHDRAW: (accountId: string) => `/accounts/${accountId}/withdraw`,
  TRANSFERS: "/transfers",
  ENTRIES: (accountId: string) => `/accounts/${accountId}/entries`,
  RECONCILE: (accountId: string) => `/accounts/${accountId}/reconcile`,
  TRANSACTIONS: (txId: string) => `/transactions/${txId}`,
  HEALTH: "/health",
} as const;

// Toast notification duration (milliseconds)
export const TOAST_DURATION = 4000;

// Currency settings
export const CURRENCY = {
  CODE: "USD",
  SYMBOL: "$",
  LOCALE: "en-US",
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  EMAIL: "email",
} as const;
