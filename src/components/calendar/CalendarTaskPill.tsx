import type { Task } from "@/types/task";
import { getPriorityTone } from "@/utils/taskFormatting";

type CalendarTaskPillProps = {
  readonly task: Task;
};

export function CalendarTaskPill({ task }: CalendarTaskPillProps) {
  return (
    <li>
      <span
        className={`block truncate rounded-xl px-2.5 py-1.5 text-xs font-bold ${getPriorityTone(
          task.priority,
        )}`}
        title={task.title}
      >
        {task.title}
      </span>
    </li>
  );
}
