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
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 font-mono text-xs text-ink sm:col-span-2">
          Task title
          <input
            required
            name="title"
            defaultValue={task?.title}
            placeholder="Write a clear action item"
            className="retro-input block w-full"
          />
        </label>

        <label className="flex flex-col gap-2 font-mono text-xs text-ink sm:col-span-2">
          Description
          <textarea
            required
            name="description"
            defaultValue={task?.description}
            rows={3}
            placeholder="Add enough context for the owner"
            className="retro-input block w-full resize-y"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2 font-mono text-xs text-ink">
          Status
          <select
            name="status"
            defaultValue={task?.status ?? "todo"}
            className="retro-input block w-full"
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-2 font-mono text-xs text-ink">
          Priority
          <select
            name="priority"
            defaultValue={task?.priority ?? "medium"}
            className="retro-input block w-full"
          >
            {TASK_PRIORITY_OPTIONS.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-2 font-mono text-xs text-ink">
          Project
          <input
            required
            name="project"
            defaultValue={task?.project ?? DEFAULT_PROJECT}
            className="retro-input block w-full"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2 font-mono text-xs text-ink">
          Owner
          <input
            required
            name="assigneeName"
            defaultValue={task?.assignee.name ?? DEFAULT_ASSIGNEE_NAME}
            className="retro-input block w-full"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2 font-mono text-xs text-ink">
          Due date
          <input
            name="dueDate"
            type="date"
            defaultValue={task?.dueDate ?? ""}
            className="retro-input block min-w-0 w-full"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2 font-mono text-xs text-ink">
          Tags
          <input
            name="tags"
            defaultValue={task?.tags.join(", ")}
            placeholder="design, qa, roadmap"
            className="retro-input block w-full"
          />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-4 sm:flex-row sm:justify-end">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="retro-button retro-button-secondary"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          className="retro-button"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
