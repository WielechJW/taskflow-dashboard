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
    },
    {
      label: "On-time rate",
      value: `${metrics.onTimeRate}%`,
      helper: `${metrics.completedTaskCount} completed items support delivery tracking.`,
      icon: "analytics",
    },
    {
      label: "Due this week",
      value: String(metrics.dueThisWeekCount),
      helper: "Keep your upcoming deadlines in view.",
      icon: "calendar",
    },
  ] as const;

  return (
    <section aria-labelledby="task-workspace-title" className="space-y-6">
      <div className="border-b-2 border-ink pb-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="max-w-3xl">
            <p className="retro-eyebrow">
              Task workspace
            </p>
            <h1 id="task-workspace-title" className="retro-title mt-3">
              Your work, in order.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              A clear space to plan, keep track, and check things off. One task at a time.
            </p>
          </div>
          <div className="border-l-2 border-ink pl-5">
            <p className="retro-eyebrow">Today&apos;s focus</p>
            <div className="mt-3 divide-y divide-line">
              {focusTasks.map((task) => (
                <div key={task.id} className="py-2 first:pt-0 last:pb-0">
                  <p className="truncate text-sm font-medium text-ink">{task.title}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted">
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <section className="retro-panel min-w-0 p-5 sm:p-6 xl:sticky xl:top-24 xl:self-start">
          <div className="mb-5 border-b border-ink pb-4">
            <p className="retro-eyebrow mb-2">Something to do</p>
            <h2 className="font-display text-2xl text-ink">Create task</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Give it a name, an owner, and a little context.
            </p>
          </div>
          <TaskForm submitLabel="Create task" onSubmit={createTask} />
        </section>

        <div className="min-w-0 space-y-5">
          <TaskFilters
            filters={filters}
            resultCount={filteredTasks.length}
            totalCount={tasks.length}
            onChange={setFilters}
            onReset={resetFilters}
          />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink">Task list</h2>
              <p className="mt-1 text-sm text-muted">Everything on your list, ready for the next step.</p>
            </div>
            <span className="retro-badge w-fit shrink-0">
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
