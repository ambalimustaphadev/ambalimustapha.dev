"use client";

import { useEffect, useRef } from "react";

/**
 * Reeni's counter (OdometerComponent): rolls from 0 up to `value` once half of
 * it is visible. The real value is server-rendered, so it is correct without
 * JavaScript and for crawlers; with reduced motion it is left as-is.
 */
export function Odometer({ value }: { value: number }) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let observer: IntersectionObserver | undefined;

    // Odometer would otherwise auto-initialise every `.odometer` on the page.
    window.odometerOptions = { ...window.odometerOptions, auto: false };

    import("odometer").then(({ default: OdometerLib }) => {
      if (cancelled) return;
      const odometer = new OdometerLib({ el: element, value: 0 });
      observer = new IntersectionObserver(
        (entries, currentObserver) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            odometer.update(value);
            currentObserver.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(element);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [value]);

  // Children are set via innerHTML so React never reconciles the digits that
  // odometer rewrites inside this element.
  return (
    <span
      ref={elementRef}
      className="odometer"
      dangerouslySetInnerHTML={{ __html: String(value) }}
    />
  );
}
