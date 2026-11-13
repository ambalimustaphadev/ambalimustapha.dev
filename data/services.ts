export type Service = {
  title: string;
  description: string;
  /** Font Awesome classes (the template's icon set). */
  iconClass: string;
  /** Short technology labels shown under the description. */
  technologies: string[];
  /** Existing project pages that demonstrate this capability. */
  projectSlugs: string[];
};

// Shown in the "What I Do" section. Every capability here is backed by a
// project page on the site (data/projects.ts): QR scanning and offline-first
// work by Regiforte, request validation and error handling by the Wallet API,
// FastAPI/PostgreSQL/Redis/Docker and the AI research workflow by Sabimate,
// Flask, JWT and structured AI context by FinAssist, device features by Fihone.
export const services: Service[] = [
  {
    title: "Mobile App Development",
    description:
      "One Flutter codebase for Android and iOS, with sign-in, API integration, device features and offline-first behaviour — structured so the app stays maintainable as it grows.",
    iconClass: "fa-regular fa-mobile",
    technologies: ["Flutter", "Dart", "Riverpod", "GoRouter"],
    projectSlugs: ["sabimate", "finassist", "regiforte"],
  },
  {
    title: "Backend Engineering & REST APIs",
    description:
      "The Python services and REST APIs your apps depend on: authentication, request validation, clear error handling and business logic kept on the server, where it can be trusted and tested.",
    iconClass: "fa-regular fa-server",
    technologies: ["Python", "FastAPI", "Flask", "REST APIs"],
    projectSlugs: ["sabimate", "finassist", "financial-wallet-api"],
  },
  {
    title: "Databases & Infrastructure",
    description:
      "Data that stays consistent: relational models in PostgreSQL with SQLAlchemy and managed migrations, plus Redis for rate limits and quotas and Docker for repeatable environments.",
    iconClass: "fa-regular fa-database",
    technologies: ["PostgreSQL", "SQLAlchemy", "Redis", "Docker"],
    projectSlugs: ["sabimate", "financial-wallet-api"],
  },
  {
    title: "AI Integration",
    description:
      "AI features added through the backend, where they can be controlled: assistants grounded in each user's data, streamed replies, and calculations kept in code with the model explaining the result.",
    iconClass: "fa-regular fa-brain",
    technologies: ["OpenAI API", "Python", "FastAPI", "Streaming"],
    projectSlugs: ["sabimate", "finassist"],
  },
];
