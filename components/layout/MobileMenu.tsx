"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { NAV_LINKS } from "@/lib/constants";
import type { NavLink } from "@/types";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isActive: (link: NavLink) => boolean;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, link: NavLink) => void;
};

/** Demo 17 one-page mobile menu (MobileMenuOnepage + OnepageNavMobile), state-driven. */
export function MobileMenu({ open, onClose, isActive, onNavigate }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // The template fades the menu in, and its contents stay `visibility: hidden`
    // (so unfocusable) for the first frames — retry until focus lands.
    const startedAt = performance.now();
    let frame = 0;
    const focusCloseButton = () => {
      const button = closeButtonRef.current;
      if (!button) return;
      button.focus();
      if (document.activeElement !== button && performance.now() - startedAt < 1000) {
        frame = window.requestAnimationFrame(focusCloseButton);
      }
    };
    frame = window.requestAnimationFrame(focusCloseButton);
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      // Return focus to the menu button without disturbing any in-page scroll.
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <div className="d-block d-xl-none">
      <div
        id="mobile-menu"
        className={`tmp-popup-mobile-menu mobile-menu-onepage${open ? " active" : ""}`}
        // Clicking the dimmed backdrop (outside .inner) closes the menu, as in the template.
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="inner" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="header-top">
            <div className="logo">
              <SiteLogo />
            </div>
            <div className="close-menu">
              <button
                ref={closeButtonRef}
                type="button"
                className="close-button tmp-round-action-btn"
                onClick={onClose}
                aria-label="Close menu"
              >
                <i className="fa-sharp fa-light fa-xmark" aria-hidden="true" />
              </button>
            </div>
          </div>
          <ul className="tmp-mainmenu onepagenav-click">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className={isActive(link) ? "current" : "nav-item"}>
                <Link
                  className="smoth-animation"
                  href={link.href}
                  onClick={(event) => onNavigate(event, link)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="social-wrapper mt--40">
            <span className="subtitle">Find me on</span>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}
