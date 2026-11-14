import { useEffect, useRef, useState } from "react";

/**
 * Reports whether an element has entered the viewport (once).
 * Used for scroll-reveal animations.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}
