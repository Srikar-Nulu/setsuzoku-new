"use client";

import React, { useState } from "react";
import { useDemo } from "../DemoContext";
import { Project, ProjectStatus } from "../types";
import {
  FolderGit2,
  Plus,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  X,
} from "lucide-react";

export const ProjectsModule: React.FC = () => {
  const { projects, addProject, updateProjectProgress, updateProjectStatus, formatCurrency } = useDemo();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State
  const [formName, setFormName] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formCategory, setFormCategory] = useState<Project["category"]>("Web Application");
  const [formBudget, setFormBudget] = useState("");
  const [formDueDate, setFormDueDate] = useState("2026-12-30");
  const [formLead, setFormLead] = useState("Alex Morgan");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formClient) return;

    addProject({
      name: formName,
      clientName: formClient,
      category: formCategory,
      budget: Number(formBudget) || 800000,
      spent: 0,
      progress: 5,
      status: "In Progress",
      startDate: new Date().toISOString().split("T")[0],
      dueDate: formDueDate,
      leadEngineer: formLead,
      teamSize: 3,
    });

    setFormName("");
    setFormClient("");
    setFormBudget("");
    setIsAddModalOpen(false);
  };

  // KPIs
  const totalProjects = projects.length;
  const activeCount = projects.filter((p) => p.status !== "Completed").length;
  const onTrackCount = projects.filter((p) => p.status === "On Track").length;
  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);

  const categories = ["All", "Web Application", "ERP / SaaS", "Mobile App", "Design System", "AI Automation"];
  const statuses = ["All", "In Progress", "On Track", "In Review", "At Risk", "Completed"];

  const filteredProjects = projects.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesStatus = activeStatus === "All" || p.status === activeStatus;
    return matchesCat && matchesStatus;
  });

  const statusColors: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
    "In Progress": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    "On Track": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    "In Review": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
    "At Risk": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
    Completed: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Engineering Projects</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time delivery milestones, budget burn rates, sprint health, and team allocation.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Workstreams</span>
            <FolderGit2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{activeCount}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Out of {totalProjects} total</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">On-Track Health</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{onTrackCount}</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">Meeting all sprint SLAs</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Engineering Budget</span>
            <DollarSign className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(totalBudget)}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Committed pipeline</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Average Velocity</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">72%</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">Sprint completion index</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-semibold pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Health Stage:</span>
            <div className="flex items-center space-x-1">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activeStatus === st
                      ? "bg-brand-blue text-white font-bold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => {
          const statusStyle = statusColors[project.status];
          const budgetPercent = Math.round((project.spent / project.budget) * 100);

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-2 leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{project.clientName}</p>
                  </div>

                  <select
                    value={project.status}
                    onChange={(e) => updateProjectStatus(project.id, e.target.value as ProjectStatus)}
                    className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border transition-colors outline-none cursor-pointer ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                  >
                    <option value="On Track">On Track</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Review">In Review</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Interactive Progress Slider */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <span>Delivery Completion</span>
                      <button
                        onClick={() => updateProjectProgress(project.id, Math.min(100, project.progress + 10))}
                        className="text-[10px] font-bold text-brand-blue hover:underline bg-blue-50 px-1.5 py-0.5 rounded"
                        title="Simulate 10% progress increase"
                      >
                        +10%
                      </button>
                    </span>
                    <span className="font-mono text-brand-blue">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        project.progress === 100
                          ? "bg-emerald-500"
                          : project.progress > 60
                          ? "bg-brand-blue"
                          : "bg-indigo-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Budget Utilization */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Budget Utilization</span>
                    <p className="font-mono font-bold text-slate-800">
                      {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">({budgetPercent}% deployed)</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Target Delivery</span>
                    <p className="font-mono font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.dueDate}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Lead and Team */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-brand-blue font-bold text-[10px] flex items-center justify-center">
                    {project.leadEngineer.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-700">{project.leadEngineer}</span>
                </div>

                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{project.teamSize} engineers</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Initialize Engineering Project</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kaveri Merchant Portal v2"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kaveri FinTech"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Project["category"])}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="ERP / SaaS">ERP / SaaS</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Design System">Design System</option>
                    <option value="AI Automation">AI Automation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Budget Allocation (₹)</label>
                  <input
                    type="number"
                    placeholder="1200000"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Delivery Date</label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-brand-blue outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Lead Software Engineer</label>
                <select
                  value={formLead}
                  onChange={(e) => setFormLead(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                >
                  <option value="Alex Morgan">Alex Morgan (Engineering Lead)</option>
                  <option value="Jordan Hayes">Jordan Hayes (Senior Architect)</option>
                  <option value="Taylor Brooks">Taylor Brooks (Product Lead)</option>
                  <option value="Morgan Reed">Morgan Reed (Full Stack Dev)</option>
                  <option value="Samira Patel">Samira Patel (Cloud Lead)</option>
                </select>
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
                  Create Workstream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
