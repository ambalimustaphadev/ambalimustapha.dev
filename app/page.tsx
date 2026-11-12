import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Facts } from "@/components/home/Facts";
import { Skills } from "@/components/home/Skills";
import { EducationExperience } from "@/components/home/EducationExperience";
import { Portfolio } from "@/components/home/Portfolio";
import { Pricing } from "@/components/home/Pricing";
import { Contact } from "@/components/home/Contact";
import { LatestWriting } from "@/components/home/LatestWriting";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Demo 17 section order (app/(homes)/index-17/page.jsx), with the template's
// Education & Experience section added after Skills.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About parentClass="about-us-area tmp-section-gapBottom" />
      <Facts />
      <Skills />
      <EducationExperience />
      <Portfolio projects={projects} />
      <Pricing parentClass="our-price-plan-area tmp-section-gapBottom" />
      <Contact parentClass="get-in-touch-area" />
      <LatestWriting parentClass="blog-and-news-are tmp-section-gapTop" />
    </>
  );
}
