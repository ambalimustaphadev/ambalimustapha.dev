import Link from "next/link";
import type { Project } from "@/types";

export function FutureProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-center justify-between gap-4 border-t border-border py-4 text-sm"
    >
      <span className="text-foreground-secondary transition-colors duration-200 group-hover:text-foreground">
        {project.title}
      </span>
      <span className="shrink-0 text-foreground-secondary">{project.status}</span>
    </Link>
  );
}
