import { Globe, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/constants";

const DIRECT_CONTACTS = [
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  {
    label: "Website",
    value: SITE_URL.replace(/^https?:\/\//, ""),
    href: SITE_URL,
    icon: Globe,
  },
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
  const Heading = headingLevel;

  return (
    <section id="contact" className="py-16 sm:py-24">
      <Container>
        <div className="flex items-center gap-3">
          <span className="h-5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <Heading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Contact
          </Heading>
        </div>
        <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-foreground-secondary sm:text-lg">
          Have a project in mind? Let&apos;s talk.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-base leading-relaxed text-foreground-secondary sm:text-lg">
              I&apos;m open to interesting projects, freelance work, and
              conversations about software.
            </p>

            <ul className="mt-6 space-y-3.5">
              {DIRECT_CONTACTS.map(({ label, value, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={label === "Email" ? undefined : "_blank"}
                    rel={label === "Email" ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-2.5 text-sm text-foreground-secondary transition-colors duration-200 hover:text-accent"
                  >
                    <Icon size={16} />
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
