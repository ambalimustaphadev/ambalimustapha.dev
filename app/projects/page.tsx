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
    <div className="py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            All Projects
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground-secondary sm:text-lg">
            A few things I&apos;ve been building, testing, and learning
            from. Some are still in progress; others are developed enough
            to dig into.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {primaryProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index + 1}
              headingLevel="h2"
            />
          ))}
        </div>

        {futureProjects.length > 0 && (
          <div className="mt-6 max-w-2xl space-y-3">
            {futureProjects.map((project) => (
              <FutureProjectRow key={project.slug} project={project} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
