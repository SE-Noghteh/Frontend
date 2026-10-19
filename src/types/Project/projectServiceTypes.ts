/**
 * SAMPLE FILE
 *
 * Request and response types used by Project services belong here.
 */

import type { Project } from "./project";

export interface CreateProjectRequest {
  name: string;
  description: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export interface ProjectResponse {
  data: Project;
}

export interface ProjectListResponse {
  data: Project[];
}