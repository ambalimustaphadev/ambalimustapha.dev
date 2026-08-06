import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FutureProjectRow } from "@/components/ui/FutureProjectRow";
import { getFutureProjects, getPrimaryProjects } from "@/data/projects";

export function FeaturedProjects() {
  const primaryProjects = getPrimaryProjects();
  const futureProjects = getFutureProjects();

  return (
    <section id="work" className="py-14 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Selected work
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground-secondary sm:text-lg">
            A few things I&apos;ve been building, testing, and learning
            from. Some are still in progress; others are developed enough
            to dig into.
          </p>
        </div>

        <div className="mt-2">
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
    </section>
  );
}
