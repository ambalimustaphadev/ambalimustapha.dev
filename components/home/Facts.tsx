import { Odometer } from "@/components/ui/Odometer";
import { BUILDING_SINCE, DOCUMENTED_PROJECTS } from "@/lib/stats";

// Two verifiable figures, derived from the site's data (lib/stats.ts). A
// technology count was dropped: the skills list mixes tools with capabilities,
// so any total would overstate it. No "+" suffixes: each number is exact.
const COUNTERS: { value: number; animate: boolean; text: string }[] = [
  { value: BUILDING_SINCE, animate: false, text: "Started building software" },
  { value: DOCUMENTED_PROJECTS, animate: true, text: "Projects with case studies" },
];

/** Demo 17 counters (components/common/Facts2.jsx). */
export function Facts() {
  return (
    <div className="counter-funfacts-area tmp-section-gapBottom">
      <div className="container">
        <div className="row g-5 justify-content-center">
          {COUNTERS.map((item, index) => (
            <div key={item.text} className="col-6 col-lg-4">
              <div
                className={`counter-card tmp-scroll-trigger tmp-fade-in tmponhover animation-order-${
                  index + 1
                }`}
              >
                <p className="counter counter-title">
                  {/* A year shouldn't count up from zero like a tally. */}
                  {item.animate ? <Odometer value={item.value} /> : item.value}
                </p>
                <p className="counter-para">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
