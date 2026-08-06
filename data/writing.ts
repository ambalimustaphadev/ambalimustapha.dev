import type { WritingPost } from "@/types";

// No posts published yet. Adding entries here makes them show up on the
// Writing section and /writing page automatically — but each post also needs
// an app/writing/[slug]/page.tsx route to actually render, which doesn't
// exist yet since there's no content to build it against.
export const posts: WritingPost[] = [];

export const FUTURE_TOPICS = [
  "Building a Flask REST API",
  "SQLAlchemy relationships, explained simply",
  "What I learned building Fihone",
  "Flutter architecture decisions",
  "Designing a wallet API",
  "Moving from Flask to Go",
  "Backend engineering lessons",
];
