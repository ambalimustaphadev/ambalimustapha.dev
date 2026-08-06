import { ImageOff } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Project } from "@/types";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="border-t border-border py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Technology
          </h2>

          <div className="max-w-xl">
            <ul className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Screenshots
          </h2>

          <div className="flex max-w-xl flex-col items-start gap-3 rounded-lg border border-dashed border-border px-8 py-10 text-center sm:items-center sm:text-center">
            <ImageOff
              size={20}
              strokeWidth={1.5}
              className="text-foreground-secondary"
              aria-hidden="true"
            />
            <p className="text-sm text-foreground-secondary">
              Screenshots will be added here as {project.title} progresses.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
