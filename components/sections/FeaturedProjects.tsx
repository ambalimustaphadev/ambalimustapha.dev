import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FutureProjectRow } from "@/components/ui/FutureProjectRow";
import { getFutureProjects, getPrimaryProjects } from "@/data/projects";

export function FeaturedProjects() {
  const primaryProjects = getPrimaryProjects();
  const futureProjects = getFutureProjects();

  return (
    <section id="work" className="py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionHeading>Featured Projects</SectionHeading>
          <p className="mt-5 text-base leading-relaxed text-foreground-secondary sm:text-lg">
            A selection of projects I&apos;ve built, spanning mobile apps and
            backend systems. Some are still in progress; others are developed
            enough to dig into.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {primaryProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 1} />
          ))}
        </div>

        {futureProjects.length > 0 && (
          <div className="mt-6 max-w-2xl space-y-3">
            {futureProjects.map((project) => (
              <FutureProjectRow key={project.slug} project={project} />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button href="/projects" variant="secondary">
            View All Projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
