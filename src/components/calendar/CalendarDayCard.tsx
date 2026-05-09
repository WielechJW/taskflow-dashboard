import { CalendarTaskPill } from "@/components/calendar/CalendarTaskPill";
import type { CalendarDay } from "@/utils/calendar";
import { formatCalendarDayLabel } from "@/utils/calendar";

const MAX_VISIBLE_DAY_TASKS = 2;

type CalendarDayCardProps = {
  readonly day: CalendarDay;
};

export function CalendarDayCard({ day }: CalendarDayCardProps) {
  const hiddenTaskCount = Math.max(day.tasks.length - MAX_VISIBLE_DAY_TASKS, 0);

  return (
    <article
      aria-label={`${formatCalendarDayLabel(day.date)}: ${day.tasks.length} scheduled tasks`}
      className={`min-h-36 rounded-2xl border p-3 transition hover:-translate-y-0.5 hover:shadow-md ${
        day.isToday
          ? "border-indigo-300 bg-indigo-50 shadow-sm shadow-indigo-100"
          : "border-slate-100 bg-slate-50/80"
      } ${day.isCurrentMonth ? "text-slate-950" : "text-slate-300"}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            day.isToday ? "bg-indigo-600 text-white" : "bg-white text-inherit"
          }`}
        >
          {day.dayOfMonth}
        </span>
        {day.isWeekend ? (
          <span className="hidden rounded-full bg-white px-2 py-1 text-[0.65rem] font-bold uppercase text-slate-400 sm:inline-flex">
            Weekend
          </span>
        ) : null}
      </div>

      {day.tasks.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {day.tasks.slice(0, MAX_VISIBLE_DAY_TASKS).map((task) => (
            <CalendarTaskPill key={task.id} task={task} />
          ))}
          {hiddenTaskCount > 0 ? (
            <li className="rounded-xl bg-white px-2.5 py-1.5 text-xs font-bold text-slate-500">
              +{hiddenTaskCount} more
            </li>
          ) : null}
        </ul>
      ) : (
        <p className="mt-4 text-xs font-medium text-slate-400">No task due</p>
      )}
    </article>
  );
}
