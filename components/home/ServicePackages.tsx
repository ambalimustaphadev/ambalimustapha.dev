import { TmpButton } from "@/components/ui/TmpButton";
import { servicePackages } from "@/data/servicePricing";

/**
 * Packages & starting prices, in the template's price-plan-card design
 * (components/common/Pricing.jsx). Rendered inside the homepage Services
 * section (<Services showPackages />), below the capability cards. Keeps the
 * #pricing anchor. Each CTA scrolls to the homepage contact form and prefills
 * the message with the chosen service (?service=…).
 */
export function ServicePackages() {
  return (
    <div className="ambali-services-pricing ambali-service-packages" id="pricing">
      <div className="section-head mb--50">
        <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
          <span className="subtitle">Packages &amp; Pricing</span>
        </div>
        <h3 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
          Starting Prices
        </h3>
        <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
          I design and develop modern mobile applications, scalable backend systems,
          intelligent AI-powered solutions and high-performance websites. From initial concept
          to deployment, I help turn ideas into functional digital products.
        </p>
      </div>
      {/* Four across from 1400px (xxl), two columns from 768px, stacked on
          phones. Below 1400px four columns are too narrow: titles break
          mid-word and CTA labels wrap out of their buttons. */}
      <div className="row g-4">
        {servicePackages.map((service, index) => (
          <div
            key={service.slug}
            className={`col-xxl-3 col-md-6 tmp-scroll-trigger tmp-fade-in animation-order-${(index % 2) + 1}`}
          >
            <article
              className={`price-plan-card tmponhover ambali-service-card${
                service.featured ? " ambali-service-card--featured" : ""
              }`}
              aria-labelledby={`service-${service.slug}`}
            >
              <div className="ambali-service-card__head">
                <h4 className="ambali-service-card__title" id={`service-${service.slug}`}>
                  {service.title}
                </h4>
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
  );
}
