/**
 * SAMPLE FILE
 *
 * Service files contain API communication related to
 * a specific business domain.
 *
 * Naming example:
 * projectService.ts
 */

import type { Project } from "@/types/Project/project";

export function getProjects(): Promise<Project[]> {
  // Replace with a real API request.
  return Promise.resolve([]);
}

export function getProjectById(id: string): Promise<Project | null> {
  void id;

  // Replace with a real API request.
  return Promise.resolve(null);
}