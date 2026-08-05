export type ProjectStatus = "In development" | "Coming soon" | "Live";

export type Project = {
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  year: number;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  title: string;
  organization: string;
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
