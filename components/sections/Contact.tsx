import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="contact" className="border-t border-border py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have something you&apos;re working on?
            </Heading>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground-secondary sm:text-lg">
              Whether it&apos;s a project, an opportunity, or just a
              technical conversation, I&apos;d be happy to hear from you.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
