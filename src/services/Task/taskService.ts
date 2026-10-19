/**
 * SAMPLE FILE
 *
 * API communication related to Tasks belongs here.
 */

import type { Task } from "@/types/Task/task";

export function getTasks(): Promise<Task[]> {
  // Replace with a real API request.
  return Promise.resolve([]);
}