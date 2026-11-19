"use client";

import React, { useState } from "react";
import { useDemo } from "../DemoContext";
import { Quotation, QuotationStatus, QuotationLineItem } from "../types";
import {
  FileText,
  Plus,
  Search,
  DollarSign,
  TrendingUp,
  Eye,
  Trash2,
  X,
  Printer,
  Calendar,
} from "lucide-react";

export const QuotationsModule: React.FC = () => {
  const { quotations, addQuotation, updateQuotationStatus, deleteQuotation, formatCurrency } = useDemo();

  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [previewQuote, setPreviewQuote] = useState<Quotation | null>(null);

  // New Quote Form State
  const [formClient, setFormClient] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formValidUntil, setFormValidUntil] = useState("2026-12-15");
  const [lineItems, setLineItems] = useState<{ id: string; description: string; quantity: number; rate: number }[]>([
    { id: "item-1", description: "Phase 1: Architecture & Interactive Prototype", quantity: 1, rate: 180000 },
    { id: "item-2", description: "Phase 2: Full-Stack Engineering & API Integration", quantity: 1, rate: 350000 },
  ]);

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      { id: "item-" + Date.now(), description: "", quantity: 1, rate: 100000 },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateLineItem = (id: string, field: "description" | "quantity" | "rate", value: string | number) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const subtotal = lineItems.reduce((acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.rate) || 0), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClient || !formTitle) return;

    const formattedItems: QuotationLineItem[] = lineItems.map((item) => ({
      ...item,
      amount: item.quantity * item.rate,
    }));

    addQuotation({
      clientName: formClient,
      clientEmail: formEmail || `${formClient.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      projectTitle: formTitle,
      items: formattedItems,
      subtotal,
      tax,
      total,
      status: "Sent",
      issueDate: new Date().toISOString().split("T")[0],
      validUntil: formValidUntil,
    });

    // Reset Form
    setFormClient("");
    setFormEmail("");
    setFormTitle("");
    setIsCreateModalOpen(false);
  };

  // KPIs
  const totalQuotes = quotations.length;
  const quotedValue = quotations.reduce((acc, q) => acc + q.total, 0);
  const acceptedQuotes = quotations.filter((q) => q.status === "Accepted");
  const acceptedValue = acceptedQuotes.reduce((acc, q) => acc + q.total, 0);
  const pendingSignoff = quotations.filter((q) => q.status === "Sent" || q.status === "Draft").length;

  const filteredQuotes = quotations.filter((q) => {
    const matchesTab = activeTab === "All" || q.status === activeTab;
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const statusBadges: Record<QuotationStatus, { bg: string; text: string }> = {
    Draft: { bg: "bg-slate-100", text: "text-slate-700" },
    Sent: { bg: "bg-blue-50", text: "text-blue-700" },
    Accepted: { bg: "bg-emerald-50", text: "text-emerald-700" },
    Declined: { bg: "bg-rose-50", text: "text-rose-700" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Quotations &amp; Proposals</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formal commercial estimates, itemized deliverables, and proposal acceptance registry.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Quotation</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Proposals</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalQuotes}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Active pipeline items</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quoted Value</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(quotedValue)}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Includes GST</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accepted Value</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(acceptedValue)}</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">{acceptedQuotes.length} signed off</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Sign-off</span>
            <Calendar className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{pendingSignoff}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Awaiting client agreement</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-semibold">
          {["All", "Draft", "Sent", "Accepted", "Declined"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Quote #, client, project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
          />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] uppercase font-bold text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Quote Number</th>
                <th className="py-3.5 px-4">Client &amp; Scope</th>
                <th className="py-3.5 px-4">Line Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Valid Until</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No quotations match your filters.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => {
                  const badge = statusBadges[q.status];
                  return (
                    <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-brand-blue">
                        {q.quoteNumber}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{q.clientName}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-xs">{q.projectTitle}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {q.items.length} deliverables
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {formatCurrency(q.total)}
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {q.validUntil}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={q.status}
                          onChange={(e) => updateQuotationStatus(q.id, e.target.value as QuotationStatus)}
                          className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border transition-colors outline-none cursor-pointer ${badge.bg} ${badge.text} border-transparent hover:border-slate-300`}
                        >
                          <option value="Draft">Draft</option>
                          <option value="Sent">Sent</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => setPreviewQuote(q)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-colors"
                            title="Preview Official Quote"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteQuotation(q.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete quotation"
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

      {/* Create Quotation Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Generate Commercial Quotation</h3>
                <p className="text-xs text-slate-500">Construct itemized proposal with automated GST taxation.</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NovaSphere Technologies"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Client Contact Email</label>
                  <input
                    type="email"
                    placeholder="billing@novasphere.example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Project Scope Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next.js SaaS Web Application & Automation"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Valid Until Date</label>
                  <input
                    type="date"
                    value={formValidUntil}
                    onChange={(e) => setFormValidUntil(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none font-mono"
                  />
                </div>
              </div>

              {/* Line Items Builder */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Deliverable Line Items</span>
                  <button
                    type="button"
                    onClick={addLineItem}
                    className="text-brand-blue hover:underline text-xs font-semibold inline-flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {lineItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div className="col-span-6">
                        <input
                          type="text"
                          placeholder="Item description / milestone"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                          className="w-full bg-white p-1.5 rounded-lg border border-slate-200 text-xs outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, "quantity", Number(e.target.value))}
                          className="w-full bg-white p-1.5 rounded-lg border border-slate-200 text-xs outline-none text-center font-mono"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          placeholder="Rate ₹"
                          value={item.rate}
                          onChange={(e) => updateLineItem(item.id, "rate", Number(e.target.value))}
                          className="w-full bg-white p-1.5 rounded-lg border border-slate-200 text-xs outline-none font-mono text-right"
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => removeLineItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Summary */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-mono">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>GST (18%):</span>
                  <span className="font-mono">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200 text-sm">
                  <span>Total Quoted Amount:</span>
                  <span className="font-mono text-brand-blue">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/20"
                >
                  Create &amp; Dispatch Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Quotation Document Preview Modal */}
      {previewQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  SZ
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">SETSUZOKU LLP</h3>
                  <p className="text-[11px] text-slate-400 font-mono">UDYAM-AP-11-0071724 • Kakinada, AP</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  onClick={() => setPreviewQuote(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Quotation Recipient</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{previewQuote.clientName}</p>
                <p className="text-slate-500">{previewQuote.clientEmail}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Quotation Details</span>
                <p className="font-bold text-brand-blue font-mono text-sm mt-0.5">{previewQuote.quoteNumber}</p>
                <p className="text-slate-500">Issued: {previewQuote.issueDate}</p>
                <p className="text-slate-500">Valid Until: {previewQuote.validUntil}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">Subject Scope</span>
              <p className="font-semibold text-slate-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                {previewQuote.projectTitle}
              </p>
            </div>

            {/* Itemized Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Deliverable Scope Item</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewQuote.items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-3 text-slate-800 font-medium">{item.description}</td>
                      <td className="p-3 text-center font-mono text-slate-600">{item.quantity}</td>
                      <td className="p-3 text-right font-mono text-slate-600">{formatCurrency(item.rate)}</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tax and Total */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Exclusive of Taxes):</span>
                <span className="font-mono font-semibold">{formatCurrency(previewQuote.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Integrated GST (18%):</span>
                <span className="font-mono font-semibold">{formatCurrency(previewQuote.tax)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                <span>Grand Total Quoted:</span>
                <span className="font-mono text-brand-blue text-base">{formatCurrency(previewQuote.total)}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 border-t border-slate-100 pt-3">
              <p>• Commercial validity: 30 calendar days from issue date.</p>
              <p>• Payment terms: 40% initial mobilization, 40% upon prototype acceptance, 20% on production deployment.</p>
              <p>• Setsuzoku LLP • Corporate Registered Micro Enterprise (MSME) • Kakinada, AP</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
