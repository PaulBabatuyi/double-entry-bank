/**
 * Toast Component
 * Displays notifications from the toast store
 */

"use client";

import { useEffect, useState } from "react";
import { useToastStore } from "@/lib/store/toastStore";
import type { Toast } from "@/lib/store/toastStore";

export function Toast() {
  const { toasts } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getIconClass = (type: string): string => {
    switch (type) {
      case "success":
        return "fas fa-check-circle text-green-400";
      case "error":
        return "fas fa-exclamation-circle text-red-400";
      case "warning":
        return "fas fa-exclamation-triangle text-yellow-400";
      case "info":
      default:
        return "fas fa-info-circle text-blue-400";
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-2xl max-w-sm animate-in fade-in slide-in-from-right-4 duration-300"
        >
          <div className="flex items-start space-x-3">
            <i className={`fas fa-2x ${getIconClass(toast.type)}`}></i>
            <div>
              <p className="font-bold">{toast.title}</p>
              {toast.description && (
                <p className="text-sm text-gray-300">{toast.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
