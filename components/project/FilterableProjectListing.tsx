"use client";

import { useState, type ReactNode } from "react";
import { ProjectListing } from "@/components/project/ProjectListing";
import type { Project, ProjectDiscipline } from "@/types";

const CATEGORIES: ("All" | ProjectDiscipline)[] = ["All", "Mobile", "Backend", "Web"];

/**
 * The /projects grid with the All / Mobile / Backend / Web tabs (moved here
 * from the homepage portfolio section). Uses the template's portfolio tab
 * styles; filters on each project's `disciplines`. `intro` renders above the
 * tabs, inside the same section, so the page reads intro → filters → grid.
 */
export function FilterableProjectListing({
  projects,
  intro,
  className,
}: {
  projects: Project[];
  intro?: ReactNode;
  className?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.disciplines?.includes(activeCategory));

  const header = (
    <>
      {intro}
      <div className="latest-portfolio-tabs-area ambali-project-filters">
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
        <p className="visually-hidden" aria-live="polite">
          {`Showing ${filtered.length} ${filtered.length === 1 ? "project" : "projects"}`}
        </p>
      </div>
    </>
  );

  return <ProjectListing projects={filtered} header={header} className={className} />;
}
