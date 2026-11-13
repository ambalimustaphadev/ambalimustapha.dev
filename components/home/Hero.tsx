import Image from "next/image";
import { TmpButton } from "@/components/ui/TmpButton";
import { SITE_NAME } from "@/lib/constants";

/**
 * Demo 09 hero (components/homes/home-9/Hero.jsx): full-height cinematic
 * banner, text on the left over the dark background.
 *
 * The template's banner is one photograph (bg-image-3.jpg). Here the
 * background is rebuilt in layers so the unedited portrait (a transparent
 * cut-out) sits inside the same dark composition: studio backdrop, the
 * portrait with masked edges, then the template-style dark overlay for text.
 */
export function Hero() {
  return (
    <div className="tmp-banner-one-area style-2 bg_image ambali-hero" id="home">
      <div className="ambali-hero__photo">
        <Image
          src="/images/port-pic-cutout.png"
          alt={`Portrait of ${SITE_NAME}`}
          fill
          preload
          loading="eager"
          sizes="(min-width: 992px) 110vw, 160vw"
        />
      </div>
      <div className="ambali-hero__overlay" aria-hidden="true" />
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-1">
              <div className="inner">
                {/* Name and role: one clear identity instead of a rotation of
                    overlapping job titles. */}
                <p className="ambali-hero__greeting tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Hello,
                </p>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  {/* Each line is kept whole on wide screens so the heading reads
                      as the template's two lines despite the longer name. */}
                  <span className="ambali-hero__line">I&rsquo;m {SITE_NAME}</span> <br />
                  {/* Inner span picks up the template's accent colour for title spans. */}
                  <span className="ambali-hero__line ambali-hero__role">
                    <span>Software Developer</span>
                  </span>
                </h1>
                <p className="disc tmp-scroll-trigger tmp-fade-in animation-order-3">
                  I build reliable mobile applications and the scalable backend systems behind
                  them, with hands-on experience integrating AI capabilities into real products.
                </p>
                <div className="button-area-banner-one tmp-scroll-trigger tmp-fade-in animation-order-4">
                  <TmpButton href="/projects">View Portfolio</TmpButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
