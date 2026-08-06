import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ProjectImagePlaceholder } from "@/components/ui/ProjectCard";
import type { Project } from "@/types";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="border-b border-border py-14 sm:py-20">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          All projects
        </Link>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-secondary">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                {project.status}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {project.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-4">
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
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            ) : (
              <ProjectImagePlaceholder project={project} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
