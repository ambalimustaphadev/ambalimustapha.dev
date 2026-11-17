import Link from "next/link";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectVideo } from "@/components/project/ProjectVideo";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import { TmpButton } from "@/components/ui/TmpButton";
import { getPrimaryProjects } from "@/data/projects";
import type { CaseStudyPoint, CaseStudySection, Project } from "@/types";

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

/** Labelled lines, label beside text from 768px and stacked below it. */
function PointList({ points }: { points: CaseStudyPoint[] }) {
  return (
    <dl className="ambali-case-points">
      {points.map((point) => (
        <div key={point.label} className="ambali-case-points__row">
          <dt>{point.label}</dt>
          <dd>{point.text}</dd>
        </div>
      ))}
    </dl>
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

/**
 * Reeni project details layout (components/projects/ProjectDetails.jsx) for a case study.
 *
 * Projects with a screen gallery show their screens instead of the cover
 * banner (the cover already appears on the project cards) unless
 * `caseStudyCover` is set, so the page opens on the overview and details, then
 * the lead case-study sections (`leadSections`, e.g. overview and problem),
 * the screen recording (if any), the screens, and the rest of the case study.
 */
export function ProjectDetails({ project }: { project: Project }) {
  const related = relatedProjects(project);
  const gallery = project.gallery ?? [];
  const hasScreens = gallery.length > 0;

  const coverBanner = (
    <div
      className="project-details-thumnail-wrap ambali-project-hero"
      style={project.imageBackdrop ? { background: project.imageBackdrop } : undefined}
    >
      <ProjectThumb
        project={project}
        className="ambali-project-hero__image"
        sizes="(min-width: 1320px) 1290px, 100vw"
        preload
      />
    </div>
  );

  const banner = <div className="col-lg-12">{coverBanner}</div>;

  const overview = (
    <>
      <h2 className="title">{project.title}</h2>
      <p className="docs">{project.description}</p>
      <h3 className="mini-title">Tech stack</h3>
      <CheckList items={project.technologies} className="ambali-tech-list" />
    </>
  );

  // Case-study sections; on the gallery layout the first `leadSections` are
  // shown before the media and the rest after it.
  const renderSections = (sections: CaseStudySection[]) => (
    <>
      {sections.map((section) => (
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
          {section.points && section.points.length > 0 && <PointList points={section.points} />}
          {section.subsections?.map((sub) => (
            <div key={sub.heading} className="ambali-case-study-subsection">
              <h4 className="ambali-case-study-subsection__title">{sub.heading}</h4>
              {sub.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="docs">
                  {paragraph}
                </p>
              ))}
              {sub.points && sub.points.length > 0 && <PointList points={sub.points} />}
            </div>
          ))}
          {section.closing?.map((paragraph) => (
            <p key={paragraph} className="docs ambali-case-study-section__closing">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </>
  );
  const caseStudy = renderSections(project.caseStudy);
  const leadCount = hasScreens ? (project.leadSections ?? 0) : 0;
  const leadSections = project.caseStudy.slice(0, leadCount);
  const restSections = project.caseStudy.slice(leadCount);

  const detailsPanel = (
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
        {project.role && (
          <div className="project-details-info">
            Role: <span>{project.role}</span>
          </div>
        )}
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
          {/* All private: one line instead of repeating it per repository. */}
          {project.repositories?.length && !project.repositories.some((repo) => repo.public) ? (
            <span>Private repository, available on request</span>
          ) : project.repositories?.length ? (
            <ul className="ambali-code-repos">
              {project.repositories.map((repo) => (
                <li key={repo.url}>
                  {repo.label}:
                  {repo.public ? (
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      View on GitHub <i className="fa-regular fa-arrow-up-right" aria-hidden="true" />
                      <span className="visually-hidden"> ({repo.label.toLowerCase()} repository, opens in a new tab)</span>
                    </a>
                  ) : (
                    <span>Private repository, available on request</span>
                  )}
                </li>
              ))}
            </ul>
          ) : project.githubUrl ? (
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
  );

  const details = <div className="col-lg-4">{detailsPanel}</div>;

  if (hasScreens) {
    // One grid instead of separate rows, so the sticky details panel runs
    // alongside the overview, screens and case study, as on the other case
    // studies. Below 992px it stacks: intro, details, lead sections, media, rest.
    return (
      <div className="project-details-area-wrapper tmp-section-gap ambali-project-details--screens">
        <div className="container">
          {project.caseStudyCover && coverBanner}
          <div className="ambali-project-layout">
            <div className="ambali-project-layout__intro project-details-content-wrap">
              <h2 className="title">{project.title}</h2>
              <p className="docs">{project.description}</p>
              <h3 className="mini-title">Tech stack</h3>
              <div className="tag-items ambali-tech-tags">
                <ul aria-label={`${project.title} technologies`}>
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span className="tag-item">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ambali-project-layout__details">{detailsPanel}</div>
            <div className="ambali-project-layout__main">
              {leadSections.length > 0 && (
                <div className="ambali-project-lead project-details-content-wrap">
                  {renderSections(leadSections)}
                </div>
              )}
              {project.video && <ProjectVideo title={project.title} video={project.video} />}
              <section className="ambali-project-gallery" aria-labelledby="project-gallery-title">
                <h2 className="mini-title" id="project-gallery-title">
                  Inside {project.title}
                </h2>
                <ProjectGallery title={project.title} shots={gallery} />
              </section>
              {restSections.length > 0 && (
                <div className="ambali-project-case-study">
                  <div className="project-details-content-wrap">{renderSections(restSections)}</div>
                </div>
              )}
            </div>
          </div>
          <ProjectFooter related={related} />
        </div>
      </div>
    );
  }

  return (
    <div className="project-details-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          {banner}
          <div className="col-lg-8">
            <div className="project-details-content-wrap">
              {overview}
              {caseStudy}
            </div>
          </div>
          {details}
        </div>
        <ProjectFooter related={related} />
      </div>
    </div>
  );
}

/** Related projects and the link back to all projects, shared by both layouts. */
function ProjectFooter({ related }: { related: Project[] }) {
  return (
    <>
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
    </>
  );
}
