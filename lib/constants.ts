import type { NavLink, SocialLink } from "@/types";

export const SITE_NAME = "Mustapha Ambali";
export const SITE_ROLE = "Software Developer · Mobile & Backend";
export const SITE_URL = "https://ambalimustapha.dev";
export const SITE_DESCRIPTION =
  "Mustapha Ambali is a software developer building mobile applications and backend systems with Flutter, Python, Flask, and REST APIs.";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

// hello@ambalimustapha.dev forwards (via Porkbun) to the private inbox behind it.
// The contact form sends here too — see app/api/contact/route.ts.
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
