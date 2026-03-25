/**
 * Utility Functions
 * Reusable helper functions
 */

import { CURRENCY } from "@/lib/config";

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number | string): string {
  const num = parseFloat(String(amount)) || 0;
  return (
    CURRENCY.SYMBOL +
    num.toLocaleString(CURRENCY.LOCALE, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Truncate a string to a specified length
 */
export function truncate(str: string | undefined, length: number = 8): string {
  if (!str || str.length <= length) return str || "";
  return str.substring(0, length) + "...";
}

/**
 * Format a date
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return dateString;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate amount
 */
export function isValidAmount(amount: string | number): boolean {
  const num = parseFloat(String(amount));
  return !isNaN(num) && num > 0;
}

/**
 * Normalize account data - convert string balance to number
 */
export function normalizeAccounts(accounts: any[]): any[] {
  return (accounts || []).map((acc) => ({
    ...acc,
    balance: typeof acc.balance === "string" ? parseFloat(acc.balance) : acc.balance || 0,
  }));
}
