/**
 * Core TypeScript Types for Double-Entry Bank
 */

export interface User {
  email: string;
  token: string;
}

export interface Account {
  id: string;
  name: string;
  balance: string;
  currency: string;
  created_at: string;
  owner_id: string;
  is_system: boolean;
}

export interface Entry {
  id: string;
  account_id: string;
  debit: string;
  credit: string;
  description: string;
  transaction_id: string;
  operation_type: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  from_account_id: string;
  to_account_id: string;
  amount: number;
  created_at: string;
}

// API Response types
export interface TokenResponse {
  token: string;
}

export interface RegisterResponse {
  token: string;
  email: string;
  user_id: string;
}

export interface MessageResponse {
  message: string;
}

export interface ReconcileResponse {
  matched: boolean;
  message: string;
}

export interface ApiErrorResponse {
  error: string;
}

// API Request/Response wrapper
export interface ApiResponse<T> {
  response: Response;
  data: T;
}
