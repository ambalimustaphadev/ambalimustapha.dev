import { TmpButton } from "@/components/ui/TmpButton";
import { servicePackages } from "@/data/servicePricing";

/**
 * Services & starting prices, in the template's price-plan-card design
 * (components/common/Pricing.jsx). Each CTA scrolls to the homepage contact
 * form and prefills the message with the chosen service (?service=…).
 */
export function Pricing({
  parentClass = "our-price-plan-area tmp-section-gapBottom",
}: {
  parentClass?: string;
}) {
  return (
    <section className={`${parentClass} ambali-services-pricing`} id="pricing">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">My Services</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Building Digital Products <br /> That Make an Impact.
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            I design and develop modern mobile applications, scalable backend systems,
            intelligent AI-powered solutions and high-performance websites. From initial concept
            to deployment, I help turn ideas into functional digital products.
          </p>
        </div>
        <div className="row g-4">
          {servicePackages.map((service, index) => (
            <div
              key={service.slug}
              className={`col-md-6 tmp-scroll-trigger tmp-fade-in animation-order-${(index % 2) + 1}`}
            >
              <article
                className={`price-plan-card tmponhover ambali-service-card${
                  service.featured ? " ambali-service-card--featured" : ""
                }`}
                aria-labelledby={`service-${service.slug}`}
              >
                <div className="ambali-service-card__head">
                  <h3 className="ambali-service-card__title" id={`service-${service.slug}`}>
                    {service.title}
                  </h3>
                  {service.featured && <span className="ambali-service-card__badge">Featured</span>}
                </div>
                <p className="ambali-service-card__from">Starting at</p>
                <p className="main-price">
                  ${service.startingPrice.toLocaleString("en-US")}+
                  <span className="visually-hidden"> USD</span>
                </p>
                <p className="per-month">{service.billing}</p>
                <p className="ambali-service-card__desc">{service.description}</p>
                <div className="check-box">
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <div className="check-box-item">
                          <div className="box-icon">
                            <i className="fa-solid fa-circle-check" aria-hidden="true" />
                          </div>
                          <p className="box-para">{feature}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <TmpButton
                    href={`/?service=${service.slug}#contacts`}
                    className={`btn-md${service.featured ? "" : " btn-border"}`}
                  >
                    {service.cta}
                  </TmpButton>
                </div>
              </article>
            </div>
          ))}
        </div>
        <p className="ambali-services-pricing__note tmp-scroll-trigger tmp-fade-in animation-order-3">
          All prices are starting estimates. Final project costs depend on scope, technical
          requirements and complexity. Get in touch to discuss your project and receive a
          tailored quotation.
        </p>
      </div>
    </section>
  );
}
