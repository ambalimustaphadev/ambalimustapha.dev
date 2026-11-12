"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import { TmpButton } from "@/components/ui/TmpButton";
import type { Project, ProjectDiscipline } from "@/types";

const CATEGORIES: ("All" | ProjectDiscipline)[] = ["All", "Mobile", "Backend", "Web"];

/** Demo 17 "Latest Portfolio" grid with category tabs (components/common/Portfolio.jsx). */
export function Portfolio({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.disciplines?.includes(activeCategory));

  return (
    <section className="latest-portfolio-area custom-column-grid tmp-section-gap" id="portfolio">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Latest Portfolio</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Projects I&apos;ve Been Building
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            A few things I&apos;ve been building, testing, and learning from. Some are still in
            progress; others are developed enough to dig into.
          </p>
        </div>
        <div className="latest-portfolio-tabs-area">
          <nav aria-label="Filter projects">
            <ul className="nav nav-tabs">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className={`nav-link ${activeCategory === category ? "active" : ""}`}
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="tab-content bg-blur-style-one">
            <div className="tab-pane fade show active">
              <div className="row">
                {filtered.map((project, index) => {
                  const href = `/projects/${project.slug}`;
                  return (
                    <div className="col-lg-6" key={project.slug}>
                      <div
                        className={`latest-portfolio-card-style-two image-box-hover tmp-scroll-trigger tmp-fade-in animation-order-${
                          (index % 2) + 1
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
                              <ProjectThumb project={project} />
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
        </div>
        <div className="text-center mt--50 tmp-scroll-trigger tmp-fade-in animation-order-1">
          <TmpButton href="/projects">View All Projects</TmpButton>
        </div>
      </div>
    </section>
  );
}
