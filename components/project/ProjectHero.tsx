import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/types";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="border-b border-border py-16 sm:py-20">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          All work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-foreground-secondary">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          <span
            className="rounded-full border border-border px-3 py-1 text-xs font-medium"
          >
            {project.status}
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-secondary">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          ) : (
            <span className="text-sm text-foreground-secondary">
              Code is not public yet.
            </span>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Visit live
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          )}
        </div>
      </Container>
    </div>
  );
}
