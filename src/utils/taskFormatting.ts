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
    todo: "border-ink bg-white text-ink ring-ink",
    "in-progress": "border-ink bg-surface text-ink ring-ink",
    review: "border-dashed border-ink bg-white text-ink ring-ink",
    done: "border-ink bg-ink text-white ring-ink",
  };

  return tones[status];
}

export function getPriorityTone(priority: TaskPriority): string {
  const tones: Record<TaskPriority, string> = {
    low: "border-line bg-white text-muted",
    medium: "border-line bg-surface text-ink",
    high: "border-ink bg-white text-ink font-bold",
    urgent: "border-ink bg-ink text-white font-bold",
  };

  return tones[priority];
}
