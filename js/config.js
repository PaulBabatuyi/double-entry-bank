/**
 * Application Configuration
 * Contains all configuration constants and API endpoint definitions
 */

// API Base URL resolution strategy:
// 1) explicit window.API_BASE_URL override (recommended for deployments)
// 2) same-origin in local/dev backend-served mode
// 3) Render backend fallback for Vercel/static-hosted frontend
const DEFAULT_BACKEND_URL = "https://double-entry-bank-go.onrender.com";

function resolveAPIBaseURL() {
  const explicit = (window.API_BASE_URL || "").trim();
  if (explicit) {
    return explicit;
  }

  const host = window.location.hostname;
  const isVercelHost = host.endsWith(".vercel.app");
  const isCustomFrontendDomain = host === "golangbank.app";

  if (isVercelHost || isCustomFrontendDomain) {
    return DEFAULT_BACKEND_URL;
  }

  return window.location.origin;
}

const API_BASE_URL = resolveAPIBaseURL();

// API Endpoints
const API_ENDPOINTS = {
  REGISTER: "/register",
  LOGIN: "/login",
  ACCOUNTS: "/accounts",
  DEPOSIT: (accountId) => `/accounts/${accountId}/deposit`,
  WITHDRAW: (accountId) => `/accounts/${accountId}/withdraw`,
  TRANSFERS: "/transfers",
  ENTRIES: (accountId) => `/accounts/${accountId}/entries`,
  RECONCILE: (accountId) => `/accounts/${accountId}/reconcile`,
  TRANSACTIONS: (txId) => `/transactions/${txId}`,
  HEALTH: "/health",
};

// Toast notification duration (milliseconds)
const TOAST_DURATION = 4000;

// Currency settings
const CURRENCY = {
  CODE: "USD",
  SYMBOL: "$",
  LOCALE: "en-US",
};

// Local storage keys
const STORAGE_KEYS = {
  TOKEN: "token",
  EMAIL: "email",
};
