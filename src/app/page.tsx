import { TaskWorkspace } from "@/components/tasks/TaskWorkspace";
import { getInitialTasks } from "@/services/taskService";

export default function Home() {
  return <TaskWorkspace initialTasks={getInitialTasks()} />;
}
