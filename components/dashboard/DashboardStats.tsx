/**
 * Dashboard Stats Component
 * Displays summary stats: accounts, balance, transactions
 */

"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { formatCurrency } from "@/lib/utils";
import type { Entry } from "@/lib/types";

interface DashboardStatsProps {
  transactionCount: number;
}

export function DashboardStats({ transactionCount }: DashboardStatsProps) {
  const accounts = useAuthStore((state) => state.accounts);

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + parseFloat(acc.balance || "0"),
    0,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="glass rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Accounts</p>
            <p className="text-3xl font-bold mt-2">{accounts.length}</p>
          </div>
          <i className="fas fa-wallet text-4xl text-purple-400"></i>
        </div>
      </div>

      <div className="glass rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Balance</p>
            <p className="text-3xl font-bold mt-2">
              {formatCurrency(totalBalance)}
            </p>
          </div>
          <i className="fas fa-coins text-4xl text-green-400"></i>
        </div>
      </div>

      <div className="glass rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Transactions</p>
            <p className="text-3xl font-bold mt-2">{transactionCount}</p>
          </div>
          <i className="fas fa-exchange-alt text-4xl text-blue-400"></i>
        </div>
      </div>
    </div>
  );
}
