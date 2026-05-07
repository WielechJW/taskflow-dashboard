"use client";

import { useMemo, useState } from "react";
import { COMPLETED_TASK_STATUS } from "@/constants/taskMetadata";
import type { Task, TaskFilters, TaskFormValues, TaskStatus } from "@/types/task";
import { getFilteredTasks } from "@/utils/taskFiltering";

const DEFAULT_FILTERS: TaskFilters = {
  searchQuery: "",
  status: "all",
  priority: "all",
};

function createTaskId(): string {
  return `task-${Date.now().toString(36)}`;
}

function createAssigneeId(name: string): string {
  return `user-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "unassigned"}`;
}

function getAssigneeInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "NA";
}

function getCompletionTimestamp(status: TaskStatus): string | undefined {
  return status === COMPLETED_TASK_STATUS ? new Date().toISOString() : undefined;
}

function buildTask(values: TaskFormValues): Task {
  const timestamp = new Date().toISOString();

  return {
    id: createTaskId(),
    title: values.title,
    description: values.description,
    status: values.status,
    priority: values.priority,
    project: values.project,
    assignee: {
      id: createAssigneeId(values.assigneeName),
      name: values.assigneeName,
      avatarInitials: getAssigneeInitials(values.assigneeName),
    },
    tags: values.tags,
    dueDate: values.dueDate,
    createdAt: timestamp,
    updatedAt: timestamp,
    completedAt: getCompletionTimestamp(values.status),
  };
}

function updateTaskValues(task: Task, values: TaskFormValues): Task {
  return {
    ...task,
    title: values.title,
    description: values.description,
    status: values.status,
    priority: values.priority,
    project: values.project,
    assignee: {
      id: createAssigneeId(values.assigneeName),
      name: values.assigneeName,
      avatarInitials: getAssigneeInitials(values.assigneeName),
    },
    tags: values.tags,
    dueDate: values.dueDate,
    updatedAt: new Date().toISOString(),
    completedAt:
      values.status === COMPLETED_TASK_STATUS
        ? task.completedAt ?? new Date().toISOString()
        : undefined,
  };
}

export function useTaskManager(initialTasks: readonly Task[]) {
  const [tasks, setTasks] = useState<readonly Task[]>(initialTasks);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const filteredTasks = useMemo(() => getFilteredTasks(tasks, filters), [filters, tasks]);

  function createTask(values: TaskFormValues): void {
    setTasks((currentTasks) => [buildTask(values), ...currentTasks]);
  }

  function updateTask(taskId: string, values: TaskFormValues): void {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? updateTaskValues(task, values) : task)),
    );
  }

  function deleteTask(taskId: string): void {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  function updateTaskStatus(taskId: string, status: TaskStatus): void {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const timestamp = new Date().toISOString();

        return {
          ...task,
          status,
          updatedAt: timestamp,
          completedAt: status === COMPLETED_TASK_STATUS ? task.completedAt ?? timestamp : undefined,
        };
      }),
    );
  }

  function resetFilters(): void {
    setFilters(DEFAULT_FILTERS);
  }

  return {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    resetFilters,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
}
