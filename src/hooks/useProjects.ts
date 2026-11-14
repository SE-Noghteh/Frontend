/**
 * SAMPLE FILE
 *
 * Server-state related reusable logic can be placed inside hooks.
 */

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/services/Project/projectService";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}