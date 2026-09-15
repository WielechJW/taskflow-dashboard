import { getInitialTasks } from "@/services/taskService";
import type { TaskStatus } from "@/types/task";
import { getTaskMetrics } from "@/utils/taskMetrics";

type StatusMetric = {
  readonly status: TaskStatus;
  readonly label: string;
  readonly count: number;
  readonly percentage: number;
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  review: "In review",
  done: "Done",
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
    };
  });
}

export function AnalyticsOverview() {
  const tasks = getInitialTasks();
  const metrics = getTaskMetrics(tasks);
  const statusMetrics = getStatusMetrics();
  const completionRate = tasks.length === 0 ? 0 : Math.round((metrics.completedTaskCount / tasks.length) * 100);
  const summaryMetrics = [
    { label: "Total tasks", value: tasks.length, detail: "In your workspace" },
    { label: "Completion rate", value: `${completionRate}%`, detail: "Tasks marked as done" },
    { label: "Due this week", value: metrics.dueThisWeekCount, detail: "Keep an eye on deadlines" },
    { label: "High priority active", value: metrics.highPriorityActiveCount, detail: "First things first" },
  ] as const;

  return (
    <section aria-labelledby="analytics-title" className="space-y-6">
      <div className="border-b border-ink pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="retro-eyebrow">Workspace / Analytics</p>
          <span className="retro-badge">Mock data</span>
        </div>
        <h1 id="analytics-title" className="retro-title mt-4">
          Praca w liczbach.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Ten ekran pokazuje przykładowe KPI sprintu: tempo domykania zadań, aktualny rozkład statusów
          i obszary wymagające szybkiej reakcji.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <article key={metric.label} className="retro-panel p-5">
            <p className="retro-eyebrow">{metric.label}</p>
            <p className="mt-4 font-display text-4xl text-ink">{metric.value}</p>
            <p className="mt-3 border-t border-line pt-3 font-mono text-[10px] text-muted">{metric.detail}</p>
          </article>
        ))}
      </div>

      <section className="retro-panel p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <h2 className="font-display text-2xl text-ink">Task status distribution</h2>
          <span className="retro-badge">{tasks.length} tasks</span>
        </div>

        <div className="mt-6 space-y-6">
          {statusMetrics.map((metric) => (
            <article key={metric.status} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <p className="text-ink">{metric.label}</p>
                <p className="font-mono text-xs text-ink">
                  {metric.count} ({metric.percentage}%)
                </p>
              </div>
              <div className="h-3.5 overflow-hidden rounded-[2px] border border-ink bg-surface">
                <div
                  aria-hidden="true"
                  className="retro-progress h-full"
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
