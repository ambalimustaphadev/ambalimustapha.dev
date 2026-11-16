import Image from "next/image";
import { Odometer } from "@/components/ui/Odometer";
import { TmpButton } from "@/components/ui/TmpButton";
import { RESUME_PATH } from "@/lib/constants";
import { BUILDING_SINCE, DOCUMENTED_PROJECTS } from "@/lib/stats";

// Two principles with distinct jobs: how the system is structured, and how it
// behaves when things go wrong.
const CARDS = [
  {
    icon: "/assets/images/about/logo-1.svg",
    title: "Architecture That Lasts",
    description:
      "Clear boundaries between the app, the API and the data, so new features slot in without rewrites.",
  },
  {
    icon: "/assets/images/about/logo-2.svg",
    title: "Reliability by Default",
    description:
      "Validation, error handling, tests and offline behaviour designed in from the start, not patched in later.",
  },
];

/** Demo 17 "About Me" section (components/common/About.jsx). */
export function About({
  parentClass = "about-us-area",
  cta = "about",
}: {
  parentClass?: string;
  /** "about" links to /about (homepage); "cv" offers the CV (on /about itself). */
  cta?: "about" | "cv";
}) {
  return (
    <section className={parentClass} id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-us-left-content-wrap bg-vactor-one">
              <div className="years-of-experience-card tmp-scroll-trigger tmp-fade-in animation-order-1">
                <p className="counter card-title">Since {BUILDING_SINCE}</p>
                <p className="card-para">building software</p>
              </div>
              <div className="design-card tmp-scroll-trigger tmp-fade-in animation-order-2">
                <div className="design-card-img">
                  <div className="icon">
                    <i className="fa-sharp fa-light fa-code" aria-hidden="true" />
                  </div>
                </div>
                <div className="card-info">
                  {/* A label, not a heading: it sits before the section's h2.
                      These two cards are the only place the site's figures
                      appear (the hero carries "Mobile & Backend"). */}
                  <p className="card-title h3 ambali-design-card__title">
                    <Odometer value={DOCUMENTED_PROJECTS} /> Projects
                  </p>
                  <p className="card-para">each with a case study</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-us-right-content-wrap">
              <div className="section-head text-align-left mb--50">
                <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <span className="subtitle">About Me</span>
                </div>
                <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                  Building Practical Mobile <br />
                  &amp; Backend Systems
                </h2>
                <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                  I&apos;m a software developer who builds Flutter apps and the Python backends
                  behind them — APIs, databases and the logic that has to be right. I came to
                  engineering from Mass Communication, so I care as much about understanding the
                  problem and explaining the solution as I do about the code.
                </p>
              </div>
              <div className="about-us-section-card row g-5">
                {CARDS.map((card, index) => (
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={card.title}>
                    <div
                      className={`about-us-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${
                        index + 4
                      }`}
                    >
                      <div className="card-head">
                        <div className="logo-img">
                          <Image alt="" src={card.icon} width={24} height={24} />
                        </div>
                        <h3 className="card-title">{card.title}</h3>
                      </div>
                      <p className="card-para">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="about-btn mt--40 tmp-scroll-trigger tmp-fade-in animation-order-6">
                {cta === "about" ? (
                  <TmpButton href="/about">Read More About Me</TmpButton>
                ) : (
                  <TmpButton href={RESUME_PATH} icon="fa-sharp fa-regular fa-arrow-down-to-line">
                    Download CV
                  </TmpButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
