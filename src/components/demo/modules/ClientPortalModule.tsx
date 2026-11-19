"use client";

import React, { useState } from "react";
import {
  Globe2,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  MessageSquare,
  Send,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "../DemoContext";

export const ClientPortalModule: React.FC = () => {
  const { clients, projects, invoices, formatCurrency, addToast } = useDemo();
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || "");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketPriority, setTicketPriority] = useState<"Normal" | "Urgent">("Normal");
  const [ticketMessage, setTicketMessage] = useState("");

  const currentClient = clients.find((c) => c.id === selectedClientId) || clients[0];
  const clientProjects = projects.filter((p) => p.clientName === currentClient?.companyName);
  const clientInvoices = invoices.filter((i) => i.clientName === currentClient?.companyName);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    addToast(
      "Ticket Dispatched",
      `Ticket #${Math.floor(1000 + Math.random() * 9000)} created in demonstration environment. Simulated dispatch completed.`,
      "success"
    );
    setTicketSubject("");
    setTicketMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Client View Simulator Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-lg border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Client Experience Simulator</span>
          </div>
          <h1 className="text-xl font-bold">Dedicated Client Self-Service Portal</h1>
          <p className="text-xs text-blue-200/80 mt-1 max-w-xl">
            This module showcases the branded stakeholder interface Setsuzoku deploys for clients to track deliverables, approve milestones, and access tax receipts in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
          <span className="text-xs font-medium text-blue-100 whitespace-nowrap">Viewing As:</span>
          <select
            value={currentClient?.id}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="text-xs bg-slate-900/80 text-white border border-blue-400/30 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-400"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Client Account Dossier Header */}
      {currentClient && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-sm ${currentClient.avatarColor}`}
            >
              {currentClient.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{currentClient.companyName}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  Enterprise Client
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Primary Contact: <span className="font-semibold text-slate-700">{currentClient.contactPerson}</span> ({currentClient.email})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Engagements</span>
              <span className="font-bold text-slate-800 text-sm">{clientProjects.length} Projects</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Lifetime Billed</span>
              <span className="font-bold text-emerald-600 text-sm">
                {formatCurrency(currentClient.totalSpent)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Active Milestones & Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milestones & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Project Delivery Roadmap & Milestones</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track phased development progress and staging verification
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Phase 2 In-Progress
              </span>
            </div>

            {/* Stepper Milestones */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-sm shadow-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 pb-4 border-l-2 border-emerald-500 pl-4 -ml-6.5 mt-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Milestone 1: Architectural Blueprint & System Scope
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Completed</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Comprehensive technical specification, ER diagram, and schema sign-off.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-sm shadow-blue-500/30">
                  2
                </div>
                <div className="flex-1 pb-4 border-l-2 border-slate-200 pl-4 -ml-6.5 mt-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">
                      Milestone 2: Core Engineering & Staging Builds
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold">78% Complete</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Frontend interface implementation, authentication, and secure backend microservices.
                  </p>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                    <div className="w-[78%] h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                  3
                </div>
                <div className="flex-1 pb-4 border-l-2 border-slate-200 pl-4 -ml-6.5 mt-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Milestone 3: End-to-End QA & User Acceptance Testing (UAT)
                    </span>
                    <span className="text-[10px] text-slate-400">Scheduled for Next Sprint</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Automated regression testing, load testing, and client stakeholder review.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                  4
                </div>
                <div className="flex-1 pl-4 -ml-6.5 mt-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Milestone 4: Cloud Infrastructure Production Launch
                    </span>
                    <span className="text-[10px] text-slate-400">Final Handoff</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Domain SSL configuration, zero-downtime container cluster deployment, and warranty handover.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Deliverables & Documentation */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Live Deliverables & Shared Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  addToast("Access Staging", "Staging environment link copied to clipboard.", "info");
                }}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-800">Preview Staging URL</div>
                    <div className="text-[10px] text-slate-400">sandbox.setsuzoku.app</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  addToast("Documentation", "API swagger specification downloaded.", "info");
                }}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-800">API Documentation</div>
                    <div className="text-[10px] text-slate-400">OpenAPI 3.1 Specification</div>
                  </div>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Support Ticket & Invoices */}
        <div className="space-y-6">
          {/* Submit Support Request */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Submit Change / Support Request</span>
            </div>
            <p className="text-xs text-slate-500">
              Direct line to Setsuzoku project managers and engineering leads.
            </p>

            <form onSubmit={handleCreateTicket} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Request export format addition..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value as "Normal" | "Urgent")}
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Normal">Normal Request</option>
                  <option value="Urgent">Urgent Block</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Details</label>
                <textarea
                  rows={3}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your request or observation in detail..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>

          {/* Account Invoices */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Account Statements & Invoices</h3>
            {clientInvoices.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">No statements available for this entity.</p>
            ) : (
              <div className="space-y-2 pt-1">
                {clientInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{inv.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-400">Issued {inv.issueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">
                        {formatCurrency(inv.amount + inv.tax)}
                      </div>
                      <span
                        className={`inline-block text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                          inv.status === "Paid"
                            ? "text-emerald-700 bg-emerald-50"
                            : "text-amber-700 bg-amber-50"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
