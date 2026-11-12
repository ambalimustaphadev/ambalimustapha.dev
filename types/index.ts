export type ProjectStatus =
  | "In active development"
  | "In development"
  | "Completed"
  | "Coming soon"
  | "Live";

/** One block of case-study content. Rendered in order; only sections with real content should be added. */
export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Project = {
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  /** Shown as one of the curated picks on the homepage Featured Projects section. */
  homepageFeatured?: boolean;
  year: number;
  /** Path to a real screenshot, e.g. "/images/projects/fihone.png". Falls back to a styled placeholder when unset. */
  image?: string;
  /** Alt text for `image` when it isn't a screenshot (defaults to "<title> screenshot"). */
  imageAlt?: string;
  /** One-line engineering decision surfaced on the project card. */
  highlight?: string;
  githubUrl?: string;
  liveUrl?: string;
  /** Filter tabs on the portfolio grid. */
  disciplines?: ProjectDiscipline[];
  caseStudy: CaseStudySection[];
};

export type ProjectDiscipline = "Mobile" | "Backend" | "Web";

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  description: string;
  /** Shown as the entry's label and used to style independent work apart from roles. */
  kind: "employment" | "internship" | "independent";
  /** Existing project pages listed beneath the entry (slug + one-line summary). */
  projects?: { slug: string; summary: string }[];
};

/** One block of article content. Inline text supports `code` and **bold**. */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; code: string };

export type WritingPost = {
  title: string;
  slug: string;
  excerpt: string;
  /** Publication date, ISO format (YYYY-MM-DD). */
  date: string;
  category: string;
  /** Cover image path under /public, plus its alt text and pixel size. */
  cover: { src: string; alt: string; width: number; height: number };
  content: ArticleBlock[];
};

export type NavLink = {
  label: string;
  href: string;
  /** Homepage section this item scroll-spies to (the header's one-page behaviour on "/"). */
  sectionId?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};
