import type { ExperienceItem } from "@/types";

// Periods are deliberately year-only: start months can't be confirmed, so
// none are shown (confirmed with Mustapha). Don't add guessed months.
// The Pediforte certificate is listed once, under data/education.ts.
export const experience: ExperienceItem[] = [
  {
    organization: "OH Mobility",
    // Formal title from the offer letter: "IT Assistant (Full-Stack Developer)".
    role: "IT Assistant — Full-Stack Development",
    period: "2026 – Present",
    kind: "employment",
    description:
      "Develop and maintain company applications, backend services, API integrations and websites across products including Ohlify and Keepaza. Day-to-day work covers mobile and backend integration, deployments, troubleshooting and keeping production systems running.",
  },
  {
    organization: "Pediforte Coding Academy",
    role: "Flutter App Development Intern",
    period: "2024 – 2026",
    kind: "internship",
    description:
      "Trained in Flutter and Dart mobile development through a hands-on internship, building practical experience integrating APIs, working with backend systems and building AI-powered app features.",
  },
  {
    organization: "Independent Projects",
    role: "Mobile & Backend Developer",
    period: "2024 – Present",
    kind: "independent",
    description:
      "Design and build my own products end to end: Flutter apps, the Python backends and databases behind them, and AI features where they genuinely help.",
    projects: [
      { slug: "sabimate", summary: "Study-abroad guidance app with a FastAPI backend" },
      { slug: "finassist", summary: "Personal finance app with a Flask REST API" },
      { slug: "fihone", summary: "Device security app with its own backend API" },
    ],
  },
];
