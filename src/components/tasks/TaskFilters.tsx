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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70" aria-label="Task filters">
      <div className="grid gap-4 lg:grid-cols-[1fr_12rem_12rem_auto] lg:items-end">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Search tasks
          <input
            value={filters.searchQuery}
            onChange={(event) => onChange({ ...filters, searchQuery: event.target.value })}
            placeholder="Search title, project, owner, or tags"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Status
          <select
            value={filters.status}
            onChange={(event) => onChange({ ...filters, status: event.target.value as TaskFiltersType["status"] })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Priority
          <select
            value={filters.priority}
            onChange={(event) => onChange({ ...filters, priority: event.target.value as TaskFiltersType["priority"] })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            <option value="all">All priorities</option>
            {TASK_PRIORITY_OPTIONS.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <p className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-600">
            {resultCount} / {totalCount} shown
          </p>
          <button type="button" onClick={onReset} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
