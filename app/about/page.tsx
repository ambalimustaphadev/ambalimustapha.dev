import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { About } from "@/components/home/About";
import { AboutStory } from "@/components/about/AboutStory";
import { Services } from "@/components/home/Services";
import { Skills } from "@/components/home/Skills";
import { EducationExperience } from "@/components/home/EducationExperience";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "How Mustapha Ambali moved from Mass Communication into software development, and how he builds mobile apps and backend systems today.",
  path: "/about",
});

// Follows the Reeni about page (app/about/page.jsx): breadcrumb banner, then
// the shared sections, built from the same components as the homepage.
export default function AboutPage() {
  return (
    <div className="about inner">
      <Breadcrumb title="About Me" />
      <About parentClass="about-us-area tmp-section-gap" cta="cv" />
      <AboutStory />
      <Services />
      <Skills />
      <EducationExperience />
      <Contact parentClass="get-in-touch-area tmp-section-gap" />
    </div>
  );
}
