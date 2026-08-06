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
  year: number;
  /** Path to a real screenshot, e.g. "/images/projects/fihone.png". Falls back to a styled placeholder when unset. */
  image?: string;
  /** One-line engineering decision surfaced on the project card. */
  highlight?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: CaseStudySection[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  title: string;
  organization?: string;
  period?: string;
  summary: string[];
};

export type WritingPost = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};
