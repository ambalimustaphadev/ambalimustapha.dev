import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getHomepageProjects } from "@/data/projects";

export function FeaturedProjects() {
  const homepageProjects = getHomepageProjects();

  return (
    <section id="work" className="py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Featured Projects
            </h2>
          </div>
          <p className="mt-4 text-base font-normal leading-relaxed text-foreground-secondary sm:text-lg">
            A selection of projects I&apos;ve built. Each one solves a real
            problem through thoughtful design, clean architecture, and
            practical engineering.
          </p>
        </div>

        <div className="mt-9 flex flex-col gap-5">
          {homepageProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 1} />
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <Button href="/projects" variant="secondary">
            All Projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
