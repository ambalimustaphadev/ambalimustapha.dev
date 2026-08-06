import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  index,
  headingLevel = "h3",
}: {
  project: Project;
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid grid-cols-1 gap-x-8 gap-y-3 border-t border-border py-8 transition-colors duration-200 first:border-t-0 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_11rem]"
    >
      <span className="text-sm text-foreground-secondary tabular-nums transition-colors duration-200 group-hover:text-accent">
        {String(index).padStart(2, "0")}
      </span>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Heading className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.title}
          </Heading>
          <span className="text-sm text-foreground-secondary">
            {project.category}
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-secondary">
          {project.description}
        </p>

        <p className="mt-3 text-sm text-foreground-secondary">
          {project.technologies.join(" · ")}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <span>View case study</span>
          <ArrowRight
            size={15}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex items-start justify-start sm:col-start-2 lg:col-start-3 lg:justify-end">
        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground-secondary">
          {project.status}
        </span>
      </div>
    </Link>
  );
}
