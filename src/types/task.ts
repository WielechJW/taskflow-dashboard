export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type TaskAssignee = {
  readonly id: string;
  readonly name: string;
  readonly avatarInitials: string;
};

export type Task = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: TaskStatus;
  readonly priority: TaskPriority;
  readonly project: string;
  readonly assignee: TaskAssignee;
  readonly tags: readonly string[];
  readonly dueDate: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly completedAt?: string;
};

export type TaskStatusOption = {
  readonly value: TaskStatus;
  readonly label: string;
  readonly description: string;
};

export type TaskPriorityOption = {
  readonly value: TaskPriority;
  readonly label: string;
  readonly description: string;
  readonly rank: number;
};
