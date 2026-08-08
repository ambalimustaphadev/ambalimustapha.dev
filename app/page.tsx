import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Focus } from "@/components/sections/Focus";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <ScrollReveal intensity="strong">
        <Hero />
      </ScrollReveal>
      <ScrollReveal intensity="strong">
        <FeaturedProjects />
      </ScrollReveal>
      <ScrollReveal intensity="strong">
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Focus />
      </ScrollReveal>
      <ScrollReveal>
        <Experience />
      </ScrollReveal>
      <ScrollReveal>
        <Skills />
      </ScrollReveal>
      <ScrollReveal>
        <Education />
      </ScrollReveal>
      <ScrollReveal>
        <Writing />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </>
  );
}
