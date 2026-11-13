import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Facts } from "@/components/home/Facts";
import { Skills } from "@/components/home/Skills";
import { EducationExperience } from "@/components/home/EducationExperience";
import { Portfolio } from "@/components/home/Portfolio";
import { Contact } from "@/components/home/Contact";
import { LatestWriting } from "@/components/home/LatestWriting";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Section order matches the primary navigation (NAV_LINKS in lib/constants.ts):
// Home → About (+ facts & skills) → Services (+ packages & pricing) →
// Portfolio → Resume → Writing → Contact.
// Each section only carries the top/bottom gap classes needed for its
// neighbours, so adjacent sections are never double- or un-spaced.
export default function HomePage() {
  return (
    <>
      <Hero />
      <About parentClass="about-us-area tmp-section-gapBottom" />
      <Facts />
      <Skills />
      <Services parentClass="tmp-service-area tmp-section-gapTop" showPackages />
      <Portfolio projects={projects} />
      <EducationExperience parentClass="education-experience" />
      <LatestWriting parentClass="blog-and-news-are tmp-section-gap" />
      <Contact parentClass="get-in-touch-area" />
    </>
  );
}
