import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/constants/taskMetadata";
import type { TaskFilters as TaskFiltersType } from "@/types/task";

type TaskFiltersProps = {
  readonly filters: TaskFiltersType;
  readonly resultCount: number;
  readonly totalCount: number;
  readonly onChange: (filters: TaskFiltersType) => void;
  readonly onReset: () => void;
};

export function TaskFilters({ filters, resultCount, totalCount, onChange, onReset }: TaskFiltersProps) {
  return (
    <section className="retro-panel p-5" aria-label="Task filters">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 font-mono text-xs text-ink sm:col-span-2">
          Search tasks
          <input
            value={filters.searchQuery}
            onChange={(event) => onChange({ ...filters, searchQuery: event.target.value })}
            placeholder="Search title, project, owner, or tags"
            className="retro-input block w-full"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2 font-mono text-xs text-ink">
          Status
          <select
            value={filters.status}
            onChange={(event) => onChange({ ...filters, status: event.target.value as TaskFiltersType["status"] })}
            className="retro-input block w-full"
          >
            <option value="all">All statuses</option>
            <option value="open">Open tasks</option>
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
            value={filters.priority}
            onChange={(event) => onChange({ ...filters, priority: event.target.value as TaskFiltersType["priority"] })}
            className="retro-input block w-full"
          >
            <option value="all">All priorities</option>
            {TASK_PRIORITY_OPTIONS.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-4 sm:col-span-2">
          <p className="font-mono text-xs text-muted" aria-live="polite">
            {resultCount} / {totalCount} shown
          </p>
          <button type="button" onClick={onReset} className="retro-button retro-button-secondary">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
