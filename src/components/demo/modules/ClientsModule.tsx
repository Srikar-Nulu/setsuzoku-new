"use client";

import React, { useState } from "react";
import { useDemo } from "../DemoContext";
import { Client } from "../types";
import {
  Building2,
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  ChevronRight,
  Trash2,
  X,
  Shield,
  Layers,
} from "lucide-react";

export const ClientsModule: React.FC = () => {
  const { clients, addClient, deleteClient, projects, formatCurrency } = useDemo();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [industryFilter, setIndustryFilter] = useState<string>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Form State
  const [formCompany, setFormCompany] = useState("");
  const [formIndustry, setFormIndustry] = useState("Technology & SaaS");
  const [formContact, setFormContact] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCity, setFormCity] = useState("Hyderabad, Telangana");
  const [formNotes, setFormNotes] = useState("");

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCompany || !formContact) return;

    addClient({
      companyName: formCompany,
      industry: formIndustry,
      contactPerson: formContact,
      email: formEmail || `contact@${formCompany.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      phone: formPhone || "+91 98000 00000",
      city: formCity,
      status: "Active",
      notes: formNotes,
    });

    setFormCompany("");
    setFormContact("");
    setFormEmail("");
    setFormPhone("");
    setFormNotes("");
    setIsAddModalOpen(false);
  };

  // KPIs
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const totalLTV = clients.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalActiveProjects = clients.reduce((acc, c) => acc + c.activeProjectsCount, 0);

  // Unique industries for filter
  const industries = ["All", ...Array.from(new Set(clients.map((c) => c.industry)))];

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "All" || c.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Client Directory &amp; Accounts</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enterprise customer profiles, active engagements, and contract value history.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Client</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Accounts</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalClients}</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">100% retention rate</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Retainers</span>
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{activeClients}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Engaged engineering squads</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Billed LTV</span>
            <DollarSign className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(totalLTV)}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Lifetime delivered contracts</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Deliverables</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalActiveProjects}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Concurrent project streams</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search company, contact person or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Industry:</span>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="text-xs bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 outline-none"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => {
          const clientProjects = projects.filter((p) => p.clientName === client.companyName);

          return (
            <div
              key={client.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl ${client.avatarColor} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                      {client.companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3
                        onClick={() => setSelectedClient(client)}
                        className="font-bold text-sm text-slate-900 group-hover:text-brand-blue cursor-pointer transition-colors"
                      >
                        {client.companyName}
                      </h3>
                      <span className="text-[11px] text-slate-400 block">{client.industry}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      client.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-blue-50 text-blue-700 border border-blue-200/60"
                    }`}
                  >
                    {client.status}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Primary Contact:</span>
                    <span className="font-semibold text-slate-800">{client.contactPerson}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {client.city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Active Workstreams:</span>
                    <span className="font-mono font-bold text-brand-blue">{clientProjects.length} projects</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block leading-tight">Total Billed</span>
                  <span className="font-mono font-bold text-slate-900 text-xs">{formatCurrency(client.totalSpent)}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove client"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Onboard New Client Account</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trident Shipping & Logistics"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Industry Sector</label>
                  <select
                    value={formIndustry}
                    onChange={(e) => setFormIndustry(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    <option value="Education & EdTech">Education &amp; EdTech</option>
                    <option value="Healthcare & Life Sciences">Healthcare &amp; Life Sciences</option>
                    <option value="Financial Technology">Financial Technology</option>
                    <option value="Supply Chain & Transport">Supply Chain &amp; Transport</option>
                    <option value="E-Commerce & Retail">E-Commerce &amp; Retail</option>
                    <option value="Industrial Manufacturing">Industrial Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">City / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Kakinada, AP"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Key Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Official Email</label>
                  <input
                    type="email"
                    placeholder="elena@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 014-9920"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Internal Relationship Notes</label>
                <textarea
                  rows={2}
                  placeholder="Key corporate objectives, billing terms, SLA notes..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none resize-none"
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
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Profile Drawer */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Account Dossier</span>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-2xl ${selectedClient.avatarColor} text-white font-black text-lg flex items-center justify-center shadow-xs`}>
                {selectedClient.companyName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedClient.companyName}</h2>
                <p className="text-xs text-slate-500">{selectedClient.industry} • {selectedClient.city}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Contract Value:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{formatCurrency(selectedClient.totalSpent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account Standing:</span>
                <span className="font-bold text-emerald-600">{selectedClient.status}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900">Direct Contact</h4>
              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-slate-200">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Key Stakeholder</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedClient.contactPerson}</p>
                </div>
                <a
                  href={`mailto:${selectedClient.email}`}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-brand-blue hover:text-brand-blue transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-700">{selectedClient.email}</span>
                </a>
                <a
                  href={`tel:${selectedClient.phone}`}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-700">{selectedClient.phone}</span>
                </a>
              </div>
            </div>

            {/* Engaged Projects */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900">Engaged Engineering Projects</h4>
              {projects.filter((p) => p.clientName === selectedClient.companyName).length === 0 ? (
                <p className="text-slate-400 italic">No current active engineering workstreams.</p>
              ) : (
                projects
                  .filter((p) => p.clientName === selectedClient.companyName)
                  .map((p) => (
                    <div key={p.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">{p.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">{p.progress}%</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Lead: {p.leadEngineer} • Due: {p.dueDate}</p>
                    </div>
                  ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  deleteClient(selectedClient.id);
                  setSelectedClient(null);
                }}
                className="text-xs text-rose-600 hover:underline flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Account</span>
              </button>
              <button
                onClick={() => setSelectedClient(null)}
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
