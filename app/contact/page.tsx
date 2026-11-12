import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Mustapha Ambali about a project, an opportunity, or a technical question.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="contact inner">
      <Breadcrumb title="Contact" />
      <Contact parentClass="get-in-touch-area tmp-section-gap" showSocial />
    </div>
  );
}
