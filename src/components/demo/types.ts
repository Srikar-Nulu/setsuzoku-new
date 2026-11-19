export type ModuleId =
  | "leads"
  | "quotations"
  | "clients"
  | "projects"
  | "tasks"
  | "approvals"
  | "invoices"
  | "payments"
  | "reports"
  | "client-portal"
  | "team"
  | "settings";

export type ModuleCategory = "Sales" | "Delivery" | "Money" | "Admin";

export interface NavigationItem {
  id: ModuleId;
  label: string;
  category: ModuleCategory;
  badge?: string;
  badgeVariant?: "default" | "warning" | "success" | "danger" | "info";
}

// 1. Leads
export type LeadStatus = "New" | "Contacted" | "In Discussion" | "Proposal Sent" | "Won" | "Lost";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number; // in INR
  status: LeadStatus;
  source: "Website" | "Referral" | "LinkedIn" | "Outbound" | "Inbound";
  createdAt: string;
  notes?: string;
}

// 2. Quotations
export type QuotationStatus = "Draft" | "Sent" | "Accepted" | "Declined";

export interface QuotationLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  items: QuotationLineItem[];
  subtotal: number;
  tax: number; // 18% GST
  total: number;
  status: QuotationStatus;
  issueDate: string;
  validUntil: string;
}

// 3. Clients
export type ClientStatus = "Active" | "Onboarding" | "Inactive";

export interface Client {
  id: string;
  companyName: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  status: ClientStatus;
  totalSpent: number;
  activeProjectsCount: number;
  avatarColor: string;
  notes?: string;
}

// 4. Projects
export type ProjectStatus = "In Progress" | "In Review" | "On Track" | "At Risk" | "Completed";

export interface Project {
  id: string;
  name: string;
  clientName: string;
  category: "Web Application" | "Mobile App" | "Design System" | "ERP / SaaS" | "AI Automation";
  budget: number;
  spent: number;
  progress: number; // 0-100
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
  leadEngineer: string;
  teamSize: number;
}

// 5. Tasks
export type TaskColumn = "todo" | "in-progress" | "review" | "completed";
export type TaskPriority = "High" | "Medium" | "Low";

export interface TaskItem {
  id: string;
  title: string;
  projectName: string;
  column: TaskColumn;
  priority: TaskPriority;
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
}

// 6. Approvals
export type ApprovalStatus = "Pending" | "Approved" | "Rejected";
export type ApprovalType = "Budget Extension" | "Scope Change" | "Discount Approval" | "Contractor Payout";

export interface ApprovalRequest {
  id: string;
  title: string;
  type: ApprovalType;
  requestedBy: string;
  requestedDate: string;
  amount?: number;
  projectName: string;
  description: string;
  status: ApprovalStatus;
  resolvedAt?: string;
}

// 7. Invoices
export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  tax: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  paymentMethod?: string;
  paidDate?: string;
}

// 8. Payments
export interface PaymentRecord {
  id: string;
  transactionRef: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  method: "NEFT / RTGS" | "UPI Business" | "Stripe" | "Corporate Card";
  date: string;
  status: "Completed" | "Processing";
}

// 9. Team
export type TeamRole = "Super Admin" | "Engineering Lead" | "Project Manager" | "Senior Developer" | "UI/UX Designer" | "Financial Analyst";

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  department: "Engineering" | "Design" | "Management" | "Operations";
  email: string;
  status: "Active" | "Away";
  avatar: string;
  accessLevel: "Admin" | "Manager" | "Developer" | "Viewer";
}

// 10. Notifications
export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "success" | "info" | "warning";
  moduleId?: ModuleId;
}

// 11. Settings
export interface DemoSettings {
  companyName: string;
  currency: "INR" | "USD";
  currencySymbol: string;
  timezone: string;
  emailAlerts: boolean;
  taskAlerts: boolean;
  invoiceReminders: boolean;
  autoSaveLocal: boolean;
}

// Toast
export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: "success" | "info" | "warning" | "danger";
}
