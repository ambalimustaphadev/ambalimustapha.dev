import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Fihone",
    slug: "fihone",
    category: "Mobile Security Platform",
    description:
      "A mobile security application focused on helping users monitor and protect their devices through security controls, device tracking, activity monitoring, and authentication.",
    longDescription:
      "Fihone is a cross-platform mobile application built to give users more visibility and control over the security of their own devices. The goal is a single app where someone can review device activity, manage security controls, and respond quickly if something looks wrong — rather than piecing that together across several tools. The mobile client is built in Flutter, backed by an API that handles authentication, device data, and location services. The project is under active development, and the architecture is evolving as core flows (auth, device tracking, activity monitoring) are built out and tested.",
    technologies: ["Flutter", "Dart", "Backend API", "Authentication", "Location services"],
    status: "In development",
    featured: true,
    year: 2026,
    features: [
      "Device monitoring and security controls",
      "Device tracking",
      "Activity monitoring",
      "User authentication",
    ],
  },
  {
    title: "Financial / Wallet API",
    slug: "financial-wallet-api",
    category: "Backend · REST API",
    description:
      "A production-style REST API for users, wallets, transactions, transfers, authentication, and account management.",
    longDescription:
      "A backend project built to practice designing a REST API the way a real financial product would need it: clear data models for users, wallets, and transactions, safe money-transfer logic, authenticated endpoints, and sensible account management. Built with Flask and PostgreSQL, using SQLAlchemy for the data layer and JWT for authentication, with Docker for a consistent local environment. The focus is on getting the fundamentals right — data integrity, auth, and API design — before adding anything more advanced.",
    technologies: [
      "Python",
      "Flask",
      "PostgreSQL",
      "SQLAlchemy",
      "REST API",
      "JWT/Auth",
      "Docker",
    ],
    status: "In development",
    featured: true,
    year: 2026,
    features: [
      "User accounts and authentication",
      "Wallets and balances",
      "Transactions and transfers",
      "Account management",
    ],
  },
  {
    title: "Go Backend Project",
    slug: "go-backend-project",
    category: "Backend · REST API",
    description:
      "An upcoming backend project exploring Go for building fast, reliable REST services.",
    longDescription:
      "A planned project to explore backend development in Go after building REST APIs in Python/Flask. The aim is to compare how Go's standard library and type system shape API design, and to build a small, well-structured service backed by PostgreSQL. Details will be added once work begins.",
    technologies: ["Go", "PostgreSQL", "REST API", "Docker"],
    status: "Coming soon",
    featured: true,
    year: 2026,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
