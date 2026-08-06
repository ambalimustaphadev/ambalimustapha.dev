import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/types";

const STATUS_STYLES: Record<Project["status"], string> = {
  "In active development": "bg-accent-soft text-accent",
  "In development": "bg-accent-soft text-accent",
  Completed: "bg-surface-hover text-foreground",
  "Coming soon": "bg-surface-hover text-foreground-secondary",
  Live: "bg-accent-soft text-accent",
};

export function ProjectImagePlaceholder({ project }: { project: Project }) {
  return (
    <div className="bg-grid-fade relative flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-accent-soft),transparent_60%)]">
      <span
        aria-hidden="true"
        className="select-none text-7xl font-semibold text-foreground-secondary/15"
      >
        {project.title.charAt(0)}
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className="group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 lg:grid-cols-[minmax(0,320px)_1fr]">
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`View case study: ${project.title}`}
      />

      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl lg:aspect-auto lg:h-full lg:rounded-l-2xl lg:rounded-tr-none">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProjectImagePlaceholder project={project} />
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <div className="relative z-10 flex flex-col justify-center p-6 pointer-events-none sm:p-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Heading className="text-xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-2xl">
            {project.title}
          </Heading>
          <span className="text-sm text-foreground-secondary">{project.category}</span>
        </div>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-secondary">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground-secondary"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-5">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
            View case study
            <ArrowRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 pointer-events-auto text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
            >
              <GithubIcon size={15} />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 pointer-events-auto text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
            >
              Live demo
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
