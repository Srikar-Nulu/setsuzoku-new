"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDemo } from "./DemoContext";
import { ModuleId, ModuleCategory } from "./types";
import {
  Users,
  FileText,
  Building2,
  FolderGit2,
  CheckSquare,
  CheckCircle2,
  Receipt,
  CreditCard,
  BarChart3,
  Globe,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

interface NavGroup {
  category: ModuleCategory;
  items: {
    id: ModuleId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    getBadge?: (ctx: ReturnType<typeof useDemo>) => { text: string; variant?: "blue" | "emerald" | "amber" | "rose" | "slate" } | null;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    category: "Sales",
    items: [
      {
        id: "leads",
        label: "Leads",
        icon: Users,
        getBadge: (ctx) => ({ text: String(ctx.leads.length), variant: "blue" }),
      },
      {
        id: "quotations",
        label: "Quotations",
        icon: FileText,
        getBadge: (ctx) => ({ text: String(ctx.quotations.filter((q) => q.status === "Sent" || q.status === "Draft").length), variant: "slate" }),
      },
      {
        id: "clients",
        label: "Clients",
        icon: Building2,
        getBadge: (ctx) => ({ text: String(ctx.clients.length), variant: "slate" }),
      },
    ],
  },
  {
    category: "Delivery",
    items: [
      {
        id: "projects",
        label: "Projects",
        icon: FolderGit2,
        getBadge: (ctx) => ({ text: String(ctx.projects.filter((p) => p.status !== "Completed").length), variant: "emerald" }),
      },
      {
        id: "tasks",
        label: "Tasks",
        icon: CheckSquare,
        getBadge: (ctx) => ({ text: String(ctx.tasks.filter((t) => t.column !== "completed").length), variant: "slate" }),
      },
      {
        id: "approvals",
        label: "Approvals",
        icon: CheckCircle2,
        getBadge: (ctx) => {
          const pending = ctx.approvals.filter((a) => a.status === "Pending").length;
          return pending > 0 ? { text: String(pending), variant: "amber" } : null;
        },
      },
    ],
  },
  {
    category: "Money",
    items: [
      {
        id: "invoices",
        label: "Invoices",
        icon: Receipt,
        getBadge: (ctx) => {
          const overdue = ctx.invoices.filter((i) => i.status === "Overdue").length;
          return overdue > 0 ? { text: `${overdue} Due`, variant: "rose" } : null;
        },
      },
      {
        id: "payments",
        label: "Payments",
        icon: CreditCard,
      },
      {
        id: "reports",
        label: "Reports",
        icon: BarChart3,
        getBadge: () => ({ text: "Live", variant: "emerald" }),
      },
    ],
  },
  {
    category: "Admin",
    items: [
      {
        id: "client-portal",
        label: "Client Portal",
        icon: Globe,
        getBadge: () => ({ text: "Preview", variant: "blue" }),
      },
      {
        id: "team",
        label: "Team & Permissions",
        icon: ShieldCheck,
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

export const DemoSidebar: React.FC = () => {
  const ctx = useDemo();
  const {
    activeModule,
    setActiveModule,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = ctx;

  const handleSelect = (id: ModuleId) => {
    setActiveModule(id);
    setMobileSidebarOpen(false);
  };

  const badgeColors = {
    blue: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    emerald: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    amber: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    rose: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    slate: "bg-slate-800 text-slate-400 border border-slate-700",
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="bg-white p-1.5 rounded-lg shrink-0 shadow-xs flex items-center justify-center">
            <Image
              src="/brand/setsuzoku-icon.png"
              alt="Setsuzoku"
              width={28}
              height={28}
              className="w-6 h-6 object-contain"
            />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <span className="text-sm font-black text-white tracking-tight block truncate">
                Setsuzoku
              </span>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ERP SUITE
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5 scrollbar-thin scrollbar-thumb-slate-700">
        {NAV_GROUPS.map((group) => (
          <div key={group.category} className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {group.category}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                const badge = item.getBadge ? item.getBadge(ctx) : null;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center rounded-xl transition-all duration-150 text-xs font-semibold ${
                      sidebarCollapsed ? "justify-center p-2.5" : "px-3 py-2 space-x-3"
                    } ${
                      isActive
                        ? "bg-brand-blue text-white shadow-xs font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`shrink-0 ${sidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} ${isActive ? "text-white" : "text-slate-400"}`} />
                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {!sidebarCollapsed && badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold leading-none shrink-0 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : badgeColors[badge.variant || "slate"]
                        }`}
                      >
                        {badge.text}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 shrink-0 space-y-2">
        {/* User Card */}
        <div
          className={`flex items-center rounded-xl p-2 bg-slate-800/40 border border-slate-700/50 ${
            sidebarCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-cyan-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
            AM
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-200 truncate leading-tight">Alex Morgan</p>
              <p className="text-[10px] text-slate-400 truncate leading-tight">Operations Lead</p>
            </div>
          )}
        </div>

        {/* Back to Setsuzoku Link */}
        <Link
          href="/"
          className={`flex items-center text-xs font-medium text-slate-400 hover:text-brand-blue hover:bg-slate-800/60 rounded-xl p-2 transition-colors ${
            sidebarCollapsed ? "justify-center" : "space-x-2"
          }`}
          title="Return to Setsuzoku.in Website"
        >
          <LogOut className="w-4 h-4 shrink-0 text-slate-400" />
          {!sidebarCollapsed && <span>Exit to Setsuzoku.in</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 h-screen sticky top-0 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
