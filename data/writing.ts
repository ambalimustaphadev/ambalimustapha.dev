import type { WritingPost } from "@/types";
import { content as flutterArticle } from "@/data/articles/building-flutter-apps-people-can-depend-on";
import { content as agentsArticle } from "@/data/articles/beyond-the-chatbot-engineering-ai-agents";
import { content as engineeringArticle } from "@/data/articles/writing-code-is-not-the-same-as-building-software";

// Published articles, newest first. Each post renders at /writing/[slug] and
// is picked up by the homepage "Latest Blog" section, /writing and the sitemap.
export const posts: WritingPost[] = [
  {
    title:
      "Building a Flutter App Is Easy. Building One People Can Depend On Is the Real Challenge.",
    slug: "building-flutter-apps-people-can-depend-on",
    excerpt:
      "A polished Flutter screen proves you can build an interface. Whether people can depend on the app is decided elsewhere — in state, failures, sessions, connectivity and everything that happens after the demo.",
    date: "2026-11-12",
    category: "Mobile Development",
    cover: {
      src: "/images/blog/flutter-mobile-engineering.webp",
      alt: "Illustration of a phone showing an app with a gradient card and a bar chart, linked to panels with a tree diagram, a checklist, a padlock, a location pin and a sync icon",
      width: 1640,
      height: 1176,
    },
    content: flutterArticle,
  },
  {
    title: "Beyond the Chatbot: What It Really Takes to Engineer an AI Agent",
    slug: "beyond-the-chatbot-engineering-ai-agents",
    excerpt:
      "Calling a language model takes a few lines of code. Building something that uses one reliably — with context, tools, validation and limits — is an engineering problem. Here's how I approach it.",
    date: "2026-11-12",
    category: "AI & Agentic Engineering",
    cover: {
      src: "/images/blog/ai-agent-engineering.webp",
      alt: "Illustration of a glowing central hub connected to icons for a database, a document, the web, code, a calculator and a security shield, with a message card on each side",
      width: 1640,
      height: 1176,
    },
    content: agentsArticle,
  },
  {
    title: "Writing Code Is Not the Same as Building Software",
    slug: "writing-code-is-not-the-same-as-building-software",
    excerpt:
      "Getting code to run is the start, not the finish. The difference between a programmer and an engineer shows up in the questions you ask before, during and long after the code compiles.",
    date: "2026-11-12",
    category: "Software Engineering",
    cover: {
      src: "/images/blog/software-engineering.webp",
      alt: "Illustration of overlapping windows: a flow diagram, a code editor, a terminal and a panel with a green and a red status row",
      width: 1640,
      height: 1176,
    },
    content: engineeringArticle,
  },
];

export const FUTURE_TOPICS = [
  "Building a Flask REST API",
  "SQLAlchemy relationships, explained simply",
  "What I learned building Fihone",
  "Flutter architecture decisions",
  "Designing a wallet API",
  "Moving from Flask to Go",
  "Backend engineering lessons",
];
