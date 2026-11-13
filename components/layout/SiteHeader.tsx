"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, type MouseEvent } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { usePrefersReducedMotion, useScrolledPast, useScrollSpy } from "@/lib/hooks";
import { NAV_LINKS } from "@/lib/constants";
import type { NavLink } from "@/types";

// Homepage sections the scroll-spy tracks without a menu item, so no item is
// highlighted while they are on screen (instead of the item above them).
const UNLISTED_SECTION_IDS = ["pricing"];
const SECTION_IDS = [
  ...NAV_LINKS.flatMap((link) => (link.sectionId ? [link.sectionId] : [])),
  ...UNLISTED_SECTION_IDS,
];

/** Inner-page active state: plain route links match their path (and sub-paths). */
function matchesPath(link: NavLink, pathname: string) {
  if (link.href.includes("#") || link.href === "/") return false;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

/** Reeni Header2 + OnepageNav (as used by Demo 09): sticky, transparent, scroll-spy on the homepage. */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isSticky = useScrolledPast(150);
  const reducedMotion = usePrefersReducedMotion();
  const activeSection = useScrollSpy(SECTION_IDS, isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  function isActive(link: NavLink) {
    return isHome ? link.sectionId === activeSection : matchesPath(link, pathname);
  }

  // On the homepage, menu items scroll to their section like the original
  // one-page menu. Elsewhere they behave as ordinary links.
  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, link: NavLink) {
    setMenuOpen(false);
    if (!isHome || !link.sectionId) return;
    const section = document.getElementById(link.sectionId);
    if (!section) return;
    event.preventDefault();
    section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  }

  return (
    <>
      <header
        className={`tmp-header-area-start header-one header--sticky header--transparent${
          isSticky ? " sticky" : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-content">
                <div className="logo">
                  <SiteLogo preload />
                </div>
                <div className="tmp-mainmenu-nav d-none d-xl-block">
                  <nav className="navbar-example2 onepagenav" aria-label="Primary">
                    <ul className="tmp-mainmenu nav nav-pills">
                      {NAV_LINKS.map((link) => {
                        const active = isActive(link);
                        return (
                          <li key={link.label} className={active ? "current" : "nav-item"}>
                            <Link
                              className="smoth-animation"
                              href={link.href}
                              onClick={(event) => handleNavigate(event, link)}
                              aria-current={active ? (isHome ? "location" : "page") : undefined}
                            >
                              {link.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
                <div className="tmp-header-right">
                  <div className="social-share-wrapper d-none d-md-block">
                    <SocialIcons />
                  </div>
                  <div className="tmp-side-collups-area d-block d-xl-none">
                    <button
                      type="button"
                      className="hamberger-menu humberger_menu_active"
                      onClick={() => setMenuOpen(true)}
                      aria-label="Open menu"
                      aria-expanded={menuOpen}
                      aria-controls="mobile-menu"
                    >
                      <i id="menuBtn" className="fa-light fa-bars humberger-menu" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        isActive={isActive}
        onNavigate={handleNavigate}
      />
    </>
  );
}
