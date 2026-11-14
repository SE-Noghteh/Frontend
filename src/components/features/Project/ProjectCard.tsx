/**
 * SAMPLE FILE
 *
 * Feature components belong to a specific business feature.
 * This component demonstrates how a Project component should be structured.
 */

import type { Project } from "@/types/Project/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </article>
  );
}