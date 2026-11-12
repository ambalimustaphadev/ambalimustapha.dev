import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    organization: "OH Mobility",
    role: "IT Assistant (Full-Stack Developer)",
    period: "2026 – Present",
    kind: "employment",
    description:
      "Contributing to the development and maintenance of company applications, backend services, API integrations and websites. Working across products including Ohlify and Keepaza, with responsibilities involving backend integration, deployments, troubleshooting and system maintenance.",
  },
  {
    organization: "Pediforte Coding Academy",
    role: "Flutter App Development Intern",
    period: "2024 – 2026",
    kind: "internship",
    description:
      "Gained practical experience in Flutter and Dart mobile application development, backend engineering and AI agent development. Built technical skills in developing mobile applications, integrating APIs, working with backend systems and building AI-powered application experiences.",
  },
  {
    organization: "Personal Projects",
    role: "Independent Software Developer",
    period: "2024 – Present",
    kind: "independent",
    description:
      "Building independent software products that combine mobile application development, backend engineering and artificial intelligence.",
    projects: [
      { slug: "sabimate", summary: "AI-powered study abroad assistant" },
      { slug: "finassist", summary: "AI-powered financial assistant" },
      { slug: "fihone", summary: "Mobile security and device protection app" },
    ],
  },
];
