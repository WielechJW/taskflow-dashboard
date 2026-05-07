import type { TaskPriorityOption, TaskStatus, TaskStatusOption } from "@/types/task";

export const TASK_STATUS_OPTIONS = [
  {
    value: "todo",
    label: "To do",
    description: "Ready to be picked up or scheduled.",
  },
  {
    value: "in-progress",
    label: "In progress",
    description: "Actively being worked on by the team.",
  },
  {
    value: "review",
    label: "In review",
    description: "Waiting for review, approval, or QA.",
  },
  {
    value: "done",
    label: "Done",
    description: "Completed and no longer active.",
  },
] as const satisfies readonly TaskStatusOption[];

export const TASK_PRIORITY_OPTIONS = [
  {
    value: "low",
    label: "Low",
    description: "Nice-to-have work with flexible timing.",
    rank: 1,
  },
  {
    value: "medium",
    label: "Medium",
    description: "Important work with normal delivery expectations.",
    rank: 2,
  },
  {
    value: "high",
    label: "High",
    description: "Important work that should stay visible.",
    rank: 3,
  },
  {
    value: "urgent",
    label: "Urgent",
    description: "Time-sensitive work that needs immediate attention.",
    rank: 4,
  },
] as const satisfies readonly TaskPriorityOption[];

export const COMPLETED_TASK_STATUS: TaskStatus = "done";
