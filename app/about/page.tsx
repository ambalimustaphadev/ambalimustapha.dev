import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mustapha Ambali is a software developer with a background in Mass Communication, focused on mobile applications and backend systems.",
};

export default function AboutPage() {
  return (
    <div className="pt-8">
      <About headingLevel="h1" />
      <Experience />
      <Education />
    </div>
  );
}
