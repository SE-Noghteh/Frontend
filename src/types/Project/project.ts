/**
 * SAMPLE FILE
 *
 * Shared Project domain types belong here.
 * Type and interface names use PascalCase.
 */

export type ProjectStatus =
  | "active"
  | "completed"
  | "archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
}