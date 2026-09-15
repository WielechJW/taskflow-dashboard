import { CalendarDayCard } from "@/components/calendar/CalendarDayCard";
import { CalendarStatCard } from "@/components/calendar/CalendarStatCard";
import { UpcomingTaskCard } from "@/components/calendar/UpcomingTaskCard";
import { getInitialTasks } from "@/services/taskService";
import {
  CALENDAR_MONTH_INDEX,
  CALENDAR_REFERENCE_DATE,
  CALENDAR_YEAR,
  WEEKDAY_LABELS,
  formatCalendarDayLabel,
  formatCalendarMonthLabel,
  getCalendarDays,
  getCalendarSummary,
  getUpcomingCalendarTasks,
} from "@/utils/calendar";

const UPCOMING_TASK_LIMIT = 4;

export function CalendarOverview() {
  const tasks = getInitialTasks();
  const calendarDays = getCalendarDays(tasks);
  const summary = getCalendarSummary(tasks);
  const upcomingTasks = getUpcomingCalendarTasks(tasks).slice(0, UPCOMING_TASK_LIMIT);
  const monthLabel = formatCalendarMonthLabel(CALENDAR_YEAR, CALENDAR_MONTH_INDEX);
  const referenceDateLabel = formatCalendarDayLabel(CALENDAR_REFERENCE_DATE);
  const calendarStats = [
    {
      label: "Scheduled",
      value: summary.scheduledTaskCount,
      helper: "Tasks with due dates visible on the calendar.",
    },
    {
      label: "Active",
      value: summary.activeTaskCount,
      helper: "Open work planned across current deadlines.",
    },
    {
      label: "Overdue",
      value: summary.overdueTaskCount,
      helper: "Needs follow-up before the next planning review.",
    },
    {
      label: "Completed",
      value: summary.completedTaskCount,
      helper: "Finished scheduled work captured from task data.",
    },
  ] as const;

  return (
    <section aria-labelledby="calendar-title" className="space-y-6">
      <div className="border-b-2 border-ink pb-6">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="retro-eyebrow">Calendar / Plan ahead</p>
            <h2 id="calendar-title" className="retro-title mt-3">
              Every deadline in its place.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              A clear view of your tasks, priorities, and upcoming deadlines for {monthLabel}.
            </p>
          </div>
          <aside className="rounded-[3px] border border-ink bg-white p-4">
            <p className="retro-eyebrow">Today</p>
            <p className="mt-2 font-display text-xl text-ink">{referenceDateLabel}</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              Start with overdue tasks, then look at what comes next.
            </p>
          </aside>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {calendarStats.map((stat) => (
          <CalendarStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="retro-panel min-w-0 p-4 sm:p-5" aria-label={`${monthLabel} calendar`}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-2xl text-ink">{monthLabel}</h3>
              <p className="mt-1 text-xs text-muted">Your month at a glance.</p>
            </div>
            <span className="retro-badge w-fit">
              {summary.activeTaskCount} active deadlines
            </span>
          </div>

          <p className="mt-4 font-mono text-[10px] text-muted sm:hidden">Scroll sideways to see the full week →</p>
          <div className="mt-5 overflow-x-auto pb-2" tabIndex={0} role="region" aria-label="Monthly schedule, scroll horizontally to see all days">
            <div className="min-w-[580px]">
              <div className="grid grid-cols-7 gap-1.5 border-b border-ink pb-3 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                {WEEKDAY_LABELS.map((dayLabel) => (
                  <div key={dayLabel}>{dayLabel}</div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {calendarDays.map((day) => (
                  <CalendarDayCard key={day.date} day={day} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="retro-panel space-y-4 p-5">
          <div className="border-b border-ink pb-4">
            <h3 className="font-display text-xl text-ink">Coming up next</h3>
            <p className="mt-1 text-xs leading-5 text-muted">Your next tasks, in deadline order.</p>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <UpcomingTaskCard key={task.id} task={task} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
