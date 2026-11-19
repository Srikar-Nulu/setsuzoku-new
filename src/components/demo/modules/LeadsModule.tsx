"use client";

import React, { useState } from "react";
import { useDemo } from "../DemoContext";
import { Lead, LeadStatus } from "../types";
import {
  Users,
  Plus,
  Search,
  DollarSign,
  TrendingUp,
  Briefcase,
  ChevronRight,
  Trash2,
  Phone,
  Mail,
  Kanban,
  Table as TableIcon,
  X,
} from "lucide-react";

export const LeadsModule: React.FC = () => {
  const { leads, addLead, updateLeadStatus, deleteLead, formatCurrency } = useDemo();

  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // New Lead Form State
  const [formName, setFormName] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formValue, setFormValue] = useState("");
  const [formSource, setFormSource] = useState<Lead["source"]>("Website");
  const [formStatus, setFormStatus] = useState<LeadStatus>("New");
  const [formNotes, setFormNotes] = useState("");

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCompany) return;
    addLead({
      name: formName,
      company: formCompany,
      email: formEmail || `${formName.toLowerCase().replace(/\s+/g, ".")}@${formCompany.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      phone: formPhone || "+91 98000 00000",
      value: Number(formValue) || 500000,
      source: formSource,
      status: formStatus,
      notes: formNotes,
    });
    // Reset Form
    setFormName("");
    setFormCompany("");
    setFormEmail("");
    setFormPhone("");
    setFormValue("");
    setFormNotes("");
    setIsAddModalOpen(false);
  };

  // KPIs
  const totalLeads = leads.length;
  const pipelineValue = leads.reduce((acc, l) => acc + l.value, 0);
  const wonLeads = leads.filter((l) => l.status === "Won");
  const wonValue = wonLeads.reduce((acc, l) => acc + l.value, 0);
  const inDiscussion = leads.filter((l) => l.status === "In Discussion" || l.status === "Proposal Sent").length;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesTab = activeTab === "All" || l.status === activeTab;
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "All" || l.source === sourceFilter;
    return matchesTab && matchesSearch && matchesSource;
  });

  const statusColors: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
    New: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
    Contacted: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
    "In Discussion": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    "Proposal Sent": { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
    Won: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    Lost: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  };

  const statuses: LeadStatus[] = ["New", "Contacted", "In Discussion", "Proposal Sent", "Won", "Lost"];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Leads &amp; Sales Pipeline</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track business inquiries, qualification stages, and deal conversions in real time.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* View Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                viewMode === "table" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                viewMode === "kanban" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
              title="Kanban Pipeline"
            >
              <Kanban className="w-4 h-4" />
              <span className="hidden sm:inline">Pipeline</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Leads</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalLeads}</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">↑ 22% vs last month</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(pipelineValue)}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Active negotiations</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Won Revenue</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(wonValue)}</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">{wonLeads.length} deals closed</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">In Discussion</span>
            <Briefcase className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{inDiscussion}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Proposal review stage</span>
        </div>
      </div>

      {/* Filter and Tab Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        {/* Status Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          {["All", "New", "Contacted", "In Discussion", "Proposal Sent", "Won", "Lost"].map((tab) => (
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
              {tab === "All" && ` (${leads.length})`}
              {tab !== "All" && ` (${leads.filter((l) => l.status === tab).length})`}
            </button>
          ))}
        </div>

        {/* Search & Source Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter leads by contact, company or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Source:</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="text-xs bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 outline-none"
            >
              <option value="All">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Outbound">Outbound</option>
              <option value="Inbound">Inbound</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View: Table or Kanban */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Contact &amp; Company</th>
                  <th className="py-3.5 px-4">Deal Value</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No leads match your current search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusInfo = statusColors[lead.status];
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="text-left group"
                          >
                            <p className="font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                              {lead.name}
                            </p>
                            <p className="text-[11px] text-slate-500">{lead.company}</p>
                          </button>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {formatCurrency(lead.value)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {/* Interactive Status Selector */}
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border transition-colors outline-none cursor-pointer ${statusInfo.bg} ${statusInfo.text} border-transparent hover:border-slate-300`}
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                          {lead.createdAt}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center space-x-1">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-colors"
                              title="View details"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete lead"
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
      ) : (
        /* Kanban Pipeline View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
          {statuses.map((st) => {
            const columnLeads = leads.filter((l) => l.status === st);
            const columnValue = columnLeads.reduce((acc, l) => acc + l.value, 0);
            const badge = statusColors[st];

            return (
              <div key={st} className="bg-slate-100/70 p-3 rounded-2xl border border-slate-200/80 min-w-[210px] flex flex-col">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                  <div className="flex items-center space-x-1.5">
                    <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                    <span className="text-xs font-bold text-slate-800">{st}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                    {columnLeads.length}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mb-2">
                  {formatCurrency(columnValue)}
                </div>

                {/* Cards List */}
                <div className="space-y-2 flex-1">
                  {columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow group relative"
                    >
                      <p className="text-xs font-bold text-slate-900 group-hover:text-brand-blue transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                        {lead.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{lead.company}</p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900 font-mono">{formatCurrency(lead.value)}</span>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 outline-none"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              Move: {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {columnLeads.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Prospect / Lead</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company / Org *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NovaSphere Technologies"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="arthur.vance@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Deal Value (₹)</label>
                  <input
                    type="number"
                    placeholder="750000"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Source</label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value as Lead["source"])}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Outbound">Outbound</option>
                    <option value="Inbound">Inbound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Initial Stage</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as LeadStatus)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notes / Scope Summary</label>
                <textarea
                  rows={2}
                  placeholder="Key project goals, tech stack requests, timelines..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/20"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Details Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Lead Dossier</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[selectedLead.status].bg} ${statusColors[selectedLead.status].text}`}>
                {selectedLead.status}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{selectedLead.name}</h2>
              <p className="text-sm text-slate-500">{selectedLead.company}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Deal Value:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{formatCurrency(selectedLead.value)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Acquisition Source:</span>
                <span className="font-semibold text-slate-700">{selectedLead.source}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Date Logged:</span>
                <span className="font-mono text-slate-700">{selectedLead.createdAt}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900">Direct Contact</h4>
              <div className="space-y-2">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-brand-blue hover:text-brand-blue transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-700">{selectedLead.email}</span>
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-700">{selectedLead.phone}</span>
                </a>
              </div>
            </div>

            {selectedLead.notes && (
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Project Requirements</h4>
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-slate-700 leading-relaxed">
                  {selectedLead.notes}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  deleteLead(selectedLead.id);
                  setSelectedLead(null);
                }}
                className="text-xs text-rose-600 hover:underline flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
