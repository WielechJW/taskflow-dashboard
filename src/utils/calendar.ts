import type { Task, TaskPriority, TaskStatus } from "@/types/task";

const DAYS_IN_WEEK = 7;
const FIRST_DAY_OF_MONTH = 1;
const SATURDAY_DAY_INDEX = 6;
const SUNDAY_DAY_INDEX = 0;
const ISO_DATE_LENGTH = 10;
const UTC_TIME_SUFFIX = "T00:00:00.000Z";

export const CALENDAR_REFERENCE_DATE = "2026-05-09";
export const CALENDAR_YEAR = 2026;
export const CALENDAR_MONTH_INDEX = 4;

export const WEEKDAY_LABELS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export type CalendarDay = {
  readonly date: string;
  readonly dayOfMonth: number;
  readonly isCurrentMonth: boolean;
  readonly isToday: boolean;
  readonly isWeekend: boolean;
  readonly tasks: readonly Task[];
};

export type CalendarSummary = {
  readonly scheduledTaskCount: number;
  readonly activeTaskCount: number;
  readonly overdueTaskCount: number;
  readonly completedTaskCount: number;
};

const priorityRanks: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4,
};

const statusRanks: Record<TaskStatus, number> = {
  todo: 1,
  "in-progress": 2,
  review: 3,
  done: 4,
};

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, ISO_DATE_LENGTH);
}

function toUtcDate(dateKey: string): Date {
  return new Date(`${dateKey}${UTC_TIME_SUFFIX}`);
}

function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

function getMondayFirstOffset(dayIndex: number): number {
  return (dayIndex + DAYS_IN_WEEK - 1) % DAYS_IN_WEEK;
}

function sortTasksByCalendarPriority(tasks: readonly Task[]): readonly Task[] {
  return [...tasks].sort((currentTask, nextTask) => {
    const priorityDifference =
      priorityRanks[nextTask.priority] - priorityRanks[currentTask.priority];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    const statusDifference = statusRanks[currentTask.status] - statusRanks[nextTask.status];

    if (statusDifference !== 0) {
      return statusDifference;
    }

    return currentTask.title.localeCompare(nextTask.title);
  });
}

function groupTasksByDueDate(tasks: readonly Task[]): Map<string, readonly Task[]> {
  const groupedTasks = new Map<string, Task[]>();

  tasks.forEach((task) => {
    if (!task.dueDate) {
      return;
    }

    groupedTasks.set(task.dueDate, [...(groupedTasks.get(task.dueDate) ?? []), task]);
  });

  return new Map(
    [...groupedTasks.entries()].map(([date, dateTasks]) => [
      date,
      sortTasksByCalendarPriority(dateTasks),
    ]),
  );
}

export function formatCalendarMonthLabel(year: number, monthIndex: number): string {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthIndex, FIRST_DAY_OF_MONTH)));
}

export function formatCalendarDayLabel(dateKey: string): string {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(toUtcDate(dateKey));
}

export function getCalendarDays(
  tasks: readonly Task[],
  year = CALENDAR_YEAR,
  monthIndex = CALENDAR_MONTH_INDEX,
  referenceDate = CALENDAR_REFERENCE_DATE,
): readonly CalendarDay[] {
  const tasksByDueDate = groupTasksByDueDate(tasks);
  const firstDay = new Date(Date.UTC(year, monthIndex, FIRST_DAY_OF_MONTH));
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const leadingDayCount = getMondayFirstOffset(firstDay.getUTCDay());
  const totalVisibleDayCount =
    Math.ceil((leadingDayCount + daysInMonth) / DAYS_IN_WEEK) * DAYS_IN_WEEK;

  return Array.from({ length: totalVisibleDayCount }, (_, index) => {
    const dayOffset = index - leadingDayCount;
    const date = new Date(Date.UTC(year, monthIndex, FIRST_DAY_OF_MONTH + dayOffset));
    const dateKey = toDateKey(date);
    const dayIndex = date.getUTCDay();

    return {
      date: dateKey,
      dayOfMonth: date.getUTCDate(),
      isCurrentMonth: date.getUTCMonth() === monthIndex,
      isToday: dateKey === referenceDate,
      isWeekend: dayIndex === SUNDAY_DAY_INDEX || dayIndex === SATURDAY_DAY_INDEX,
      tasks: tasksByDueDate.get(dateKey) ?? [],
    };
  });
}

export function getCalendarSummary(
  tasks: readonly Task[],
  referenceDate = CALENDAR_REFERENCE_DATE,
): CalendarSummary {
  const scheduledTasks = tasks.filter((task) => task.dueDate !== null);

  return {
    scheduledTaskCount: scheduledTasks.length,
    activeTaskCount: scheduledTasks.filter((task) => task.status !== "done").length,
    overdueTaskCount: scheduledTasks.filter(
      (task) => task.status !== "done" && task.dueDate !== null && task.dueDate < referenceDate,
    ).length,
    completedTaskCount: scheduledTasks.filter((task) => task.status === "done").length,
  };
}

export function getUpcomingCalendarTasks(
  tasks: readonly Task[],
  referenceDate = CALENDAR_REFERENCE_DATE,
): readonly Task[] {
  return [
    ...sortTasksByCalendarPriority(
      tasks.filter(
        (task) => task.dueDate !== null && task.dueDate >= referenceDate && task.status !== "done",
      ),
    ),
  ].sort((currentTask, nextTask) => {
    const dueDateComparison = (currentTask.dueDate ?? "").localeCompare(nextTask.dueDate ?? "");

    if (dueDateComparison !== 0) {
      return dueDateComparison;
    }

    return priorityRanks[nextTask.priority] - priorityRanks[currentTask.priority];
  });
}
