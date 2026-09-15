import type { Task } from "@/types/task";
import { getPriorityTone } from "@/utils/taskFormatting";

type CalendarTaskPillProps = {
  readonly task: Task;
};

export function CalendarTaskPill({ task }: CalendarTaskPillProps) {
  return (
    <li>
      <span
        className={`block truncate rounded-[2px] border px-1.5 py-1 font-mono text-[10px] font-bold ${getPriorityTone(
          task.priority,
        )}`}
        title={`${task.title} · ${task.priority} priority`}
      >
        {task.title}
      </span>
    </li>
  );
}
