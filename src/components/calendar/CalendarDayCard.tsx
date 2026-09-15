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
      className={`min-h-36 min-w-0 rounded-[2px] border p-2 transition-colors ${
        day.isToday
          ? "border-ink bg-surface"
          : "border-line bg-white hover:border-ink"
      } ${day.isCurrentMonth ? "text-ink" : "text-muted"}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          aria-current={day.isToday ? "date" : undefined}
          className={`flex h-7 w-7 items-center justify-center rounded-[2px] font-mono text-xs font-bold ${
            day.isToday ? "bg-ink text-white" : "text-inherit"
          }`}
        >
          {day.dayOfMonth}
        </span>
        {day.isToday ? (
          <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-ink">
            Today
          </span>
        ) : null}
      </div>

      {day.tasks.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {day.tasks.slice(0, MAX_VISIBLE_DAY_TASKS).map((task) => (
            <CalendarTaskPill key={task.id} task={task} />
          ))}
          {hiddenTaskCount > 0 ? (
            <li className="px-1 py-1 font-mono text-[10px] font-bold text-muted">
              +{hiddenTaskCount} more
            </li>
          ) : null}
        </ul>
      ) : (
        <p className="mt-4 font-mono text-[10px] text-muted">No task due</p>
      )}
    </article>
  );
}
