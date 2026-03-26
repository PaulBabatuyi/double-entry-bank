/**
 * Function Forms Wrapper Component
 * Manages form selection and animated switching between Deposit, Withdraw, and Transfer
 */

"use client";

import { useState } from "react";
import { FormSelector } from "./FormSelector";
import { DepositForm } from "./DepositForm";
import { WithdrawForm } from "./WithdrawForm";
import { TransferForm } from "./TransferForm";

interface FunctionFormsProps {
  onSuccess: () => Promise<void>;
}

export function FunctionForms({ onSuccess }: FunctionFormsProps) {
  const [activeForm, setActiveForm] = useState<
    "deposit" | "withdraw" | "transfer"
  >("deposit");

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Form Selector Tabs */}
      <FormSelector activeForm={activeForm} onFormChange={setActiveForm} />

      {/* Active Form with Animation */}
      <div className="relative min-h-[250px] md:min-h-[300px]">
        {/* Deposit Form */}
        <div
          className={`transition-all duration-300 ${
            activeForm === "deposit"
              ? "opacity-100 visible"
              : "opacity-0 invisible absolute inset-0"
          }`}
        >
          <DepositForm onSuccess={onSuccess} />
        </div>

        {/* Withdraw Form */}
        <div
          className={`transition-all duration-300 ${
            activeForm === "withdraw"
              ? "opacity-100 visible"
              : "opacity-0 invisible absolute inset-0"
          }`}
        >
          <WithdrawForm onSuccess={onSuccess} />
        </div>

        {/* Transfer Form */}
        <div
          className={`transition-all duration-300 ${
            activeForm === "transfer"
              ? "opacity-100 visible"
              : "opacity-0 invisible absolute inset-0"
          }`}
        >
          <TransferForm onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}
