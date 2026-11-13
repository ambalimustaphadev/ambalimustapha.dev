import type { SkillGroup } from "@/types";

// Grouped by engineering strength, mobile and backend first. Every item is
// used in at least one project on this site (data/projects.ts):
// Flutter/Dart/Riverpod/GoRouter — Sabimate, FinAssist, Fihone, Regiforte;
// Python/FastAPI/Flask/SQLAlchemy/REST — Sabimate, FinAssist, Wallet API;
// PostgreSQL/Redis/Alembic/Docker — Sabimate, Wallet API;
// OpenAI API, streaming and tool-using research — Sabimate, FinAssist.
// Technologies without project evidence (Go, Node.js, MongoDB, SQLite,
// JavaScript) are deliberately not listed.
export const skills: SkillGroup[] = [
  { category: "Mobile Engineering", items: ["Flutter", "Dart", "Riverpod", "GoRouter"] },
  {
    category: "Backend Engineering",
    items: ["Python", "FastAPI", "Flask", "REST APIs", "SQLAlchemy", "JWT authentication"],
  },
  {
    category: "Data & Infrastructure",
    items: ["PostgreSQL", "Redis", "Alembic migrations", "Docker", "Git & CI"],
  },
  {
    category: "AI Integration",
    items: ["OpenAI API", "Streaming responses", "Structured tool context", "Research workflows"],
  },
];
