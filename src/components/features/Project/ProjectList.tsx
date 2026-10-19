/**
 * SAMPLE FILE
 *
 * This file demonstrates a feature component responsible
 * for rendering a collection of projects.
 */

import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/Project/project";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <section>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}