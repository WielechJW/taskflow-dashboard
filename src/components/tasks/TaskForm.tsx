import type { FormEvent } from "react";
import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/constants/taskMetadata";
import type { Task, TaskFormValues } from "@/types/task";

const DEFAULT_ASSIGNEE_NAME = "Maya Chen";
const DEFAULT_PROJECT = "Task Management";

type TaskFormProps = {
  readonly task?: Task;
  readonly submitLabel: string;
  readonly onSubmit: (values: TaskFormValues) => void;
  readonly onCancel?: () => void;
};

function parseTags(value: FormDataEntryValue | null): readonly string[] {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export function TaskForm({ task, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dueDate = getStringValue(formData, "dueDate");

    onSubmit({
      title: getStringValue(formData, "title"),
      description: getStringValue(formData, "description"),
      status: getStringValue(formData, "status") as TaskFormValues["status"],
      priority: getStringValue(formData, "priority") as TaskFormValues["priority"],
      project: getStringValue(formData, "project"),
      assigneeName: getStringValue(formData, "assigneeName"),
      tags: parseTags(formData.get("tags")),
      dueDate: dueDate || null,
    });

    if (!task) {
      event.currentTarget.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
          Task title
          <input
            required
            name="title"
            defaultValue={task?.title}
            placeholder="Write a clear action item"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
          Description
          <textarea
            required
            name="description"
            defaultValue={task?.description}
            rows={3}
            placeholder="Add enough context for the owner"
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Status
          <select
            name="status"
            defaultValue={task?.status ?? "todo"}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Priority
          <select
            name="priority"
            defaultValue={task?.priority ?? "medium"}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            {TASK_PRIORITY_OPTIONS.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Project
          <input
            required
            name="project"
            defaultValue={task?.project ?? DEFAULT_PROJECT}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Owner
          <input
            required
            name="assigneeName"
            defaultValue={task?.assignee.name ?? DEFAULT_ASSIGNEE_NAME}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Due date
          <input
            name="dueDate"
            type="date"
            defaultValue={task?.dueDate ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Tags
          <input
            name="tags"
            defaultValue={task?.tags.join(", ")}
            placeholder="design, qa, roadmap"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
