"use client";

import React, { useState, useMemo } from "react";
import {
  Receipt,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  Printer,
  Check,
  X,
} from "lucide-react";
import { useDemo } from "../DemoContext";
import { Invoice, InvoiceStatus } from "../types";

export const InvoicesModule: React.FC = () => {
  const { invoices, addInvoice, markInvoicePaid, deleteInvoice, clients, formatCurrency } = useDemo();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Invoice Form
  const [clientName, setClientName] = useState(clients[0]?.companyName || "NovaSphere Technologies");
  const [amountStr, setAmountStr] = useState("250000");
  const [dueDate, setDueDate] = useState("2026-12-15");

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        inv.clientName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, filterStatus]);

  // Metrics
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.amount + inv.tax, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((acc, inv) => acc + inv.amount + inv.tax, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((acc, inv) => acc + inv.amount + inv.tax, 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((acc, inv) => acc + inv.amount + inv.tax, 0);

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Overdue":
        return "bg-rose-50 text-rose-700 border-rose-200";
    }
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountStr) || 0;
    const tax = Math.round(amount * 0.18);
    addInvoice({
      clientName,
      amount,
      tax,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate,
      status: "Pending",
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Receipt className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Tax Invoices & Billing</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Generate GST-compliant tax invoices, track client receivables, and automate settlement accounting.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-sm transition-all shadow-blue-500/20 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Invoice</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Billed</span>
            <Receipt className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(totalBilled)}</span>
            <div className="text-[11px] text-slate-400 mt-0.5">{invoices.length} invoices generated</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Collected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPaid)}</span>
            <div className="text-[11px] text-emerald-600/80 mt-0.5">
              {invoices.filter((i) => i.status === "Paid").length} settled in bank
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Outstanding</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-amber-600">{formatCurrency(totalPending)}</span>
            <div className="text-[11px] text-amber-600/80 mt-0.5">Under net payment terms</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Overdue</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-rose-600">{formatCurrency(totalOverdue)}</span>
            <div className="text-[11px] text-rose-500/80 mt-0.5">Past credit terms</div>
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
            placeholder="Search by invoice number or client name..."
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Status:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Invoices</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Taxable Subtotal</th>
                <th className="py-3 px-4 text-right">GST (18%)</th>
                <th className="py-3 px-4 text-right">Total Invoice</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-400">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const grossTotal = inv.amount + inv.tax;
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/60 transition group">
                      <td className="py-3 px-4 font-semibold text-blue-600 font-mono">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{inv.clientName}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{inv.issueDate}</td>
                      <td className="py-3 px-4 text-slate-500">{inv.dueDate}</td>
                      <td className="py-3 px-4 text-right text-slate-600">{formatCurrency(inv.amount)}</td>
                      <td className="py-3 px-4 text-right text-slate-400">{formatCurrency(inv.tax)}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">
                        {formatCurrency(grossTotal)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                            inv.status
                          )}`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {inv.status !== "Paid" && (
                            <button
                              onClick={() => markInvoicePaid(inv.id)}
                              className="p-1 px-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition shadow-sm font-medium flex items-center gap-1 text-[11px]"
                              title="Record full payment settlement"
                            >
                              <Check className="w-3 h-3" />
                              <span>Mark Paid</span>
                            </button>
                          )}
                          <button
                            onClick={() => setPreviewInvoice(inv)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                            title="Preview tax invoice"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteInvoice(inv.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Void invoice"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-slate-800">Issue Tax Invoice</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Client</label>
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
                  Taxable Amount (Excl. 18% GST)
                </label>
                <input
                  type="number"
                  required
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-medium text-slate-700">
                    {formatCurrency(parseFloat(amountStr) || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>GST (18%):</span>
                  <span className="font-medium text-slate-700">
                    {formatCurrency(Math.round((parseFloat(amountStr) || 0) * 0.18))}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Total Due:</span>
                  <span>
                    {formatCurrency(
                      (parseFloat(amountStr) || 0) + Math.round((parseFloat(amountStr) || 0) * 0.18)
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
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
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Document Preview Modal */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Action Bar */}
            <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <span className="text-xs font-semibold text-slate-600">
                Tax Invoice Document Preview • {previewInvoice.invoiceNumber}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setPreviewInvoice(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-8 overflow-y-auto space-y-6 text-slate-800">
              {/* Header */}
              <div className="flex justify-between items-start pb-6 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">SETSUZOKU LLP</h2>
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    <div>MSME Registered Micro Enterprise</div>
                    <div>Ministry of MSME, Govt. of India</div>
                    <div>Hyderabad, Telangana, India</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider font-semibold text-blue-600">
                    TAX INVOICE
                  </span>
                  <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                    {previewInvoice.invoiceNumber}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Date: <span className="text-slate-800 font-medium">{previewInvoice.issueDate}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Due: <span className="text-slate-800 font-medium">{previewInvoice.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider block mb-1">
                    Billed To:
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{previewInvoice.clientName}</div>
                  <div className="text-slate-500 mt-1">Authorized Enterprise Client</div>
                  <div className="text-slate-500">Corporate Account</div>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider block mb-1">
                    Status:
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                      previewInvoice.status
                    )}`}
                  >
                    {previewInvoice.status}
                  </span>
                  {previewInvoice.paidDate && (
                    <div className="text-[11px] text-slate-500 mt-1">
                      Settled on {previewInvoice.paidDate} via {previewInvoice.paymentMethod}
                    </div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 font-semibold text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Description of Deliverable / Milestone</th>
                      <th className="py-2.5 px-4 text-center">Qty</th>
                      <th className="py-2.5 px-4 text-right">Taxable Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          Milestone Engineering & Production Deployment
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Enterprise architecture development, API integrations, and cloud release.
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">1</td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatCurrency(previewInvoice.amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Taxable Value:</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(previewInvoice.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18%):</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(previewInvoice.tax)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                    <span>Total Payable:</span>
                    <span>{formatCurrency(previewInvoice.amount + previewInvoice.tax)}</span>
                  </div>
                </div>
              </div>

              {/* Banking & MSME notes */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-[11px] text-slate-500">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <span className="font-semibold text-slate-700 block text-xs">Bank Wire Transfer</span>
                  <div>Account Name: Setsuzoku LLP</div>
                  <div>Account Type: Current Account</div>
                  <div>Settlement Mode: RTGS / NEFT / IMPS</div>
                </div>
                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 space-y-1">
                  <span className="font-semibold text-blue-900 block text-xs">Statutory MSME Compliance</span>
                  <div>Udyam Registered Micro Enterprise</div>
                  <div>Ministry of MSME, Government of India</div>
                  <div>Prompt payment protections under MSMED Act</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
