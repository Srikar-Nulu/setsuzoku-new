"use client";

import React, { useState, useMemo } from "react";
import {
  FileCheck2,
  Check,
  X,
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  User,
} from "lucide-react";
import { useDemo } from "../DemoContext";
import { ApprovalRequest, ApprovalStatus } from "../types";

export const ApprovalsModule: React.FC = () => {
  const { approvals, approveRequest, rejectRequest, formatCurrency } = useDemo();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);

  const filteredApprovals = useMemo(() => {
    return approvals.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.projectName.toLowerCase().includes(search.toLowerCase()) ||
        item.requestedBy.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === "all" || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [approvals, search, filterStatus]);

  const pendingList = approvals.filter((a) => a.status === "Pending");
  const approvedList = approvals.filter((a) => a.status === "Approved");
  const rejectedList = approvals.filter((a) => a.status === "Rejected");

  const totalPendingAmount = pendingList.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const getStatusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Governance & Change Approvals</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Formal authorization workflows for scope adjustments, budget variances, and contractor disbursements.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600">{pendingList.length}</span>
            <span className="text-xs text-amber-600/80">awaiting decision</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending Exposure</span>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(totalPendingAmount)}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">{approvedList.length}</span>
            <span className="text-xs text-emerald-500/80">passed</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Declined</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600">{rejectedList.length}</span>
            <span className="text-xs text-rose-500/80">blocked</span>
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
            placeholder="Search approval title, project, or requester..."
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
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Request / Scope</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Requester</th>
                <th className="py-3 px-4 text-right">Impact Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApprovals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No approval requests found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredApprovals.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 max-w-xs">{req.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{req.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200">
                        {req.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{req.projectName}</div>
                      <div className="text-[10px] text-slate-400">{req.requestedDate}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{req.requestedBy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900">
                      {req.amount ? formatCurrency(req.amount) : "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                      {req.resolvedAt && (
                        <div className="text-[10px] text-slate-400 mt-0.5">on {req.resolvedAt}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {req.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => approveRequest(req.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition shadow-sm font-medium flex items-center gap-1 text-[11px] px-2.5"
                            title="Authorize Request"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => rejectRequest(req.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition shadow-sm font-medium flex items-center gap-1 text-[11px] px-2.5"
                            title="Decline Request"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="text-xs text-blue-600 hover:underline font-medium"
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-semibold text-slate-800">Authorization Record</h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full font-semibold border ${getStatusBadge(
                    selectedRequest.status
                  )}`}
                >
                  {selectedRequest.status}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2">{selectedRequest.title}</h2>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-slate-800">{selectedRequest.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Project:</span>
                  <span className="font-semibold text-slate-800">{selectedRequest.projectName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Requested By:</span>
                  <span className="font-semibold text-slate-800">{selectedRequest.requestedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Date Logged:</span>
                  <span className="font-semibold text-slate-800">{selectedRequest.requestedDate}</span>
                </div>
                {selectedRequest.amount && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Financial Impact:</span>
                    <span className="font-bold text-sm text-slate-900">
                      {formatCurrency(selectedRequest.amount)}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Scope Justification:</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                  {selectedRequest.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
