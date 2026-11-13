import { CAREER_START_YEAR } from "@/lib/constants";
import { getPrimaryProjects } from "@/data/projects";

// Every figure shown on the site is derived from the site's own data, so the
// numbers stay accurate and identical everywhere they appear.

/** The year I started building software (Pediforte training, 2024). */
export const BUILDING_SINCE = CAREER_START_YEAR;

/** Projects with real work and a case study — exactly the cards on /projects. */
export const DOCUMENTED_PROJECTS = getPrimaryProjects().length;
