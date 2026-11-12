"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type TyperProps = {
  strings: readonly string[];
  className?: string;
};

/**
 * Reeni's typed-headline effect (TyperComponent): the wrapper's width shrinks
 * to zero, the next word swaps in, and the width expands again. With reduced
 * motion the first word stays put.
 */
export function Typer({ strings, className = "theme-gradient" }: TyperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const fitToVisibleWord = () => {
      const visible = wrapper.querySelector<HTMLElement>(".is-visible");
      if (visible) wrapper.style.width = `${visible.scrollWidth}px`;
    };

    fitToVisibleWord();
    // Re-measure once web fonts have loaded, since they change word widths.
    document.fonts?.ready.then(fitToVisibleWord);

    if (reducedMotion || strings.length < 2) return;

    const timeouts = new Set<number>();
    const schedule = (callback: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        callback();
      }, delay);
      timeouts.add(id);
    };

    const interval = window.setInterval(() => {
      wrapper.style.width = "0px";
      schedule(() => {
        setActiveIndex((previous) => (previous + 1) % strings.length);
        schedule(fitToVisibleWord, 10);
      }, 600);
    }, 3000);

    return () => {
      window.clearInterval(interval);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [strings, reducedMotion]);

  return (
    <span ref={wrapperRef} className="cd-words-wrapper typeanimation">
      {strings.map((word, index) => (
        <b
          key={word}
          className={`${className} ${index === activeIndex ? "is-visible" : "is-hidden"}`}
          aria-hidden={index === activeIndex ? undefined : true}
        >
          {word}
        </b>
      ))}
    </span>
  );
}
