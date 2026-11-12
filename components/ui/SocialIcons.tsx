import { SOCIAL_LINKS } from "@/lib/constants";
import type { SocialLink } from "@/types";

const ICON_CLASSES: Record<SocialLink["icon"], string> = {
  github: "fa-brands fa-github",
  linkedin: "fa-brands fa-linkedin-in",
  email: "fa-solid fa-envelope",
};

/** Round icon links in the Reeni `.social-link` style (header, hero, menu, footer). */
export function SocialIcons({ className = "social-link" }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((link) => {
        const external = !link.href.startsWith("mailto:");
        return (
          <a
            key={link.label}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={link.label}
          >
            <i className={ICON_CLASSES[link.icon]} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
