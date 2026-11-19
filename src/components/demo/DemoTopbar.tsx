"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useDemo } from "./DemoContext";
import { ModuleId } from "./types";
import {
  Search,
  Bell,
  RotateCcw,
  Plus,
  Menu,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  FolderGit2,
  Receipt,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export const DemoTopbar: React.FC = () => {
  const {
    setActiveModule,
    setMobileSidebarOpen,
    searchQuery,
    setSearchQuery,
    leads,
    clients,
    projects,
    tasks,
    invoices,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetAllData,
  } = useDemo();

  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState<boolean>(false);

  const notifRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const quickRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setQuickCreateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  // Search Results Filtering
  const cleanQ = searchQuery.trim().toLowerCase();
  const searchResults = cleanQ
    ? {
        leads: leads.filter((l) => l.name.toLowerCase().includes(cleanQ) || l.company.toLowerCase().includes(cleanQ)).slice(0, 3),
        projects: projects.filter((p) => p.name.toLowerCase().includes(cleanQ) || p.clientName.toLowerCase().includes(cleanQ)).slice(0, 3),
        clients: clients.filter((c) => c.companyName.toLowerCase().includes(cleanQ) || c.contactPerson.toLowerCase().includes(cleanQ)).slice(0, 3),
        tasks: tasks.filter((t) => t.title.toLowerCase().includes(cleanQ)).slice(0, 3),
        invoices: invoices.filter((i) => i.invoiceNumber.toLowerCase().includes(cleanQ) || i.clientName.toLowerCase().includes(cleanQ)).slice(0, 3),
      }
    : null;

  const hasAnyResults =
    searchResults &&
    (searchResults.leads.length > 0 ||
      searchResults.projects.length > 0 ||
      searchResults.clients.length > 0 ||
      searchResults.tasks.length > 0 ||
      searchResults.invoices.length > 0);

  const jumpTo = (module: ModuleId) => {
    setActiveModule(module);
    setSearchQuery("");
    setSearchFocused(false);
  };

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 py-2.5 sm:py-3 select-none">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Mobile Menu Trigger + Global Search */}
        <div className="flex items-center space-x-3 flex-1 max-w-xl">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Box */}
          <div ref={searchRef} className="relative flex-1 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search leads, projects, clients, invoices... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs pl-9 pr-8 py-2 rounded-xl border border-slate-200/70 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder-slate-400 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchFocused && cleanQ && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 max-h-96 overflow-y-auto z-50 space-y-3">
                {!hasAnyResults ? (
                  <p className="text-xs text-slate-400 py-3 text-center">No results found for &ldquo;{searchQuery}&rdquo;</p>
                ) : (
                  <>
                    {searchResults.leads.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">Leads</p>
                        {searchResults.leads.map((l) => (
                          <button
                            key={l.id}
                            onClick={() => jumpTo("leads")}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between group"
                          >
                            <span className="font-semibold text-slate-800 group-hover:text-brand-blue">{l.name} — <span className="font-normal text-slate-500">{l.company}</span></span>
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">{l.status}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.projects.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">Projects</p>
                        {searchResults.projects.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => jumpTo("projects")}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between group"
                          >
                            <span className="font-semibold text-slate-800 group-hover:text-brand-blue">{p.name}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono">{p.progress}%</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.clients.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">Clients</p>
                        {searchResults.clients.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => jumpTo("clients")}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between group"
                          >
                            <span className="font-semibold text-slate-800 group-hover:text-brand-blue">{c.companyName}</span>
                            <span className="text-[10px] text-slate-400">{c.city}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.invoices.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">Invoices</p>
                        {searchResults.invoices.map((inv) => (
                          <button
                            key={inv.id}
                            onClick={() => jumpTo("invoices")}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between group"
                          >
                            <span className="font-semibold text-slate-800 group-hover:text-brand-blue">{inv.invoiceNumber} — <span className="font-normal text-slate-500">{inv.clientName}</span></span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{inv.status}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions, Demo Badge, Notifications & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Persistent Demo Mode Indicator */}
          <div
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/90 text-[10px] sm:text-[11px] font-mono font-bold shadow-2xs"
            title="All names, companies, transactions and records displayed in this demonstration are fictional and provided solely for illustrative purposes."
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="truncate">DEMO MODE — FICTIONAL DATA</span>
          </div>

          {/* Reset Data Button */}
          <button
            onClick={resetAllData}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors"
            title="Reset all sample records back to initial demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Data</span>
          </button>

          {/* Quick Create Dropdown */}
          <div ref={quickRef} className="relative">
            <button
              onClick={() => setQuickCreateOpen((prev) => !prev)}
              className="inline-flex items-center space-x-1 bg-brand-blue hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs shadow-blue-500/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {quickCreateOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1">
                <button
                  onClick={() => { jumpTo("leads"); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700 font-medium flex items-center space-x-2"
                >
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Add New Lead</span>
                </button>
                <button
                  onClick={() => { jumpTo("quotations"); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700 font-medium flex items-center space-x-2"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Create Quotation</span>
                </button>
                <button
                  onClick={() => { jumpTo("projects"); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700 font-medium flex items-center space-x-2"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>New Project</span>
                </button>
                <button
                  onClick={() => { jumpTo("invoices"); setQuickCreateOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700 font-medium flex items-center space-x-2"
                >
                  <Receipt className="w-3.5 h-3.5 text-amber-600" />
                  <span>Generate Invoice</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">Notifications</span>
                    {unreadNotifs > 0 && (
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                        {unreadNotifs} new
                      </span>
                    )}
                  </div>
                  {unreadNotifs > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-brand-blue hover:underline font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.moduleId) setActiveModule(n.moduleId);
                        setNotificationsOpen(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-colors text-xs flex items-start space-x-2.5 ${
                        n.read ? "bg-slate-50/60 hover:bg-slate-100/80" : "bg-blue-50/70 hover:bg-blue-100/70"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === "success" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {n.type === "warning" && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                        {n.type === "info" && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold ${n.read ? "text-slate-800" : "text-slate-900"}`}>{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.description}</p>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.timestamp}</span>
                      </div>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="User profile menu"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-blue to-cyan-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                AM
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900">Alex Morgan</p>
                  <p className="text-[11px] text-slate-500">Operations Director (Demo)</p>
                  <span className="inline-flex items-center space-x-1 mt-1 text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Demo Session Active</span>
                  </span>
                </div>

                <button
                  onClick={() => { setActiveModule("settings"); setProfileOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Platform Settings</span>
                </button>

                <button
                  onClick={() => { resetAllData(); setProfileOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-medium flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4 text-rose-500" />
                  <span>Reset Demo Records</span>
                </button>

                <div className="border-t border-slate-100 pt-1">
                  <Link
                    href="/"
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-between"
                  >
                    <span>Exit to Setsuzoku.in</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
