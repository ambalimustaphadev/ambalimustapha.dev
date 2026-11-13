import Link from "next/link";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import { TmpButton } from "@/components/ui/TmpButton";
import { getPrimaryProjects } from "@/data/projects";
import type { Project } from "@/types";

function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={["check-box-wrap", className].filter(Boolean).join(" ")}>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <p className="check-box-item">
              <span>
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
              </span>
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Up to two listed projects that share a discipline (Mobile/Backend/Web) with
 * the current one, falling back to other listed projects. Never includes
 * unlisted entries such as planned projects.
 */
function relatedProjects(current: Project, limit = 2): Project[] {
  const others = getPrimaryProjects().filter((project) => project.slug !== current.slug);
  const shared = others.filter((project) =>
    project.disciplines?.some((discipline) => current.disciplines?.includes(discipline)),
  );
  const rest = others.filter((project) => !shared.includes(project));
  return [...shared, ...rest].slice(0, limit);
}

/** Reeni project details layout (components/projects/ProjectDetails.jsx) for a case study. */
export function ProjectDetails({ project }: { project: Project }) {
  const related = relatedProjects(project);

  return (
    <div className="project-details-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="project-details-thumnail-wrap ambali-project-hero">
              <ProjectThumb
                project={project}
                className="ambali-project-hero__image"
                sizes="(min-width: 1320px) 1290px, 100vw"
                preload
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="project-details-content-wrap">
              <h2 className="title">{project.title}</h2>
              <p className="docs">{project.description}</p>
              <h3 className="mini-title">Tech stack</h3>
              <CheckList items={project.technologies} className="ambali-tech-list" />

              {project.caseStudy.map((section) => (
                <div key={section.heading} className="ambali-case-study-section">
                  <h3 className="mini-title">{section.heading}</h3>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="docs">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <CheckList items={section.bullets} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="signle-side-bar project-details-area tmponhover">
              <div className="header">
                <h3 className="title">Project Details</h3>
              </div>
              <div className="body">
                <div className="project-details-info">
                  Name: <span>{project.title}</span>
                </div>
                <div className="project-details-info">
                  Category: <span>{project.category}</span>
                </div>
                <div className="project-details-info">
                  Year: <span>{project.year}</span>
                </div>
                <div className="project-details-info">
                  Status: <span>{project.status}</span>
                </div>
                {project.highlight && (
                  <div className="project-details-info">
                    Key decision: <span>{project.highlight}</span>
                  </div>
                )}
                <div className="project-details-info">
                  Code:{" "}
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub <i className="fa-regular fa-arrow-up-right" aria-hidden="true" />
                    </a>
                  ) : (
                    <span>Not public yet</span>
                  )}
                </div>
                {project.liveUrl && (
                  <div className="project-details-info">
                    Live:{" "}
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit site <i className="fa-regular fa-arrow-up-right" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
        {related.length > 0 && (
          <section className="ambali-related-projects" aria-labelledby="related-projects-title">
            <h2 className="mini-title" id="related-projects-title">
              Related projects
            </h2>
            <ul className="ambali-exp-projects">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link className="ambali-exp-project" href={`/projects/${item.slug}`}>
                    <span className="ambali-exp-project__text">
                      <span className="ambali-exp-project__name">{item.title}</span>
                      <span className="ambali-exp-project__summary">{item.category}</span>
                    </span>
                    <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="ambali-project-nav">
          <TmpButton href="/projects" className="btn-border">
            All Projects
          </TmpButton>
        </div>
      </div>
    </div>
  );
}
