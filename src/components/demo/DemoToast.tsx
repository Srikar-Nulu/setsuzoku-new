"use client";

import React from "react";
import { useDemo } from "./DemoContext";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

export const DemoToastContainer: React.FC = () => {
  const { toasts, removeToast } = useDemo();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
          danger: <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
        };

        const borders = {
          success: "border-emerald-200 bg-white shadow-emerald-500/10",
          info: "border-blue-200 bg-white shadow-blue-500/10",
          warning: "border-amber-200 bg-white shadow-amber-500/10",
          danger: "border-rose-200 bg-white shadow-rose-500/10",
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-start space-x-3 transition-all transform duration-300 animate-in fade-in slide-in-from-bottom-2 ${borders[toast.variant]}`}
          >
            {icons[toast.variant]}
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight">{toast.title}</p>
              {toast.description && (
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 p-1 rounded-md"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const DemoToast = DemoToastContainer;
