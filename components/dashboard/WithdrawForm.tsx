/**
 * Withdraw Form Component
 */

"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";
import { withdraw } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

interface WithdrawFormProps {
  onSuccess: () => Promise<void>;
}

export function WithdrawForm({ onSuccess }: WithdrawFormProps) {
  const accounts = useAuthStore((state) => state.accounts);
  const showToast = useToastStore((state) => state.showToast);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const accountId = formData.get("account") as string;
    const amount = parseFloat(formData.get("amount") as string);

    if (!accountId || !amount) return;

    setIsLoading(true);
    try {
      const { response, data } = await withdraw(accountId, amount);

      if (response.ok) {
        showToast(
          "Withdrawal successful!",
          `Withdrew $${amount.toFixed(2)}`,
          "success",
        );
        (e.target as HTMLFormElement).reset();
        await onSuccess();
      } else {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as Record<string, unknown>).error === "string"
            ? ((data as Record<string, unknown>).error as string)
            : "Insufficient funds or invalid request";
        showToast("Withdrawal failed", errorMessage, "error");
      }
    } catch {
      showToast("Network error", "Please try again", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-xl p-4 md:p-6 border border-white/20">
      <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-red-400">
        <i className="fas fa-arrow-up mr-2"></i>Withdraw
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <select
          name="account"
          required
          disabled={isLoading}
          className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:outline-none text-sm md:text-base text-white disabled:opacity-50 transition"
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({formatCurrency(acc.balance)})
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          required
          min="0.01"
          step="0.01"
          disabled={isLoading}
          className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:outline-none text-sm md:text-base text-white placeholder-gray-500 disabled:opacity-50 transition"
          placeholder="Amount ($)"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Withdraw Funds"}
        </button>
      </form>
    </div>
  );
}
