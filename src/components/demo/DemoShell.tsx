"use client";

import React from "react";
import { DemoProvider, useDemo } from "./DemoContext";
import { DemoSidebar } from "./DemoSidebar";
import { DemoTopbar } from "./DemoTopbar";
import { DemoToast } from "./DemoToast";

// 12 Modules
import { LeadsModule } from "./modules/LeadsModule";
import { QuotationsModule } from "./modules/QuotationsModule";
import { ClientsModule } from "./modules/ClientsModule";
import { ProjectsModule } from "./modules/ProjectsModule";
import { TasksModule } from "./modules/TasksModule";
import { ApprovalsModule } from "./modules/ApprovalsModule";
import { InvoicesModule } from "./modules/InvoicesModule";
import { PaymentsModule } from "./modules/PaymentsModule";
import { ReportsModule } from "./modules/ReportsModule";
import { ClientPortalModule } from "./modules/ClientPortalModule";
import { TeamModule } from "./modules/TeamModule";
import { SettingsModule } from "./modules/SettingsModule";

const DemoContent: React.FC = () => {
  const { activeModule } = useDemo();

  const renderActiveModule = () => {
    switch (activeModule) {
      case "leads":
        return <LeadsModule />;
      case "quotations":
        return <QuotationsModule />;
      case "clients":
        return <ClientsModule />;
      case "projects":
        return <ProjectsModule />;
      case "tasks":
        return <TasksModule />;
      case "approvals":
        return <ApprovalsModule />;
      case "invoices":
        return <InvoicesModule />;
      case "payments":
        return <PaymentsModule />;
      case "reports":
        return <ReportsModule />;
      case "client-portal":
        return <ClientPortalModule />;
      case "team":
        return <TeamModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <LeadsModule />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <DemoSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <DemoTopbar />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">{renderActiveModule()}</div>
        </main>

        {/* Persistent Demo Mode Disclaimer Bar */}
        <footer className="bg-slate-900 text-slate-400 text-[11px] px-4 py-2 border-t border-slate-800 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left select-none z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-bold text-slate-200 tracking-wide font-mono text-[10px] sm:text-[11px]">
              DEMO MODE — FICTIONAL DATA
            </span>
          </div>
          <div className="text-slate-300 font-normal">
            All names, companies, transactions and records displayed in this demonstration are fictional and provided solely for illustrative purposes.
          </div>
          <div className="text-slate-500 font-mono text-[10px] hidden lg:block">
            Simulated Demonstration Environment
          </div>
        </footer>
      </div>

      {/* Interactive Toast Notifications */}
      <DemoToast />
    </div>
  );
};

export const DemoShell: React.FC = () => {
  return (
    <DemoProvider>
      <DemoContent />
    </DemoProvider>
  );
};
