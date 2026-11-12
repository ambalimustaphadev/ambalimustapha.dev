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
      "Cross-platform mobile apps in Flutter and Dart, with API integration, authentication, device features, QR scanning and offline-first behaviour — built on maintainable architecture and predictable state management.",
    iconClass: "fa-regular fa-mobile",
    technologies: ["Flutter", "Dart", "Riverpod", "GoRouter"],
    projectSlugs: ["fihone", "sabimate", "finassist"],
  },
  {
    title: "Backend Engineering & REST APIs",
    description:
      "Backend services and REST APIs in Python with FastAPI and Flask: authentication, request validation, error handling and the service logic that mobile and web clients depend on.",
    iconClass: "fa-regular fa-server",
    technologies: ["Python", "FastAPI", "Flask", "REST APIs"],
    projectSlugs: ["sabimate", "finassist", "fihone"],
  },
  {
    title: "Databases, Security & Infrastructure",
    description:
      "Relational data models in PostgreSQL with SQLAlchemy, hashed passwords and token-based access control, plus Redis and Docker where an application needs them for rate limiting, caching or consistent environments.",
    iconClass: "fa-regular fa-database",
    technologies: ["PostgreSQL", "SQLAlchemy", "Redis", "Docker"],
    projectSlugs: ["sabimate", "finassist"],
  },
  {
    title: "AI Integration & Agentic Engineering",
    description:
      "Integrating language models into products through the backend: context-aware assistants, conversational interfaces, structured context passed to the model, and tool-using workflows such as planned web research with cited sources.",
    iconClass: "fa-regular fa-brain",
    technologies: ["OpenAI API", "Python", "FastAPI", "AI Workflows"],
    projectSlugs: ["sabimate", "finassist"],
  },
];
