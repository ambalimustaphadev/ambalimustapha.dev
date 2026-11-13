import Link from "next/link";
import { ServicePackages } from "@/components/home/ServicePackages";
import { getProjectBySlug } from "@/data/projects";
import { services } from "@/data/services";

/**
 * Demo 17 "What I Do" section (components/common/Services5.jsx). With
 * `showPackages` (homepage only), the packages & starting prices follow the
 * capability cards inside the same section.
 */
export function Services({
  parentClass = "tmp-service-area tmp-section-gapBottom",
  showPackages = false,
}: {
  parentClass?: string;
  showPackages?: boolean;
}) {
  return (
    <div className={parentClass} id="service">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-head mb--50">
              <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                <span className="subtitle">What I Do</span>
              </div>
              <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                What I Provide For You
              </h2>
              <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
                Software developer specialising in Flutter mobile development, Python backend
                engineering and AI-powered applications — from the app on the phone to the API,
                data and AI behind it.
              </p>
            </div>
          </div>
        </div>
        <div className="about-us-section-card row g-5">
          {services.map((service, index) => {
            const projects = service.projectSlugs.flatMap((slug) => {
              const project = getProjectBySlug(slug);
              return project ? [project] : [];
            });
            return (
              <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={service.title}>
                <article
                  className={`about-us-card ambali-capability-card tmp-scroll-trigger tmponhover tmp-fade-in animation-order-${
                    index % 2 === 0 ? 4 : 5
                  }`}
                >
                  <div className="card-head">
                    <div className="logo-img">
                      <i className={service.iconClass} aria-hidden="true" />
                    </div>
                    <h3 className="card-title">{service.title}</h3>
                  </div>
                  <p className="card-para">{service.description}</p>
                  <div className="ambali-capability-card__footer">
                    <ul className="ambali-tech-labels" aria-label={`${service.title} technologies`}>
                      {service.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    {projects.length > 0 && (
                      <p className="ambali-capability-card__projects">
                        <span className="ambali-capability-card__projects-label">Seen in</span>
                        {projects.map((project) => (
                          <Link key={project.slug} href={`/projects/${project.slug}`}>
                            {project.title}
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
        {showPackages && <ServicePackages />}
      </div>
    </div>
  );
}
