import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import { Icon } from "@/components/ui/Icon";
import { getInitialTasks } from "@/services/taskService";
import type { Task } from "@/types/task";
import { getFocusTasks, getTaskMetrics } from "@/utils/taskMetrics";

const teamCapacity = [
  { name: "Design", capacity: 70 },
  { name: "Engineering", capacity: 78 },
  { name: "Operations", capacity: 86 },
] as const;

function formatDueLabel(task: Task): string {
  if (!task.dueDate) return "No due date";
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
      value: String(metrics.activeTaskCount).padStart(2, "0"),
      helper: `${metrics.highPriorityActiveCount} high-priority tasks to keep an eye on.`,
      icon: "checkCircle",
    },
    {
      label: "On-time rate",
      value: `${metrics.onTimeRate}%`,
      helper: `${metrics.completedTaskCount} completed task delivered on schedule.`,
      icon: "analytics",
    },
    {
      label: "Due this week",
      value: String(metrics.dueThisWeekCount).padStart(2, "0"),
      helper: "A little planning goes a long way.",
      icon: "calendar",
    },
  ] as const;

  return (
    <section aria-labelledby="dashboard-overview-title" className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink pb-6">
        <div>
          <p className="retro-eyebrow">Your day, at a glance</p>
          <h2 id="dashboard-overview-title" className="retro-title mt-2">Good work starts here.</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Welcome back, Alex. Let&apos;s make a little progress.</p>
        </div>
        <Link className="retro-button" href="/tasks"><span aria-hidden="true" className="text-lg leading-none">+</span> Manage tasks</Link>
      </div>

      <div className="retro-panel overflow-hidden">
        <div className="flex items-center gap-3 border-b border-ink px-4 py-2.5">
          <span aria-hidden="true" className="h-3 w-3 border border-ink" />
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest">A note for today</p>
          <div aria-hidden="true" className="retro-window-rule ml-1 flex-1" />
        </div>
        <div className="retro-pattern flex items-center justify-between gap-6 px-5 py-6 sm:px-7">
          <div className="max-w-xl">
            <p className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">Big ideas. Small steps.<br /><span className="italic">One thing at a time.</span></p>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">A clear space for your tasks, your team, and whatever comes next.</p>
          </div>
          <div aria-hidden="true" className="hidden h-24 w-24 shrink-0 rotate-[-7deg] items-center justify-center border-2 border-ink bg-white shadow-[5px_5px_0_#1c1c1c] sm:flex">
            <Icon name="checkCircle" className="h-12 w-12" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="retro-panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink px-5 py-4">
            <h3 className="font-display text-xl">Today&apos;s focus</h3>
            <span className="retro-badge">{focusTasks.length} priorities</span>
          </div>
          <ol className="divide-y divide-line px-5">
            {focusTasks.map((task, index) => (
              <li key={task.id} className="flex items-start gap-3 py-4">
                <span aria-hidden="true" className="mt-0.5 font-mono text-[11px] text-muted">0{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-5 text-ink">{task.title}</p>
                  <p className="mt-1.5 font-mono text-[10px] leading-4 text-muted">{task.project} / {task.priority}</p>
                </div>
                <span className="shrink-0 pt-0.5 font-mono text-[10px] font-bold text-ink">{formatDueLabel(task)}</span>
              </li>
            ))}
          </ol>
          <Link href="/tasks" className="flex items-center justify-between border-t border-ink bg-surface px-5 py-3 font-mono text-[11px] font-bold hover:bg-ink hover:text-white">
            View all tasks <span aria-hidden="true">↗</span>
          </Link>
        </section>

        <section className="retro-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink px-5 py-4">
            <h3 className="font-display text-xl">Team capacity</h3>
            <Icon name="users" className="h-4 w-4" />
          </div>
          <div className="space-y-5 p-5">
            {teamCapacity.map((team) => (
              <div key={team.name}>
                <div className="flex justify-between gap-3 text-xs">
                  <span className="font-semibold">{team.name}</span>
                  <span className="font-mono">{team.capacity}%</span>
                </div>
                <div className="mt-2 h-3 border border-ink bg-surface" role="meter" aria-label={team.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={team.capacity}>
                  <div className="retro-progress h-full border-0" style={{ width: `${team.capacity}%` }} />
                </div>
              </div>
            ))}
            <p className="border-t border-line pt-3 font-mono text-[10px] leading-5 text-muted">Good things happen when there&apos;s room to focus.</p>
          </div>
        </section>
      </div>
    </section>
  );
}
