import { initialTasks } from "@/services/mockTasks";
import type { Task } from "@/types/task";

export function getInitialTasks(): readonly Task[] {
  return initialTasks;
}
