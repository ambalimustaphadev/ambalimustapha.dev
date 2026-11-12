import { Odometer } from "@/components/ui/Odometer";
import {
  APPS_IN_ACTIVE_DEVELOPMENT,
  PROJECTS_WITH_WORK,
  TECHNOLOGY_COUNT,
  YEARS_BUILDING,
} from "@/lib/stats";

const COUNTERS = [
  { count: PROJECTS_WITH_WORK, suffix: "", text: "Projects Built & In Progress" },
  { count: YEARS_BUILDING, suffix: "+", text: "Years Building Software" },
  { count: TECHNOLOGY_COUNT, suffix: "+", text: "Technologies I Work With" },
  { count: APPS_IN_ACTIVE_DEVELOPMENT, suffix: "", text: "Apps In Active Development" },
];

/** Demo 17 counters (components/common/Facts2.jsx). */
export function Facts() {
  return (
    <div className="counter-funfacts-area tmp-section-gapBottom">
      <div className="container">
        <div className="row g-5">
          {COUNTERS.map((item, index) => (
            <div key={item.text} className="col-lg-3 col-6">
              <div
                className={`counter-card tmp-scroll-trigger tmp-fade-in tmponhover animation-order-${
                  index + 1
                }`}
              >
                <h3 className="counter counter-title">
                  <Odometer value={item.count} /> {item.suffix}
                </h3>
                <p className="counter-para">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
