import { Container } from "@/components/ui/Container";
import type { Project } from "@/types";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Overview
          </h2>

          <div className="max-w-2xl space-y-8">
            <p className="text-lg leading-relaxed text-foreground-secondary">
              {project.longDescription}
            </p>

            {project.features && project.features.length > 0 && (
              <div>
                <p className="mb-4 text-sm font-medium text-foreground-secondary">
                  Key features
                </p>
                <ul className="space-y-2.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-base text-foreground"
                    >
                      <span
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
