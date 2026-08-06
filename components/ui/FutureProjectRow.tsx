import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";

export function FutureProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-center justify-between gap-4 rounded-xl border border-dashed border-border px-5 py-4 text-sm transition-colors duration-200 hover:border-accent/40 hover:bg-surface"
    >
      <span className="font-medium text-foreground-secondary transition-colors duration-200 group-hover:text-foreground">
        {project.title}
      </span>
      <span className="flex shrink-0 items-center gap-2 text-foreground-secondary">
        {project.status}
        <ArrowRight
          size={14}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
