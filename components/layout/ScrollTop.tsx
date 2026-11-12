"use client";

import { usePrefersReducedMotion, useScrolledPast, useScrollProgress } from "@/lib/hooks";

/** Reeni back-to-top button with the "filling water" scroll-progress wave. */
export function ScrollTop() {
  const visible = useScrolledPast(199);
  const progress = useScrollProgress();
  const reducedMotion = usePrefersReducedMotion();

  function scrollToTop() {
    // Move focus to the top of the page first: this button hides itself near
    // the top, and a focused element disappearing cancels Chrome's smooth
    // scroll. It also leaves keyboard users at the start of the page.
    document.querySelector<HTMLElement>(".ambali-logo")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      className={`scrollToTop${visible ? " active-progress" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <span className="arrowUp" aria-hidden="true">
        <i className="fa-light fa-arrow-up" />
      </span>
      <span
        className="water"
        style={{ transform: `translate(0px, ${100 - progress}%)` }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
          <use href="#wave" />
        </svg>
        <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
          <use href="#wave" />
        </svg>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 560 20"
          style={{ display: "none" }}
        >
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z" />
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z" />
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z" />
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z" />
          </symbol>
        </svg>
      </span>
    </button>
  );
}
