import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Selected work
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
            A few projects and experiments I&apos;m building — some finished
            enough to inspect, others still taking shape.
          </p>
        </div>

        <div className="mt-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
