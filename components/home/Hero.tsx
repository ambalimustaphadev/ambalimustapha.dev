import Image from "next/image";
import { TmpButton } from "@/components/ui/TmpButton";
import { Typer } from "@/components/ui/Typer";
import { SITE_NAME } from "@/lib/constants";

// Each role carries its own article ("An AI…"), so the whole phrase types in.
const ROLES = [
  "A Mobile Application Developer.",
  "A Backend Engineer.",
  "An AI Application Developer.",
  "A Full-Stack Developer.",
] as const;

// Stable text for assistive technology; the typed phrase is decorative.
const ROLES_SUMMARY =
  "a mobile application developer, backend engineer, AI application developer and full-stack developer.";

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
                  <span className="visually-hidden">, {ROLES_SUMMARY}</span>
                  {/* Role line is sized so the longest phrase fits beside the
                      portrait and within phones (see .ambali-hero__role). */}
                  <span className="ambali-hero__line ambali-hero__role" aria-hidden="true">
                    <span className="header-caption">
                      <span className="cd-headline clip is-full-width">
                        <Typer strings={ROLES} />
                      </span>
                    </span>
                  </span>
                </h1>
                <p className="disc tmp-scroll-trigger tmp-fade-in animation-order-3">
                  I build intelligent digital products, from high-performance mobile applications to
                  scalable backend systems and AI-powered solutions. I turn complex ideas into
                  reliable software designed to solve real problems.
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
