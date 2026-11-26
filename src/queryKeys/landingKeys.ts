export const landingKeys = {
  all: ["landing"] as const,
  stats: () => [...landingKeys.all, "stats"] as const,
  testimonials: () => [...landingKeys.all, "testimonials"] as const,
};
