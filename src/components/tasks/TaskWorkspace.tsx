"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { useTaskManager } from "@/hooks/useTaskManager";
import type { Task } from "@/types/task";
import { formatDateLabel } from "@/utils/taskFormatting";
import { getFocusTasks, getTaskMetrics } from "@/utils/taskMetrics";

type TaskWorkspaceProps = {
  readonly initialTasks: readonly Task[];
};

export function TaskWorkspace({ initialTasks }: TaskWorkspaceProps) {
  const {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    resetFilters,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  } = useTaskManager(initialTasks);
  const metrics = getTaskMetrics(tasks);
  const focusTasks = getFocusTasks(tasks);
  const stats = [
    {
      label: "Active tasks",
      value: String(metrics.activeTaskCount),
      helper: `${metrics.highPriorityActiveCount} high-priority tasks need attention this week.`,
      icon: "checkCircle",
      tone: "blue",
    },
    {
      label: "On-time rate",
      value: `${metrics.onTimeRate}%`,
      helper: `${metrics.completedTaskCount} completed items support delivery tracking.`,
      icon: "analytics",
      tone: "emerald",
    },
    {
      label: "Due this week",
      value: String(metrics.dueThisWeekCount),
      helper: "Planning, review, and QA tasks update from local task state.",
      icon: "calendar",
      tone: "orange",
    },
  ] as const;

  return (
    <section aria-labelledby="task-workspace-title" className="space-y-6">
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-200">
              Product workspace
            </p>
            <h1 id="task-workspace-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Plan, update, and finish team tasks from one focused dashboard.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              TaskFlow now runs as a fully interactive local workspace: create work, edit details, update statuses, and narrow the list without a database.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-bold text-indigo-100">Today&apos;s focus</p>
            <div className="mt-4 space-y-3">
              {focusTasks.map((task) => (
                <div key={task.id} className="rounded-2xl bg-white/10 p-3">
                  <p className="truncate text-sm font-bold text-white">{task.title}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {task.priority} · {formatDateLabel(task.dueDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 xl:sticky xl:top-24 xl:self-start">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-950">Create task</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              New tasks are added to local React state and can be edited or deleted immediately.
            </p>
          </div>
          <TaskForm submitLabel="Create task" onSubmit={createTask} />
        </section>

        <div className="space-y-5">
          <TaskFilters
            filters={filters}
            resultCount={filteredTasks.length}
            totalCount={tasks.length}
            onChange={setFilters}
            onReset={resetFilters}
          />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Task list</h2>
              <p className="text-sm text-slate-500">Search, filter, status-change, edit, or remove local tasks.</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
              {tasks.length} total tasks
            </span>
          </div>

          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onStatusChange={updateTaskStatus}
            onResetFilters={resetFilters}
          />
        </div>
      </div>
    </section>
  );
}
