/**
 * SAMPLE FILE
 *
 * Feature-specific components related to tasks belong here.
 */

import type { Task } from "@/types/Task/task";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </article>
  );
}