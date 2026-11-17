"use client";

import { Children, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

/** Beyond this many items, a progress bar replaces the dots. */
const MAX_DOTS = 8;

type SnapCarouselProps = {
  children: ReactNode;
  /** Classes for the track, which is the layout (grid or row) on wide screens. */
  className: string;
  /** Extra track class added only when there is more than one item. */
  carouselClassName: string;
  /** Extra class on the controls; the SCSS shows them only where the track scrolls. */
  navClassName?: string;
  /** Accessible name of the track, e.g. "SabiMate screenshots". */
  label: string;
  /** What one item is called in the control labels, e.g. "screenshot". */
  itemLabel: string;
  /** Media query matching the SCSS breakpoint below which the track scrolls. */
  query: string;
};

/**
 * One list that is a grid or row on wide screens (styled by the caller) and a
 * native, swipeable scroll-snap carousel where `query` matches, with
 * previous/next buttons, a counter and dots (or a progress bar for long
 * lists). It is the same markup in both cases, so nothing is rendered twice,
 * and a single item gets no controls. Used by the project galleries and the
 * pricing packages; the SCSS decides each one's breakpoint and snap alignment.
 */
export function SnapCarousel({
  children,
  className,
  carouselClassName,
  navClassName,
  label,
  itemLabel,
  query,
}: SnapCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const count = Children.count(children);
  const carousel = count > 1;
  const name = itemLabel.charAt(0).toUpperCase() + itemLabel.slice(1);

  // Where the track rests with this item snapped, honouring the item's own
  // scroll-snap-align (start or center) and the track's scroll padding.
  function snapLeft(track: HTMLElement, item: HTMLElement) {
    const align = getComputedStyle(item).scrollSnapAlign;
    const left = align.includes("start")
      ? item.offsetLeft - (parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0)
      : item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
    return Math.max(0, Math.min(track.scrollWidth - track.clientWidth, left));
  }

  // Carousel position: the item whose snap position is nearest the current
  // scroll, updated once per frame while it scrolls (swipe, buttons or focus).
  // On wider screens the track never scrolls sideways, so this stays idle.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !carousel) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let nearest = 0;
      let distance = Infinity;
      Array.from(track.children).forEach((child, index) => {
        const gap = Math.abs(snapLeft(track, child as HTMLElement) - track.scrollLeft);
        if (gap < distance) {
          distance = gap;
          nearest = index;
        }
      });
      setCurrent(nearest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [carousel]);

  function goTo(index: number, focus = false) {
    const track = trackRef.current;
    const target = Math.max(0, Math.min(count - 1, index));
    const item = track?.children[target] as HTMLElement | undefined;
    if (!track || !item) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: snapLeft(track, item), behavior: reduceMotion ? "auto" : "smooth" });
    setCurrent(target);
    if (focus) {
      item
        .querySelector<HTMLElement>("a[href], button:not(:disabled), [tabindex]:not([tabindex='-1'])")
        ?.focus({ preventScroll: true });
    }
  }

  // Arrow keys, Home and End move between items in carousel mode, taking
  // keyboard focus to the new item's first control.
  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!carousel || !window.matchMedia(query).matches) return;
    const keys: Record<string, number> = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    goTo(keys[event.key], true);
  }

  return (
    <>
      <div
        ref={trackRef}
        className={`${className}${carousel ? ` ${carouselClassName}` : ""}`}
        role="group"
        aria-label={label}
        onKeyDown={handleKey}
      >
        {children}
      </div>

      {/* Hidden by the SCSS wherever the track is a grid or row. */}
      {carousel && (
        <div className={`ambali-gallery-nav${navClassName ? ` ${navClassName}` : ""}`}>
          <button
            type="button"
            className="ambali-gallery-nav__button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
          >
            <i className="fa-solid fa-angle-left" aria-hidden="true" />
            <span className="visually-hidden">Previous {itemLabel}</span>
          </button>
          <div className="ambali-gallery-nav__status">
            <p className="ambali-gallery-nav__count" aria-live="polite" aria-atomic="true">
              <span className="visually-hidden">{name} </span>
              {current + 1} / {count}
            </p>
            {count <= MAX_DOTS ? (
              <div className="ambali-gallery-nav__dots" aria-hidden="true">
                {Array.from({ length: count }, (_, index) => (
                  <span key={index} className={index === current ? "is-active" : undefined} />
                ))}
              </div>
            ) : (
              <div className="ambali-gallery-nav__progress" aria-hidden="true">
                <span style={{ width: `${((current + 1) / count) * 100}%` }} />
              </div>
            )}
          </div>
          <button
            type="button"
            className="ambali-gallery-nav__button"
            onClick={() => goTo(current + 1)}
            disabled={current === count - 1}
          >
            <i className="fa-solid fa-angle-right" aria-hidden="true" />
            <span className="visually-hidden">Next {itemLabel}</span>
          </button>
        </div>
      )}
    </>
  );
}
