"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  ArrowDownLeft,
  DollarSign,
  ShieldCheck,
  X,
} from "lucide-react";
import { useDemo } from "../DemoContext";
import { PaymentRecord } from "../types";

export const PaymentsModule: React.FC = () => {
  const { payments, addPayment, clients, invoices, formatCurrency } = useDemo();
  const [filterMethod, setFilterMethod] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New payment form
  const [clientName, setClientName] = useState(clients[0]?.companyName || "NovaSphere Technologies");
  const [invoiceNumber, setInvoiceNumber] = useState(invoices[0]?.invoiceNumber || "INV-2026-0041");
  const [amountStr, setAmountStr] = useState("150000");
  const [method, setMethod] = useState<PaymentRecord["method"]>("NEFT / RTGS");

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        p.transactionRef.toLowerCase().includes(search.toLowerCase()) ||
        p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.clientName.toLowerCase().includes(search.toLowerCase());
      const matchesMethod = filterMethod === "all" || p.method === filterMethod;
      return matchesSearch && matchesMethod;
    });
  }, [payments, search, filterMethod]);

  const totalCollected = payments
    .filter((p) => p.status === "Completed")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const avgTicket = payments.length > 0 ? Math.round(totalCollected / payments.length) : 0;

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountStr) || 0;
    addPayment({
      invoiceNumber,
      clientName,
      amount,
      method,
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
    });
    setShowAddModal(false);
  };

  const getMethodBadge = (m: PaymentRecord["method"]) => {
    switch (m) {
      case "NEFT / RTGS":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "UPI Business":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Stripe":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Corporate Card":
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CreditCard className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Settlements & Payment Ledger</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Reconcile inbound bank transfers, corporate cards, and payment gateway remittances.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm transition-all shadow-emerald-500/20 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Record Remittance</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Inflows Settled
            </span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(totalCollected)}</span>
            <div className="text-[11px] text-slate-400 mt-0.5">{payments.length} verified remittances</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Ticket Size
            </span>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-blue-600">{formatCurrency(avgTicket)}</span>
            <div className="text-[11px] text-blue-600/80 mt-0.5">Per settlement transaction</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Reconciliation Rate
            </span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-purple-600">100%</span>
            <div className="text-[11px] text-purple-600/80 mt-0.5">Zero unallocated suspense</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Settlement Mode</span>
            <CreditCard className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">NEFT/RTGS</span>
            <div className="text-[11px] text-slate-400 mt-0.5">Primary institutional mode</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transaction ref, invoice number, or client..."
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Channel:</span>
          </div>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Channels</option>
            <option value="NEFT / RTGS">NEFT / RTGS</option>
            <option value="UPI Business">UPI Business</option>
            <option value="Stripe">Stripe</option>
            <option value="Corporate Card">Corporate Card</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Transaction UTR / Ref</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Settlement Mode</th>
                <th className="py-3 px-4">Value Date</th>
                <th className="py-3 px-4 text-right">Settled Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No transactions found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      {p.transactionRef}
                    </td>
                    <td className="py-3 px-4 font-mono text-blue-600 font-medium">
                      {p.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{p.clientName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getMethodBadge(
                          p.method
                        )}`}
                      >
                        {p.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{p.date}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">
                      +{formatCurrency(p.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <h3 className="font-semibold text-slate-800">Record Inbound Remittance</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePayment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Entity</label>
                <select
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.companyName}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reference Invoice
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="e.g. INV-2026-1048"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Amount Received</label>
                <input
                  type="number"
                  required
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Channel</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as PaymentRecord["method"])}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="NEFT / RTGS">NEFT / RTGS Wire</option>
                  <option value="UPI Business">UPI Business</option>
                  <option value="Stripe">Stripe Gateway</option>
                  <option value="Corporate Card">Corporate Card</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-sm"
                >
                  Confirm Remittance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
