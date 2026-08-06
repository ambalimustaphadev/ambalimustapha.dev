import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Mustapha Ambali, spanning mobile applications built with Flutter and backend systems built with Flask.",
};

export default function ProjectsPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Selected work
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground-secondary">
            A few things I&apos;ve been building, testing, and learning
            from. Some are still in progress; others are developed enough
            to dig into.
          </p>
        </div>

        <div className="mt-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 1} />
          ))}
        </div>
      </Container>
    </div>
  );
}
