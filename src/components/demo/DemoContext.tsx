"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  ModuleId,
  Lead,
  Quotation,
  Client,
  Project,
  TaskItem,
  TaskColumn,
  ApprovalRequest,
  Invoice,
  PaymentRecord,
  TeamMember,
  NotificationItem,
  DemoSettings,
  ToastMessage,
  LeadStatus,
  QuotationStatus,
} from "./types";
import {
  initialLeads,
  initialQuotations,
  initialClients,
  initialProjects,
  initialTasks,
  initialApprovals,
  initialInvoices,
  initialPayments,
  initialTeamMembers,
  initialNotifications,
  initialSettings,
} from "./mockData";

const STORAGE_KEY = "setsuzoku_demo_store_fictional_v2";

interface DemoContextType {
  activeModule: ModuleId;
  setActiveModule: (module: ModuleId) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Data collections
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;

  quotations: Quotation[];
  addQuotation: (quote: Omit<Quotation, "id" | "quoteNumber">) => void;
  updateQuotationStatus: (id: string, status: QuotationStatus) => void;
  deleteQuotation: (id: string) => void;

  clients: Client[];
  addClient: (client: Omit<Client, "id" | "totalSpent" | "activeProjectsCount" | "avatarColor">) => void;
  deleteClient: (id: string) => void;

  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProjectProgress: (id: string, progress: number) => void;
  updateProjectStatus: (id: string, status: Project["status"]) => void;

  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, "id">) => void;
  moveTask: (id: string, toColumn: TaskColumn) => void;
  deleteTask: (id: string) => void;

  approvals: ApprovalRequest[];
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;

  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, "id" | "invoiceNumber">) => void;
  markInvoicePaid: (id: string) => void;
  deleteInvoice: (id: string) => void;

  payments: PaymentRecord[];
  addPayment: (payment: Omit<PaymentRecord, "id" | "transactionRef">) => void;

  team: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, "id" | "avatar">) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  settings: DemoSettings;
  updateSettings: (newSettings: Partial<DemoSettings>) => void;

  toasts: ToastMessage[];
  addToast: (title: string, description?: string, variant?: ToastMessage["variant"]) => void;
  removeToast: (id: string) => void;

  resetAllData: () => void;
  formatCurrency: (amount: number) => string;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<ModuleId>("leads");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // State collections
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(initialApprovals);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [team, setTeam] = useState<TeamMember[]>(initialTeamMembers);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [settings, setSettings] = useState<DemoSettings>(initialSettings);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Toast management
  const addToast = useCallback((title: string, description?: string, variant: ToastMessage["variant"] = "success") => {
    const id = "toast-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("setsuzoku_demo_store_v1");
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.leads) setLeads(parsed.leads);
          if (parsed.quotations) setQuotations(parsed.quotations);
          if (parsed.clients) setClients(parsed.clients);
          if (parsed.projects) setProjects(parsed.projects);
          if (parsed.tasks) setTasks(parsed.tasks);
          if (parsed.approvals) setApprovals(parsed.approvals);
          if (parsed.invoices) setInvoices(parsed.invoices);
          if (parsed.payments) setPayments(parsed.payments);
          if (parsed.team) setTeam(parsed.team);
          if (parsed.notifications) setNotifications(parsed.notifications);
          if (parsed.settings) setSettings(parsed.settings);
        }
      }
    } catch {
      // Ignore storage read error
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to localStorage on state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (typeof window !== "undefined") {
        const payload = {
          leads,
          quotations,
          clients,
          projects,
          tasks,
          approvals,
          invoices,
          payments,
          team,
          notifications,
          settings,
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      }
    } catch {
      // Ignore write errors (quota exceeded or incognito)
    }
  }, [
    isInitialized,
    leads,
    quotations,
    clients,
    projects,
    tasks,
    approvals,
    invoices,
    payments,
    team,
    notifications,
    settings,
  ]);

  // Currency Formatter
  const formatCurrency = useCallback((amount: number): string => {
    if (settings.currency === "USD") {
      return "$" + amount.toLocaleString("en-US");
    }
    // Indian numbering format (Lakhs / Thousands)
    return "₹" + amount.toLocaleString("en-IN");
  }, [settings.currency]);

  // Reset Demo Data
  const resetAllData = useCallback(() => {
    setLeads(initialLeads);
    setQuotations(initialQuotations);
    setClients(initialClients);
    setProjects(initialProjects);
    setTasks(initialTasks);
    setApprovals(initialApprovals);
    setInvoices(initialInvoices);
    setPayments(initialPayments);
    setTeam(initialTeamMembers);
    setNotifications(initialNotifications);
    setSettings(initialSettings);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
    addToast("Demo Data Reset", "Restored factory demonstration records.", "info");
  }, [addToast]);

  // Lead actions
  const addLead = useCallback((lead: Omit<Lead, "id" | "createdAt">) => {
    const newLead: Lead = {
      ...lead,
      id: "lead-" + Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setLeads((prev) => [newLead, ...prev]);
    addToast("Lead Added", `${newLead.name} (${newLead.company}) registered.`, "success");
  }, [addToast]);

  const updateLeadStatus = useCallback((id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    addToast("Lead Status Updated", `Status changed to "${status}".`, "info");
  }, [addToast]);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    addToast("Lead Removed", "Record removed from local state.", "warning");
  }, [addToast]);

  // Quotation actions
  const addQuotation = useCallback((quote: Omit<Quotation, "id" | "quoteNumber">) => {
    const quoteNumber = "QT-2026-" + Math.floor(100 + Math.random() * 900);
    const newQuote: Quotation = {
      ...quote,
      id: "quote-" + Date.now(),
      quoteNumber,
    };
    setQuotations((prev) => [newQuote, ...prev]);
    addToast("Quotation Created", `Generated proposal ${quoteNumber} for ${newQuote.clientName}.`, "success");
  }, [addToast]);

  const updateQuotationStatus = useCallback((id: string, status: QuotationStatus) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
    addToast("Quotation Updated", `Proposal marked as "${status}".`, "info");
  }, [addToast]);

  const deleteQuotation = useCallback((id: string) => {
    setQuotations((prev) => prev.filter((q) => q.id !== id));
    addToast("Quotation Deleted", "Quotation removed from registry.", "warning");
  }, [addToast]);

  // Client actions
  const addClient = useCallback((client: Omit<Client, "id" | "totalSpent" | "activeProjectsCount" | "avatarColor">) => {
    const colors = ["bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600", "bg-cyan-600", "bg-pink-600"];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];
    const newClient: Client = {
      ...client,
      id: "client-" + Date.now(),
      totalSpent: 0,
      activeProjectsCount: 1,
      avatarColor,
    };
    setClients((prev) => [newClient, ...prev]);
    addToast("Client Onboarded", `${newClient.companyName} added to directory.`, "success");
  }, [addToast]);

  const deleteClient = useCallback((id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    addToast("Client Removed", "Client removed from active records.", "warning");
  }, [addToast]);

  // Project actions
  const addProject = useCallback((project: Omit<Project, "id">) => {
    const newProj: Project = {
      ...project,
      id: "proj-" + Date.now(),
    };
    setProjects((prev) => [newProj, ...prev]);
    addToast("Project Initialized", `${newProj.name} created for ${newProj.clientName}.`, "success");
  }, [addToast]);

  const updateProjectProgress = useCallback((id: string, progress: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, progress, status: progress === 100 ? "Completed" : p.status } : p))
    );
  }, []);

  const updateProjectStatus = useCallback((id: string, status: Project["status"]) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    addToast("Project Status", `Status changed to ${status}.`, "info");
  }, [addToast]);

  // Tasks actions
  const addTask = useCallback((task: Omit<TaskItem, "id">) => {
    const newTask: TaskItem = {
      ...task,
      id: "task-" + Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    addToast("Task Created", `"${newTask.title}" assigned to ${newTask.assignee}.`, "success");
  }, [addToast]);

  const moveTask = useCallback((id: string, toColumn: TaskColumn) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, column: toColumn } : t))
    );
    const colLabels: Record<TaskColumn, string> = {
      todo: "To Do",
      "in-progress": "In Progress",
      review: "In Review",
      completed: "Completed",
    };
    addToast("Task Moved", `Moved to "${colLabels[toColumn]}".`, "info");
  }, [addToast]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addToast("Task Deleted", "Task removed from sprint board.", "warning");
  }, [addToast]);

  // Approvals actions
  const approveRequest = useCallback((id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "Approved", resolvedAt: new Date().toISOString().split("T")[0] }
          : a
      )
    );
    addToast("Request Approved", "Authorization logged in internal ledger.", "success");
  }, [addToast]);

  const rejectRequest = useCallback((id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "Rejected", resolvedAt: new Date().toISOString().split("T")[0] }
          : a
      )
    );
    addToast("Request Declined", "Proposal rejected by operations lead.", "warning");
  }, [addToast]);

  // Invoice actions
  const addInvoice = useCallback((invoice: Omit<Invoice, "id" | "invoiceNumber">) => {
    const invoiceNumber = "INV-2026-" + Math.floor(1050 + Math.random() * 500);
    const newInvoice: Invoice = {
      ...invoice,
      id: "inv-" + Date.now(),
      invoiceNumber,
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    addToast("Invoice Generated", `${invoiceNumber} dispatched to ${newInvoice.clientName}.`, "success");
  }, [addToast]);

  const markInvoicePaid = useCallback((id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          const updated: Invoice = {
            ...inv,
            status: "Paid",
            paymentMethod: "NEFT / RTGS",
            paidDate: new Date().toISOString().split("T")[0],
          };
          // Also record payment
          const newPay: PaymentRecord = {
            id: "pay-" + Date.now(),
            transactionRef: "TXN-" + Math.floor(10000000 + Math.random() * 90000000),
            invoiceNumber: inv.invoiceNumber,
            clientName: inv.clientName,
            amount: inv.amount + inv.tax,
            method: "NEFT / RTGS",
            date: new Date().toISOString().split("T")[0],
            status: "Completed",
          };
          setPayments((p) => [newPay, ...p]);
          return updated;
        }
        return inv;
      })
    );
    addToast("Payment Recorded", "Invoice settled and transaction logged.", "success");
  }, [addToast]);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    addToast("Invoice Voided", "Invoice record removed.", "warning");
  }, [addToast]);

  // Payment actions
  const addPayment = useCallback((payment: Omit<PaymentRecord, "id" | "transactionRef">) => {
    const transactionRef = "TXN-" + Math.floor(10000000 + Math.random() * 90000000);
    const newPay: PaymentRecord = {
      ...payment,
      id: "pay-" + Date.now(),
      transactionRef,
    };
    setPayments((prev) => [newPay, ...prev]);
    addToast("Payment Logged", `${transactionRef} verified successfully.`, "success");
  }, [addToast]);

  // Team actions
  const addTeamMember = useCallback((member: Omit<TeamMember, "id" | "avatar">) => {
    const initials = member.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const newMember: TeamMember = {
      ...member,
      id: "team-" + Date.now(),
      avatar: initials || "TM",
    };
    setTeam((prev) => [...prev, newMember]);
    addToast("Member Added", `Invited ${newMember.name} to ${newMember.department}.`, "success");
  }, [addToast]);

  // Notification actions
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("Notifications Cleared", "All alerts marked as read.", "info");
  }, [addToast]);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<DemoSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast("Settings Saved", "Preferences updated in browser memory.", "success");
  }, [addToast]);

  return (
    <DemoContext.Provider
      value={{
        activeModule,
        setActiveModule,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        searchQuery,
        setSearchQuery,
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        quotations,
        addQuotation,
        updateQuotationStatus,
        deleteQuotation,
        clients,
        addClient,
        deleteClient,
        projects,
        addProject,
        updateProjectProgress,
        updateProjectStatus,
        tasks,
        addTask,
        moveTask,
        deleteTask,
        approvals,
        approveRequest,
        rejectRequest,
        invoices,
        addInvoice,
        markInvoicePaid,
        deleteInvoice,
        payments,
        addPayment,
        team,
        addTeamMember,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        settings,
        updateSettings,
        toasts,
        addToast,
        removeToast,
        resetAllData,
        formatCurrency,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
