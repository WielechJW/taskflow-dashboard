import { COMPLETED_TASK_STATUS, TASK_PRIORITY_OPTIONS } from "@/constants/taskMetadata";
import type { Task, TaskFilters, TaskPriority } from "@/types/task";

const OPEN_TASK_STATUS = "open";
const ALL_FILTER_VALUE = "all";

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

function matchesSearch(task: Task, searchQuery: string): boolean {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableContent = [
    task.title,
    task.description,
    task.project,
    task.assignee.name,
    ...task.tags,
  ]
    .join(" ")
    .toLowerCase();

  return searchableContent.includes(normalizedQuery);
}

function matchesStatus(task: Task, statusFilter: TaskFilters["status"]): boolean {
  if (statusFilter === ALL_FILTER_VALUE) {
    return true;
  }

  if (statusFilter === OPEN_TASK_STATUS) {
    return task.status !== COMPLETED_TASK_STATUS;
  }

  return task.status === statusFilter;
}

function matchesPriority(task: Task, priorityFilter: TaskFilters["priority"]): boolean {
  return priorityFilter === ALL_FILTER_VALUE || task.priority === priorityFilter;
}

export function getFilteredTasks(tasks: readonly Task[], filters: TaskFilters): readonly Task[] {
  return tasks
    .filter(
      (task) =>
        matchesSearch(task, filters.searchQuery) &&
        matchesStatus(task, filters.status) &&
        matchesPriority(task, filters.priority),
    )
    .sort((currentTask, nextTask) => {
      if (currentTask.status === COMPLETED_TASK_STATUS && nextTask.status !== COMPLETED_TASK_STATUS) {
        return 1;
      }

      if (currentTask.status !== COMPLETED_TASK_STATUS && nextTask.status === COMPLETED_TASK_STATUS) {
        return -1;
      }

      const priorityDifference = priorityRanks[nextTask.priority] - priorityRanks[currentTask.priority];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (currentTask.dueDate ?? "9999-12-31").localeCompare(nextTask.dueDate ?? "9999-12-31");
    });
}
