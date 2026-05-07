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
      <article className="rounded-3xl border border-indigo-100 bg-indigo-50/60 p-5 shadow-sm shadow-indigo-100">
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
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${getStatusTone(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getPriorityTone(task.priority)}`}>
              {task.priority} priority
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              Due {formatDateLabel(task.dueDate)}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-950">{task.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{task.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            <span>{task.project}</span>
            <span aria-hidden="true">•</span>
            <span>{task.assignee.name}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-100">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <label className="sr-only" htmlFor={`${task.id}-status`}>
            Update status for {task.title}
          </label>
          <select
            id={`${task.id}-status`}
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => setIsEditing(true)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
            Edit
          </button>
          <button type="button" onClick={() => onDelete(task.id)} className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
