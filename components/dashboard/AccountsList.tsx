/**
 * Accounts List Component
 * Displays list of user accounts with balances
 * Mobile: Shows 3 accounts by default with "Show More" option
 */

"use client";

import { useState } from "react";
import { truncate, formatCurrency } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/authStore";
import type { Account } from "@/lib/types";

interface AccountsListProps {
  onReconcile: (accountId: string, accountName: string) => Promise<void>;
  onOpenCreateModal: () => void;
}

const MOBILE_DISPLAY_LIMIT = 3;

export function AccountsList({
  onReconcile,
  onOpenCreateModal,
}: AccountsListProps) {
  const accounts = useAuthStore((state) => state.accounts);
  const [showAllAccounts, setShowAllAccounts] = useState(false);

  const displayedAccounts = showAllAccounts
    ? accounts
    : accounts.slice(0, MOBILE_DISPLAY_LIMIT);

  const hasMoreAccounts = accounts.length > MOBILE_DISPLAY_LIMIT;

  return (
    <div className="glass rounded-xl p-4 md:p-6 border border-white/20">
      <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold">
          <i className="fas fa-wallet mr-2 text-purple-400"></i>My Accounts
        </h2>
        <button
          onClick={onOpenCreateModal}
          className="bg-purple-500 hover:bg-purple-600 px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition whitespace-nowrap flex-shrink-0"
        >
          <i className="fas fa-plus mr-1"></i>New Account
        </button>
      </div>

      <div className="space-y-2 md:space-y-3">
        {accounts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fas fa-inbox text-3xl md:text-4xl mb-3"></i>
            <p className="text-xs md:text-base">
              No accounts yet. Create one to get started!
            </p>
          </div>
        ) : (
          <>
            {displayedAccounts.map((account: Account) => (
              <div
                key={account.id}
                className="account-card glass rounded-lg p-2 md:p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 border border-white/20 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <i className="fas fa-wallet text-purple-400 flex-shrink-0 text-xs md:text-sm"></i>
                    <h3 className="font-bold text-xs md:text-sm truncate">
                      {account.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 break-all">
                    ID: {truncate(account.id)}
                  </p>
                  <button
                    onClick={() => onReconcile(account.id, account.name)}
                    className="text-xs text-blue-300 hover:text-blue-200 transition font-medium mt-0.5"
                  >
                    Reconcile
                  </button>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs md:text-sm font-bold text-green-400">
                    {formatCurrency(account.balance)}
                  </p>
                  <p className="text-xs text-gray-400">{account.currency}</p>
                </div>
              </div>
            ))}

            {hasMoreAccounts && (
              <button
                onClick={() => setShowAllAccounts(!showAllAccounts)}
                className="w-full mt-3 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/40 hover:border-purple-400/70 text-purple-300 hover:text-purple-200 transition text-xs md:text-sm font-medium"
              >
                {showAllAccounts
                  ? `Show Less (${accounts.length} total)`
                  : `Show More (${accounts.length} total)`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
