import { TaskWorkspace } from "@/components/tasks/TaskWorkspace";
import { getInitialTasks } from "@/services/taskService";

export default function TasksPage() {
  return <TaskWorkspace initialTasks={getInitialTasks()} />;
}
