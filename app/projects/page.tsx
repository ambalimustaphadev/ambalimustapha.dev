import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FutureProjectRow } from "@/components/ui/FutureProjectRow";
import { getFutureProjects, getPrimaryProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Mustapha Ambali, spanning mobile applications built with Flutter and backend systems built with Flask.",
};

export default function ProjectsPage() {
  const primaryProjects = getPrimaryProjects();
  const futureProjects = getFutureProjects();

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Selected work
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground-secondary sm:text-lg">
            A few things I&apos;ve been building, testing, and learning
            from. Some are still in progress; others are developed enough
            to dig into.
          </p>
        </div>

        <div className="mt-4">
          {primaryProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 1} />
          ))}
        </div>

        {futureProjects.length > 0 && (
          <div className="mt-2 max-w-2xl">
            {futureProjects.map((project) => (
              <FutureProjectRow key={project.slug} project={project} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
