import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

const DIRECT_CONTACTS = [
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: "GitHub", value: GITHUB_URL.replace(/^https?:\/\//, ""), href: GITHUB_URL, icon: GithubIcon },
  ...(LINKEDIN_URL
    ? [
        {
          label: "LinkedIn",
          value: LINKEDIN_URL.replace(/^https?:\/\//, ""),
          href: LINKEDIN_URL,
          icon: LinkedinIcon,
        },
      ]
    : []),
];

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading as={headingLevel} className="justify-center">
            Contact Me
          </SectionHeading>
          <p className="mt-5 text-base leading-relaxed text-foreground-secondary sm:text-lg">
            Have a project in mind, an opportunity, or just want to connect?
            I&apos;d love to hear from you.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <ContactForm />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {DIRECT_CONTACTS.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noopener noreferrer"}
                className="flex items-center gap-2 text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
              >
                <Icon size={16} />
                {value}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
