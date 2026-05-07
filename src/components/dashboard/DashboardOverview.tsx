import { StatCard } from "@/components/dashboard/StatCard";
import { getInitialTasks } from "@/services/taskService";
import type { Task } from "@/types/task";
import { getFocusTasks, getTaskMetrics } from "@/utils/taskMetrics";

function formatDueLabel(task: Task): string {
  if (!task.dueDate) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${task.dueDate}T00:00:00.000Z`));
}

export function DashboardOverview() {
  const tasks = getInitialTasks();
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
      helper: `${metrics.completedTaskCount} completed item supports delivery tracking.`,
      icon: "analytics",
      tone: "emerald",
    },
    {
      label: "Due this week",
      value: String(metrics.dueThisWeekCount),
      helper: "Planning, review, and QA tasks are queued from mock task data.",
      icon: "calendar",
      tone: "orange",
    },
  ] as const;

  return (
    <section aria-labelledby="dashboard-overview-title" className="space-y-6">
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-200">
            Product workspace
          </p>
          <h2
            id="dashboard-overview-title"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Organize every task, deadline, and project signal in one focused dashboard.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            TaskFlow gives teams a polished command center for priority work, status
            changes, and upcoming deadlines without the clutter.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-950">Today&apos;s focus</h3>
              <p className="text-sm text-slate-500">High-impact tasks for the team.</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {focusTasks.length} on track
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {focusTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-slate-700">{task.title}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {task.project} · {task.priority} priority
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
                  {formatDueLabel(task)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
          <h3 className="text-lg font-bold text-slate-950">Team capacity</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Responsive shell space is ready for upcoming charts, filters, and task workflows.
          </p>
          <div className="mt-6 space-y-4">
            {["Design", "Engineering", "Operations"].map((team, index) => (
              <div key={team}>
                <div className="flex justify-between text-sm font-semibold text-slate-600">
                  <span>{team}</span>
                  <span>{70 + index * 8}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-slate-950"
                    style={{ width: `${70 + index * 8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
