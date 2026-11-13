import Link from "next/link";

/**
 * /about narrative: background, how I moved into software, what I build,
 * the problems I like and what I'm open to. Facts only — education, training,
 * role and projects all match data/education.ts, data/experience.ts and
 * data/projects.ts.
 */
export function AboutStory({ parentClass = "tmp-section-gapBottom" }: { parentClass?: string }) {
  return (
    <section className={`ambali-about-story ${parentClass}`} aria-labelledby="about-story-title">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="section-head text-align-left">
              <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                <span className="subtitle">My Story</span>
              </div>
              <h2
                className="title tmp-scroll-trigger tmp-fade-in animation-order-2"
                id="about-story-title"
              >
                From Mass Communication to Software Engineering
              </h2>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="ambali-about-story__body tmp-scroll-trigger tmp-fade-in animation-order-3">
              <p>
                I studied Mass Communication at Adekunle Ajasin University, where the work was
                writing, research and explaining complex ideas clearly. In 2024 I began training
                in Flutter at Pediforte Coding Academy and earned a certification in Android and
                iOS app development. That training took me past the interface and into the
                backend: the APIs, databases and rules an app depends on.
              </p>
              <p>
                Today I work at OH Mobility as an IT Assistant on the full-stack side, building
                and maintaining mobile apps, backend integrations and websites. Alongside that I
                build my own products end to end — Flutter apps backed by Python services and
                PostgreSQL, such as <Link href="/projects/sabimate">Sabimate</Link> and{" "}
                <Link href="/projects/finassist">FinAssist</Link>.
              </p>
              <h3>What I enjoy solving</h3>
              <p>
                Problems where the app and the backend have to agree: offline data that must sync
                without duplicates, calculations that have to be exactly right, and sessions and
                permissions that can&apos;t be trusted to the client. When AI is part of a
                product, I integrate it through the backend so it works from real data and
                stays within clear limits.
              </p>
              <h3>What I&apos;m open to</h3>
              <p>
                Freelance and contract projects involving mobile apps, backend systems or APIs,
                and conversations about software engineering roles where I can keep building
                reliable products. My communication background shows up in the work as clear
                scoping and documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
