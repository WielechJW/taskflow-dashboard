import { useState } from "react";
import { TASK_STATUS_OPTIONS } from "@/constants/taskMetadata";
import type { Task, TaskFormValues, TaskStatus } from "@/types/task";
import { formatDateLabel, getPriorityTone, getStatusTone } from "@/utils/taskFormatting";
import { TaskForm } from "@/components/tasks/TaskForm";

type TaskCardProps = {
  readonly task: Task;
  readonly onDelete: (taskId: string) => void;
  readonly onUpdate: (taskId: string, values: TaskFormValues) => void;
  readonly onStatusChange: (taskId: string, status: TaskStatus) => void;
};

function getStatusLabel(status: TaskStatus): string {
  return TASK_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}

export function TaskCard({ task, onDelete, onUpdate, onStatusChange }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <article className="retro-panel p-5">
        <p className="retro-eyebrow mb-4">Edit task</p>
        <TaskForm
          task={task}
          submitLabel="Save task"
          onSubmit={(values) => {
            onUpdate(task.id, values);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <article className="retro-panel p-5">
      <div className="flex flex-col gap-5">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`retro-badge ${getStatusTone(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>
            <span className={`retro-badge ${getPriorityTone(task.priority)}`}>
              {task.priority} priority
            </span>
            <span className="font-mono text-[11px] text-muted">
              Due {formatDateLabel(task.dueDate)}
            </span>
          </div>

          <div>
            <h3 className="text-base font-semibold text-ink [overflow-wrap:anywhere]">{task.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted [overflow-wrap:anywhere]">{task.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted [overflow-wrap:anywhere]">
            <span>{task.project}</span>
            <span aria-hidden="true">•</span>
            <span>{task.assignee.name}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-muted [overflow-wrap:anywhere]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <label className="sr-only" htmlFor={`${task.id}-status`}>
            Update status for {task.title}
          </label>
          <select
            id={`${task.id}-status`}
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
            className="retro-input w-full sm:w-auto"
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => setIsEditing(true)} className="retro-button retro-button-secondary">
            Edit
          </button>
          <button type="button" onClick={() => onDelete(task.id)} className="min-h-11 px-2 font-mono text-xs text-muted underline decoration-dotted underline-offset-4 transition hover:text-ink sm:ml-auto">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
