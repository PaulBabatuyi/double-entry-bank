/**
 * Form Selector Component
 * Displays 3 horizontal tabs for selecting Deposit, Withdraw, or Transfer
 * Mobile-first design with icon stacked vertically above label
 */

"use client";

interface FormSelectorProps {
  activeForm: "deposit" | "withdraw" | "transfer";
  onFormChange: (form: "deposit" | "withdraw" | "transfer") => void;
}

const formOptions = [
  {
    id: "deposit",
    label: "Deposit",
    icon: "fas fa-arrow-down",
    color: "green",
  },
  {
    id: "withdraw",
    label: "Withdraw",
    icon: "fas fa-arrow-up",
    color: "red",
  },
  {
    id: "transfer",
    label: "Transfer",
    icon: "fas fa-exchange-alt",
    color: "blue",
  },
] as const;

export function FormSelector({ activeForm, onFormChange }: FormSelectorProps) {
  return (
    <div className="glass rounded-xl p-3 md:p-6 border border-white/20 mb-6">
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {formOptions.map((form) => {
          const isActive = activeForm === form.id;
          const colorMap = {
            green: isActive
              ? "bg-green-500/30 border-green-400/70 text-green-300"
              : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/10",
            red: isActive
              ? "bg-red-500/30 border-red-400/70 text-red-300"
              : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/10",
            blue: isActive
              ? "bg-blue-500/30 border-blue-400/70 text-blue-300"
              : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/10",
          };

          return (
            <button
              key={form.id}
              onClick={() =>
                onFormChange(form.id as "deposit" | "withdraw" | "transfer")
              }
              className={`flex flex-col items-center justify-center gap-2 py-3 md:py-4 px-2 md:px-4 rounded-lg border transition ${colorMap[form.color as keyof typeof colorMap]}`}
            >
              <i className={`${form.icon} text-2xl md:text-3xl`}></i>
              <span className="text-xs md:text-sm font-medium text-center">
                {form.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
