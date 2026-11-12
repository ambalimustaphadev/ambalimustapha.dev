import Image from "next/image";
import { TmpButton } from "@/components/ui/TmpButton";
import { Typer } from "@/components/ui/Typer";
import { SITE_NAME } from "@/lib/constants";

const ROLES = [
  "Flutter Developer.",
  "Mobile Developer.",
  "Backend Developer.",
  "AI Enthusiast.",
] as const;

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
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Hello
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  {/* Each line is kept whole on wide screens so the heading reads
                      as the template's two lines despite the longer name. */}
                  <span className="ambali-hero__line">I&rsquo;m {SITE_NAME}</span> <br />
                  <span className="ambali-hero__line">
                    A{" "}
                    <span className="header-caption">
                      <span className="cd-headline clip is-full-width">
                        <Typer strings={ROLES} />
                      </span>
                    </span>
                  </span>
                </h1>
                <p className="disc tmp-scroll-trigger tmp-fade-in animation-order-3">
                  I build mobile apps and backend systems with Flutter and Python, focusing on
                  clean architecture, scalable APIs, and software that solves real problems.
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
