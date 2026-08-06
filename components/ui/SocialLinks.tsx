import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.icon];
        const isExternal = !link.href.startsWith("mailto:");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
