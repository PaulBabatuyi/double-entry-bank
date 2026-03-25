/**
 * Accounts List Component
 * Displays list of user accounts with balances
 */

"use client";

import { truncate, formatCurrency } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/authStore";
import type { Account } from "@/lib/types";

interface AccountsListProps {
  onReconcile: (accountId: string, accountName: string) => Promise<void>;
  onOpenCreateModal: () => void;
}

export function AccountsList({
  onReconcile,
  onOpenCreateModal,
}: AccountsListProps) {
  const accounts = useAuthStore((state) => state.accounts);

  return (
    <div className="glass rounded-xl p-6 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          <i className="fas fa-wallet mr-2 text-purple-400"></i>My Accounts
        </h2>
        <button
          onClick={onOpenCreateModal}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-sm transition"
        >
          <i className="fas fa-plus mr-2"></i>New Account
        </button>
      </div>

      <div className="space-y-3">
        {accounts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fas fa-inbox text-4xl mb-3"></i>
            <p>No accounts yet. Create one to get started!</p>
          </div>
        ) : (
          accounts.map((account: Account) => (
            <div
              key={account.id}
              className="account-card glass rounded-xl p-5 flex justify-between items-center border border-white/20"
            >
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <i className="fas fa-wallet text-purple-400"></i>
                  <h3 className="font-bold text-lg">{account.name}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  ID: {truncate(account.id)}
                </p>
                <button
                  onClick={() => onReconcile(account.id, account.name)}
                  className="mt-2 text-xs text-blue-300 hover:text-blue-200 transition"
                >
                  Reconcile
                </button>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">
                  {formatCurrency(account.balance)}
                </p>
                <p className="text-xs text-gray-400">{account.currency}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
