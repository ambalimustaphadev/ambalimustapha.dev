export type ProjectStatus =
  | "In active development"
  | "In development"
  | "Completed"
  | "Coming soon"
  | "Live";

/** A labelled line in a case study, e.g. { label: "Approach", text: "…" }. */
export type CaseStudyPoint = { label: string; text: string };

/** One block of case-study content. Rendered in order; only sections with real content should be added. */
export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Labelled lines (label beside text), shown after the paragraphs and bullets. */
  points?: CaseStudyPoint[];
  /** Titled points within the section, shown after everything above. */
  subsections?: { heading: string; paragraphs?: string[]; points?: CaseStudyPoint[] }[];
  /** Paragraphs shown after the subsections, e.g. a closing note. */
  closing?: string[];
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
  /** Intrinsic pixel size of `image` (defaults to 1200×900). */
  imageSize?: { width: number; height: number };
  /**
   * Shows `image` whole inside the card and banner frames (instead of cropping
   * it to fill them) on this CSS background, which should match the image's
   * edges. For artwork with text near the edges, such as a designed cover.
   */
  imageBackdrop?: string;
  /** Captioned screenshots shown on the case study page, in order. */
  gallery?: ProjectScreenshot[];
  /**
   * Keep the cover banner on the case study even though it has a gallery
   * (by default a gallery replaces the banner there).
   */
  caseStudyCover?: boolean;
  /** A screen recording shown on the case study, before the gallery. */
  video?: ProjectVideo;
  /**
   * On a case study with a gallery, how many case-study sections (from the
   * start, e.g. overview and problem) are shown before the video and
   * screenshots; the rest follow them. Defaults to 0 (all after the media).
   */
  leadSections?: number;
  /** Who built it, shown in the details panel, e.g. "Solo developer, mobile app and backend". */
  role?: string;
  /** One-line engineering decision surfaced on the project card. */
  highlight?: string;
  githubUrl?: string;
  /**
   * Separate repositories (e.g. mobile app and backend), listed under Code in
   * the details panel instead of `githubUrl`. Only public ones are linked;
   * private ones read "Private repository, available on request".
   */
  repositories?: { label: string; url: string; public: boolean }[];
  liveUrl?: string;
  /** Filter tabs on the portfolio grid. */
  disciplines?: ProjectDiscipline[];
  caseStudy: CaseStudySection[];
};

export type ProjectDiscipline = "Mobile" | "Backend" | "Web";

export type ProjectVideo = {
  /** H.264 MP4 under /public. */
  src: string;
  /** A frame of the video, shown before it plays. */
  poster: string;
  width: number;
  height: number;
  /** Length in whole seconds, shown next to the video. */
  durationSeconds: number;
  /** What the recording shows; also linked to the video for screen readers. */
  description: string;
};

export type ProjectScreenshot = {
  src: string;
  /** What the screenshot shows, for screen readers. */
  alt: string;
  /** Short visible caption. */
  caption: string;
  width: number;
  height: number;
};

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
