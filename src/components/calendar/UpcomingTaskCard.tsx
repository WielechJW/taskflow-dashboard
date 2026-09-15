import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/constants/taskMetadata";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";
import { formatDateLabel, getPriorityTone, getStatusTone } from "@/utils/taskFormatting";

const statusLabels = TASK_STATUS_OPTIONS.reduce<Record<TaskStatus, string>>(
  (labels, status) => ({
    ...labels,
    [status.value]: status.label,
  }),
  {
    todo: "To do",
    "in-progress": "In progress",
    review: "In review",
    done: "Done",
  },
);

const priorityLabels = TASK_PRIORITY_OPTIONS.reduce<Record<TaskPriority, string>>(
  (labels, priority) => ({
    ...labels,
    [priority.value]: priority.label,
  }),
  {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
  },
);

type UpcomingTaskCardProps = {
  readonly task: Task;
};

export function UpcomingTaskCard({ task }: UpcomingTaskCardProps) {
  return (
    <article className="rounded-[3px] border border-line bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1 basis-32">
          <h4 className="text-sm font-bold leading-5 text-ink">{task.title}</h4>
          <p className="mt-1 text-xs text-muted">{task.project}</p>
        </div>
        <span
          className={`shrink-0 rounded-[2px] border px-2 py-1 font-mono text-[10px] font-bold uppercase ${getPriorityTone(
            task.priority,
          )}`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold">
        <span className={`rounded-[2px] border px-2 py-1 ${getStatusTone(task.status)}`}>
          {statusLabels[task.status]}
        </span>
        <span className="text-muted">
          Due {formatDateLabel(task.dueDate)}
        </span>
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-[2px] border border-ink text-ink" title={task.assignee.name}>
          {task.assignee.avatarInitials}
        </span>
      </div>
    </article>
  );
}
