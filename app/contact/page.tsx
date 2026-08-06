import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mustapha Ambali about a project, an opportunity, or a technical question.",
};

export default function ContactPage() {
  return (
    <div className="pt-8">
      <Contact headingLevel="h1" />
    </div>
  );
}
