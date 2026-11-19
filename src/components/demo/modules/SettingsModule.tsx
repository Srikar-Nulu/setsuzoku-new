"use client";

import React, { useState } from "react";
import {
  Settings,
  Building,
  Bell,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useDemo } from "../DemoContext";

export const SettingsModule: React.FC = () => {
  const { settings, updateSettings, resetAllData, addToast } = useDemo();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Application Configuration</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Configure enterprise preferences, statutory credentials, alert notifications, and demonstration states.
          </p>
        </div>
      </div>

      {/* Privacy & Fictional Data Notice Banner */}
      <div className="bg-amber-50/80 rounded-xl border border-amber-200/90 p-4 shadow-2xs flex items-start gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0 mt-1" />
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wide">
            DEMO MODE — FICTIONAL DATA
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            All names, companies, transactions and records displayed in this demonstration are fictional and provided solely for illustrative purposes. No real business or personal records are accessed or displayed.
          </p>
        </div>
      </div>

      {/* Organization Profile */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Building className="w-4 h-4 text-slate-600" />
          <h2 className="font-bold text-sm text-slate-900">Enterprise Entity Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Registered Entity Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => updateSettings({ companyName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Base Accounting Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => {
                const currency = e.target.value as "INR" | "USD";
                updateSettings({
                  currency,
                  currencySymbol: currency === "USD" ? "$" : "₹",
                });
                addToast(
                  "Currency Updated",
                  `Active currency switched to ${currency}. All financial modules adjusted.`,
                  "info"
                );
              }}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white font-medium text-slate-900"
            >
              <option value="INR">INR (₹) — Indian Rupee (Lakhs / Thousands)</option>
              <option value="USD">USD ($) — US Dollar</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              System Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => updateSettings({ timezone: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900"
            >
              <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST • UTC+05:30)</option>
              <option value="America/New_York (EST)">America/New_York (EST • UTC-05:00)</option>
              <option value="Europe/London (GMT)">Europe/London (GMT • UTC+00:00)</option>
              <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT • UTC+08:00)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Statutory Classification
            </label>
            <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-medium">
              Udyam Registered Micro Enterprise (MSME)
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Identity Block */}
      <div className="bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/50 rounded-xl border border-blue-200/70 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                UDYAM REGISTERED MICRO ENTERPRISE
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Verified
              </span>
            </div>
            <div className="text-xs text-slate-700 font-medium">SETSUZOKU LLP</div>
            <p className="text-xs text-slate-500">
              Registered with the Ministry of Micro, Small and Medium Enterprises, Government of India.
              All commercial agreements and electronic invoices issued through Setsuzoku comply with statutory MSMED Act governance.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications & Automation Switches */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Bell className="w-4 h-4 text-slate-600" />
          <h2 className="font-bold text-sm text-slate-900">Alerts & System Automation</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-800">Inbound Lead & Quotation Alerts</div>
              <div className="text-[11px] text-slate-500">
                Trigger real-time notifications when prospective clients submit inquiries or approve proposals.
              </div>
            </div>
            <button
              onClick={() => updateSettings({ emailAlerts: !settings.emailAlerts })}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                settings.emailAlerts ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  settings.emailAlerts ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-800">Sprint Task & Milestone Notifications</div>
              <div className="text-[11px] text-slate-500">
                Dispatch notifications for task transitions, QA staging passes, and timeline variances.
              </div>
            </div>
            <button
              onClick={() => updateSettings({ taskAlerts: !settings.taskAlerts })}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                settings.taskAlerts ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  settings.taskAlerts ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-800">Invoice Settlement & Receivables Tracking</div>
              <div className="text-[11px] text-slate-500">
                Automate notifications when tax invoices are due, settled via NEFT/RTGS, or past terms.
              </div>
            </div>
            <button
              onClick={() => updateSettings({ invoiceReminders: !settings.invoiceReminders })}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                settings.invoiceReminders ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  settings.invoiceReminders ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-800">Browser Local Storage Persistence</div>
              <div className="text-[11px] text-slate-500">
                Preserve customized demonstration tickets, client dossiers, and invoices across browser sessions.
              </div>
            </div>
            <button
              onClick={() => updateSettings({ autoSaveLocal: !settings.autoSaveLocal })}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                settings.autoSaveLocal ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  settings.autoSaveLocal ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone / Reset Demo Data */}
      <div className="bg-rose-50/50 rounded-xl border border-rose-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h2 className="font-bold text-sm text-rose-900">Demonstration Environment Controls</h2>
        </div>
        <p className="text-xs text-rose-700/90 leading-relaxed">
          Resetting clears all in-memory changes and restored the pristine mock demonstration datasets across all 12 modules (Leads, Quotations, Clients, Projects, Tasks, Approvals, Invoices, Payments, Team, Notifications).
        </p>

        {showResetConfirm ? (
          <div className="p-4 bg-white rounded-lg border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-rose-900">
              Confirm reset to default demonstration state?
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition shadow-sm"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-rose-300 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Factory Demonstration Data</span>
          </button>
        )}
      </div>
    </div>
  );
};
