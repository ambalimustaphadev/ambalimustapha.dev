"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TRIGGER = "tmp-scroll-trigger";
const OFFSCREEN = "tmp-scroll-trigger--offscreen";
const CANCEL = "tmp-scroll-trigger--cancel";

/**
 * The parts of the Reeni LayoutWrapper that Demo 17 relies on:
 *  - scroll-triggered entrance animations (`.tmp-scroll-trigger`),
 *  - the `animation-end` marker that freezes an element once it has animated,
 *  - the cursor-following glow on `.tmponhover` cards.
 * The animations themselves are CSS and already respect prefers-reduced-motion.
 */
export function TemplateEffects() {
  const pathname = usePathname();

  // Elements already in view keep animating immediately; those below the fold
  // are marked offscreen and released when they scroll into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry, index) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (element.classList.contains(OFFSCREEN)) {
              element.classList.remove(OFFSCREEN);
              if (element.dataset.cascade) {
                element.style.setProperty("--animation-order", String(index));
              }
            }
            currentObserver.unobserve(element);
          } else {
            element.classList.add(OFFSCREEN);
            element.classList.remove(CANCEL);
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(`.${TRIGGER}`).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const timers = new Set<number>();

    function onAnimationEnd(event: AnimationEvent) {
      const element = event.target;
      if (!(element instanceof HTMLElement) || !element.classList.contains(TRIGGER)) return;
      const timer = window.setTimeout(() => {
        element.setAttribute("animation-end", "");
        timers.delete(timer);
      }, 1000);
      timers.add(timer);
    }

    function onMouseMove(event: MouseEvent) {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".tmponhover");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--y", `${event.clientY - rect.top}px`);
    }

    document.addEventListener("animationend", onAnimationEnd);
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      document.removeEventListener("animationend", onAnimationEnd);
      document.removeEventListener("mousemove", onMouseMove);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
