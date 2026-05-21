import { getInitialTasks } from "@/services/taskService";
import type { TaskStatus } from "@/types/task";
import { getTaskMetrics } from "@/utils/taskMetrics";

type StatusMetric = {
  readonly status: TaskStatus;
  readonly label: string;
  readonly count: number;
  readonly percentage: number;
  readonly toneClassName: string;
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  review: "In review",
  done: "Done",
};

const STATUS_TONES: Record<TaskStatus, string> = {
  todo: "bg-slate-500",
  "in-progress": "bg-blue-500",
  review: "bg-amber-500",
  done: "bg-emerald-500",
};

function getStatusMetrics(): readonly StatusMetric[] {
  const tasks = getInitialTasks();
  const totalTaskCount = tasks.length;

  const statusCounts = tasks.reduce<Record<TaskStatus, number>>(
    (accumulator, task) => ({
      ...accumulator,
      [task.status]: accumulator[task.status] + 1,
    }),
    {
      todo: 0,
      "in-progress": 0,
      review: 0,
      done: 0,
    },
  );

  return (Object.keys(statusCounts) as TaskStatus[]).map((status) => {
    const count = statusCounts[status];

    return {
      status,
      label: STATUS_LABELS[status],
      count,
      percentage: totalTaskCount === 0 ? 0 : Math.round((count / totalTaskCount) * 100),
      toneClassName: STATUS_TONES[status],
    };
  });
}

export function AnalyticsOverview() {
  const tasks = getInitialTasks();
  const metrics = getTaskMetrics(tasks);
  const statusMetrics = getStatusMetrics();
  const completionRate = tasks.length === 0 ? 0 : Math.round((metrics.completedTaskCount / tasks.length) * 100);

  return (
    <section aria-labelledby="analytics-title" className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-2xl shadow-slate-300/60 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-200">Analytics</p>
        <h1 id="analytics-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Przykładowy widok analityki dla zespołu TaskFlow.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Ten ekran pokazuje przykładowe KPI sprintu: tempo domykania zadań, aktualny rozkład statusów
          i obszary wymagające szybkiej reakcji.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <p className="text-sm font-semibold text-slate-500">Total tasks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{tasks.length}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <p className="text-sm font-semibold text-slate-500">Completion rate</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">{completionRate}%</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <p className="text-sm font-semibold text-slate-500">Due this week</p>
          <p className="mt-2 text-3xl font-bold text-indigo-700">{metrics.dueThisWeekCount}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <p className="text-sm font-semibold text-slate-500">High priority active</p>
          <p className="mt-2 text-3xl font-bold text-rose-700">{metrics.highPriorityActiveCount}</p>
        </article>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-950">Task status distribution</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Mock data</span>
        </div>

        <div className="mt-6 space-y-4">
          {statusMetrics.map((metric) => (
            <article key={metric.status} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <p className="font-semibold text-slate-700">{metric.label}</p>
                <p className="font-bold text-slate-950">
                  {metric.count} ({metric.percentage}%)
                </p>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100">
                <div
                  aria-hidden="true"
                  className={`h-full rounded-full ${metric.toneClassName}`}
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
