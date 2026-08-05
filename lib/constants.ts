import type { NavLink, SocialLink } from "@/types";

export const SITE_NAME = "Mustapha Ambali";
export const SITE_ROLE = "Software Developer";
export const SITE_URL = "https://ambalimustapha.dev";
export const SITE_DESCRIPTION =
  "Mustapha Ambali is a software developer building mobile applications and backend systems with Flutter, Python, Flask, and modern technologies.";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

// TODO: Replace with a real, verified email address before launch.
export const CONTACT_EMAIL = "hello@ambalimustapha.dev";

// TODO: Add the real LinkedIn URL once available.
export const LINKEDIN_URL: string | null = null;

export const GITHUB_URL = "https://github.com/ambalimustaphadev";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: GITHUB_URL, icon: "github" },
  ...(LINKEDIN_URL
    ? [{ label: "LinkedIn", href: LINKEDIN_URL, icon: "linkedin" as const }]
    : []),
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, icon: "email" },
];

export const RESUME_PATH = "/resume/mustapha-ambali-cv.pdf";
