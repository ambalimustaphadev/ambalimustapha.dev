import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FilterableProjectListing } from "@/components/project/FilterableProjectListing";
import { TmpButton } from "@/components/ui/TmpButton";
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
      <Breadcrumb title="Projects & Case Studies" />
      {/* Intro, filters and grid share one section so the page flows without
          stacked section gaps (spacing: .ambali-projects-listing). */}
      <FilterableProjectListing
        projects={projects}
        className="tmp-latest-portfolio ambali-projects-listing"
        intro={
          <div className="section-head ambali-projects-intro">
            <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">My Work</span>
            </div>
            <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-2">
              Explore the applications, platforms and backend systems I&apos;ve engineered, from
              mobile experiences to AI-powered products and scalable APIs.
            </p>
          </div>
        }
      />
      <section className="ambali-projects-cta-area tmp-section-gapBottom">
        <div className="container">
          <div className="ambali-projects-cta section-head tmponhover">
            <h2 className="title tmp-scroll-trigger tmp-fade-in animation-order-1">
              Let&apos;s Build Something Great Together.
            </h2>
            <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-2">
              Have an idea, a technical challenge or an opportunity? I&apos;d love to hear about
              it. Let&apos;s discuss what we can create together.
            </p>
            <div className="tmp-scroll-trigger tmp-fade-in animation-order-3">
              <TmpButton href="/#contacts">Get in Touch</TmpButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
