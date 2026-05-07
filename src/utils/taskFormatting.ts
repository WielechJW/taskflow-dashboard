import type { TaskPriority, TaskStatus } from "@/types/task";

export function formatDateLabel(date: string | null): string {
  if (!date) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function getStatusTone(status: TaskStatus): string {
  const tones: Record<TaskStatus, string> = {
    todo: "bg-slate-100 text-slate-700 ring-slate-200",
    "in-progress": "bg-blue-50 text-blue-700 ring-blue-200",
    review: "bg-amber-50 text-amber-700 ring-amber-200",
    done: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  return tones[status];
}

export function getPriorityTone(priority: TaskPriority): string {
  const tones: Record<TaskPriority, string> = {
    low: "bg-slate-100 text-slate-600",
    medium: "bg-indigo-50 text-indigo-700",
    high: "bg-orange-50 text-orange-700",
    urgent: "bg-rose-50 text-rose-700",
  };

  return tones[priority];
}
