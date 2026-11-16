"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import type { ProjectScreenshot } from "@/types";

type Zoom = { width: number; focusX: number; focusY: number };

/**
 * Case-study screenshots with a larger preview. Built on the native <dialog>
 * (showModal), which already provides the focus trap, Escape to close and an
 * inert page behind it, so no gallery dependency is needed. The preview shows
 * the whole screenshot; tapping it (or the zoom button) enlarges it further and
 * lets it be panned, since the app screens sit inside wide presentation slides.
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
      <div className="ambali-project-gallery__grid">
        {shots.map((item, index) => {
          // A landscape image (several phones side by side) spans two columns.
          const wide = item.width > item.height;
          return (
          <figure
            key={item.src}
            className={`ambali-project-gallery__item${wide ? " ambali-project-gallery__item--wide" : ""}`}
            // Never shown wider than the image's own pixels.
            style={{ "--shot-w": `${item.width}px` } as CSSProperties}
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
