import { TechLogo } from "@/components/ui/TechLogo";
import { skills } from "@/data/skills";
import { TECH_STACK, type TechStackItem } from "@/data/techStack";

// Icon for each skill group, taken from the brand marks in data/techStack.ts.
// Groups without a single representative brand use a Font Awesome icon.
const GROUP_ICONS: Record<string, string> = {
  "Mobile Engineering": "Flutter",
  "Backend Engineering": "Flask",
  "Data & Infrastructure": "PostgreSQL",
};
const GROUP_FALLBACK_ICONS: Record<string, string> = {
  "AI Integration": "fa-regular fa-brain",
};

function iconFor(category: string): TechStackItem | undefined {
  return TECH_STACK.find((tech) => tech.name === GROUP_ICONS[category]);
}

/** Demo 17 "My Skill" section (components/common/Skills3.jsx). */
export function Skills() {
  return (
    <section
      className="my-skill-area-style-two plr--120 plr_lg--30 plr_md--30 plr_sm--30 plr_mobile--15 mt--70"
      id="skills"
    >
      <div className="tpm-custom-box-bg">
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-lg-12 col-md-12">
              <div className="my-skill-area-left-content-wrap">
                <div className="section-head text-align-left">
                  <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <span className="subtitle">My Skill</span>
                  </div>
                  <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                    The Technologies I <br />
                    Build With
                  </h2>
                  <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                    Grouped by where I do my strongest work: Flutter on mobile, Python services
                    and PostgreSQL on the backend, and AI features integrated through that
                    backend. Every technology here is used in a project you can read about.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-lg-12 col-md-12">
              <div className="my-skill-card-style-two row">
                {skills.map((group, index) => {
                  const icon = iconFor(group.category);
                  return (
                    <div className="col-lg-6 col-md-6 col-12" key={group.category}>
                      <div
                        className={`my-skill-card tmp-scroll-trigger tmp-fade-in animation-order-${
                          index + 1
                        }`}
                      >
                        <div className="card-icon">
                          {icon ? (
                            <TechLogo item={icon} className="ambali-skill-icon" />
                          ) : GROUP_FALLBACK_ICONS[group.category] ? (
                            <i
                              className={`${GROUP_FALLBACK_ICONS[group.category]} ambali-skill-icon`}
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>
                        <h3 className="card-title">{group.category}</h3>
                        <p className="card-para">{group.items.join(", ")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
