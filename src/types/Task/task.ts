/**
 * SAMPLE FILE
 *
 * Shared Task domain types belong here.
 */

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}