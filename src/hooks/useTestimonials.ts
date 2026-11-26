import { useQuery } from "@tanstack/react-query";

import { landingKeys } from "@/queryKeys/landingKeys";
import { getTestimonials } from "@/services/Landing/landingService";

export function useTestimonials() {
  return useQuery({
    queryKey: landingKeys.testimonials(),
    queryFn: getTestimonials,
  });
}
