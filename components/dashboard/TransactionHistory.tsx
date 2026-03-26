/**
 * Transaction History Component
 * Displays recent transactions across all accounts
 */

"use client";

import { useState } from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { Entry } from "@/lib/types";

interface TransactionHistoryProps {
  entries: Entry[];
  isLoading: boolean;
}

const INITIAL_DISPLAY_COUNT = 5;
const MAX_DISPLAY_COUNT = 8;

export function TransactionHistory({
  entries,
  isLoading,
}: TransactionHistoryProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedEntries = showAll
    ? entries.slice(0, MAX_DISPLAY_COUNT)
    : entries.slice(0, INITIAL_DISPLAY_COUNT);

  const hasMore = entries.length > INITIAL_DISPLAY_COUNT;

  return (
    <div
      id="transaction-history"
      className="glass rounded-xl p-4 md:p-6 border border-white/20"
    >
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
        <i className="fas fa-history mr-2 text-blue-400"></i>Transaction History
      </h2>

      <div className="space-y-2 md:space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-gray-400">
            <div className="spinner mx-auto mb-3"></div>
            <p className="text-sm md:text-base">Loading transactions...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fas fa-file-invoice text-3xl md:text-4xl mb-3"></i>
            <p className="text-sm md:text-base">No transactions yet</p>
          </div>
        ) : (
          <>
            {displayedEntries.map((entry: Entry) => (
              <div
                key={entry.id}
                className="transaction-item glass rounded-lg p-2 md:p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 border border-white/20 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-gray-300 break-words">
                    {entry.description}
                  </p>
                  <p className="text-xs text-gray-400 font-mono tracking-tight">
                    {formatDate(entry.created_at)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  {parseFloat(entry.debit) > 0 && (
                    <p className="text-xs md:text-sm text-red-400 font-semibold">
                      -{formatCurrency(entry.debit)}
                    </p>
                  )}
                  {parseFloat(entry.credit) > 0 && (
                    <p className="text-xs md:text-sm text-green-400 font-semibold">
                      +{formatCurrency(entry.credit)}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {hasMore && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 transition text-xs md:text-sm font-medium"
              >
                {showAll
                  ? `Show Less (${entries.length} total)`
                  : `Show More (${entries.length} total)`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
