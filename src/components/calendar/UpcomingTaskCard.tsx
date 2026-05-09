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
    <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-950">{task.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{task.project}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${getPriorityTone(
            task.priority,
          )}`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold">
        <span className={`rounded-full px-2.5 py-1 ring-1 ${getStatusTone(task.status)}`}>
          {statusLabels[task.status]}
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-slate-500 ring-1 ring-slate-200">
          Due {formatDateLabel(task.dueDate)}
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-slate-500 ring-1 ring-slate-200">
          {task.assignee.avatarInitials}
        </span>
      </div>
    </article>
  );
}
