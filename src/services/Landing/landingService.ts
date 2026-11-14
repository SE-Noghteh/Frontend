/**
 * Landing page API communication (mock-backed for now).
 */

import { MOCK_PLATFORM_STATS } from "@/data/mockPlatformStats";
import { MOCK_TESTIMONIALS } from "@/data/mockTestimonials";
import type { PlatformStats, Testimonial } from "@/types/Landing/landing";

export function getPlatformStats(): Promise<PlatformStats> {
  // TODO: replace with a real API request, e.g. GET /stats
  return Promise.resolve(MOCK_PLATFORM_STATS);
}

export function getTestimonials(): Promise<Testimonial[]> {
  // TODO: replace with a real API request, e.g. GET /testimonials
  return Promise.resolve(MOCK_TESTIMONIALS);
}
