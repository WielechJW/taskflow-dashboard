import { COMPLETED_TASK_STATUS, TASK_PRIORITY_OPTIONS } from "@/constants/taskMetadata";
import type { Task, TaskPriority } from "@/types/task";

const MILLISECONDS_PER_DAY = 86_400_000;
const DAYS_IN_WEEK = 7;
const PERCENT_MULTIPLIER = 100;
const FOCUS_TASK_LIMIT = 3;
const HIGH_PRIORITY_TASKS = new Set<TaskPriority>(["high", "urgent"]);
const METRIC_REFERENCE_DATE = "2026-05-07";

const priorityRanks = TASK_PRIORITY_OPTIONS.reduce<Record<TaskPriority, number>>(
  (ranks, priority) => ({
    ...ranks,
    [priority.value]: priority.rank,
  }),
  {
    low: 0,
    medium: 0,
    high: 0,
    urgent: 0,
  },
);

type TaskMetrics = {
  readonly activeTaskCount: number;
  readonly completedTaskCount: number;
  readonly highPriorityActiveCount: number;
  readonly dueThisWeekCount: number;
  readonly onTimeRate: number;
};

function parseDateOnly(date: string): Date {
  return new Date(`${date}T00:00:00.000Z`);
}

function isActiveTask(task: Task): boolean {
  return task.status !== COMPLETED_TASK_STATUS;
}

function isDueWithinWeek(task: Task, referenceDate: string): boolean {
  if (!task.dueDate || !isActiveTask(task)) {
    return false;
  }

  const daysUntilDue =
    (parseDateOnly(task.dueDate).getTime() - parseDateOnly(referenceDate).getTime()) /
    MILLISECONDS_PER_DAY;

  return daysUntilDue >= 0 && daysUntilDue < DAYS_IN_WEEK;
}

function wasCompletedOnTime(task: Task): boolean {
  if (task.status !== COMPLETED_TASK_STATUS || !task.completedAt || !task.dueDate) {
    return false;
  }

  return new Date(task.completedAt).getTime() <= parseDateOnly(task.dueDate).getTime() + MILLISECONDS_PER_DAY;
}

export function getTaskMetrics(tasks: readonly Task[]): TaskMetrics {
  const completedTasks = tasks.filter((task) => task.status === COMPLETED_TASK_STATUS);
  const completedOnTimeCount = completedTasks.filter(wasCompletedOnTime).length;

  return {
    activeTaskCount: tasks.filter(isActiveTask).length,
    completedTaskCount: completedTasks.length,
    highPriorityActiveCount: tasks.filter(
      (task) => isActiveTask(task) && HIGH_PRIORITY_TASKS.has(task.priority),
    ).length,
    dueThisWeekCount: tasks.filter((task) => isDueWithinWeek(task, METRIC_REFERENCE_DATE)).length,
    onTimeRate: completedTasks.length
      ? Math.round((completedOnTimeCount / completedTasks.length) * PERCENT_MULTIPLIER)
      : PERCENT_MULTIPLIER,
  };
}

export function getFocusTasks(tasks: readonly Task[]): readonly Task[] {
  return [...tasks]
    .filter(isActiveTask)
    .sort((currentTask, nextTask) => {
      const priorityDifference =
        priorityRanks[nextTask.priority] - priorityRanks[currentTask.priority];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (currentTask.dueDate ?? "9999-12-31").localeCompare(
        nextTask.dueDate ?? "9999-12-31",
      );
    })
    .slice(0, FOCUS_TASK_LIMIT);
}
