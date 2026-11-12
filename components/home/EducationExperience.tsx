import Image from "next/image";
import Link from "next/link";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { getProjectBySlug } from "@/data/projects";

const KIND_LABELS = {
  employment: "employment",
  internship: "internship",
  independent: "independent work",
} as const;

function CustomTitle({ children }: { children: string }) {
  return (
    <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
      {children}
      <span>
        <Image alt="" src="/assets/images/custom-line/custom-line.png" width={81} height={6} />
      </span>
    </h2>
  );
}

/**
 * Reeni "Education & Experience" section (components/common/Education2.jsx).
 * Demo 17 has no such section; this is the template's own component, added so
 * the site keeps showing real education and experience.
 */
export function EducationExperience({
  parentClass = "education-experience tmp-section-gapTop",
}: {
  parentClass?: string;
}) {
  return (
    <section className={parentClass} id="resume">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Education &amp; Experience</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            My Journey So Far
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            The foundation behind what I build today, and the work I&apos;m doing now.
          </p>
        </div>
        {/* One centred content column: the section is about the content, so
            there is no portrait column (the portrait stays in the hero). */}
        <div className="ambali-edu-exp">
          <CustomTitle>Education</CustomTitle>
          {education.map((item, index) => (
            <div
              key={item.qualification}
              className={`education-experience-card ambali-edu-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${
                index + 1
              }`}
            >
              <div className="ambali-edu-card__meta">
                <h4 className="edu-sub-title">{item.institution}</h4>
                <h3 className="edu-title">{item.qualification}</h3>
              </div>
              <p className="edu-para">
                {item.detail ? `${item.detail}. ` : ""}
                {item.description}
              </p>
            </div>
          ))}
          <div className="experiences-wrapper">
            <div className="experiences-wrap-left-content">
              <CustomTitle>Experiences</CustomTitle>
              <ol className="ambali-timeline">
                {experience.map((item, index) => {
                  const projects = (item.projects ?? []).flatMap(({ slug, summary }) => {
                    const project = getProjectBySlug(slug);
                    return project ? [{ ...project, summary }] : [];
                  });
                  return (
                    <li
                      key={item.organization}
                      className={`experience-content ambali-timeline__item ambali-timeline__item--${
                        item.kind
                      } tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
                    >
                      <span className="ambali-timeline__dot" aria-hidden="true" />
                      <div className="ambali-timeline__meta">
                        <p className="ex-subtitle">{KIND_LABELS[item.kind]}</p>
                        <div className="ambali-timeline__head">
                          <h3 className="ex-name">{item.organization}</h3>
                          <span className="ambali-timeline__period">{item.period}</span>
                        </div>
                        <p className="ex-title">{item.role}</p>
                      </div>
                      <div className="ambali-timeline__body">
                        <p className="ex-para">{item.description}</p>
                        {projects.length > 0 && (
                          <ul className="ambali-exp-projects" aria-label="Selected projects">
                            {projects.map((project) => (
                              <li key={project.slug}>
                                <Link className="ambali-exp-project" href={`/projects/${project.slug}`}>
                                  <span className="ambali-exp-project__text">
                                    <span className="ambali-exp-project__name">{project.title}</span>
                                    <span className="ambali-exp-project__summary">
                                      {project.summary}
                                    </span>
                                  </span>
                                  <i
                                    className="fa-sharp fa-regular fa-arrow-right"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
