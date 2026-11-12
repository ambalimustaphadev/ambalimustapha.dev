import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** True while the page is scrolled further than `offset` pixels (false during SSR). */
export function useScrolledPast(offset: number) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > offset,
    () => false,
  );
}

function getScrollProgress() {
  const scrollable =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (scrollable <= 0) return 0;
  return Math.min(100, Math.floor((window.scrollY / scrollable) * 100));
}

/** How far down the page the user has scrolled, 0–100 (0 during SSR). */
export function useScrollProgress() {
  return useSyncExternalStore(subscribeToScroll, getScrollProgress, () => 0);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Mirrors the user's `prefers-reduced-motion` setting (false during SSR). */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Scroll-spy used by the Demo 17 one-page menu: returns the id of the section
 * currently crossing the middle of the viewport. `sectionIds` must be stable
 * (e.g. a module-level constant).
 */
export function useScrollSpy(sectionIds: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px" },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return enabled ? (active ?? sectionIds[0] ?? null) : null;
}
