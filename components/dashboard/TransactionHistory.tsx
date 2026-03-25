/**
 * Transaction History Component
 * Displays recent transactions across all accounts
 */

"use client";

import { formatDate, formatCurrency } from "@/lib/utils";
import type { Entry } from "@/lib/types";

interface TransactionHistoryProps {
  entries: Entry[];
  isLoading: boolean;
}

export function TransactionHistory({
  entries,
  isLoading,
}: TransactionHistoryProps) {
  return (
    <div className="glass rounded-xl p-6 border border-white/20 mt-6">
      <h2 className="text-xl font-bold mb-6">
        <i className="fas fa-history mr-2 text-blue-400"></i>Transaction History
      </h2>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-gray-400">
            <div className="spinner mx-auto mb-3"></div>
            <p>Loading transactions...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fas fa-file-invoice text-4xl mb-3"></i>
            <p>No transactions yet</p>
          </div>
        ) : (
          entries.slice(0, 50).map((entry: Entry) => (
            <div
              key={entry.id}
              className="transaction-item glass rounded-lg p-4 flex justify-between items-center border border-white/20 bg-white/5"
            >
              <div>
                <p className="text-sm text-gray-300">{entry.description}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(entry.created_at)}
                </p>
              </div>
              <div className="text-right">
                {parseFloat(entry.debit) > 0 && (
                  <p className="text-red-400 font-semibold">
                    -{formatCurrency(entry.debit)}
                  </p>
                )}
                {parseFloat(entry.credit) > 0 && (
                  <p className="text-green-400 font-semibold">
                    +{formatCurrency(entry.credit)}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
