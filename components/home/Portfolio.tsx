import Link from "next/link";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import { TmpButton } from "@/components/ui/TmpButton";
import type { Project } from "@/types";

/**
 * Demo 17 "Latest Portfolio" cards (components/common/Portfolio.jsx), showing
 * the curated homepage picks (getHomepageProjects) in the same 3 / 2 / 1
 * column grid as the Writing section. The category filters live on /projects.
 */
export function Portfolio({ projects }: { projects: Project[] }) {
  return (
    <section className="latest-portfolio-area tmp-section-gap" id="portfolio">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">My Work</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Selected Projects
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            From AI-powered applications to mobile products and backend systems, explore some of
            the solutions I&apos;ve designed, engineered and brought to life.
          </p>
        </div>
        {/* Wrappers kept for the template's background glow and image styling;
            mt--0 because the filter tabs that used to sit above are gone. */}
        <div className="latest-portfolio-tabs-area">
          <div className="tab-content bg-blur-style-one mt--0">
            <div className="row g-5">
              {projects.map((project, index) => {
                const href = `/projects/${project.slug}`;
                return (
                  <div className="col-lg-4 col-md-6 col-12" key={project.slug}>
                    <div
                      className={`latest-portfolio-card-style-two image-box-hover ambali-featured-project tmp-scroll-trigger tmp-fade-in animation-order-${
                        (index % 3) + 1
                      }`}
                    >
                      <div className="portfoli-card-img">
                        <div className="img-box v2">
                          <Link
                            className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                            href={href}
                            aria-label={project.title}
                            tabIndex={-1}
                          >
                            <ProjectThumb
                              project={project}
                              sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="portfolio-card-content-wrap">
                        <div className="content-left">
                          <h3 className="portfolio-card-title">
                            <Link href={href}>{project.title}</Link>
                          </h3>
                          <div className="tag-items">
                            <ul>
                              <li>
                                <span className="tag-item ambali-status-tag">{project.status}</span>
                              </li>
                              {project.technologies.slice(0, 2).map((tech) => (
                                <li key={tech}>
                                  <span className="tag-item">{tech}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <TmpButton href={href} className="btn-border btn-md">
                          View Project
                        </TmpButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="text-center mt--50 tmp-scroll-trigger tmp-fade-in animation-order-1">
          <TmpButton href="/projects">View All Projects</TmpButton>
        </div>
      </div>
    </section>
  );
}
