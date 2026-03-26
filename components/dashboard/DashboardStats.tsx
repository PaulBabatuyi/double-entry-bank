/**
 * Dashboard Stats Component
 * Displays summary stats: accounts, balance, transactions
 */

"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { formatCurrency } from "@/lib/utils";

interface DashboardStatsProps {
  transactionCount: number;
}

export function DashboardStats({ transactionCount }: DashboardStatsProps) {
  const accounts = useAuthStore((state) => state.accounts);

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + parseFloat(acc.balance || "0"),
    0,
  );

  const handleScrollToTransactions = () => {
    const element = document.getElementById("transaction-history");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-4 md:mb-8">
      <div className="glass rounded-xl p-2 sm:p-4 md:p-6 border border-white/20 hover:border-white/40 transition">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">
              Total Accounts
            </p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
              {accounts.length}
            </p>
          </div>
          <i className="fas fa-wallet text-2xl sm:text-3xl md:text-4xl text-purple-400 flex-shrink-0"></i>
        </div>
      </div>

      <div className="glass rounded-xl p-2 sm:p-4 md:p-6 border border-white/20 hover:border-white/40 transition">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">
              Total Balance
            </p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
              {formatCurrency(totalBalance)}
            </p>
          </div>
          <i className="fas fa-coins text-2xl sm:text-3xl md:text-4xl text-green-400 flex-shrink-0"></i>
        </div>
      </div>

      <button
        onClick={handleScrollToTransactions}
        className="glass rounded-xl p-2 sm:p-4 md:p-6 border border-white/20 hover:border-blue-400/60 transition text-left group cursor-pointer bg-white/5 hover:bg-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium group-hover:text-blue-300 transition">
              Transactions
            </p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 group-hover:text-blue-300 transition">
              {transactionCount}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <i className="fas fa-exchange-alt text-2xl sm:text-3xl md:text-4xl text-blue-400 flex-shrink-0"></i>
            <i className="fas fa-chevron-down text-xs text-blue-400/60 mt-0.5 sm:mt-1"></i>
          </div>
        </div>
      </button>
    </div>
  );
}
