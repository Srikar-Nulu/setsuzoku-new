"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Layers,
  CheckCircle2,
  DollarSign,
  Activity,
} from "lucide-react";
import { useDemo } from "../DemoContext";

export const ReportsModule: React.FC = () => {
  const { leads, projects, invoices, payments, formatCurrency, addToast } = useDemo();
  const [period, setPeriod] = useState<"q4" | "fy26" | "ytd">("q4");

  // Calculations
  const totalWonLeads = leads.filter((l) => l.status === "Won");

  const pipelineValue = leads
    .filter((l) => l.status !== "Won" && l.status !== "Lost")
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalCollected = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.amount + curr.tax, 0);

  const totalProjectBudget = projects.reduce((acc, curr) => acc + curr.budget, 0);
  const totalProjectSpent = projects.reduce((acc, curr) => acc + curr.spent, 0);

  // Conversion Funnel metrics
  const funnelStages = [
    { name: "Total Inquiries", count: leads.length, color: "bg-slate-400" },
    {
      name: "Qualified / Discussing",
      count: leads.filter((l) => l.status !== "New").length,
      color: "bg-blue-500",
    },
    {
      name: "Proposal Sent",
      count: leads.filter((l) => l.status === "Proposal Sent" || l.status === "Won").length,
      color: "bg-indigo-500",
    },
    { name: "Won & Onboarded", count: totalWonLeads.length, color: "bg-emerald-500" },
  ];

  // Monthly revenue trend mock series
  const monthlyData = [
    { month: "Jun", billed: 320000, collected: 280000 },
    { month: "Jul", billed: 450000, collected: 400000 },
    { month: "Aug", billed: 580000, collected: 520000 },
    { month: "Sep", billed: 710000, collected: 680000 },
    { month: "Oct", billed: 890000, collected: 810000 },
    { month: "Nov", billed: 950000, collected: 890000 },
  ];

  const maxVal = Math.max(...monthlyData.map((d) => Math.max(d.billed, d.collected)));

  const handleExportCSV = () => {
    addToast("Report Exported", "Generated financial analytics export summary (CSV).", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Executive Analytics & Reports</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time financial telemetry, pipeline velocity, revenue realization, and delivery capacity metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs font-medium">
            <button
              onClick={() => setPeriod("q4")}
              className={`px-3 py-1 rounded-md transition ${
                period === "q4" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Current Q4
            </button>
            <button
              onClick={() => setPeriod("fy26")}
              className={`px-3 py-1 rounded-md transition ${
                period === "fy26" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              FY 2026
            </button>
            <button
              onClick={() => setPeriod("ytd")}
              className={`px-3 py-1 rounded-md transition ${
                period === "ytd" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              YTD
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Net Realized Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(totalCollected)}</span>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+28.4% QoQ Growth</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Pipeline</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-blue-600">{formatCurrency(pipelineValue)}</span>
            <div className="text-[11px] text-slate-400 mt-0.5">Weighted deal opportunities</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Collection Efficiency</span>
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-purple-600">
              {totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 100}%
            </span>
            <div className="text-[11px] text-purple-600/80 mt-0.5">Billed-to-cash conversion</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Budget Burn Efficiency</span>
            <Layers className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">
              {totalProjectBudget > 0 ? Math.round((totalProjectSpent / totalProjectBudget) * 100) : 0}%
            </span>
            <div className="text-[11px] text-amber-600 font-medium mt-0.5">Within target margins</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Collections Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Monthly Invoicing vs Collections</h3>
              <p className="text-xs text-slate-500 mt-0.5">Trailing 6-month gross billings vs cash received</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-slate-600 font-medium">Billed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-slate-600 font-medium">Collected</span>
              </div>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="pt-6 h-64 flex items-end justify-between gap-3 px-2 border-b border-slate-200">
            {monthlyData.map((d) => {
              const billedHeight = (d.billed / maxVal) * 100;
              const collectedHeight = (d.collected / maxVal) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full relative">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition absolute -top-10 bg-slate-900 text-white text-[10px] rounded px-2 py-1 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      <div>Billed: {formatCurrency(d.billed)}</div>
                      <div>Collected: {formatCurrency(d.collected)}</div>
                    </div>

                    {/* Billed Bar */}
                    <div
                      style={{ height: `${billedHeight}%` }}
                      className="w-4 sm:w-6 bg-blue-500 hover:bg-blue-600 rounded-t-sm transition-all"
                    />
                    {/* Collected Bar */}
                    <div
                      style={{ height: `${collectedHeight}%` }}
                      className="w-4 sm:w-6 bg-emerald-500 hover:bg-emerald-600 rounded-t-sm transition-all"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 mt-2">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Aggregated across all enterprise engagements</span>
            <span className="font-semibold text-slate-800">100% On-schedule delivery</span>
          </div>
        </div>

        {/* Sales Conversion Funnel */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Lead Conversion Funnel</h3>
            <p className="text-xs text-slate-500 mt-0.5">Stage progression from lead to signed contract</p>
          </div>

          <div className="space-y-3 pt-2">
            {funnelStages.map((stage) => {
              const percentage =
                funnelStages[0].count > 0
                  ? Math.round((stage.count / funnelStages[0].count) * 100)
                  : 0;
              return (
                <div key={stage.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{stage.name}</span>
                    <span className="font-bold text-slate-900">
                      {stage.count} <span className="text-slate-400 font-normal">({percentage}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1 mt-4">
            <div className="font-semibold text-slate-800">Pipeline Velocity Insight</div>
            <div>Average lead cycle duration: 18 days</div>
            <div>Proposal win rate: 71.4%</div>
          </div>
        </div>
      </div>

      {/* Projects Budget Utilization Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Project Budget vs Delivery Expenditure</h3>
            <p className="text-xs text-slate-500 mt-0.5">Margin health by active engagement</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-2.5 px-3">Project</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3 text-right">Contract Budget</th>
                <th className="py-2.5 px-3 text-right">Actual Spent</th>
                <th className="py-2.5 px-3 text-right">Remaining Margin</th>
                <th className="py-2.5 px-3">Burn Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => {
                const margin = p.budget - p.spent;
                const burnPct = p.budget > 0 ? Math.round((p.spent / p.budget) * 100) : 0;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{p.clientName}</td>
                    <td className="py-2.5 px-3 text-right font-medium">{formatCurrency(p.budget)}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-600">
                      {formatCurrency(p.spent)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                      {formatCurrency(margin)}
                    </td>
                    <td className="py-2.5 px-3 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              burnPct > 80 ? "bg-amber-500" : "bg-blue-600"
                            }`}
                            style={{ width: `${burnPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-medium text-slate-500 w-8 text-right">
                          {burnPct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
