import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { TmpButton } from "@/components/ui/TmpButton";
import { servicePackages } from "@/data/servicePricing";

/** Matches the SCSS breakpoint below which the cards become a carousel. */
const PRICING_CAROUSEL_QUERY = "(max-width: 767px)";

/**
 * Packages & starting prices, in the template's price-plan-card design
 * (components/common/Pricing.jsx). A standalone homepage section just before
 * Contact, deliberately not in the main navigation. Keeps the #pricing anchor.
 * Each CTA scrolls to the homepage contact form and prefills the message with
 * the chosen service (?service=…).
 */
export function ServicePackages({
  parentClass = "our-price-plan-area tmp-section-gapBottom",
}: {
  parentClass?: string;
}) {
  return (
    <section
      className={`${parentClass} ambali-services-pricing ambali-service-packages`}
      id="pricing"
    >
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Packages &amp; Pricing</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Starting Prices
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            I build Flutter mobile apps, backends and APIs, websites, and AI features for new or
            existing products, for individuals, startups and businesses. The prices below are
            where each kind of project starts. The final cost depends on the scope and complexity
            of what you need, and I&apos;ll confirm a quote once we&apos;ve talked it through.
          </p>
        </div>
        {/* Four across from 1400px (xxl) and two columns from 768px. Below
            1400px four columns are too narrow: titles break mid-word and CTA
            labels wrap out of their buttons. Below 768px, where the cards used
            to stack, the same row becomes a swipeable carousel (see the SCSS). */}
        <SnapCarousel
          className="row g-4"
          carouselClassName="ambali-pricing-carousel"
          navClassName="ambali-gallery-nav--md"
          label="Service packages"
          itemLabel="package"
          query={PRICING_CAROUSEL_QUERY}
        >
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
        </SnapCarousel>
        {/* Exclusions confirmed by Mustapha: hosting, ongoing maintenance,
            app-store fees and third-party API costs aren't in starting prices. */}
        <p className="ambali-services-pricing__note tmp-scroll-trigger tmp-fade-in animation-order-3">
          Starting prices cover a clearly scoped first version. The final quote depends on
          features, integrations, design work and timeline, and is agreed before work begins.
          Ongoing maintenance and third-party costs such as hosting, app-store fees and API
          usage aren&apos;t included in the starting price.
        </p>
      </div>
    </section>
  );
}
