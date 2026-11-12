import { TechLogo } from "@/components/ui/TechLogo";
import { skills } from "@/data/skills";
import { TECH_STACK, type TechStackItem } from "@/data/techStack";

// Icon for each skill group, taken from the brand marks in data/techStack.ts.
const GROUP_ICONS: Record<string, string> = {
  Languages: "Dart",
  Mobile: "Flutter",
  Backend: "Flask",
  Databases: "PostgreSQL",
  Tools: "Git",
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
                    From Flutter and Dart on mobile to Python, Flask and PostgreSQL on the
                    backend — the languages, frameworks and tools I use to design, build and
                    ship software.
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
                          {icon && <TechLogo item={icon} className="ambali-skill-icon" />}
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
