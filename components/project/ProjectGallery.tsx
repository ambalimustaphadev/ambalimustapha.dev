"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import type { ProjectScreenshot } from "@/types";

type Zoom = { width: number; focusX: number; focusY: number };

/** Matches the SCSS breakpoint below which the grid becomes a carousel. */
const CAROUSEL_QUERY = "(max-width: 575px)";
/** Beyond this many screenshots, a progress bar replaces the dots. */
const MAX_DOTS = 8;

/**
 * Case-study screenshots with a larger preview, used for every project's
 * `gallery` (data/projects.ts); nothing here is project-specific.
 *
 * Layout: a grid on tablets and desktops (see the SCSS). On phones the same
 * list becomes a swipeable carousel (native horizontal scroll snapping, one
 * screenshot at a time) with previous/next buttons, a counter and dots (or a
 * progress bar for long galleries). It is the same markup in both cases, so
 * there are no duplicate images, and a single screenshot gets no controls.
 *
 * Preview: built on the native <dialog> (showModal), which already provides
 * the focus trap, Escape to close and an inert page behind it, so no gallery
 * dependency is needed. It shows the whole screenshot; tapping it (or the zoom
 * button) enlarges it and lets it be panned.
 */
export function ProjectGallery({ title, shots }: { title: string; shots: ProjectScreenshot[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [zoom, setZoom] = useState<Zoom | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<number | null>(null);
  const captionId = useId();
  const shot = active === null ? null : shots[active];
  const gridRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const carousel = shots.length > 1;

  // Carousel position: the screenshot whose centre is nearest the middle of the
  // strip, updated once per frame while it scrolls (swipe, buttons or focus).
  // On wider screens the grid never scrolls sideways, so this stays idle.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !carousel) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = grid.scrollLeft + grid.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      Array.from(grid.children).forEach((child, index) => {
        const item = child as HTMLElement;
        const gap = Math.abs(item.offsetLeft + item.offsetWidth / 2 - middle);
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
    grid.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      grid.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [carousel]);

  function goTo(index: number, focus = false) {
    const grid = gridRef.current;
    const target = Math.max(0, Math.min(shots.length - 1, index));
    const item = grid?.children[target] as HTMLElement | undefined;
    if (!grid || !item) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    grid.scrollTo({
      left: item.offsetLeft - (grid.clientWidth - item.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setCurrent(target);
    if (focus) triggerRefs.current[target]?.focus({ preventScroll: true });
  }

  // Arrow keys, Home and End move between screenshots in carousel mode.
  function handleCarouselKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!carousel || !window.matchMedia(CAROUSEL_QUERY).matches) return;
    const keys: Record<string, number> = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: shots.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    goTo(keys[event.key], true);
  }

  // Open the dialog and lock page scrolling while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (active === null || !dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();

    const root = document.documentElement;
    const { body } = document;
    const previous = { overflow: root.style.overflow, paddingRight: body.style.paddingRight };
    // Keep the page from shifting sideways when its scrollbar disappears.
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
    };
  }, [active]);

  // After zooming, scroll so the point that was tapped stays in view.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!zoom || !viewport || !image) return;
    viewport.scrollLeft = zoom.focusX * image.offsetWidth - viewport.clientWidth / 2;
    viewport.scrollTop = zoom.focusY * image.offsetHeight - viewport.clientHeight / 2;
  }, [zoom]);

  function open(index: number) {
    lastTrigger.current = index;
    setZoom(null);
    setActive(index);
  }

  function close() {
    dialogRef.current?.close(); // fires onClose below
  }

  // Runs for every way of closing: the button, a click outside, or Escape.
  function handleClosed() {
    setActive(null);
    setZoom(null);
    if (lastTrigger.current !== null) triggerRefs.current[lastTrigger.current]?.focus();
  }

  function toggleZoom(focusX = 0.5, focusY = 0.5) {
    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!shot || !viewport || !image) return;
    if (zoom) {
      setZoom(null);
      return;
    }
    // Enlarge to 2.5× the viewport width, capped at the screenshot's own
    // resolution, but always at least 1.25× the fitted size.
    const fitted = image.offsetWidth;
    const width = Math.round(
      Math.max(fitted * 1.25, Math.min(viewport.clientWidth * 2.5, shot.width)),
    );
    setZoom({ width, focusX, focusY });
  }

  function handleImageClick(event: MouseEvent<HTMLImageElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleZoom((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
  }

  // Anything other than the image and the buttons counts as outside the
  // image: the backdrop, the space around the image and the caption bar.
  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    const target = event.target as Element;
    if (target === imageRef.current || target.closest("button")) return;
    close();
  }

  return (
    <>
      <div
        ref={gridRef}
        className={`ambali-project-gallery__grid${carousel ? " ambali-project-gallery__grid--carousel" : ""}`}
        role="group"
        aria-label={`${title} screenshots`}
        onKeyDown={handleCarouselKey}
      >
        {shots.map((item, index) => {
          // A landscape image (several phones side by side) spans two columns.
          const wide = item.width > item.height;
          return (
          <figure
            key={item.src}
            className={`ambali-project-gallery__item${wide ? " ambali-project-gallery__item--wide" : ""}`}
            // Never shown wider than the image's own pixels; the ratio lets the
            // carousel fit a screenshot to short screens (see the SCSS).
            style={
              { "--shot-w": `${item.width}px`, "--shot-ratio": item.width / item.height } as CSSProperties
            }
          >
            <button
              type="button"
              className="ambali-project-gallery__open"
              aria-haspopup="dialog"
              onClick={() => open(index)}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes={wide ? `(min-width: 576px) ${item.width}px, 100vw` : "(min-width: 576px) 360px, 320px"}
              />
              <span className="ambali-project-gallery__hint" aria-hidden="true">
                <i className="fa-solid fa-up-right-and-down-left-from-center" />
              </span>
              <span className="visually-hidden">Open a larger view</span>
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
          );
        })}
      </div>

      {/* Carousel controls; hidden by the SCSS on wider screens (grid). */}
      {carousel && (
        <div className="ambali-gallery-nav">
          <button
            type="button"
            className="ambali-gallery-nav__button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
          >
            <i className="fa-solid fa-angle-left" aria-hidden="true" />
            <span className="visually-hidden">Previous screenshot</span>
          </button>
          <div className="ambali-gallery-nav__status">
            <p className="ambali-gallery-nav__count" aria-live="polite" aria-atomic="true">
              <span className="visually-hidden">Screenshot </span>
              {current + 1} / {shots.length}
            </p>
            {shots.length <= MAX_DOTS ? (
              <div className="ambali-gallery-nav__dots" aria-hidden="true">
                {shots.map((item, index) => (
                  <span key={item.src} className={index === current ? "is-active" : undefined} />
                ))}
              </div>
            ) : (
              <div className="ambali-gallery-nav__progress" aria-hidden="true">
                <span style={{ width: `${((current + 1) / shots.length) * 100}%` }} />
              </div>
            )}
          </div>
          <button
            type="button"
            className="ambali-gallery-nav__button"
            onClick={() => goTo(current + 1)}
            disabled={current === shots.length - 1}
          >
            <i className="fa-solid fa-angle-right" aria-hidden="true" />
            <span className="visually-hidden">Next screenshot</span>
          </button>
        </div>
      )}

      {/* Click-outside is handled on the dialog; Escape is native to it. */}
      <dialog
        ref={dialogRef}
        className="ambali-lightbox"
        aria-labelledby={shot ? captionId : undefined}
        onClose={handleClosed}
        onClick={handleDialogClick}
      >
        {shot && (
          <>
            <div className="ambali-lightbox__bar">
              <p className="ambali-lightbox__caption" id={captionId}>
                <span className="visually-hidden">{title} screenshot: </span>
                {shot.caption}
              </p>
              <button
                type="button"
                className="ambali-lightbox__button"
                aria-pressed={zoom !== null}
                onClick={() => toggleZoom()}
              >
                <i
                  className={`fa-solid ${zoom ? "fa-magnifying-glass-minus" : "fa-magnifying-glass-plus"}`}
                  aria-hidden="true"
                />
                <span className="visually-hidden">Zoom</span>
              </button>
              <button
                type="button"
                className="ambali-lightbox__button"
                onClick={close}
                ref={closeRef}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
                <span className="visually-hidden">Close</span>
              </button>
            </div>
            <div
              ref={viewportRef}
              className={`ambali-lightbox__viewport${zoom ? " is-zoomed" : ""}`}
            >
              <Image
                ref={imageRef}
                className="ambali-lightbox__image"
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                // Phones zoom to ~2.5× their width, so ask for a larger file.
                sizes="(max-width: 767px) 250vw, 100vw"
                // Opened on request, so load it now rather than lazily.
                loading="eager"
                // The ratio sizes the image before it loads (see the SCSS).
                style={
                  {
                    "--ratio": `${shot.width} / ${shot.height}`,
                    "--natural-w": `${shot.width}px`,
                    ...(zoom ? { width: zoom.width } : {}),
                  } as CSSProperties
                }
                onClick={handleImageClick}
              />
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
