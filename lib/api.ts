/**
 * API Client
 * Handles all HTTP requests to the backend API with authentication
 */

import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from "@/lib/config";
import type {
  ApiResponse,
  Account,
  Entry,
  MessageResponse,
  ReconcileResponse,
  TokenResponse,
  RegisterResponse,
} from "@/lib/types";

/**
 * Make an authenticated API request
 */
export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers || {}) as Record<string, string>),
  };

  // Add authorization header if token exists
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.TOKEN)
      : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store",
      ...options,
      headers,
    });
  } catch (error) {
    const reason =
      error && error instanceof Error ? error.message : "request failed";
    throw new Error(`Request to ${API_BASE_URL}${endpoint} failed: ${reason}`);
  }

  // Handle 401: if the user already has a session token, it has expired
  if (response.status === 401 && token) {
    // Clear token and redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.EMAIL);
      // Emit a custom event that hooks can listen to
      window.dispatchEvent(new Event("auth:logout"));
    }
    throw new Error("Session expired - please login again");
  }

  let data: T;
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text } as T;
    }
  }

  return { response, data };
}

/**
 * Register a new user
 */
export async function register(
  email: string,
  password: string,
): Promise<ApiResponse<RegisterResponse>> {
  return request<RegisterResponse>(API_ENDPOINTS.REGISTER, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Login a user
 */
export async function login(
  email: string,
  password: string,
): Promise<ApiResponse<TokenResponse>> {
  return request<TokenResponse>(API_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Get all user accounts
 */
export async function getAccounts(): Promise<ApiResponse<Account[]>> {
  return request<Account[]>(API_ENDPOINTS.ACCOUNTS);
}

/**
 * Create a new account
 */
export async function createAccount(
  name: string,
): Promise<ApiResponse<Account>> {
  return request<Account>(API_ENDPOINTS.ACCOUNTS, {
    method: "POST",
    body: JSON.stringify({ name, currency: "USD" }),
  });
}

/**
 * Deposit funds into an account
 */
export async function deposit(
  accountId: string,
  amount: number,
): Promise<ApiResponse<MessageResponse>> {
  return request<MessageResponse>(API_ENDPOINTS.DEPOSIT(accountId), {
    method: "POST",
    body: JSON.stringify({ amount: amount.toString(), currency: "USD" }),
  });
}

/**
 * Withdraw funds from an account
 */
export async function withdraw(
  accountId: string,
  amount: number,
): Promise<ApiResponse<MessageResponse>> {
  return request<MessageResponse>(API_ENDPOINTS.WITHDRAW(accountId), {
    method: "POST",
    body: JSON.stringify({ amount: amount.toString(), currency: "USD" }),
  });
}

/**
 * Transfer funds between accounts
 */
export async function transfer(
  fromAccountId: string,
  toAccountId: string,
  amount: number,
): Promise<ApiResponse<MessageResponse>> {
  return request<MessageResponse>(API_ENDPOINTS.TRANSFERS, {
    method: "POST",
    body: JSON.stringify({
      from_id: fromAccountId,
      to_id: toAccountId,
      amount: amount.toString(),
      currency: "USD",
    }),
  });
}

/**
 * Get account entries (transaction history)
 */
export async function getEntries(
  accountId: string,
): Promise<ApiResponse<Entry[]>> {
  return request<Entry[]>(API_ENDPOINTS.ENTRIES(accountId));
}

/**
 * Reconcile an account balance against ledger entries
 */
export async function reconcileAccount(
  accountId: string,
): Promise<ApiResponse<ReconcileResponse>> {
  return request<ReconcileResponse>(API_ENDPOINTS.RECONCILE(accountId));
}

/**
 * Get a full transaction view by transaction ID
 */
export async function getTransaction(
  txId: string,
): Promise<ApiResponse<Entry[]>> {
  return request<Entry[]>(API_ENDPOINTS.TRANSACTIONS(txId));
}
