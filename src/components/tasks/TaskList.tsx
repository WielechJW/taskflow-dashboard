import type { Task, TaskFormValues, TaskStatus } from "@/types/task";
import { TaskCard } from "@/components/tasks/TaskCard";

type TaskListProps = {
  readonly tasks: readonly Task[];
  readonly onDelete: (taskId: string) => void;
  readonly onUpdate: (taskId: string, values: TaskFormValues) => void;
  readonly onStatusChange: (taskId: string, status: TaskStatus) => void;
  readonly onResetFilters: () => void;
};

export function TaskList({ tasks, onDelete, onUpdate, onStatusChange, onResetFilters }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm shadow-slate-200/70">
        <p className="text-lg font-bold text-slate-950">No tasks match these filters.</p>
        <p className="mt-2 text-sm text-slate-500">Try a broader search, reset filters, or create a new task.</p>
        <button type="button" onClick={onResetFilters} className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
