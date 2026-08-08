import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { RESUME_PATH } from "@/lib/constants";

const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#tools" },
  { label: "Contact", href: "/contact" },
];

const RESOURCE_LINKS = [
  { label: "Download CV", href: RESUME_PATH },
  { label: "Writing", href: "/writing" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-14">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo size={38} />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground-secondary">
              Software developer building mobile apps and backend systems.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-foreground-secondary">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-foreground-secondary">
              Resources
            </p>
            <ul className="mt-4 space-y-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.label === "Writing" ? undefined : "_blank"}
                    rel={link.label === "Writing" ? undefined : "noopener noreferrer"}
                    className="text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-foreground-secondary">
              Connect
            </p>
            <SocialLinks className="mt-4 flex-col items-start gap-2.5" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-foreground-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Mustapha Ambali. All rights reserved.</p>
          <a
            href="#main-content"
            className="flex items-center gap-1.5 text-foreground-secondary transition-colors duration-200 hover:text-accent"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
