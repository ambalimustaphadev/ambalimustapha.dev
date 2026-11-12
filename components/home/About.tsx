import Image from "next/image";
import { Odometer } from "@/components/ui/Odometer";
import { TmpButton } from "@/components/ui/TmpButton";
import { RESUME_PATH } from "@/lib/constants";
import { PROJECTS_WITH_WORK, YEARS_BUILDING } from "@/lib/stats";

const CARDS = [
  {
    icon: "/assets/images/about/logo-1.svg",
    title: "Clean Architecture",
    description:
      "Structured, maintainable code, with mobile clients and backend services kept cleanly separated.",
  },
  {
    icon: "/assets/images/about/logo-2.svg",
    title: "Dependable Systems",
    description:
      "Validation, error handling and security treated as core behaviour — software that solves real problems.",
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
                <h2 className="counter card-title">
                  <Odometer value={YEARS_BUILDING} /> +
                </h2>
                <p className="card-para">years building software</p>
              </div>
              <div className="design-card tmp-scroll-trigger tmp-fade-in animation-order-2">
                <div className="design-card-img">
                  <div className="icon">
                    <i className="fa-sharp fa-light fa-code" aria-hidden="true" />
                  </div>
                </div>
                <div className="card-info">
                  <h3 className="card-title">Mobile &amp; Backend</h3>
                  <p className="card-para">{PROJECTS_WITH_WORK} Projects</p>
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
                  I&apos;m a software developer with a background in Mass Communication. I build
                  practical mobile applications and backend systems with Flutter, Python, and
                  PostgreSQL. I care about clean architecture, dependable systems, and software
                  that solves real problems.
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
