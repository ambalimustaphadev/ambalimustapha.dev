"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS, RESUME_PATH, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function isActive(href: string) {
    return !href.includes("#") && pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background">
      <div className="mx-auto w-full max-w-[87.5rem] px-5 sm:px-8 lg:px-10 xl:px-12">
        <nav
          className="grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="group flex items-center gap-3.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src="/branding/ma-logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="rounded-[0.55rem] shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden items-center justify-center md:flex">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        active
                          ? "text-accent"
                          : "text-foreground hover:text-accent",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Button
              href={RESUME_PATH}
              variant="secondary"
              className="border-accent text-accent hover:bg-accent-soft hover:text-accent"
            >
              Download CV
              <Download size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-self-end md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <div className="mx-auto w-full max-w-[87.5rem] px-5 sm:px-8 lg:px-10 xl:px-12">
              <ul className="flex flex-col gap-1 py-4">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-3 text-base transition-colors duration-200",
                          active
                            ? "bg-accent-soft text-accent"
                            : "text-foreground hover:bg-surface-hover hover:text-accent",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <Button
                    href={RESUME_PATH}
                    variant="secondary"
                    className="w-full border-accent text-accent hover:bg-accent-soft hover:text-accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    Download CV
                    <Download size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
