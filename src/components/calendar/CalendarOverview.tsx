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
      <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-300/70">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-200">Calendar</p>
            <h2 id="calendar-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Plan deadlines, owners, and priority work for {monthLabel}.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              This calendar view turns task due dates into a weekly planning surface for sprint reviews,
              launch readiness, and daily focus conversations.
            </p>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-indigo-100">Today</p>
            <p className="mt-2 text-2xl font-bold">{referenceDateLabel}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Prioritize overdue tasks first, then use upcoming cards to confirm next owners.
            </p>
          </aside>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {calendarStats.map((stat) => (
          <CalendarStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-950">{monthLabel}</h3>
              <p className="text-sm text-slate-500">Monday-first monthly planning grid.</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
              {summary.activeTaskCount} active deadlines
            </span>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wide text-slate-400">
            {WEEKDAY_LABELS.map((dayLabel) => (
              <div key={dayLabel}>{dayLabel}</div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-7 sm:gap-2">
            {calendarDays.map((day) => (
              <CalendarDayCard key={day.date} day={day} />
            ))}
          </div>
        </section>

        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Upcoming deadlines</h3>
            <p className="mt-1 text-sm text-slate-500">Next active tasks sorted by due date and priority.</p>
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
