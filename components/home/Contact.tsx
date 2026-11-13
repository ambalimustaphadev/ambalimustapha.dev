import { Suspense } from "react";
import { ContactForm } from "@/components/ui/ContactForm";
import { ServiceContactForm } from "@/components/ui/ServiceContactForm";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { AVAILABILITY, CONTACT_EMAIL, LOCATION } from "@/lib/constants";

/** Demo 17 "Get in touch" section (components/common/Contact.jsx), sending via /api/contact. */
export function Contact({
  parentClass = "get-in-touch-area",
  headingLevel = "h2",
  showSocial = false,
}: {
  parentClass?: string;
  headingLevel?: "h1" | "h2";
  /** Adds the GitHub / LinkedIn / email links under the contact details. */
  showSocial?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <section className={parentClass} id="contacts">
      <div className="container">
        <div className="get-in-touch-wrapper tmponhover">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <div className="contact-inner">
                <div className="section-head section-head-one-side text-align-left tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <span className="title-left">Have a project in mind? Let&apos;s talk.</span>
                </div>
                <ul className="ft-link v2">
                  <li className="tmp-scroll-trigger tmp-fade-in animation-order-1 tmp-link-animation">
                    <span className="ft-icon">
                      <i className="fa-solid fa-envelope" aria-hidden="true" />
                    </span>
                    <div className="ft-link-wrap">
                      <p className="link-title">E-mail:</p>
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    </div>
                  </li>
                  <li className="tmp-scroll-trigger tmp-fade-in animation-order-2">
                    <span className="ft-icon">
                      <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    </span>
                    <div className="ft-link-wrap">
                      <p className="link-title">Location:</p>
                      <div>{LOCATION}</div>
                    </div>
                  </li>
                  <li className="tmp-scroll-trigger tmp-fade-in animation-order-3">
                    <span className="ft-icon">
                      <i className="fa-solid fa-clock" aria-hidden="true" />
                    </span>
                    <div className="ft-link-wrap">
                      <p className="link-title">Availability:</p>
                      <div>{AVAILABILITY}</div>
                    </div>
                  </li>
                </ul>
                {showSocial && (
                  <div className="find-me-on mt--30 tmp-scroll-trigger tmp-fade-in animation-order-4">
                    <SocialIcons className="social-link banner" />
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-inner">
                <div className="section-head section-head-one-side text-align-left tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <Heading className="title">GET IN TOUCH</Heading>
                </div>
                {/* Static HTML shows the plain form; the client swaps in the
                    ?service=… prefill once it can read the URL. */}
                <Suspense fallback={<ContactForm />}>
                  <ServiceContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
