"use client";

import React, { useState, useMemo } from "react";
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderKanban,
  X,
} from "lucide-react";
import { useDemo } from "../DemoContext";
import { TaskColumn, TaskPriority } from "../types";

export const TasksModule: React.FC = () => {
  const { tasks, addTask, moveTask, deleteTask, projects } = useDemo();
  const [filterProject, setFilterProject] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New task form state
  const [newTitle, setNewTitle] = useState("");
  const [newProject, setNewProject] = useState(projects[0]?.name || "Custom ERP Platform");
  const [newPriority, setNewPriority] = useState<TaskPriority>("Medium");
  const [newAssignee, setNewAssignee] = useState("Alex Morgan");
  const [newDueDate, setNewDueDate] = useState("2026-12-05");
  const [newColumn, setNewColumn] = useState<TaskColumn>("todo");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.projectName.toLowerCase().includes(search.toLowerCase()) ||
        t.assignee.toLowerCase().includes(search.toLowerCase());
      const matchesProject = filterProject === "all" || t.projectName === filterProject;
      const matchesPriority = filterPriority === "all" || t.priority === filterPriority;
      return matchesSearch && matchesProject && matchesPriority;
    });
  }, [tasks, search, filterProject, filterPriority]);

  const columns: { id: TaskColumn; label: string; color: string; bg: string; border: string }[] = [
    { id: "todo", label: "To Do", color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" },
    { id: "in-progress", label: "In Progress", color: "text-blue-700", bg: "bg-blue-50/50", border: "border-blue-200" },
    { id: "review", label: "In Review", color: "text-purple-700", bg: "bg-purple-50/50", border: "border-purple-200" },
    { id: "completed", label: "Completed", color: "text-emerald-700", bg: "bg-emerald-50/50", border: "border-emerald-200" },
  ];

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Low":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle.trim(),
      projectName: newProject,
      priority: newPriority,
      assignee: newAssignee,
      dueDate: newDueDate,
      column: newColumn,
    });
    setNewTitle("");
    setShowAddModal(false);
  };

  const getNextColumn = (col: TaskColumn): TaskColumn | null => {
    if (col === "todo") return "in-progress";
    if (col === "in-progress") return "review";
    if (col === "review") return "completed";
    return null;
  };

  const getPrevColumn = (col: TaskColumn): TaskColumn | null => {
    if (col === "completed") return "review";
    if (col === "review") return "in-progress";
    if (col === "in-progress") return "todo";
    return null;
  };

  // Metrics
  const todoCount = tasks.filter((t) => t.column === "todo").length;
  const inProgressCount = tasks.filter((t) => t.column === "in-progress").length;
  const reviewCount = tasks.filter((t) => t.column === "review").length;
  const completedCount = tasks.filter((t) => t.column === "completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Sprint Tasks & Workflows</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track agile tickets, stage transitions, engineering assignments, and delivery milestones.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-sm transition-all shadow-blue-500/20 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Backlog / To Do</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{todoCount}</span>
            <span className="text-xs text-slate-400">queued</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Active Sprint</span>
            <FolderKanban className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-600">{inProgressCount}</span>
            <span className="text-xs text-blue-500/80">in progress</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Code / QA Review</span>
            <AlertCircle className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-600">{reviewCount}</span>
            <span className="text-xs text-purple-500/80">awaiting check</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">{completedCount}</span>
            <span className="text-xs text-emerald-500/80">delivered</span>
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
            placeholder="Search task title, assignee, or project..."
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Project:</span>
          </div>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium ml-2">
            <span>Priority:</span>
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.column === col.id);
          return (
            <div
              key={col.id}
              className={`rounded-xl border ${col.border} ${col.bg} p-3.5 flex flex-col min-h-[500px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-800">{col.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white font-medium border border-slate-200 text-slate-600">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setNewColumn(col.id);
                    setShowAddModal(true);
                  }}
                  className="p-1 hover:bg-white rounded text-slate-400 hover:text-slate-700 transition"
                  title={`Add task to ${col.label}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-lg bg-white/50">
                    <p className="text-xs text-slate-400">No tasks in this stage</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg border border-slate-200/90 p-3 shadow-sm hover:shadow transition group relative"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority} Priority
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-600"
                          title="Delete task"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2 mb-1.5">
                        {task.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2.5">
                        <FolderKanban className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{task.projectName}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[85px]">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate.split("-").slice(1).join("/")}</span>
                        </div>
                      </div>

                      {/* Interactive Stage Shift Actions */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                        {getPrevColumn(task.column) ? (
                          <button
                            onClick={() => moveTask(task.id, getPrevColumn(task.column)!)}
                            className="text-[10px] text-slate-500 hover:text-slate-800 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-100 transition"
                          >
                            <ArrowLeft className="w-2.5 h-2.5" />
                            <span>Back</span>
                          </button>
                        ) : (
                          <span />
                        )}

                        {getNextColumn(task.column) ? (
                          <button
                            onClick={() => moveTask(task.id, getNextColumn(task.column)!)}
                            className="text-[10px] text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-blue-50 transition ml-auto"
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-slate-800">Add New Ticket</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement OAuth2 Refresh Token Rotation"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project</label>
                  <select
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Stage</label>
                  <select
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value as TaskColumn)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assignee</label>
                  <input
                    type="text"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
