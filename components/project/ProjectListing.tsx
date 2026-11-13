import Link from "next/link";
import type { ReactNode } from "react";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import { getCardStatus } from "@/lib/project-status";
import type { Project } from "@/types";

/**
 * Reeni project grid (components/projects/Projects.jsx, `latest-portfolio-card v5`).
 * `header` (optional) renders above the grid, e.g. an intro and category tabs.
 */
export function ProjectListing({
  projects,
  header,
  className = "tmp-latest-portfolio tmp-section-gap",
}: {
  projects: Project[];
  header?: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="container">
        {header}
        <div className="row">
          {projects.map((project) => {
            const href = `/projects/${project.slug}`;
            return (
              <div key={project.slug} className="col-lg-6 col-md-6 col-12">
                <div className="latest-portfolio-card v5 tmp-hover-link">
                  <div className="portfoli-card-img">
                    <div className="img-box v2">
                      <Link href={href} tabIndex={-1} aria-label={project.title}>
                        {project.image ? (
                          <>
                            {/* Two copies drive the template's hover swap effect. */}
                            <ProjectThumb project={project} className="img-primary hidden-on-mobile" />
                            <ProjectThumb project={project} className="img-secondary" />
                          </>
                        ) : (
                          <ProjectThumb project={project} className="img-secondary" />
                        )}
                      </Link>
                    </div>
                    <Link href={href} className="img-link-icon" aria-label={`Open ${project.title}`}>
                      <i className="fa-solid fa-arrow-up-long" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="portfolio-card-content-wrap">
                    <div className="content-left">
                      <h2 className="portfolio-card-title">
                        <Link className="link" href={href}>
                          {project.title}
                        </Link>
                      </h2>
                      <p className="ambali-project-meta">
                        {getCardStatus(project) && (
                          <>
                            <span className="ambali-status-tag">{getCardStatus(project)}</span>
                            <span aria-hidden="true"> · </span>
                          </>
                        )}
                        {project.category}
                        <span aria-hidden="true"> · </span>
                        {project.year}
                      </p>
                      <p className="portfoli-card-para">{project.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
