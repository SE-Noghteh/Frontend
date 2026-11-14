/**
 * SAMPLE FILE
 *
 * Forms related to the Project feature can be placed
 * inside the Project feature directory.
 */

import type { FormEvent } from "react";

interface ProjectFormProps {
  onSubmit: () => void;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Project name" />
      <button type="submit">Create Project</button>
    </form>
  );
}