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
      <div className="retro-panel p-8 text-center">
        <p className="retro-eyebrow mb-3">No results</p>
        <p className="font-display text-2xl text-ink">No tasks match these filters.</p>
        <p className="mt-2 text-sm leading-6 text-muted">Try a broader search, reset filters, or create a new task.</p>
        <button type="button" onClick={onResetFilters} className="retro-button mx-auto mt-5">
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
