import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProjectListing } from "@/components/project/ProjectListing";
import { getFutureProjects, getPrimaryProjects } from "@/data/projects";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Projects by Mustapha Ambali, spanning mobile applications built with Flutter and backend systems built with Flask.",
  path: "/projects",
});

export default function ProjectsPage() {
  // Projects with real work first, then planned ones — same order as before.
  const projects = [...getPrimaryProjects(), ...getFutureProjects()];

  return (
    <div className="project inner">
      <Breadcrumb title="All Projects" />
      <div className="container">
        <div className="section-head text-align-left mt--50">
          <p className="description ambali-page-intro">
            A few things I&apos;ve been building, testing, and learning from. Some are still in
            progress; others are developed enough to dig into.
          </p>
        </div>
      </div>
      <ProjectListing projects={projects} />
    </div>
  );
}
