/**
 * SAMPLE FILE
 *
 * Demonstrates rendering multiple Task feature components.
 */

import { TaskCard } from "./TaskCard";
import type { Task } from "@/types/Task/task";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <section>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}